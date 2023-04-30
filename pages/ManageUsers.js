import React, { useEffect, useState } from "react";
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
import { styles } from "../css/manageProduct";
import Drawar from "../components/Drawar";
import SubMenu from "../components/footer/SubMenu";
import useStore from "../context/useStore";
import { Fetch, serverUrl } from "../services/common";

const ManageUsers = ({ navigation, route }) => {
  const [showForm, setShowFrom] = useState(null);
  const [users, setUsers] = useState(null);
  const store = useStore();

  useEffect(() => {
    (async () => {
      try {
        store.setLoading(true);
        if (route.params?.update) {
          route.params.update = false;
        }
        const users = await Fetch("/user", "GET");
        const rest = users.filter((item) => item.id !== store.user.id);
        setUsers(rest);
        store.setLoading(false);
      } catch (error) {
        store.setLoading(false);
        store.setMessage({ msg: error.message, type: "error" });
      }
    })();
  }, [store.updateUser]);

  function removeUser(id, profile) {
    alert("Are you sure to remove?", async () => {
      try {
        store.setLoading(true);
        const { message } = await Fetch(
          `/user?id=${id}&profile=${profile}`,
          "DELETE"
        );
        store.setLoading(false);
        store.setMessage({ msg: message, type: "success" });
        const rest = users.filter((user) => user.id !== id);
        setUsers(rest);
      } catch (error) {
        store.setLoading(false);
        store.setMessage({ msg: error.message, type: "error" });
      }
    });
  }

  return (
    <Common>
      <View style={styles.addBtn}>
        <Button
          onPress={() => navigation.navigate("addUser")}
          style={{ width: 40, height: 40, borderRadius: 100 }}
          title={
            <Ionicons name='ios-add-circle-sharp' size={24} color='#fff' />
          }
        />
      </View>

      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.contentContainer}
        ItemSeparatorComponent={() => <View style={{ marginBottom: 6 }} />}
        ListEmptyComponent={() => (
          <Text style={{ textAlign: "center" }}>No user</Text>
        )}
        renderItem={({ item }) => (
          <Pressable
            style={styles.itemContainer}
            onPress={() => setShowFrom(item)}
          >
            <View style={{ flexDirection: "row", gap: 7 }}>
              {item.profile ? (
                <Image
                  style={{ width: 40, height: 55, borderRadius: 5 }}
                  source={{ uri: serverUrl + item.profile }}
                  alt=''
                />
              ) : (
                <Image
                  style={{ width: 40, height: 55, borderRadius: 5 }}
                  source={require("../assets/no-photo.png")}
                  alt=''
                />
              )}
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
        setShowModal={() => setShowFrom(null)}
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
          onPress={() => removeUser(showForm.id, showForm.profile)}
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
          onPress={() =>
            navigation.navigate("profile", { data: showForm, edit: false })
          }
          bgColor='#d7e5f5'
          showModal={setShowFrom}
          icon={<Octicons name='report' size={16} color='#3b83db' />}
        />
      </Drawar>
    </Common>
  );
};

export default ManageUsers;
