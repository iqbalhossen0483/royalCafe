import React, { useEffect, useState } from "react";
import { Keyboard, Pressable, Text, TextInput, View } from "react-native";
import { commonStyles } from "../../css/common";
import { MaterialIcons } from "@expo/vector-icons";
import { color } from "./colors";

const Select = ({
  placeholder,
  name,
  editable = true,
  url,
  handler,
  options,
  header,
  title,
  defaultValue,
  top = false,
  zIndex = 100,
}) => {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState("");
  const [headerValue, setHeaderValue] = useState("");

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
        <MaterialIcons
          name={show ? "keyboard-arrow-up" : "keyboard-arrow-down"}
          size={24}
          color={color.darkGray}
        />
      </Pressable>

      {show && (
        <View
          style={{ ...commonStyles.selectView, top: !top ? "100%" : "-400%" }}
        >
          {options.map((item, i) => (
            <Pressable
              onPress={() => handleTuch(item)}
              key={i}
              style={{
                borderBottomWidth: 0.5,
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
          ))}
        </View>
      )}
    </View>
  );
};

export default Select;
