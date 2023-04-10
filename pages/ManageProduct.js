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
import { alert } from "../components/utilitise/Alert";
import { products } from "../data";
import { styles } from "../css/manageProduct";
import Drawar from "../components/Drawar";
import SubMenu from "../components/footer/SubMenu";

const ManageProduct = ({ navigation }) => {
  const [showForm, setShowFrom] = useState(null);

  function removeProduct(id) {
    alert("Are you sure to remove?", () => {
      console.log(id);
    });
  }

  return (
    <Common>
      <View style={styles.addBtn}>
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
        contentContainerStyle={styles.contentContainer}
        ItemSeparatorComponent={() => <View style={{ marginBottom: 6 }} />}
        renderItem={({ item }) => (
          <Pressable
            style={styles.itemContainer}
            onPress={() => setShowFrom(item)}
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
                <Text>Stock: {item.stock}/-</Text>
                <Text>Total Sold: {item.totalSold}/-</Text>
              </View>
            </View>
          </Pressable>
        )}
      />
      <Drawar
        setShowModal={setShowFrom}
        show={showForm ? true : false}
        bottom={300}
      >
        <SubMenu
          name='Edit'
          navigate={false}
          onPress={() =>
            navigation.navigate("addProduct", { edit: true, data: showForm })
          }
          bgColor='#f7d5f6'
          showModal={setShowFrom}
          icon={<Feather name='edit' size={16} color='#d638d2' />}
        />
        <SubMenu
          name='Remove'
          bgColor={color.lightOrange}
          navigate={false}
          showModal={setShowFrom}
          onPress={() => removeProduct(showForm.id)}
          icon={
            <MaterialCommunityIcons
              name='archive-remove'
              size={18}
              color={color.orange}
            />
          }
        />

        <SubMenu
          name='Report'
          navigate={false}
          onPress={() => navigation.navigate("report", showForm)}
          bgColor='#d7e5f5'
          showModal={setShowFrom}
          icon={<Octicons name='report' size={16} color='#3b83db' />}
        />
      </Drawar>
    </Common>
  );
};

export default ManageProduct;
