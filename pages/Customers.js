import React from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";
import { styles } from "../css/customer";
import { MaterialIcons } from "@expo/vector-icons";
import { Common } from "../App";
import { customerData } from "../data";
import SearchFilter from "../components/SearchFilter";
import { color } from "../components/utilitise/colors";

const Customers = ({ navigation }) => {
  return (
    <Common>
      <View style={{ paddingBottom: 75 }}>
        <FlatList
          data={customerData}
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
                  <Text style={{ color: color.darkGray }}>{item.address}</Text>
                  <Text
                    style={{
                      fontSize: 13,
                      marginTop: 3,
                      color: color.darkGray,
                    }}
                  >
                    {item.phone}
                  </Text>
                </View>
              </View>
              <Pressable
                onPress={() => navigation.navigate("customerDetails", item)}
              >
                <MaterialIcons
                  style={{ color: color.darkGray }}
                  name='keyboard-arrow-right'
                  size={24}
                  color='black'
                />
              </Pressable>
            </View>
          )}
        />
      </View>
    </Common>
  );
};

export default Customers;
