import React from "react";
import { Text } from "react-native";
import { View } from "react-native";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { commonStyles } from "../../css/common";

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

  const style = {
    container: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    icon: {
      ...commonStyles.iconWrapper,
      backgroundColor: bgColor,
    },
    name: { fontSize: 18, marginLeft: 5 },
  };

  return (
    <Pressable onPress={handler} style={style.container}>
      <View style={style.icon}>{icon}</View>
      <Text style={style.name}>{name}</Text>
    </Pressable>
  );
};

export default SubMenu;
