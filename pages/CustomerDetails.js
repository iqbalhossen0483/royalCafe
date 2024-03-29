import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Image, Pressable, View } from "react-native";
import { IOScrollView, InView } from "react-native-intersection-observer";

import { Common } from "../components/Common";
import { alert } from "../components/utilitise/Alert";
import BDT from "../components/utilitise/BDT";
import { LoadingOnComponent } from "../components/utilitise/Loading";
import P from "../components/utilitise/P";
import { color } from "../components/utilitise/colors";
import useStore from "../context/useStore";
import { styles } from "../css/customer";
import {
  Fetch,
  dateFormatter,
  openNumber,
  serverUrl,
} from "../services/common";

const CustomerDetails = ({ route, navigation }) => {
  const [customers, setCustomers] = useState(null);
  const store = useStore();
  const shopData = { ...customers?.data };
  delete shopData?.orders;

  const [page, setPage] = useState(0);

  useEffect(() => {
    if (page > 0) {
      fetchData(`/customer?id=${route.params.id}&page=${page}`, true);
    }
  }, [page]);

  useEffect(() => {
    fetchData(`/customer?id=${route.params.id}`, false);
  }, [store.updateCustomer]);

  async function fetchData(url, page) {
    try {
      store.setLoading(true);
      const data = await Fetch(url, "GET");
      if (page) {
        setCustomers((prev) => {
          prev.count = data.count;
          prev.data.orders = [...prev.data.orders, ...data.data.orders];
          return { ...prev };
        });
      } else {
        setCustomers(data);
      }
      store.setLoading(false);
    } catch (error) {
      console.log(error);
      store.setLoading(false);
      store.setMessage({ msg: error.message, type: "error" });
    }
  }

  async function deleteCustomer(id) {
    alert("Are you sure you want to delete?", async () => {
      try {
        store.setLoading(true);
        const result = await Fetch(`/customer?id=${id}`, "DELETE");
        store.setMessage({ msg: result.message, type: "success" });
        store.setUpdateCustomer((prev) => !prev);
        navigation.goBack();
      } catch (error) {
        store.setMessage({ msg: error.message, type: "error" });
      } finally {
        store.setLoading(false);
      }
    });
  }

  if (!customers?.data?.id) return <LoadingOnComponent />;
  return (
    <Common>
      <IOScrollView style={{ marginBottom: 57 }}>
        <View style={styles.detailsContentContainer}>
          <View style={styles.customerProfile}>
            {customers.data.profile ? (
              <Image
                source={{ uri: serverUrl + customers.data.profile }}
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
                <P align='center' size={18} bold={500}>
                  {customers.data.shopName}
                </P>
                <Pressable
                  style={{ height: 20, width: 27 }}
                  onPress={() =>
                    navigation.navigate("addshop", {
                      edit: true,
                      data: shopData,
                    })
                  }
                >
                  <Feather name='edit' size={18} color={color.darkGray} />
                </Pressable>
                {store.user.designation === "Admin" ? (
                  <Pressable
                    disabled={store.loading}
                    style={{ height: 20, width: 27 }}
                    onPress={() => deleteCustomer(customers.data.id)}
                  >
                    <AntDesign name='delete' size={18} color={color.darkGray} />
                  </Pressable>
                ) : null}
              </View>

              <P color='darkGray' align='center'>
                {customers.data.address}
              </P>
              <Pressable onPress={() => openNumber(customers.data.phone)}>
                <P align='center' color='green'>
                  {customers.data.phone}
                </P>
              </Pressable>
            </View>
            <View
              style={{
                flexDirection: "row",
                columnGap: 10,
                flexWrap: "wrap",
              }}
            >
              <P>
                <P bold={500}>Model:</P> {customers.data.machine_model || "N/A"}
                ,
              </P>
              <P>
                <P bold={500}>Type:</P> {customers.data.machine_type || "N/A"},
              </P>
              <P>
                <P bold={500}>Product info:</P>{" "}
                {customers.data.product_info || "N/A"},
              </P>
            </View>
          </View>
          <View style={styles.amountContainer}>
            <Amount
              name='Total Sale'
              colors={color.green}
              amount={customers.data.totalSale}
            />
            <Amount
              name='Due Sale'
              colors={color.orange}
              amount={customers.data.dueSale}
            />
            <Amount
              name='Due Collection'
              colors={color.green}
              amount={customers.data.collection}
            />
            <Amount
              name='Due'
              colors={color.orange}
              amount={customers.data.due}
            />
          </View>

          {customers.data.orders?.length ? (
            customers.data.orders.map((item, i, arr) => (
              <InView
                key={item.id}
                onChange={() => {
                  if (customers?.count !== customers?.data?.orders?.length) {
                    i === arr.length - 1 ? setPage((prev) => prev + 1) : null;
                  }
                }}
              >
                <Pressable
                  onPress={() => navigation.navigate("orderDetails", item)}
                  style={{ ...styles.itemContainer, ...styles.container }}
                >
                  <View>
                    <View style={{ marginLeft: 6 }}>
                      <P bold={500} size={15}>
                        {item.shopName}
                      </P>
                      <P color='darkGray'>{item.address}</P>
                      <P color='darkGray' size={13}>
                        {dateFormatter(item.date)}
                      </P>
                    </View>
                  </View>
                  <View>
                    <View style={{ flexDirection: "row" }}>
                      <P>Bill no: </P>
                      <P bold={500}>{item.billno}</P>
                    </View>
                    <P>
                      Sale: <BDT amount={item.totalSale} />
                    </P>
                    <P>
                      Due:{" "}
                      <BDT style={{ color: color.orange }} amount={item.due} />
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
                </Pressable>
              </InView>
            ))
          ) : (
            <P align='center'>No Orders</P>
          )}
        </View>
      </IOScrollView>
    </Common>
  );
};

export default CustomerDetails;

function Amount({ name, amount, colors }) {
  return (
    <View style={{ ...styles.amountWrapper, backgroundColor: colors }}>
      <P bold={500} align='center' color='light'>
        {name}
      </P>
      <BDT style={styles.amount} amount={amount} />
    </View>
  );
}
