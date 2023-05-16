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

const ManageSupplyer = ({ navigation }) => {
  const [showForm, setShowFrom] = useState(null);
  const [suppliers, setSuppliers] = useState(null);
  const store = useStore();

  useEffect(() => {
    (async () => {
      try {
        store.setLoading(true);
        const supplier = await Fetch("/supplier", "GET");
        setSuppliers(supplier);
      } catch (error) {
        store.setMessage({ msg: error.message, type: "error" });
      } finally {
        store.setLoading(false);
      }
    })();
  }, [store.updateSupplier]);

  function removeSupplyer(id, profile) {
    alert("Are you sure to remove?", async () => {
      try {
        store.setLoading(true);
        const url = `/supplier?id=${id}&profile=${profile}`;
        const { message } = await Fetch(url, "DELETE");
        store.setMessage({ msg: message, type: "success" });
        store.setUpdateSupplier((prev) => !prev);
      } catch (error) {
        store.setMessage({ msg: error.message, type: "error" });
      } finally {
        store.setLoading(false);
      }
    });
  }

  return (
    <Common>
      <View style={styles.addBtn}>
        <Button
          style={{ width: 40, height: 40, borderRadius: 100 }}
          title={
            <Ionicons
              onPress={() => navigation.navigate("addSupplyer")}
              name='ios-add-circle-sharp'
              size={24}
              color='#fff'
            />
          }
        />
      </View>

      <FlatList
        data={suppliers}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.contentContainer}
        ItemSeparatorComponent={() => <View style={{ marginBottom: 6 }} />}
        ListEmptyComponent={() => (
          <Text style={{ textAlign: "center" }}>no supplier</Text>
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
                  {item.address}
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
            navigation.navigate("addSupplyer", { edit: true, data: showForm })
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
          onPress={() => removeSupplyer(showForm.id, showForm.profile)}
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
          onPress={() => navigation.navigate("supplyer", { data: showForm })}
          bgColor='#d7e5f5'
          showModal={setShowFrom}
          icon={<Octicons name='report' size={16} color='#3b83db' />}
        />
      </Drawar>
    </Common>
  );
};

export default ManageSupplyer;
