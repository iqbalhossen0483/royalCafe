import React from "react";
import Modal from "react-native-modal";
import { styles } from "../css/footer";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Drawar = (props) => {
  const {
    setShowModal,
    show,
    coverScreen = false,
    children,
    bottom = 35,
  } = props;

  return (
    <Modal
      onBackButtonPress={() => setShowModal(false)}
      isVisible={show}
      coverScreen={coverScreen}
      style={{ ...styles.modal, bottom: bottom }}
    >
      <View style={{ flex: 1, alignItems: "center" }}>
        <View style={styles.closeIconWrapper}>
          <Ionicons
            style={styles.closeIcon}
            onTouchStart={() => setShowModal(false)}
            name='close-sharp'
            size={24}
            color='black'
          />
        </View>
        <View style={{ width: "50%", rowGap: 10, marginTop: 30 }}>
          {children}
        </View>
      </View>
    </Modal>
  );
};

export default Drawar;
