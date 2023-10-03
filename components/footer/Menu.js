import { useNavigation, useRoute } from "@react-navigation/native";
import { color } from "../utilitise/colors";
import { styles } from "../../css/footer";
import { Pressable } from "react-native";
import { Text } from "react-native";
import React from "react";

const Menu = ({ name, Icon, showModal, navigate = "" }) => {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <Pressable
      style={styles.iconWrapper}
      onPress={() =>
        navigate ? navigation.navigate(navigate) : showModal((prev) => !prev)
      }
    >
      {Icon}
      <Text
        style={{
          color: navigate === route.name ? color.green : "#4b5563",
          fontWeight: 500,
        }}
      >
        {name}
      </Text>
    </Pressable>
  );
};

export default Menu;
