import React, { useEffect, useState } from "react";
import { Image, Text, View, Pressable, Dimensions } from "react-native";
import { Common } from "../App";
import BDT from "../components/utilitise/BDT";
import { color } from "../components/utilitise/colors";
import { styles } from "../css/customer";
import { MaterialIcons, Feather, AntDesign } from "@expo/vector-icons";
import { Fetch, dateFormatter, serverUrl } from "../services/common";
import useStore from "../context/useStore";
import { alert } from "../components/utilitise/Alert";
import { LoadingOnComponent } from "../components/utilitise/Loading";
import { IOScrollView, InView } from "react-native-intersection-observer";

const CustomerDetails = ({ route, navigation }) => {
  const [customers, setCustomers] = useState(null);
  const store = useStore();
  const shopData = { ...customers };
  delete shopData?.orders;
  const height = Dimensions.get("window").height;
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (page > 0 && customers?.count !== customers?.data?.orders?.length) {
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
          prev.orders = [...prev.orders, data?.data.orders];
          return { ...prev };
        });
      } else {
        setCustomers(data);
      }
      store.setLoading(false);
    } catch (error) {
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
      <IOScrollView style={{ marginBottom: height - height * 0.93 }}>
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
                <Text style={styles.shopName}>{customers.data.shopName}</Text>
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
                    style={{ height: 20, width: 27 }}
                    onPress={() => deleteCustomer(customers.data.id)}
                  >
                    <AntDesign name='delete' size={18} color={color.darkGray} />
                  </Pressable>
                ) : null}
              </View>

              <Text style={styles.address}>{customers.data.address}</Text>
              <Text style={{ textAlign: "center", marginBottom: 8 }}>
                {customers.data.phone}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                columnGap: 10,
              }}
            >
              <Text>
                <Text style={{ fontWeight: 500 }}>Model:</Text>{" "}
                {customers.data.machine_model || "N/A"},
              </Text>
              <Text>
                <Text style={{ fontWeight: 500 }}>Type:</Text>{" "}
                {customers.data.machine_type || "N/A"},
              </Text>
              <Text>
                <Text style={{ fontWeight: 500 }}>Product info:</Text>{" "}
                {customers.data.product_info || "N/A"},
              </Text>
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
                onChange={() =>
                  i === arr.length - 1 ? setPage((prev) => prev + 1) : null
                }
              >
                <Pressable
                  onPress={() => navigation.navigate("orderDetails", item)}
                  style={{ ...styles.itemContainer, ...styles.container }}
                >
                  <View>
                    <View style={{ marginLeft: 6 }}>
                      <Text style={{ fontSize: 16, fontWeight: 500 }}>
                        {item.shopName}
                      </Text>
                      <Text style={{ color: color.darkGray }}>
                        {item.address}
                      </Text>
                      <Text style={styles.date}>
                        {dateFormatter(item.date)}
                      </Text>
                    </View>
                  </View>
                  <View>
                    <View style={{ flexDirection: "row" }}>
                      <Text>Bill no: </Text>
                      <Text style={{ fontWeight: 500 }}>{item.billno}</Text>
                    </View>
                    <Text>
                      Sale: <BDT amount={item.totalSale} />
                    </Text>
                    <Text>
                      Due:{" "}
                      <BDT style={{ color: color.orange }} amount={item.due} />
                    </Text>
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
            <Text style={{ textAlign: "center" }}>No Orders</Text>
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
      <Text style={styles.amountName}>{name}</Text>
      <BDT style={styles.amount} amount={amount} />
    </View>
  );
}
