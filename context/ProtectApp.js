import { useNavigation } from "@react-navigation/native";
import useStore from "./useStore";
import { useEffect } from "react";
import { View } from "react-native";
import { Text } from "react-native";
import { Dimensions } from "react-native";
import { Image } from "react-native";

const ProtectApp = ({ children }) => {
  const navigation = useNavigation();
  const store = useStore();

  useEffect(() => {
    if (!store.userLoading && !store.user) {
      navigation.navigate("login");
    }
  }, [store.user]);

  if (!store.userLoading) return children;
  else
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
          height: Dimensions.get("window").height,
        }}
      >
        <Text style={{ fontSize: 22, marginBottom: -30, zIndex: 100 }}>
          Royal Cafe
        </Text>
        <Image
          style={{ width: 150, height: 150 }}
          source={require("../assets/loading-image.gif")}
        />
      </View>
    );
};

export default ProtectApp;
