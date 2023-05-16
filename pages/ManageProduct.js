import React, { useEffect, useState } from "react";
import { FlatList, Pressable } from "react-native";
import { Image } from "react-native";
import { Text, View } from "react-native";
import { Common } from "../App";
import Button from "../components/utilitise/Button";
import { color } from "../components/utilitise/colors";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { alert } from "../components/utilitise/Alert";
import { styles } from "../css/manageProduct";
import Drawar from "../components/Drawar";
import SubMenu from "../components/footer/SubMenu";
import useStore from "../context/useStore";
import { Fetch, serverUrl } from "../services/common";

const ManageProduct = ({ navigation }) => {
  const [showForm, setShowFrom] = useState(null);
  const [products, setProducts] = useState(null);
  const { setMessage, setLoading, updateProduct } = useStore();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const products = await Fetch("/product", "GET");
        setProducts(products);
      } catch (error) {
        setMessage({ msg: error.message, type: "error" });
      } finally {
        setLoading(false);
      }
    })();
  }, [updateProduct]);

  function removeProduct(id, profile) {
    alert("Are you sure to remove?", async () => {
      try {
        setLoading(true);
        const { message } = await Fetch(
          `/product?id=${id}&profile=${profile}`,
          "DELETE"
        );

        setMessage({ msg: message, type: "success" });
        const rest = products.filter((product) => product.id !== id);
        setProducts(rest);
      } catch (error) {
        setMessage({ msg: error.message, type: "error" });
      } finally {
        setLoading(false);
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
        ListEmptyComponent={() => (
          <Text style={{ textAlign: "center" }}>No product</Text>
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
                <Text style={{ fontSize: 15, fontWeight: 500 }}>
                  {item.name}
                </Text>
                <Text>Stock: {item.stock}</Text>
                <Text>Total Sold: {item.sold}</Text>
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
          onPress={() => removeProduct(showForm.id, showForm.profile)}
          icon={
            <MaterialCommunityIcons
              name='archive-remove'
              size={18}
              color={color.orange}
            />
          }
        />
      </Drawar>
    </Common>
  );
};

export default ManageProduct;
