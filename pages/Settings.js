import React, { useState } from "react";
import { Common } from "../components/Common";
import { View } from "react-native";
import { commonStyles } from "../css/common";
import Button from "../components/utilitise/Button";
import { TextInput } from "react-native";
import { Text } from "react-native";
import { Fetch } from "../services/common";
import useStore from "../context/useStore";
import { Keyboard } from "react-native";

const Settings = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const store = useStore();

  async function onSubmit() {
    try {
      setLoading(true);
      Keyboard.dismiss();
      const result = await Fetch("/admin/settings", "PUT", data);
      store.setMessage({ msg: result.message, type: "success" });
      store.setUpdateReport((prev) => !prev);
    } catch (error) {
      store.setMessage({ msg: error.message, type: "error" });
    } finally {
      setLoading(false);
    }
  }
  const siteInfo = store.siteInfo;
  return (
    <Common>
      <View style={commonStyles.formContainer}>
        <View style={{ rowGap: 10 }}>
          <Text>Company Name:</Text>
          <TextInput
            onChangeText={(value) =>
              setData((prev) => {
                return { ...prev, name: value };
              })
            }
            style={commonStyles.input}
            placeholder='Name'
            defaultValue={siteInfo.name || ""}
          />
          <Text>Company Address:</Text>
          <TextInput
            onChangeText={(value) =>
              setData((prev) => {
                return { ...prev, address: value };
              })
            }
            style={commonStyles.input}
            placeholder='Address'
            defaultValue={siteInfo.address || ""}
          />
          <Text>Numbers:</Text>
          <TextInput
            onChangeText={(value) =>
              setData((prev) => {
                return { ...prev, numbers: value };
              })
            }
            style={commonStyles.input}
            placeholder='Numbers'
            defaultValue={siteInfo.numbers || ""}
          />
          <Button
            title={loading ? "Saving..." : "Save"}
            disabled={loading}
            onPress={onSubmit}
          />
        </View>
      </View>
    </Common>
  );
};

export default Settings;
