import React from "react";
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { styles } from "../css/customer";
import { MaterialIcons } from "@expo/vector-icons";
import { Common } from "../App";
import { customerData } from "../data";
import SearchFilter from "../components/SearchFilter";

const Customers = ({ navigation }) => {
  const data = customerData;

  return (
    <Common>
      <View style={{ paddingBottom: 55 }}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={() => <SearchFilter />}
          renderItem={({ item }) => (
            <ScrollView>
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
                      {item.phone}
                    </Text>
                  </View>
                </View>
                <Pressable
                  onPress={() => navigation.navigate("customerDetails", item)}
                >
                  <MaterialIcons
                    name='keyboard-arrow-right'
                    size={24}
                    color='black'
                  />
                </Pressable>
              </View>
            </ScrollView>
          )}
        />
      </View>
    </Common>
  );
};

export default Customers;
