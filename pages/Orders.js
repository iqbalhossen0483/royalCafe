import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import { IOScrollView, InView } from "react-native-intersection-observer";

import { Common } from "../components/Common";
import SearchFilter from "../components/SearchFilter";
import Avater from "../components/utilitise/Avater";
import BDT from "../components/utilitise/BDT";
import P from "../components/utilitise/P";
import { color } from "../components/utilitise/colors";
import useStore from "../context/useStore";
import { styles } from "../css/customer";
import { Fetch, dateFormatter } from "../services/common";

const Orders = ({ navigation }) => {
  const [orders, setOrders] = useState(null);
  const [coll, setColl] = useState(false);
  const [myOrder, setMyOrder] = useState(false);
  const store = useStore();
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (page > 0) {
      if (myOrder) myOrders(page);
      else if (coll) myCollections(page);
      else fetData(`/order?page=${page}`, true);
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
      setColl(false);
      setMyOrder(false);
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

  async function myOrders(page = 0) {
    try {
      store.setLoading(true);
      setColl(false);
      const data = await Fetch(
        `/user/recentactivity?user_id=${store.user.id}&order=true`,
        "GET"
      );
      if (page > 0) {
        setOrders({ count: data.count, data: [...orders.data, ...data.data] });
      } else {
        setOrders(data);
      }
      setMyOrder(true);
    } catch (error) {
      store.setMessage({ msg: error.message, type: "error" });
    } finally {
      store.setLoading(false);
    }
  }
  async function myCollections(page = 0) {
    try {
      store.setLoading(true);
      setMyOrder(false);
      const data = await Fetch(
        `/user/recentactivity?user_id=${store.user.id}&coll=true`,
        "GET"
      );
      if (page > 0) {
        setOrders({ count: data.count, data: [...orders.data, ...data.data] });
      } else {
        setOrders(data);
      }
      setColl(true);
    } catch (error) {
      store.setMessage({ msg: error.message, type: "error" });
    } finally {
      store.setLoading(false);
    }
  }

  async function search(value, count = false) {
    try {
      store.setLoading(true);
      setMyOrder(false);
      setColl(false);
      setPage(0);
      const data = await Fetch(`/order?${value}`, "GET");
      if (count) setOrders(data);
      else setOrders({ count: data?.length, data });
    } catch (error) {
      store.setMessage({ msg: error.message, type: "error" });
    } finally {
      store.setLoading(false);
    }
  }

  async function seeAll() {
    setMyOrder(false);
    setColl(false);
    setPage(0);
    fetData(`/order`, false);
  }

  return (
    <Common>
      <IOScrollView style={{ marginBottom: 57 }}>
        <SearchFilter
          placeholder='Shop name Or nddress'
          orderPage={{ myOrders, myCollections, seeAll }}
          search={search}
        />
        {orders?.data?.length ? (
          orders.data.map((item, i, arr) => (
            <InView
              key={i}
              onChange={() => {
                if (orders?.count !== orders?.data?.length) {
                  i === arr.length - 1 ? setPage((prev) => prev + 1) : null;
                }
              }}
            >
              <Pressable
                style={styles.container}
                onPress={() =>
                  navigation.navigate("orderDetails", { id: item.id })
                }
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Avater url={item.profile} />

                    <View style={{ marginLeft: 6 }}>
                      <P size={15} bold={500}>
                        {item.shopName}
                      </P>
                      <P color='darkGray' size={13}>
                        {item.address}
                      </P>
                      <P size={12} color='darkGray'>
                        {dateFormatter(item.date)}
                      </P>
                    </View>
                  </View>
                  <View>
                    <P>
                      Bill no: <BDT amount={item.billno} bdtSign={false} />
                    </P>
                    <P>
                      Toal {coll ? "Amount" : "sale"}:{" "}
                      <BDT amount={item.totalSale} />
                    </P>
                    {coll ? (
                      <P>
                        Collection: <BDT amount={item.payment} />
                      </P>
                    ) : null}
                    <P>
                      Due:{" "}
                      <BDT style={{ color: color.orange }} amount={item.due} />
                    </P>
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
                      <P color='orange'>{item.status}</P>
                    )}
                    <MaterialIcons
                      style={{ color: color.darkGray }}
                      name='keyboard-arrow-right'
                      size={20}
                      color='black'
                    />
                  </View>
                </View>
                <P color='darkGray' size={13}>
                  {coll ? "Collected" : "Delivered"} By: {item.name}
                </P>
              </Pressable>
            </InView>
          ))
        ) : (
          <P align='center'>No order</P>
        )}
      </IOScrollView>
    </Common>
  );
};

export default Orders;
