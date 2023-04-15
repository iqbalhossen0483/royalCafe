import React, { useEffect, useState } from "react";
import { Image, Text, TextInput, View } from "react-native";
import { Common } from "../App";
import Button from "../components/utilitise/Button";
import FileInput from "../components/utilitise/FileInput";
import { commonStyles } from "../css/common";
import Select from "../components/utilitise/Select";
import { products } from "../data";
import { AntDesign } from "@expo/vector-icons";
import { color } from "../components/utilitise/colors";
import { Pressable } from "react-native";

const AddSupplyer = ({ route }) => {
  const [productList, setProductList] = useState([]);
  const [productData, setProductData] = useState(products);
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
  });

  function handleChange(name, value) {
    setForm((prev) => {
      return { ...prev, [name]: value };
    });
  }

  useEffect(() => {
    if (route.params?.edit) {
      setForm(route.params.data);
      setProfile(route.params.data.profile);
      setProductList(route.params.data.products);
    }
  }, [route.params]);

  function onSubmit() {
    if (typeof profile !== "string") {
      const uri = profile.uri.split(".");
      form.profile = {
        name: `${form.owner}.${uri[uri.length - 1]}`,
        type: "image",
        uri: profile.uri,
      };
    }
    form.products = productList;
    console.log(form);
  }

  useEffect(() => {
    const rest = productData.filter(
      (item) => !productList.find(({ id }) => item.id === id)
    );
    setProductData(rest);
  }, [productList]);

  function deleteProductList(data) {
    const rest = productList.filter((item) => item.id !== data.id);
    setProductList(rest);
    setProductData((prev) => [...prev, data]);
  }

  return (
    <Common>
      <View style={commonStyles.formContainer}>
        <Text style={commonStyles.formHeader}>
          {route.params?.edit ? "Edit" : "Add"} Supplyer
        </Text>

        <View style={{ rowGap: 9 }}>
          <TextInput
            defaultValue={form.name}
            onChangeText={(value) => handleChange("name", value)}
            style={commonStyles.input}
            placeholder='Suppyer name'
          />
          <TextInput
            defaultValue={form.address}
            onChangeText={(value) => handleChange("address", value)}
            style={commonStyles.input}
            placeholder='Address'
          />
          <TextInput
            defaultValue={form.phone?.toString()}
            onChangeText={(value) => handleChange("phone", parseInt(value))}
            style={commonStyles.input}
            placeholder='Phone number'
            keyboardType='numeric'
          />
          {productList.length ? (
            <View style={commonStyles.sipContainer}>
              {productList.map((item) => (
                <Pressable
                  onPress={() => deleteProductList(item)}
                  style={commonStyles.sip}
                  key={item.id}
                >
                  <Text>{item.name}</Text>
                  <AntDesign name='close' size={20} color={color.darkGray} />
                </Pressable>
              ))}
            </View>
          ) : null}
          <Select
            name=''
            placeholder='Select'
            url=''
            header='name'
            options={productData}
            handler={(_, info) =>
              setProductList((prev) => {
                return [...prev, info];
              })
            }
          />
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <View>
              <FileInput setImage={setProfile} />
            </View>
            {profile && (
              <Image
                source={{ uri: profile.uri }}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 100,
                  resizeMode: "center",
                }}
              />
            )}
          </View>
          <Button
            disabled={
              !form.name ||
              !form.address ||
              !form.phone ||
              !profile ||
              !productList.length
            }
            onPress={onSubmit}
            title='Submit'
          />
        </View>
      </View>
    </Common>
  );
};

export default AddSupplyer;
