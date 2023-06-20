import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, View } from "react-native";
import { styles } from "../css/customer";
import { MaterialIcons } from "@expo/vector-icons";
import { Common } from "../App";
import SearchFilter from "../components/SearchFilter";
import { color } from "../components/utilitise/colors";
import { Pressable } from "react-native";
import useStore from "../context/useStore";
import { Fetch, dateFormatter, serverUrl } from "../services/common";
import BDT from "../components/utilitise/BDT";

const Orders = ({ navigation }) => {
  const [orders, setOrders] = useState(null);
  const store = useStore();

  useEffect(() => {
    (async () => {
      try {
        store.setLoading(true);
        const orders = await Fetch("/order", "GET");
        setOrders(orders);
      } catch (error) {
        store.setMessage({ msg: error.message, type: "error" });
      } finally {
        store.setLoading(false);
      }
    })();
  }, [store.updateOrder]);

  return (
    <Common>
      <View style={{ paddingBottom: 75 }}>
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={() => <SearchFilter />}
          ListEmptyComponent={() => (
            <Text style={{ textAlign: "center" }}>No order</Text>
          )}
          renderItem={({ item }) => (
            <Pressable
              onPress={() =>
                navigation.navigate("orderDetails", { id: item.id })
              }
              style={{
                ...styles.container,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {item.profile ? (
                  <Image
                    style={styles.profile}
                    source={{ uri: serverUrl + item.profile }}
                  />
                ) : (
                  <Image
                    style={styles.profile}
                    source={require(`../assets/no-photo.png`)}
                  />
                )}
                <View style={{ marginLeft: 6 }}>
                  <Text style={{ fontSize: 16, fontWeight: 500 }}>
                    {item.shopName}
                  </Text>
                  <Text style={{ color: color.darkGray }}>{item.address}</Text>
                  <Text
                    style={{
                      fontSize: 13,
                      marginTop: 3,
                      color: color.darkGray,
                    }}
                  >
                    {dateFormatter(item.date)}
                  </Text>
                </View>
              </View>
              <View>
                <Text>
                  Bill no: <BDT amount={item.billno} bdtSign={false} />
                </Text>
                <Text>
                  Toal sale: <BDT amount={item.totalSale} />
                </Text>
                <Text>
                  Due: <BDT style={{ color: color.orange }} amount={item.due} />
                </Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {item.status === "delivered" ? (
                  <View
                    style={{
                      height: 8,
                      width: 8,
                      backgroundColor: item.due ? "#dc2626" : "#22c55e",
                      borderRadius: 50,
                      marginRight: -5,
                    }}
                  />
                ) : (
                  <Text style={{ color: color.orange }}>{item.status}</Text>
                )}
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

export default Orders;
