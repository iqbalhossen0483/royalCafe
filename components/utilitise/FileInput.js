import React from "react";
import Button from "./Button";
import { Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";

const FileInput = ({ setImage }) => {
  async function handler() {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      setImage(result.assets[0]);
    } catch (error) {
      Alert.alert(error);
    }
  }

  return (
    <Button style={{ width: 150 }} onPress={handler} title='Choose Image' />
  );
};

export default FileInput;
