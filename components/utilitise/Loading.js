import React from "react";
import { Image, View } from "react-native";

import useStore from "../../context/useStore";

const Loading = () => {
  const store = useStore();

  if (!store.loading) return null;
  return <LoadingUI />;
};

export default Loading;

export function LoadingOnComponent() {
  return <LoadingUI />;
}

function LoadingUI() {
  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: "#00000040",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
      }}
    >
      <View
        style={{
          width: "70%",
          height: 200,
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
        <Image
          source={require("../../assets/loading-image.gif")}
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </View>
    </View>
  );
}
