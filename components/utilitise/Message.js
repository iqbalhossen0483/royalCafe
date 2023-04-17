import React, { useEffect } from "react";
import { Image } from "react-native";
import { Dimensions } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import useStore from "../../context/useStore";

const Message = () => {
  const height = Dimensions.get("window").height;
  const width = Dimensions.get("window").width;
  const store = useStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      store?.setMessage(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [store.message.msg]);

  if (!store.message.msg) return null;
  return (
    <View
      style={{
        position: "absolute",
        top: height * 0.3,
        left: width * 0.15,
        backgroundColor: "#fff",
        paddingHorizontal: 15,
        paddingVertical: 30,
        borderRadius: 10,
        width: "70%",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
      }}
    >
      {store.message.type === "success" ? (
        <Image
          source={require("../../assets/success.png")}
          style={{
            width: 45,
            height: 45,
            marginBottom: 5,
          }}
        />
      ) : (
        <Image
          source={require("../../assets/feild.png")}
          style={{
            width: 45,
            height: 45,
            marginBottom: 5,
          }}
        />
      )}
      <Text style={{ fontSize: 16 }}>{store.message.msg}</Text>
    </View>
  );
};

export default Message;
