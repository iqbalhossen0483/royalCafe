import React, { useEffect, useState } from "react";
import { Image, Text, View, FlatList, Pressable } from "react-native";
import { Common } from "../App";
import BDT from "../components/utilitise/BDT";
import { color } from "../components/utilitise/colors";
import { styles } from "../css/customer";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { Fetch, dateFormatter, serverUrl } from "../services/common";
import useStore from "../context/useStore";

const CustomerDetails = ({ route, navigation }) => {
  const [data, setData] = useState(null);
  const store = useStore();

  useEffect(() => {
    (async () => {
      try {
        store.setLoading(true);
        const customers = await Fetch(`/customer?id=${route.params.id}`, "GET");
        setData(customers);
        store.setLoading(false);
      } catch (error) {
        store.setLoading(false);
        store.setMessage({ msg: error.message, type: "error" });
      }
    })();
  }, [store.updateCustomer]);

  if (!data) return null;
  return (
    <Common>
      <View style={{ marginBottom: 75 }}>
        <FlatList
          data={data.orders}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.detailsContentContainer}
          ItemSeparatorComponent={() => <View style={styles.itemSeperator} />}
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
          renderItem={({ item }) => (
            <Pressable
              onPress={() => navigation.navigate("orderDetails", item)}
              style={{ ...styles.itemContainer, ...styles.container }}
            >
              <View>
                <View style={{ marginLeft: 6 }}>
                  <Text style={{ fontSize: 16, fontWeight: 500 }}>
                    {item.shopName}
                  </Text>
                  <Text style={{ color: color.darkGray }}>{item.address}</Text>
                  <Text style={styles.date}>{dateFormatter(item.date)}</Text>
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
                  Due: <BDT style={{ color: color.orange }} amount={item.due} />
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
          )}
        />
      </View>
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
