import React, { useEffect, useState } from "react";
import { Text, TextInput, View } from "react-native";
import { Common } from "../App";
import Button from "../components/utilitise/Button";
import { commonStyles } from "../css/common";
import useStore from "../context/useStore";
import { Fetch } from "../services/common";

const CreateNote = ({ route, navigation }) => {
  const store = useStore();
  const [notes, setNotes] = useState({
    heading: "",
    description: "",
  });

  async function onSubmit() {
    try {
      store.setLoading(true);
      notes.userId = store.user.id;
      notes.date = new Date().toISOString();
      const method = route.params?.edit ? "PUT" : "POST";
      const url = route.params?.edit ? `/notes?id=${notes.id}` : "/notes";
      const { message } = await Fetch(url, method, notes);
      store.setLoading(false);
      store.setMessage({ msg: message, type: "success" });
      store.setUpdateNotes((prev) => !prev);
      navigation.goBack();
    } catch (error) {
      store.setLoading(false);
      store.setMessage({ msg: error.message, type: "error" });
    }
  }

  useEffect(() => {
    if (route.params?.edit) {
      setNotes(route.params.data);
    }
  }, [route.params]);

  return (
    <Common>
      <View style={commonStyles.formContainer}>
        <Text style={commonStyles.formHeader}>
          {route.params?.edit ? "Edit" : "Create"} Note
        </Text>
        <View style={{ rowGap: 8 }}>
          <TextInput
            onChangeText={(value) =>
              setNotes((prev) => {
                return { ...prev, heading: value };
              })
            }
            style={commonStyles.input}
            placeholder='Heading'
            defaultValue={notes.heading}
          />
          <TextInput
            multiline
            numberOfLines={10}
            style={{
              textAlignVertical: "top",
              ...commonStyles.input,
              paddingTop: 5,
              height: 150,
            }}
            onChangeText={(value) =>
              setNotes((prev) => {
                return { ...prev, description: value };
              })
            }
            placeholder='Description'
            defaultValue={notes.description}
          />
        </View>
        <Button
          style={{ marginTop: 10 }}
          onPress={onSubmit}
          disabled={!notes.heading || !notes.description}
          title='Save'
        />
      </View>
    </Common>
  );
};

export default CreateNote;
