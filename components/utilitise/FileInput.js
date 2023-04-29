import React from "react";
import Button from "./Button";
import { Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import mime from "mime";

const FileInput = ({ setImage }) => {
  async function handler() {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (result.assets[0]) {
        const image = result.assets[0];
        const imageUri = "file:///" + image.uri.split("file:/").join("");
        setImage({
          uri: imageUri,
          type: mime.getType(imageUri),
          name: imageUri.split("/").pop(),
        });
      }
    } catch (error) {
      Alert.alert(error);
    }
  }

  return (
    <Button style={{ width: 150 }} onPress={handler} title='Choose Image' />
  );
};

export default FileInput;
