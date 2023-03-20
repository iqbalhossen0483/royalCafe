import React from "react";
import { FlatList, Image, Text, View } from "react-native";
import { styles } from "../css/customer";
import { MaterialIcons } from "@expo/vector-icons";
import { orderdata } from "../data";
import { Common } from "../App";
import SearchFilter from "../components/SearchFilter";

const Orders = ({ navigation }) => {
  return (
    <Common>
      <View style={{ paddingBottom: 55 }}>
        <FlatList
          data={orderdata}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={() => <SearchFilter />}
          renderItem={({ item }) => (
            <View
              style={{
                ...styles.container,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  style={styles.profile}
                  source={require("../assets/no-photo.png")}
                />
                <View style={{ marginLeft: 6 }}>
                  <Text style={{ fontSize: 16, fontWeight: 500 }}>
                    {item.shopName}
                  </Text>
                  <Text>{item.address}</Text>
                  <Text style={{ fontSize: 13, marginTop: 3 }}>
                    {item.date}
                  </Text>
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

export default Orders;
