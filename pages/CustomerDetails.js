import React from "react";
import { Image, Text, View, FlatList } from "react-native";
import { Common } from "../App";
import BDT from "../components/utilitise/BDT";
import { color } from "../components/utilitise/colors";
import { orderdata } from "../data";
import { styles } from "../css/customer";
import { MaterialIcons } from "@expo/vector-icons";

const CustomerDetails = ({ route, navigation }) => {
  const data = route.params;

  return (
    <Common>
      <View style={{ marginBottom: 60 }}>
        <FlatList
          data={orderdata}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            backgroundColor: "#fff",
            borderRadius: 5,
            paddingVertical: 20,
            paddingHorizontal: 10,
            marginVertical: 10,
          }}
          ListHeaderComponent={() => (
            <>
              <View
                style={{
                  alignItems: "center",
                  borderBottomColor: color.gray,
                  borderBottomWidth: 0.6,
                  paddingBottom: 9,
                }}
              >
                <Image
                  source={require("../assets/no-photo.png")}
                  alt=''
                  style={{ width: 50, height: 50, borderRadius: 50 }}
                />
                <View>
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 19,
                      fontWeight: 500,
                    }}
                  >
                    {data.shopName}
                  </Text>
                  <Text style={{ textAlign: "center", color: color.darkGray }}>
                    {data.address}
                  </Text>
                  <Text style={{ textAlign: "center" }}>{data.phone}</Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 10,
                  borderBottomColor: color.gray,
                  borderBottomWidth: 0.6,
                  paddingBottom: 13,
                }}
              >
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
          ItemSeparatorComponent={() => (
            <View
              style={{
                borderBottomColor: color.gray,
                borderBottomWidth: 0.9,
              }}
            />
          )}
          renderItem={({ item }) => (
            <View
              style={{
                ...styles.container,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View>
                <View style={{ marginLeft: 6 }}>
                  <Text style={{ fontSize: 16, fontWeight: 500 }}>
                    {item.shopName}
                    {item.id}
                  </Text>
                  <Text>{item.address}</Text>
                  <Text style={{ fontSize: 13, marginTop: 3 }}>
                    {item.date}
                  </Text>
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
                    height: 8,
                    width: 8,
                    backgroundColor: item.due ? "#dc2626" : "#22c55e",
                    borderRadius: 50,
                    marginRight: -7,
                  }}
                />
                <MaterialIcons
                  onTouchStart={() => navigation.navigate("orderDetails", item)}
                  name='keyboard-arrow-right'
                  size={24}
                  color='black'
                />
              </View>
            </View>
          )}
        />
      </View>
    </Common>
  );
};

export default CustomerDetails;

function Ammount({ name, ammount, colors }) {
  return (
    <View
      style={{
        backgroundColor: colors,
        paddingHorizontal: 8,
        paddingVertical: 5,
        borderRadius: 4,
      }}
    >
      <Text style={{ fontWeight: 500, textAlign: "center", color: "#fff" }}>
        {name}
      </Text>
      <BDT
        style={{ textAlign: "center", color: "#fff", marginTop: 5 }}
        ammount={ammount}
      />
    </View>
  );
}
