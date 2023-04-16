import React, { useEffect, useState } from "react";
import { Image, Text, TextInput, View } from "react-native";
import { Common } from "../App";
import Button from "../components/utilitise/Button";
import FileInput from "../components/utilitise/FileInput";
import { commonStyles } from "../css/common";

const AddProduct = ({ route }) => {
  const [image, setImage] = useState(null);
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
  });

  function handleChange(name, value) {
    setForm((prev) => {
      return { ...prev, [name]: value };
    });
  }

  useEffect(() => {
    if (route.params?.edit) {
      setForm(route.params.data);
      setImage(route.params.data.profile);
    }
  }, [route.params]);

  function onSubmit() {
    const uri = image.uri.split(".");
    form.image = {
      name: `${form.name}.${uri[uri.length - 1]}`,
      type: "image",
      uri: image.uri,
    };
    console.log(form);
  }

  return (
    <Common>
      <View style={commonStyles.formContainer}>
        <Text style={commonStyles.formHeader}>
          {route.params?.edit ? "Edit" : "Add"} Product
        </Text>

        <View style={{ rowGap: 9 }}>
          <TextInput
            defaultValue={form.name}
            onChangeText={(value) => handleChange("name", value)}
            style={commonStyles.input}
            placeholder='Product name'
          />
          <TextInput
            defaultValue={form.price?.toString()}
            onChangeText={(value) => handleChange("price", parseInt(value))}
            style={commonStyles.input}
            placeholder='Unit price৳'
            keyboardType='numeric'
          />
          <TextInput
            defaultValue={form.stock?.toString()}
            onChangeText={(value) => handleChange("stock", parseInt(value))}
            style={commonStyles.input}
            placeholder='Product stock'
            keyboardType='numeric'
          />

          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <View>
              <FileInput setImage={setImage} />
            </View>
            {image && (
              <Image
                source={{ uri: image.uri }}
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
            disabled={!form.name || !form.price || !form.stock || !image}
            onPress={onSubmit}
            title='Submit'
          />
        </View>
      </View>
    </Common>
  );
};

export default AddProduct;
