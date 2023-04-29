import React, { useEffect, useState } from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";
import { styles } from "../css/customer";
import { MaterialIcons } from "@expo/vector-icons";
import { Common } from "../App";
import SearchFilter from "../components/SearchFilter";
import { color } from "../components/utilitise/colors";
import BDT from "../components/utilitise/BDT";
import { Fetch, serverUrl } from "../services/common";
import useStore from "../context/useStore";

const Customers = ({ navigation, route }) => {
  const [customers, setCustomers] = useState(null);
  const store = useStore();

  useEffect(() => {
    (async () => {
      try {
        store.setLoading(true);
        const customers = await Fetch("/customer", "GET");
        setCustomers(customers);
        store.setLoading(false);
      } catch (error) {
        store.setLoading(false);
        store.setMessage({ msg: error.message, type: "error" });
      }
    })();
  }, [store.updateCustomer]);

  return (
    <Common>
      <View style={{ paddingBottom: 130 }}>
        <FlatList
          data={customers}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={() => <SearchFilter />}
          renderItem={({ item }) => (
            <Pressable
              onPress={() =>
                navigation.navigate("customerDetails", {
                  data: item,
                  normal: true,
                })
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
                <View style={{ marginLeft: 6 }}>
                  <Text style={{ fontSize: 16, fontWeight: 500 }}>
                    {item.shopName}
                  </Text>
                  <Text style={{ color: color.darkGray }}>{item.address}</Text>
                  <Text style={{ color: color.darkGray }}>
                    Last Order: {item.lastOrder}
                  </Text>
                  <Text style={{ color: color.darkGray }}>{item.phone}</Text>
                  {item.due ? (
                    <Text style={{ fontWeight: 500, color: color.orange }}>
                      Due: <BDT amount={item.due} />
                    </Text>
                  ) : null}
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
          )}
        />
      </View>
    </Common>
  );
};

export default Customers;
