import React, { useEffect, useState } from "react";
import { Alert, Image, Text, TextInput, View } from "react-native";
import { Common } from "../App";
import Button from "../components/utilitise/Button";
import FileInput from "../components/utilitise/FileInput";
import { commonStyles } from "../css/common";

const AddShop = ({ route }) => {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({
    owner: "",
    shopName: "",
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
      console.log("edit shop");
    }
  }, [route.params]);

  function onSubmit() {
    const uri = profile.uri.split(".");
    form.profile = {
      name: `${form.owner}.${uri[uri.length - 1]}`,
      type: "image",
      uri: profile.uri,
    };
    console.log(form);
  }

  return (
    <Common>
      <View style={commonStyles.formContainer}>
        <Text style={commonStyles.formHeader}>Add Shop</Text>

        <View style={{ rowGap: 9 }}>
          <TextInput
            onChangeText={(value) => handleChange("owner", value)}
            style={commonStyles.input}
            placeholder='Shop owner name'
          />
          <TextInput
            onChangeText={(value) => handleChange("shopName", value)}
            style={commonStyles.input}
            placeholder='Shop name'
          />
          <TextInput
            onChangeText={(value) => handleChange("address", value)}
            style={commonStyles.input}
            placeholder='Address'
          />
          <TextInput
            onChangeText={(value) => handleChange("phone", parseInt(value))}
            style={commonStyles.input}
            placeholder='Phone number'
            keyboardType='numeric'
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
              !form.owner ||
              !form.address ||
              !form.shopName ||
              !form.phone ||
              !profile
            }
            onPress={onSubmit}
            title='Submit'
          />
        </View>
      </View>
    </Common>
  );
};

export default AddShop;
