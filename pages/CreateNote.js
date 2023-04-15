import React, { useEffect, useState } from "react";
import { Text, TextInput, View } from "react-native";
import { Common } from "../App";
import Button from "../components/utilitise/Button";
import { commonStyles } from "../css/common";

const CreateNote = ({ route }) => {
  const [notes, setNotes] = useState({
    heading: "",
    description: "",
  });

  function onSubmit() {
    console.log(notes);
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
