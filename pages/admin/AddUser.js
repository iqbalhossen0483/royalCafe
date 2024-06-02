import React, { useEffect, useState } from "react";
import { Image, Keyboard, TextInput, View } from "react-native";

import { Common } from "../../components/Common";
import Button from "../../components/utilitise/Button";
import FileInput from "../../components/utilitise/FileInput";
import P from "../../components/utilitise/P";
import Select from "../../components/utilitise/Select";
import useStore from "../../context/useStore";
import { commonStyles } from "../../css/common";
import { Fetch, role, serverUrl } from "../../services/common";

const initialState = {
  name: "",
  address: "",
  phone: "",
  designation: "",
  password: "",
  profile: "",
};

const AddUser = ({ route, navigation }) => {
  const [form, setForm] = useState(initialState);
  const [profile, setProfile] = useState(null);
  const store = useStore();

  function handleChange(name, value) {
    setForm((prev) => {
      return { ...prev, [name]: value };
    });
  }

  useEffect(() => {
    if (route.params?.edit) {
      setForm(route.params?.data);
      if (route.params.user) {
        setProfile({ uri: serverUrl + route.params.data.profile, edit: true });
      }
    }
  }, [route.params]);

  async function onSubmit() {
    try {
      Keyboard.dismiss();
      store.setLoading(true);
      if (!route.params?.user && form.password.length < 6)
        throw {
          message: "Password should be at least 6 characters",
          type: "alert",
        };
      if (form.phone.length < 11)
        throw {
          message: "Phone number is invalid",
          type: "alert",
        };
      //save user;
      if (!route.params?.edit) {
        const { message } = await Fetch("/user", "POST", form);
        if (message) store.setMessage({ msg: message, type: "success" });
        setForm(initialState);
      }
      //edit user;
      else {
        if (profile && !profile.edit) {
          form.existedImg = form.profile;
          form.profile = profile;
        }
        delete form.money_transactions;
        delete form.targets;
        delete form.primary_db;
        delete form.db_list;
        const formData = new FormData();
        Object.entries(form).forEach(([key, value]) => {
          formData.append(key, value);
        });
        const { message } = await Fetch(`/user`, "PUT", formData, true);
        if (message) store.setMessage({ msg: message, type: "success" });
      }
      store.setUpdateUser((prev) => !prev);
      navigation.goBack();
    } catch (error) {
      store.setMessage({ msg: error.message, type: error.type || "error" });
    } finally {
      store.setLoading(false);
    }
  }

  const data = [
    { key: 1, value: role.sales_man },
    { key: 2, value: role.admin },
    { key: 3, value: role.store_manager },
  ];

  const disabled =
    !form.name || !form.address || !form.designation || !form.phone;
  return (
    <Common>
      <View style={commonStyles.formContainer}>
        <P bold={500} style={commonStyles.formHeader}>
          {route.params?.edit ? "Edit" : "Add"} User
        </P>

        <View style={{ rowGap: 9 }}>
          <TextInput
            defaultValue={form.name}
            onChangeText={(value) => handleChange("name", value)}
            style={commonStyles.input}
            placeholder='Name'
          />
          <TextInput
            defaultValue={form.address}
            onChangeText={(value) => handleChange("address", value)}
            style={commonStyles.input}
            placeholder='Address'
          />
          <TextInput
            defaultValue={form.phone}
            onChangeText={(value) => handleChange("phone", value)}
            style={commonStyles.input}
            placeholder='Phone number'
            keyboardType='phone-pad'
            maxLength={11}
          />

          <TextInput
            defaultValue={form.password}
            onChangeText={(value) => handleChange("password", value)}
            style={commonStyles.input}
            placeholder='Password'
            secureTextEntry={true}
            textContentType={"password"}
          />

          {!route.params?.user ? (
            <Select
              name='designation'
              placeholder='Give a designation'
              defaultValue={route.params?.edit ? form.designation : ""}
              url=''
              header='value'
              height='auto'
              handler={(_, info) =>
                setForm((prev) => {
                  return {
                    ...prev,
                    designation: info.value,
                  };
                })
              }
              options={data}
            />
          ) : (
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
          )}

          <Button
            disabled={store.loading || disabled}
            onPress={onSubmit}
            title='Submit'
          />
        </View>
      </View>
    </Common>
  );
};

export default AddUser;
