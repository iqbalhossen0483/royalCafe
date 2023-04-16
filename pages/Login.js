import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { Common } from "../App";
import Button from "../components/utilitise/Button";
import { commonStyles } from "../css/common";

const Login = () => {
  const [form, setForm] = useState({
    phone: "",
    password: "",
  });

  function handleChange(name, value) {
    setForm((prev) => {
      return { ...prev, [name]: value };
    });
  }

  function onSubmit() {
    console.log(form);
  }

  return (
    <View style={{ ...commonStyles.formContainer, marginTop: 100 }}>
      <Text style={commonStyles.formHeader}>Login</Text>

      <View style={{ rowGap: 9 }}>
        <TextInput
          onChangeText={(value) => handleChange("phone", value)}
          style={commonStyles.input}
          placeholder='Phone number'
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
