import React, { useEffect, useState } from "react";
import { Image, Text, TextInput, View } from "react-native";
import { Common } from "../App";
import Button from "../components/utilitise/Button";
import FileInput from "../components/utilitise/FileInput";
import { commonStyles } from "../css/common";
import useStore from "../context/useStore";
import { Fetch, serverUrl } from "../services/common";

const AddShop = ({ route, navigation }) => {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({
    owner: "",
    shopName: "",
    address: "",
    phone: "",
  });
  const store = useStore();

  function handleChange(name, value) {
    setForm((prev) => {
      return { ...prev, [name]: value };
    });
  }

  useEffect(() => {
    if (route.params?.edit) {
      setForm(route.params.data);
      setProfile({ uri: serverUrl + route.params.data.profile, edit: true });
    }
  }, [route.params]);

  async function onSubmit() {
    try {
      store.setLoading(true);
      if (profile && !profile.edit) {
        form.existedImg = form.profile;
        form.profile = profile;
      }
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });
      const method = route.params?.edit ? "PUT" : "POST";
      const url = route.params?.edit ? `/customer?id=${form.id}` : "/customer";
      const { message } = await Fetch(url, method, formData, true);
      if (message) store.setMessage({ msg: message, type: "success" });
      store.setUpdateCustomer((prev) => !prev);
      store.setLoading(false);
      navigation.goBack();
    } catch (error) {
      store.setLoading(false);
      store.setMessage({ msg: error.message, type: error.type || "error" });
    }
  }

  return (
    <Common>
      <View style={commonStyles.formContainer}>
        <Text style={commonStyles.formHeader}>
          {route.params?.edit ? "Edit" : "Add"} Shop
        </Text>

        <View style={{ rowGap: 9 }}>
          <TextInput
            defaultValue={form.owner}
            onChangeText={(value) => handleChange("owner", value)}
            style={commonStyles.input}
            placeholder='Shop owner name'
          />
          <TextInput
            defaultValue={form.shopName}
            onChangeText={(value) => handleChange("shopName", value)}
            style={commonStyles.input}
            placeholder='Shop name'
          />
          <TextInput
            defaultValue={form.address}
            onChangeText={(value) => handleChange("address", value)}
            style={commonStyles.input}
            placeholder='Address'
          />
          <TextInput
            defaultValue={form.phone?.toString()}
            onChangeText={(value) => handleChange("phone", value)}
            style={commonStyles.input}
            placeholder='Phone number'
            keyboardType='phone-pad'
            maxLength={11}
          />
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <View>
              <FileInput setImage={setProfile} />
            </View>
            {profile ? (
              <Image
                source={{ uri: profile.uri }}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 100,
                  resizeMode: "center",
                }}
              />
            ) : null}
          </View>
          <Button
            disabled={
              !form.owner || !form.address || !form.shopName || !form.phone
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
