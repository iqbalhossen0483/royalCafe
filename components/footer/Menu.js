import { useNavigation, useRoute } from "@react-navigation/native";
import { color } from "../utilitise/colors";
import { styles } from "../../css/footer";
import { Pressable } from "react-native";
import { Text } from "react-native";
import React from "react";
import P from "../utilitise/P";

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
      <P bold={500} color={navigate === route.name ? "green" : "darkGray"}>
        {name}
      </P>
    </Pressable>
  );
};

export default Menu;
