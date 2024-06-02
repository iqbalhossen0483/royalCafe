import React, { useEffect, useState } from "react";
import { Image, Keyboard, TextInput, View } from "react-native";

import { Common } from "../../components/Common";
import Button from "../../components/utilitise/Button";
import FileInput from "../../components/utilitise/FileInput";
import P from "../../components/utilitise/P";
import useStore from "../../context/useStore";
import { commonStyles } from "../../css/common";
import { Fetch, serverUrl } from "../../services/common";

const AddProduct = ({ route, navigation }) => {
  const [image, setImage] = useState(null);
  const { setMessage, setLoading, setUpdateProduct, loading } = useStore();
  const [form, setForm] = useState({
    name: "",
    price: "",
    shortName: "",
  });

  function handleChange(name, value) {
    setForm((prev) => {
      return { ...prev, [name]: value };
    });
  }

  useEffect(() => {
    if (route.params?.edit) {
      const { id, name, price, profile, shortName } = route.params.data;
      setForm({ id, name, price, profile, shortName });
      setImage({ uri: serverUrl + profile, edit: true });
    }
  }, [route.params]);

  async function onSubmit() {
    try {
      setLoading(true);
      Keyboard.dismiss();
      if (!image?.edit) {
        if (route.params?.edit) form.existedImg = form.profile;
        form.profile = image;
      }
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });
      const method = route.params?.edit ? "PUT" : "POST";
      const uri = route.params?.edit ? `/product?id=${form.id}` : "/product";
      const { message } = await Fetch(uri, method, formData, true);
      setMessage({ msg: message, type: "success" });
      setUpdateProduct((prev) => !prev);
      navigation.goBack();
    } catch (error) {
      setMessage({ msg: error.message, type: "error" });
    } finally {
      setLoading(false);
    }
  }

  const disabled = !form.name || !form.price || !form.shortName;
  return (
    <Common>
      <View style={commonStyles.formContainer}>
        <P bold={500} style={commonStyles.formHeader}>
          {route.params?.edit ? "Edit" : "Add"} Product
        </P>

        <View style={{ rowGap: 9 }}>
          <TextInput
            defaultValue={form.name}
            onChangeText={(value) => handleChange("name", value)}
            style={commonStyles.input}
            placeholder='Product name'
          />
          <TextInput
            defaultValue={form.shortName}
            onChangeText={(value) => handleChange("shortName", value)}
            style={commonStyles.input}
            placeholder='Product short name'
          />
          <TextInput
            defaultValue={form.price.toString()}
            onChangeText={(value) => handleChange("price", value)}
            style={commonStyles.input}
            placeholder='Unit price৳'
            keyboardType='phone-pad'
          />

          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <View>
              <FileInput setImage={setImage} aspect={false} />
            </View>
            {image && image.uri && (
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
            disabled={loading || disabled}
            onPress={onSubmit}
            title='Submit'
          />
        </View>
      </View>
    </Common>
  );
};

export default AddProduct;
