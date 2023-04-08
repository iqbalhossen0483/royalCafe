import React, { useEffect, useState } from "react";
import { FlatList, Keyboard, Text, TextInput, View } from "react-native";
import { commonStyles } from "../../css/common";
import { MaterialIcons } from "@expo/vector-icons";
import { color } from "./colors";

const Select = (props) => {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState("");
  const [headerValue, setHeaderValue] = useState("");
  const {
    placeholder,
    name,
    editable = true,
    url,
    handler,
    options,
    header,
    title,
    defaultValue,
  } = props;

  useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue);
    }
    if (value.length >= 3 && value !== headerValue) setShow(true);
    else setShow(false);
  }, [value, defaultValue]);

  function handleTuch(info) {
    Keyboard.dismiss();
    setValue(info[header]);
    setHeaderValue(info[header]);
    handler(name, info);
  }

  return (
    <View style={{ zIndex: 1 }}>
      <TextInput
        value={value}
        editable={editable}
        defaultValue={defaultValue || ""}
        onChangeText={(value) => setValue(value)}
        placeholder={placeholder}
        style={commonStyles.input}
      />
      <MaterialIcons
        style={{
          position: "absolute",
          top: 8,
          right: 5,
        }}
        name={show ? "keyboard-arrow-up" : "keyboard-arrow-down"}
        size={24}
        color={color.darkGray}
      />

      {show && (
        <View style={commonStyles.selectView}>
          <FlatList
            data={options}
            style={{ maxHeight: 434 }}
            keyExtractor={(_, i) => i}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  borderBottomWidth: 0.5,
                  borderBottomColor: color.gray,
                  marginVertical: 7,
                }}
              />
            )}
            renderItem={({ item }) => (
              <View onTouchStart={() => handleTuch(item)}>
                <Text style={{ fontSize: 16 }}>{item[header]}</Text>
                {title ? (
                  <Text style={{ color: color.darkGray, marginTop: -3 }}>
                    {item[title]}
                  </Text>
                ) : null}
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
};

export default Select;
