import React from "react";
import { Text } from "react-native";
import { View } from "react-native";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { commonStyles } from "../../css/common";

const SubMenu = ({ showModal, name, url, icon, bgColor }) => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => {
        navigation.navigate(url);
        showModal(false);
      }}
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
