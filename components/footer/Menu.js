import React from "react";
import { View } from "react-native";
import { color } from "../utilitise/colors";
import { styles } from "../../css/footer";
import { Text } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Pressable } from "react-native";

const Menu = ({ name, Icon, showModal, navigate = true }) => {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <Pressable
      style={styles.iconWrapper}
      onPress={() =>
        navigate ? navigation.navigate(name) : showModal((prev) => !prev)
      }
    >
      {Icon}
      <Text
        style={{
          color: name === route.name ? color.green : "#4b5563",
          fontWeight: 500,
        }}
      >
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </Text>
    </Pressable>
  );
};

export default Menu;
