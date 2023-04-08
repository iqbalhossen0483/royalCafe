import React from "react";
import { Image, Text, View, FlatList, Pressable } from "react-native";
import { Common } from "../App";
import BDT from "../components/utilitise/BDT";
import { color } from "../components/utilitise/colors";
import { orderdata } from "../data";
import { styles } from "../css/customer";
import { MaterialIcons, Feather } from "@expo/vector-icons";

const CustomerDetails = ({ route, navigation }) => {
  const data = route.params;

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
                <Image
                  source={require("../assets/no-photo.png")}
                  alt=''
                  style={{ width: 50, height: 50, borderRadius: 50 }}
                />
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
                  <Text style={{ textAlign: "center" }}>{data.phone}</Text>
                </View>
              </View>
              <View style={styles.ammountContainer}>
                <Ammount
                  name='Total Sale'
                  colors={color.green}
                  ammount={88500}
                />
                <Ammount
                  name='Due Sale'
                  colors={color.orange}
                  ammount={88500}
                />
                <Ammount
                  name='Due Collection'
                  colors={color.green}
                  ammount={88500}
                />
                <Ammount name='Due' colors={color.orange} ammount={88500} />
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
                  <BDT ammount={item.totalSale} />
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

function Ammount({ name, ammount, colors }) {
  return (
    <View style={{ ...styles.ammountWrapper, backgroundColor: colors }}>
      <Text style={styles.ammountName}>{name}</Text>
      <BDT style={styles.ammount} ammount={ammount} />
    </View>
  );
}
