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
import { users } from "../data";
import { styles } from "../css/manageProduct";
import Drawar from "../components/Drawar";
import SubMenu from "../components/footer/SubMenu";

const ManageUsers = ({ navigation }) => {
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
              onPress={() => navigation.navigate("addUser")}
              name='ios-add-circle-sharp'
              size={24}
              color='#fff'
            />
          }
        />
      </View>

      <FlatList
        data={users}
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
                <Text style={{ fontSize: 16, fontWeight: 500 }}>
                  {item.name}
                </Text>
                <Text style={{ color: color.darkGray, fontWeight: 500 }}>
                  {item.designation}
                </Text>
                <Text style={{ color: color.darkGray }}>{item.phone}</Text>
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
            navigation.navigate("addUser", { edit: true, data: showForm })
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
          url='profile'
          bgColor='#d7e5f5'
          showModal={setShowFrom}
          icon={<Octicons name='report' size={16} color='#3b83db' />}
        />
      </Drawar>
    </Common>
  );
};

export default ManageUsers;
