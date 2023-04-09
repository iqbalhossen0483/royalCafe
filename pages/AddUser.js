import React, { useEffect, useState } from "react";
import { Text, TextInput, View } from "react-native";
import { Common } from "../App";
import Button from "../components/utilitise/Button";
import { commonStyles } from "../css/common";
import Select from "../components/utilitise/Select";

const AddUser = ({ route }) => {
  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    designation: "",
  });

  function handleChange(name, value) {
    setForm((prev) => {
      return { ...prev, [name]: value };
    });
  }

  useEffect(() => {
    if (route.params?.edit) {
      setForm(route.params?.data);
    }
  }, [route.params]);

  function onSubmit() {
    console.log(form);
  }

  const data = [
    { key: 1, value: "Sales Manager" },
    { key: 2, value: "Manager" },
    { key: 3, value: "Admin" },
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
            placeholder='User name'
          />
          <TextInput
            defaultValue={form.address}
            onChangeText={(value) => handleChange("address", value)}
            style={commonStyles.input}
            placeholder='Address'
          />
          <TextInput
            defaultValue={form.phone?.toString()}
            onChangeText={(value) => handleChange("phone", parseInt(value))}
            style={commonStyles.input}
            placeholder='Phone number'
            keyboardType='numeric'
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
