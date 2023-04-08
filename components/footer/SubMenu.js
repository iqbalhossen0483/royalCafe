import React from "react";
import { Text } from "react-native";
import { View } from "react-native";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { commonStyles } from "../../css/common";

const SubMenu = (props) => {
  const navigation = useNavigation();
  const {
    showModal,
    name,
    url,
    icon,
    bgColor,
    navigate = true,
    onPress,
  } = props;

  function handler() {
    showModal(false);
    if (navigate) navigation.navigate(url);
    else onPress();
  }

  return (
    <Pressable
      onPress={handler}
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <View
        style={{
          ...commonStyles.iconWrapper,
          backgroundColor: bgColor,
        }}
      >
        {icon}
      </View>
      <Text style={{ fontSize: 18, marginLeft: 5 }}>{name}</Text>
    </Pressable>
  );
};

export default SubMenu;
