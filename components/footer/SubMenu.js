import React, { useState } from "react";
import { StyleSheet, Text, TouchableHighlight } from "react-native";
import { View } from "react-native";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { commonStyles } from "../../css/common";
import { color } from "../utilitise/colors";

const SubMenu = ({
  showModal,
  name,
  url,
  icon,
  bgColor,
  navigate = true,
  onPress,
}) => {
  const navigation = useNavigation();

  function handler() {
    showModal(false);
    if (navigate) navigation.navigate(url);
    else onPress();
  }

  const iconStyle = {
    ...commonStyles.iconWrapper,
    backgroundColor: bgColor,
  };

  return (
    <Pressable onPress={handler} style={style.container}>
      <View style={iconStyle}>{icon}</View>
      <Text style={style.name}>{name}</Text>
    </Pressable>
  );
};

const style = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: -5,
    columnGap: 4,
  },
  name: {
    fontSize: 16,
    color: color.darkGray,
    fontWeight: 500,
    minWidth: 130,
    borderBottomWidth: 1,
    borderColor: color.darkGray,
    paddingBottom: 4,
  },
});

export default SubMenu;
