import React, { useEffect, useState } from "react";
import {
  Keyboard,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { commonStyles } from "../../css/common";
import { MaterialIcons } from "@expo/vector-icons";
import { color } from "./colors";
import { Fetch } from "../../services/common";

const Select = ({
  placeholder,
  name,
  editable = true,
  url,
  handler,
  options = null,
  header,
  title,
  defaultValue,
  top = false,
  zIndex = 100,
  search = false,
}) => {
  const [show, setShow] = useState(false);
  const [headerValue, setHeaderValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(options);
  const [value, setValue] = useState("");

  useEffect(() => {
    async function fethData() {
      try {
        setLoading(true);
        if (search) url += `&search=${value}`;
        const result = await Fetch(url, "GET");
        setData(result);
      } catch (error) {
        setData(null);
      } finally {
        setLoading(false);
      }
    }
    if (url && !search) fethData();
    else if (search && value) fethData();
  }, [value]);

  useEffect(() => {
    if (value.length >= 3 && value !== headerValue) setShow(true);
    else setShow(false);
  }, [value]);

  useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue);
      setHeaderValue(defaultValue);
      setShow(false);
    }
  }, [defaultValue]);

  function handleTuch(info) {
    Keyboard.dismiss();
    setValue(info[header]);
    setHeaderValue(info[header]);
    handler(name, info);
  }

  return (
    <View style={{ zIndex }}>
      <TextInput
        value={value}
        editable={editable}
        defaultValue={defaultValue || ""}
        onChangeText={(value) => setValue(value)}
        placeholder={placeholder}
        style={commonStyles.input}
      />
      <Pressable
        onPress={() => setShow((prev) => !prev)}
        style={{ position: "absolute", top: 8, right: 5 }}
      >
        {!search ? (
          <MaterialIcons
            name={show ? "keyboard-arrow-up" : "keyboard-arrow-down"}
            size={24}
            color={color.darkGray}
          />
        ) : null}
      </Pressable>

      {show && (
        <View
          style={{ ...commonStyles.selectView, top: !top ? "100%" : "-400%" }}
        >
          {loading ? (
            <Text style={{ textAlign: "center" }}>Loading...</Text>
          ) : data && data.length ? (
            data.map((item, i, arr) => (
              <Pressable
                onPress={() => handleTuch(item)}
                key={i}
                style={{
                  borderBottomWidth: arr.length - 1 !== i ? 0.5 : 0,
                  borderBottomColor: color.gray,
                  paddingVertical: 7,
                }}
              >
                <Text style={{ fontSize: 16 }}>{item[header]}</Text>
                {title ? (
                  <Text style={{ color: color.darkGray, marginTop: -3 }}>
                    {item[title]}
                  </Text>
                ) : null}
              </Pressable>
            ))
          ) : (
            <Text style={{ textAlign: "center" }}>no options</Text>
          )}
        </View>
      )}
    </View>
  );
};

export default Select;
