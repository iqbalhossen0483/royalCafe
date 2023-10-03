import React, { useEffect, useState } from "react";
import { Dimensions, Image, Pressable, Text, View } from "react-native";
import { styles } from "../css/customer";
import { MaterialIcons } from "@expo/vector-icons";
import { Common } from "../App";
import SearchFilter from "../components/SearchFilter";
import { color } from "../components/utilitise/colors";
import BDT from "../components/utilitise/BDT";
import { Fetch, dateFormatter, serverUrl } from "../services/common";
import useStore from "../context/useStore";
import { IOScrollView, InView } from "react-native-intersection-observer";

const Customers = ({ navigation }) => {
  const [customers, setCustomers] = useState(null);
  const store = useStore();
  const height = Dimensions.get("window").height;
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (page > 0 && customers?.count !== customers?.data?.length) {
      fetchData(`/customer?page=${page}`, true);
    }
  }, [page]);

  useEffect(() => {
    fetchData("/customer", false);
  }, [store.updateCustomer]);

  async function fetchData(url, page) {
    try {
      store.setLoading(true);
      const data = await Fetch(url, "GET");
      if (page) {
        setCustomers({
          count: data.count,
          data: [...customers.data, ...data.data],
        });
      } else {
        setCustomers(data);
      }
    } catch (error) {
      store.setMessage({ msg: error.message, type: "error" });
    } finally {
      store.setLoading(false);
    }
  }

  return (
    <Common>
      <IOScrollView style={{ marginBottom: height - height * 0.79 }}>
        <SearchFilter url='/customer' setData={setCustomers} filter={false} />
        {customers?.data?.length ? (
          customers.data.map((item, i, arr) => (
            <InView
              key={item.id}
              onChange={() =>
                i === arr.length - 1 ? setPage((prev) => prev + 1) : null
              }
            >
              <Pressable
                onPress={() =>
                  navigation.navigate("customerDetails", { id: item.id })
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
                      alt=''
                    />
                  ) : (
                    <Image
                      style={styles.profile}
                      source={require("../assets/no-photo.png")}
                      alt=''
                    />
                  )}
                  <View
                    style={{ marginLeft: 6, flexDirection: "row", gap: 10 }}
                  >
                    <View>
                      <Text style={{ fontSize: 16, fontWeight: 500 }}>
                        {item.shopName}
                      </Text>
                      <Text style={{ color: color.darkGray }}>
                        {item.address}
                      </Text>
                      <Text style={{ color: color.darkGray }}>
                        {item.phone}
                      </Text>
                    </View>

                    <View>
                      {item.lastOrder ? (
                        <Text style={{ color: color.darkGray }}>
                          Last Order: {dateFormatter(item.lastOrder)}
                        </Text>
                      ) : null}
                      <Text>Added By: {item.added_by_name}</Text>
                      {item.due ? (
                        <Text style={{ fontWeight: 500, color: color.orange }}>
                          Due: <BDT amount={item.due} />
                        </Text>
                      ) : null}
                    </View>
                  </View>
                </View>

                <View>
                  <MaterialIcons
                    style={{ color: color.darkGray }}
                    name='keyboard-arrow-right'
                    size={24}
                    color='black'
                  />
                </View>
              </Pressable>
            </InView>
          ))
        ) : (
          <Text style={{ textAlign: "center" }}>No Customer</Text>
        )}
      </IOScrollView>
    </Common>
  );
};

export default Customers;
