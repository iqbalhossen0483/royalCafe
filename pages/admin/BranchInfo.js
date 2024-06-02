import React, { useState } from "react";
import { Keyboard, Text, TextInput, View } from "react-native";

import Button from "../../components/utilitise/Button";
import useStore from "../../context/useStore";
import { commonStyles } from "../../css/common";
import { Fetch } from "../../services/common";
import SettingHeader from "./SettingHeader";

const BranchInfo = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const store = useStore();

  async function onSubmit() {
    try {
      setLoading(true);
      Keyboard.dismiss();
      const result = await Fetch("/admin/siteInfo", "PUT", data);
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
    <SettingHeader>
      <View style={commonStyles.formContainer}>
        <View style={{ rowGap: 10 }}>
          <Text>Branch Name:</Text>
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
          <Text>Branch Address:</Text>
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
          <Text>Phone Number:</Text>
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
    </SettingHeader>
  );
};

export default BranchInfo;
