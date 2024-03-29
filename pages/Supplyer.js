import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Image, Pressable, View } from "react-native";
import { IOScrollView, InView } from "react-native-intersection-observer";

import { Common } from "../components/Common";
import BDT from "../components/utilitise/BDT";
import P from "../components/utilitise/P";
import { color } from "../components/utilitise/colors";
import useStore from "../context/useStore";
import { styles } from "../css/profile";
import {
  Fetch,
  dateFormatter,
  openNumber,
  serverUrl,
} from "../services/common";

const Supplyer = ({ route, navigation }) => {
  const [data, setData] = useState(null);
  const store = useStore();
  const id = route.params.id;
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (page > 0) {
      fetchData(`/supplier?id=${id}&page=${page}`, true);
    }
  }, [page]);

  useEffect(() => {
    fetchData(`/supplier?id=${id}`, false);
  }, [id]);

  async function fetchData(url, page) {
    try {
      store.setLoading(true);
      const data = await Fetch(url, "GET");
      if (page) {
        setData((prev) => {
          prev.orders = [...prev.orders, data?.data.orders];
          return { ...prev };
        });
      } else {
        setData(data);
      }
      store.setLoading(false);
    } catch (error) {
      store.setLoading(false);
      store.setMessage({ msg: error.message, type: "error" });
    }
  }

  if (!data?.data) return null;
  return (
    <Common>
      <IOScrollView style={{ ...styles.container, marginBottom: 57 }}>
        <View style={styles.profileContainer}>
          <View style={styles.profileWrapper}>
            <Image
              style={styles.profile}
              source={{ uri: serverUrl + data.data.profile }}
            />
            <View>
              <P size={15} bold={500}>
                {data.data.name}
              </P>
              <P size={13}>{data.data.address}</P>
              <Pressable onPress={() => openNumber(data.data.phone)}>
                <P style={styles.phone}>{data.data.phone}</P>
              </Pressable>
            </View>
          </View>

          <View style={{ marginTop: 15 }}>
            <P style={{ color: "#1b39bf" }}>
              Total Purchased: <BDT amount={data.data.totalPurchased} />
            </P>
            <P color='green'>
              Amount Given: <BDT amount={data.data.giveAmount} />
            </P>
            <P color='orange'>
              Debt Amount: <BDT amount={data.data.debtAmount} />
            </P>
            <P color='green'>
              Got Discount: <BDT amount={data.data.discount} />
            </P>
          </View>
        </View>
        {data.data.orders?.length ? (
          data.data.orders.map((item, i, arr) => (
            <InView
              key={item.id}
              onChange={() => {
                if (data?.count !== data?.data?.orders?.length) {
                  i === arr.length - 1 ? setPage((prev) => prev + 1) : null;
                }
              }}
            >
              <Pressable
                onPress={() =>
                  navigation.navigate("purchasedDetails", { id: item.id })
                }
                style={styles.orderContainer}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <View style={{ marginLeft: 6 }}>
                      <P>
                        <P bold={500}> Purchased By:</P> {item.name}
                      </P>
                      <P>
                        <P bold={500}>Total Purchase:</P>{" "}
                        <BDT amount={item.total_amount} />
                      </P>
                    </View>
                  </View>
                  <View>
                    <P>
                      <P bold={500}>Payment:</P>
                      <BDT amount={item.payment} />
                    </P>
                    <P>
                      <P bold={500}>Due:</P> <BDT amount={item.due} />
                    </P>
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
                </View>
                <P size={13} style={{ marginLeft: 7 }}>
                  {dateFormatter(item.date)}
                </P>
              </Pressable>
            </InView>
          ))
        ) : (
          <P align='center'>No Orders</P>
        )}
      </IOScrollView>
    </Common>
  );
};

export default Supplyer;
