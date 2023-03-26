import React, { useState } from "react";
import { FlatList, Pressable } from "react-native";
import { Image } from "react-native";
import { Text, View } from "react-native";
import { Common } from "../App";
import Button from "../components/utilitise/Button";
import { color } from "../components/utilitise/colors";
import {
  Ionicons,
  Feather,
  MaterialCommunityIcons,
  Octicons,
} from "@expo/vector-icons";
import { commonStyles } from "../css/common";
import { alert } from "../components/utilitise/Alert";
import { products } from "../data";

const ManageProduct = ({ navigation }) => {
  const [showForm, setShowFrom] = useState(0);

  function removeProduct(id) {
    alert("Are you sure to remove?", () => {
      console.log(id);
    });
  }

  return (
    <Common>
      <View
        style={{
          position: "absolute",
          bottom: 70,
          right: 15,
          zIndex: 1,
        }}
      >
        <Button
          style={{ width: 40, height: 40, borderRadius: 100 }}
          title={
            <Ionicons
              onPress={() => navigation.navigate("addProduct")}
              name='ios-add-circle-sharp'
              size={24}
              color='#fff'
            />
          }
        />
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          backgroundColor: "#fff",
          marginVertical: 7,
          marginHorizontal: 10,
          padding: 10,
          borderRadius: 5,
        }}
        ItemSeparatorComponent={() => <View style={{ marginBottom: 6 }} />}
        renderItem={({ item }) => (
          <Pressable
            onLongPress={() =>
              setShowFrom((prev) => {
                if (prev === item.id) return 0;
                else return item.id;
              })
            }
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 7,
              backgroundColor: color.lightGray,
              borderRadius: 5,
              paddingHorizontal: 7,
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row", gap: 7 }}>
              <Image
                style={{ width: 40, height: 55, borderRadius: 5 }}
                source={require("../assets/no-photo.png")}
                alt=''
              />
              <View>
                <Text style={{ fontSize: 15, fontWeight: 500 }}>
                  {item.name}
                </Text>
                <Text>Stock: {item.stock}</Text>
                <Text>Total Sold: {item.totalSold}</Text>
              </View>
            </View>
          </Pressable>
        )}
      />
      {showForm ? (
        <View
          style={{
            gap: 12,
            position: "absolute",
            top: 100,
            right: 160,
            backgroundColor: "#fff",
            paddingBottom: 15,
            paddingTop: 40,
            paddingHorizontal: 25,
            borderRadius: 5,
          }}
        >
          <Pressable
            onPress={() => setShowFrom(0)}
            style={commonStyles.closeIconWrapper}
          >
            <Ionicons name='close' size={20} color={color.darkGray} />
          </Pressable>

          <Pressable
            onPress={() =>
              navigation.navigate("addProduct", {
                edit: true,
                productId: showForm,
              })
            }
            style={{ flexDirection: "row", gap: 3, alignItems: "center" }}
          >
            <Feather name='edit' size={16} color={color.darkGray} />
            <Text style={{ fontWeight: 500, color: color.darkGray }}>Edit</Text>
          </Pressable>
          <Pressable
            onPress={() => removeProduct(showForm)}
            style={{
              flexDirection: "row",
              gap: 3,
              marginLeft: -2,
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons
              name='archive-remove'
              size={18}
              color={color.darkGray}
            />
            <Text style={{ fontWeight: 500, color: color.darkGray }}>
              Remove
            </Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate("report")}
            style={{ flexDirection: "row", gap: 3, alignItems: "center" }}
          >
            <Octicons name='report' size={16} color={color.darkGray} />
            <Text style={{ fontWeight: 500, color: color.darkGray }}>
              Report
            </Text>
          </Pressable>
        </View>
      ) : null}
    </Common>
  );
};

export default ManageProduct;
