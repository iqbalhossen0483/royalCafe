import React, { useEffect, useState } from "react";
import { Text, TextInput, View } from "react-native";
import { Common } from "../App";
import Button from "../components/utilitise/Button";
import { commonStyles } from "../css/common";
import Select from "../components/utilitise/Select";
import FileInput from "../components/utilitise/FileInput";

const AddUser = ({ route }) => {
  const [profile, setProfile] = useState(null);
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
      if (route.params.user) {
        setProfile(route.params.data.profile);
      }
    }
  }, [route.params]);

  function onSubmit() {
    if (route.params?.user && typeof profile !== "string") {
      const uri = profile.uri.split(".");
      form.profile = {
        name: `${form.owner}.${uri[uri.length - 1]}`,
        type: "image",
        uri: profile.uri,
      };
    }
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
          {!route.params?.user ? (
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
          ) : (
            <View
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
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
