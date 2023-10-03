import { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  Text,
  View,
} from "react-native";
import { styles } from "../css/customer";
import { MaterialIcons } from "@expo/vector-icons";
import Button from "../components/utilitise/Button";
import { Common } from "../App";
import { color } from "../components/utilitise/colors";
import BDT from "../components/utilitise/BDT";
import { style } from "../css/notification";
import useStore from "../context/useStore";
import { Fetch, serverUrl } from "../services/common";
import { alert } from "../components/utilitise/Alert";

const Notifications = ({ navigation }) => {
  const [showDetails, setShowDetails] = useState(-1);
  const [showDeleteBtn, setShowDeleteBtn] = useState(-1);
  const [orders, setOrders] = useState(null);
  const store = useStore();
  const height = Dimensions.get("window").height;

  useEffect(() => {
    (async () => {
      try {
        store.setLoading(true);
        const orders = await Fetch("/order?notification=true", "GET");
        setOrders(orders);
      } catch (error) {
        store.setMessage({ msg: error.message, type: "error" });
      } finally {
        store.setLoading(false);
      }
    })();
  }, [store.updateOrder]);

  function removeOrder(id) {
    alert("Are you sure to delete?", async () => {
      try {
        store.setLoading(true);
        const { message } = await Fetch(`/order?id=${id}`, "DELETE");
        store.setMessage({ msg: message, type: "success" });
        setShowDeleteBtn(-1);
        store.setUpdateOrder((prev) => !prev);
      } catch (error) {
        store.setMessage({ msg: error.message, type: "error" });
      } finally {
        store.setLoading(false);
      }
    });
  }

  const tableheaderStyle = {
    fontWeight: 500,
    width: "20%",
    textAlign: "center",
  };
  const tablerowStyle = { width: "20%", textAlign: "center" };
  return (
    <Common>
      <FlatList
        style={{ marginBottom: height - height * 0.93 }}
        data={orders}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 5 }}
        ListEmptyComponent={() => (
          <Text style={{ textAlign: "center" }}>There is no pending order</Text>
        )}
        renderItem={({ item, index: i }) => (
          <View style={styles.container}>
            <View style={style.constainer}>
              <Pressable
                style={{ flexDirection: "row", alignItems: "center" }}
                onPress={() => setShowDetails((prev) => (i === prev ? -1 : i))}
              >
                {item.profile ? (
                  <Image
                    style={styles.profile}
                    source={{ uri: serverUrl + item.profile }}
                  />
                ) : (
                  <Image
                    style={styles.profile}
                    source={require("../assets/no-photo.png")}
                  />
                )}
                <View style={{ marginLeft: 6 }}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ fontSize: 16, fontWeight: 500 }}>
                      {item.shopName}
                    </Text>
                    <MaterialIcons
                      name={
                        showDetails === i
                          ? "keyboard-arrow-up"
                          : "keyboard-arrow-down"
                      }
                      size={24}
                      color={color.darkGray}
                    />
                  </View>
                  <Text>{item.phone}</Text>
                  <Text>{item.address}</Text>
                </View>
              </Pressable>
              <Pressable
                onLongPress={() => setShowDeleteBtn(i)}
                onPress={() => setShowDeleteBtn(-1)}
              >
                <Text>
                  Bill no: <BDT amount={item.billno} bdtSign={false} />
                </Text>
                <Text>
                  Toal sale: <BDT amount={item.totalSale} />
                </Text>
              </Pressable>
              <View>
                <Text style={{ color: color.orange }}>{item.status}</Text>
                <Text style={{ fontSize: 13 }}>{item.time}</Text>
              </View>
            </View>

            {/* delete btn */}
            {showDeleteBtn && (store.user.designation === "Admin") === i ? (
              <View style={style.deleteBtn}>
                <Button
                  onPress={() => removeOrder(item.id)}
                  style={{ backgroundColor: color.orange }}
                  title='Delete'
                />
              </View>
            ) : null}

            {showDetails === i && (
              <>
                <View style={style.detailsContainer}>
                  {item.products.length ? (
                    <>
                      <View key={item.id} style={style.detailsTableHeader}>
                        <Text style={{ fontWeight: 500, width: "40%" }}>
                          Name
                        </Text>
                        <Text style={tableheaderStyle}>Qty</Text>
                        <Text style={tableheaderStyle}>Price</Text>
                        <Text style={tableheaderStyle}>Total</Text>
                      </View>
                      {item.products.map((item) => (
                        <View key={item.id} style={style.detailsItem}>
                          <Text style={{ width: "40%" }}>{item.name}</Text>
                          <Text style={tablerowStyle}>{item.qty}</Text>
                          <Text style={tablerowStyle}>
                            {item.isFree === "false" ? item.price : "Free"}
                          </Text>
                          <BDT style={tablerowStyle} amount={item.total} />
                        </View>
                      ))}
                    </>
                  ) : (
                    <Text style={{ textAlign: "center" }}>No product</Text>
                  )}

                  <View style={style.bottomContainer}>
                    <View style={style.bottomItem}>
                      <View style={style.totalWrapper}>
                        <Text style={style.totalText}>Total:</Text>
                        <BDT amount={item.totalSale} />
                      </View>
                      <View>
                        <Button
                          onPress={() =>
                            navigation.navigate("completeOrder", item)
                          }
                          style={{ marginTop: 4 }}
                          title='Complete'
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </>
            )}
          </View>
        )}
      />
    </Common>
  );
};

export default Notifications;
