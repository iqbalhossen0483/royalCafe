import React from "react";

const Loading = () => {
  return (
    <View
      style={{
        backgroundColor: "#fff",
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
};

export default Loading;
