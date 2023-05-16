import React, { useEffect, useState } from "react";
import { Text, TextInput, View, Image } from "react-native";
import { Common } from "../App";
import Button from "../components/utilitise/Button";
import { commonStyles } from "../css/common";
import Select from "../components/utilitise/Select";
import FileInput from "../components/utilitise/FileInput";
import { Fetch, serverUrl } from "../services/common";
import useStore from "../context/useStore";

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
    { key: 1, value: "Sales Man" },
    { key: 2, value: "Admin" },
  ];

  return (
    <Common>
      <View style={commonStyles.formContainer}>
        <Text style={commonStyles.formHeader}>
          {route.params?.edit ? "Edit" : "Add"} User
        </Text>

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

          {!route.params?.user ? (
            <>
              <TextInput
                defaultValue={form.password}
                onChangeText={(value) => handleChange("password", value)}
                style={commonStyles.input}
                placeholder='Password'
                secureTextEntry={true}
                textContentType={"password"}
              />
              <Select
                name='designation'
                placeholder='Give a designation'
                defaultValue={route.params?.edit ? form.designation : ""}
                url=''
                header='value'
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
            </>
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
            disabled={
              !form.name || !form.address || !form.designation || !form.phone
            }
            onPress={onSubmit}
            title='Submit'
          />
        </View>
      </View>
    </Common>
  );
};

export default AddUser;
