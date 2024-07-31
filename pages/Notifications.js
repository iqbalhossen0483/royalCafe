import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { FlatList, Image, Pressable, View } from "react-native";

import { Common } from "../components/Common";
import { alert } from "../components/utilitise/Alert";
import BDT from "../components/utilitise/BDT";
import Button from "../components/utilitise/Button";
import { color } from "../components/utilitise/colors";
import P from "../components/utilitise/P";
import useStore from "../context/useStore";
import { styles } from "../css/customer";
import { style } from "../css/notification";
import { Fetch, openNumber, serverUrl } from "../services/common";

const NotificationsPage = ({ navigation }) => {
  const [showDetails, setShowDetails] = useState(-1);
  const [showDeleteBtn, setShowDeleteBtn] = useState(-1);
  const [orders, setOrders] = useState(null);
  const store = useStore();

  useEffect(() => {
    (async () => {
      try {
        store.setLoading(true);
        const orders = await Fetch(
          store.database.name,
          "/order?notification=true",
          "GET"
        );
        setOrders(orders);
      } catch (error) {
        store.setMessage({ msg: error.message, type: "error" });
      } finally {
        store.setLoading(false);
      }
    })();

    return () => store.setLoading(false);
  }, [store.updateOrder]);

  function removeOrder(id) {
    alert("Are you sure to delete?", async () => {
      try {
        store.setLoading(true);
        const { message } = await Fetch(
          store.database.name,
          `/order?id=${id}`,
          "DELETE"
        );
        store.setMessage({ msg: message, type: "success" });
        setShowDeleteBtn(-1);
        if (!orders.length) store.setNotification((prev) => !prev);
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
        style={{ marginBottom: 57 }}
        data={orders}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 5 }}
        ListEmptyComponent={() => (
          <P align='center'>There is no pending order</P>
        )}
        renderItem={({ item, index: i }) => (
          <View style={styles.container}>
            <View style={style.constainer}>
              <Pressable
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
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
                    <P bold size={15}>
                      {item.shopName}
                    </P>
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
                  <View style={{ flexDirection: "row" }}>
                    <P size={13} style={{ flex: 1, flexWrap: "wrap" }}>
                      {item.address}
                    </P>
                  </View>
                  <Pressable
                    onPress={(e) => {
                      e.stopPropagation();
                      openNumber(item.phone);
                    }}
                  >
                    <P color='green' size={13}>
                      {item.phone}
                    </P>
                  </Pressable>
                </View>
              </Pressable>
              <Pressable
                onLongPress={() => setShowDeleteBtn(i)}
                onPress={() => setShowDeleteBtn(-1)}
              >
                <P>
                  Bill no: <BDT amount={item.billno} bdtSign={false} />
                </P>
                <P>
                  Toal sale: <BDT amount={item.totalSale} />
                </P>
                <P>Created By: {item.created_by?.split(" ")[0]}</P>
              </Pressable>
              <View>
                <View>
                  <P color='orange'>{item.status}</P>
                  <P size={13}>{item.time}</P>
                </View>
              </View>
            </View>

            {/* delete btn */}
            {showDeleteBtn === i && store.user.designation === "Admin" ? (
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
                        <P bold style={{ width: "40%" }}>
                          Name
                        </P>
                        <P style={tableheaderStyle}>Qty</P>
                        <P style={tableheaderStyle}>Price</P>
                        <P style={tableheaderStyle}>Total</P>
                      </View>
                      {item.products.map((item) => (
                        <View key={item.id} style={style.detailsItem}>
                          <P style={{ width: "40%" }}>{item.name}</P>
                          <P style={tablerowStyle}>{item.qty}</P>
                          <P style={tablerowStyle}>
                            {item.isFree === "false"
                              ? parseFloat(item.price)
                              : "Free"}
                          </P>
                          <BDT style={tablerowStyle} amount={item.total} />
                        </View>
                      ))}
                    </>
                  ) : (
                    <P align='center'>No product</P>
                  )}

                  <View style={style.bottomContainer}>
                    <View style={style.bottomItem}>
                      <View style={style.totalWrapper}>
                        <P bold>Total: </P>
                        <BDT amount={item.totalSale} />
                      </View>
                      <View>
                        <Button
                          onPress={() => {
                            setShowDetails(-1);
                            navigation.navigate("completeOrder", item);
                          }}
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

export default NotificationsPage;
