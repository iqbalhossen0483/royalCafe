import React, { useState } from "react";
import { Text, TouchableHighlight } from "react-native";
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
  border = false,
}) => {
  const navigation = useNavigation();

  function handler() {
    showModal(false);
    if (navigate) navigation.navigate(url);
    else onPress();
  }

  const style = {
    container: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      marginTop: -5,
    },
    icon: {
      ...commonStyles.iconWrapper,
      backgroundColor: bgColor,
    },
    name: {
      fontSize: 16,
      marginLeft: 5,
      color: color.darkGray,
      fontWeight: 500,
      minWidth: 130,
    },
    border: {
      borderBottomWidth: 1,
      borderColor: color.darkGray,
      paddingBottom: 4,
    },
  };
  const nameStype = border
    ? { ...style.name, ...style.border }
    : style.container;
  return (
    <Pressable onPress={handler} style={style.container}>
      <View style={style.icon}>{icon}</View>
      <Text style={nameStype}>{name}</Text>
    </Pressable>
  );
};

export default SubMenu;
