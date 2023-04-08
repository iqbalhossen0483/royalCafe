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
    price: 0,
    qty: 0,
  });

  function handleChange(name, value) {
    setForm((prev) => {
      return { ...prev, [name]: value };
    });
  }

  useEffect(() => {
    if (route.params?.edit) {
      console.log("edit product");
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
            onChangeText={(value) => handleChange("name", value)}
            style={commonStyles.input}
            placeholder='Product name'
          />
          <TextInput
            onChangeText={(value) => handleChange("price", parseInt(value))}
            style={commonStyles.input}
            placeholder='Unit price৳'
            keyboardType='numeric'
          />
          <TextInput
            onChangeText={(value) => handleChange("qty", parseInt(value))}
            style={commonStyles.input}
            placeholder='Product quantity'
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
            disabled={!form.name || !form.price || !form.qty || !image}
            onPress={onSubmit}
            title='Submit'
          />
        </View>
      </View>
    </Common>
  );
};

export default AddProduct;
