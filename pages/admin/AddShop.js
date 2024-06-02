import React, { useEffect, useState } from "react";
import { Image, Keyboard, ScrollView, TextInput, View } from "react-native";

import { Common } from "../../components/Common";
import { socket } from "../../components/Layout";
import Button from "../../components/utilitise/Button";
import FileInput from "../../components/utilitise/FileInput";
import P from "../../components/utilitise/P";
import Select from "../../components/utilitise/Select";
import useStore from "../../context/useStore";
import { commonStyles } from "../../css/common";
import { Fetch, serverUrl } from "../../services/common";

const AddShop = ({ route, navigation }) => {
  const [profile, setProfile] = useState(null);
  const [margin, setMargin] = useState(0);
  const [form, setForm] = useState({
    owner: "",
    shopName: "",
    address: "",
    phone: "",
    commission: 100,
    machine_model: "",
    machine_type: "",
    product_info: "",
  });
  const store = useStore();

  function handleChange(name, value) {
    setForm((prev) => {
      return { ...prev, [name]: value };
    });
  }

  useEffect(() => {
    const show = Keyboard.addListener("keyboardDidShow", (event) => {
      setMargin(event.endCoordinates.height);
    });
    const hide = Keyboard.addListener("keyboardDidHide", () => {
      setMargin(0);
    });

    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

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
      formData.append("added_by", store.user.id);
      const method = route.params?.edit ? "PUT" : "POST";
      const url = route.params?.edit ? `/customer?id=${form.id}` : "/customer";
      const { message } = await Fetch(url, method, formData, true);
      if (message) store.setMessage({ msg: message, type: "success" });
      store.setUpdateCustomer((prev) => !prev);
      if (socket) {
        socket.send(
          JSON.stringify({
            type: "shop_added",
            id: store.user.id,
            name: store.user?.name,
          })
        );
      }
      navigation.goBack();
    } catch (error) {
      store.setMessage({ msg: error.message, type: error.type || "error" });
    } finally {
      store.setLoading(false);
    }
  }
  const disabled =
    !form.owner ||
    !form.address ||
    !form.shopName ||
    !form.phone ||
    !form.machine_model ||
    !form.machine_type;
  return (
    <Common>
      <ScrollView style={{ marginBottom: margin }}>
        <View style={commonStyles.formContainer}>
          <P bold={500} style={commonStyles.formHeader}>
            {route.params?.edit ? "Edit" : "Add"} Shop
          </P>
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
              multiline
            />
            <TextInput
              defaultValue={form.phone?.toString()}
              onChangeText={(value) => handleChange("phone", value)}
              style={commonStyles.input}
              placeholder='Phone number'
              keyboardType='phone-pad'
              maxLength={11}
            />
            <TextInput
              defaultValue={form.machine_model}
              onChangeText={(value) => handleChange("machine_model", value)}
              style={commonStyles.input}
              placeholder='Machine Model'
            />
            <Select
              name='machine_type'
              defaultValue={form.machine_type}
              placeholder='Machine Type'
              header='type'
              height='auto'
              options={[
                { id: 1, type: "switchCafe" },
                { id: 2, type: "others" },
              ]}
              handler={(_, info) => handleChange("machine_type", info.type)}
            />

            <TextInput
              defaultValue={form.product_info}
              onChangeText={(value) => handleChange("product_info", value)}
              style={commonStyles.input}
              placeholder='Product info'
              multiline
            />
            {store.user.designation === "Admin" ? (
              <TextInput
                defaultValue={form.commission?.toString()}
                onChangeText={(value) => handleChange("commission", value)}
                style={commonStyles.input}
                placeholder='How much commission you want to pay %'
                keyboardType='phone-pad'
              />
            ) : null}
            <View
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
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
              disabled={store.loading || disabled}
              onPress={onSubmit}
              title='Submit'
            />
          </View>
        </View>
      </ScrollView>
    </Common>
  );
};

export default AddShop;
