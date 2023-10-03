import React from "react";
import { commonStyles } from "../../css/common";
import { Text, TextInput, View } from "react-native";
import Checkbox from "expo-checkbox";

const FreeProduct = ({ product, setProduct }) => {
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          columnGap: 4,
          alignItems: "center",
          marginTop: 4,
        }}
      >
        <Checkbox
          value={product.isFree === "true" ? true : false}
          color={product.isFree === "true" ? "green" : "gray"}
          onValueChange={() =>
            setProduct((prev) => {
              prev.isFree = prev.isFree === "true" ? "false" : "true";
              return { ...prev };
            })
          }
        />
        <Text style={{ fontSize: 16 }}>Free Product?</Text>
      </View>
    </>
  );
};

export default FreeProduct;
