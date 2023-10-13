import React, { useEffect, useState } from "react";
import { Dimensions, Image, Text, View } from "react-native";
import { styles } from "../css/customer";
import { MaterialIcons } from "@expo/vector-icons";
import { Common } from "../App";
import SearchFilter from "../components/SearchFilter";
import { color } from "../components/utilitise/colors";
import { Pressable } from "react-native";
import useStore from "../context/useStore";
import { Fetch, dateFormatter, serverUrl } from "../services/common";
import BDT from "../components/utilitise/BDT";
import { IOScrollView, InView } from "react-native-intersection-observer";

const Orders = ({ navigation }) => {
  const [orders, setOrders] = useState(null);
  const store = useStore();
  const height = Dimensions.get("window").height;
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (page > 0 && orders?.count !== orders?.data?.length) {
      fetData(`/order?page=${page}`, true);
    }
    return () => store.setLoading(false);
  }, [page]);

  useEffect(() => {
    fetData(`/order`, false);
    return () => store.setLoading(false);
  }, [store.updateOrder]);

  async function fetData(url, page) {
    try {
      store.setLoading(true);
      const data = await Fetch(url, "GET");
      if (page) {
        setOrders({ count: data.count, data: [...orders.data, ...data.data] });
      } else {
        setOrders(data);
      }
    } catch (error) {
      store.setMessage({ msg: error.message, type: "error" });
    } finally {
      store.setLoading(false);
    }
  }

  return (
    <Common>
      <IOScrollView style={{ marginBottom: height - height * 0.93 }}>
        <SearchFilter url='/order' setData={setOrders} />
        {orders?.data?.length ? (
          orders.data.map((item, i, arr) => (
            <InView
              key={item.id}
              onChange={() =>
                i === arr.length - 1 ? setPage((prev) => prev + 1) : null
              }
            >
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
                    <Text style={{ color: color.darkGray }}>
                      {item.address}
                    </Text>
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
                    Due:{" "}
                    <BDT style={{ color: color.orange }} amount={item.due} />
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
            </InView>
          ))
        ) : (
          <Text style={{ textAlign: "center" }}>No order</Text>
        )}
      </IOScrollView>
    </Common>
  );
};

export default Orders;
