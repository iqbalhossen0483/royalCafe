import React, { useState } from "react";
import { Keyboard, Text, TextInput, View } from "react-native";
import Button from "../components/utilitise/Button";
import { commonStyles } from "../css/common";
import useStore from "../context/useStore";
import { Fetch } from "../services/common";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ navigation }) => {
  const store = useStore();
  const [form, setForm] = useState({
    phone: "",
    password: "",
  });

  function handleChange(name, value) {
    setForm((prev) => {
      return { ...prev, [name]: value };
    });
  }

  async function onSubmit() {
    try {
      store.setLoading(true);
      Keyboard.dismiss();
      const result = await Fetch("/login", "POST", form);
      store.setLoading(false);
      await AsyncStorage.setItem("token", result.token);
      store.setUser(result.user);
      store.setMessage({ msg: result.message, type: "success" });
      const url = result.user.designation === "Admin" ? "home" : "profile";
      navigation.navigate(url);
    } catch (error) {
      store.setLoading(false);
      store.setMessage({ msg: error.message, type: error.type || "error" });
    }
  }

  return (
    <View style={{ ...commonStyles.formContainer, marginTop: 100 }}>
      <Text style={commonStyles.formHeader}>Login</Text>

      <View style={{ rowGap: 9 }}>
        <TextInput
          onChangeText={(value) => handleChange("phone", value)}
          style={commonStyles.input}
          placeholder='Phone number'
          keyboardType='phone-pad'
          maxLength={11}
        />
        <TextInput
          onChangeText={(value) => handleChange("password", value)}
          style={commonStyles.input}
          placeholder='Password'
          secureTextEntry={true}
          textContentType={"password"}
        />

        <Button
          disabled={!form.phone || !form.password}
          onPress={onSubmit}
          title='Submit'
        />
      </View>
    </View>
  );
};

export default Login;
