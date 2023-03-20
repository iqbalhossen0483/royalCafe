import React from "react";
import { Text } from "react-native";

const BDT = ({ ammount, style }) => {
  const taka = ammount.toString();
  const formated =
    taka.length === 4
      ? taka.slice(0, 1) + "," + taka.slice(1, 4)
      : taka.length === 5
      ? taka.slice(0, 2) + "," + taka.slice(2, 5)
      : taka.length === 6
      ? taka.slice(0, 1) + "," + taka.slice(1, 3) + "," + taka.slice(3, 6)
      : taka.length === 7
      ? taka.slice(0, 2) + "," + taka.slice(2, 4) + "," + taka.slice(4, 7)
      : taka.length > 7
      ? taka.slice(0, 1) +
        "," +
        taka.slice(1, 3) +
        "," +
        taka.slice(3, 5) +
        "," +
        taka.slice(5, taka.length)
      : taka;

  return <Text style={{ ...style, fontWeight: 500 }}>{formated}৳</Text>;
};

export default BDT;
