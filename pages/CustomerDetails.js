import React, { useEffect, useState } from "react";
import { Image, Text, View, FlatList, Pressable } from "react-native";
import { Common } from "../App";
import BDT from "../components/utilitise/BDT";
import { color } from "../components/utilitise/colors";
import { orderdata } from "../data";
import { styles } from "../css/customer";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import Button from "../components/utilitise/Button";
import { Fetch, serverUrl } from "../services/common";
import useStore from "../context/useStore";
import { alert } from "../components/utilitise/Alert";

const CustomerDetails = ({ route, navigation }) => {
  const [data, setData] = useState(route.params.data);
  const store = useStore();

  useEffect(() => {
    (async () => {
      if (route.params.normal) {
        route.params.normal = false;
        return;
      }
      try {
        store.setLoading(true);
        const customers = await Fetch(
          `/customer?id=${route.params.data.id}`,
          "GET"
        );
        setData(customers[0]);
        store.setLoading(false);
      } catch (error) {
        store.setLoading(false);
        store.setMessage({ msg: error.message, type: "error" });
      }
    })();
  }, [store.updateCustomer]);

  function removeCustomer() {
    alert("Are you sure to delete?", async () => {
      try {
        store.setLoading(true);
        const { message } = await Fetch(
          `/customer?id=${data.id}&profile=${data.profile}`,
          "DELETE"
        );
        store.setMessage({ msg: message, type: "success" });
        store.setUpdateCustomer((prev) => !prev);
        navigation.navigate("customer");
        store.setLoading(false);
      } catch (error) {
        store.setLoading(false);
        store.setMessage({ msg: error.message, type: "error" });
      }
    });
  }

  return (
    <Common>
      <View style={{ marginBottom: 75 }}>
        <FlatList
          data={orderdata}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.detailsContentContainer}
          ListHeaderComponent={() => (
            <>
              <View style={styles.customerProfile}>
                {data.profile ? (
                  <Image
                    source={{ uri: serverUrl + data.profile }}
                    alt=''
                    style={{ width: 50, height: 50, borderRadius: 50 }}
                  />
                ) : (
                  <Image
                    source={require("../assets/no-photo.png")}
                    alt=''
                    style={{ width: 50, height: 50, borderRadius: 50 }}
                  />
                )}
                <View>
                  <View style={styles.nameWrapper}>
                    <Text style={styles.shopName}>{data.shopName}</Text>
                    <Pressable
                      onPress={() =>
                        navigation.navigate("addshop", {
                          edit: true,
                          data,
                        })
                      }
                    >
                      <Feather name='edit' size={18} color={color.darkGray} />
                    </Pressable>
                  </View>

                  <Text style={styles.address}>{data.address}</Text>
                  <Text style={{ textAlign: "center", marginBottom: 8 }}>
                    {data.phone}
                  </Text>
                  <Button
                    onPress={removeCustomer}
                    style={{ backgroundColor: "#db5c25", paddingVertical: 3 }}
                    title='Remove'
                  />
                </View>
              </View>
              <View style={styles.amountContainer}>
                <Amount
                  name='Total Sale'
                  colors={color.green}
                  amount={data.totalSale}
                />
                <Amount
                  name='Due Sale'
                  colors={color.orange}
                  amount={data.dueSale}
                />
                <Amount
                  name='Due Collection'
                  colors={color.green}
                  amount={data.collection}
                />
                <Amount name='Due' colors={color.orange} amount={data.due} />
              </View>
            </>
          )}
          ItemSeparatorComponent={() => <View style={styles.itemSeperator} />}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => navigation.navigate("orderDetails", item)}
              style={{ ...styles.itemContainer, ...styles.container }}
            >
              <View>
                <View style={{ marginLeft: 6 }}>
                  <Text style={{ fontSize: 16, fontWeight: 500 }}>
                    {item.shopInfo.shopName}
                  </Text>
                  <Text style={{ color: color.darkGray }}>
                    {item.shopInfo.address}
                  </Text>
                  <Text style={styles.date}>{item.date}</Text>
                </View>
              </View>
              <View>
                <View style={{ flexDirection: "row" }}>
                  <Text>Bill no: </Text>
                  <Text style={{ fontWeight: 500 }}>{item.billno}</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text>Sale: </Text>
                  <BDT amount={item.totalSale} />
                </View>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={{
                    ...styles.sign,
                    backgroundColor: item.due ? "#dc2626" : "#22c55e",
                  }}
                />
                <MaterialIcons
                  style={{ color: color.darkGray }}
                  name='keyboard-arrow-right'
                  size={20}
                  color='black'
                />
              </View>
            </Pressable>
          )}
        />
      </View>
    </Common>
  );
};

export default CustomerDetails;

function Amount({ name, amount, colors }) {
  if (!amount) return null;
  return (
    <View style={{ ...styles.amountWrapper, backgroundColor: colors }}>
      <Text style={styles.amountName}>{name}</Text>
      <BDT style={styles.amount} amount={amount} />
    </View>
  );
}
