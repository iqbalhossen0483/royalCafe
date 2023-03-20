import React from "react";
import { Pressable, Text } from "react-native";
import { color } from "./colors";

const Button = ({ title, style, onPress, disabled }) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || false}
      style={{
        backgroundColor: disabled ? color.gray : color.green,
        paddingHorizontal: 9,
        paddingVertical: 7,
        borderRadius: 4,

        ...style,
      }}
    >
      <Text
        style={{
          color: "#fff",
          textAlign: "center",
          fontWeight: 500,
          fontSize: 16,
        }}
      >
        {title}
      </Text>
    </Pressable>
  );
};

export default Button;
