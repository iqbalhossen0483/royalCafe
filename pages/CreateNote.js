import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { Common } from "../App";
import Button from "../components/utilitise/Button";
import { commonStyles } from "../css/common";

const CreateNote = () => {
  const [notes, setNotes] = useState({
    heading: "",
    description: "",
  });

  function onSubmit() {
    console.log(notes);
  }

  return (
    <Common>
      <View style={commonStyles.formContainer}>
        <Text style={commonStyles.formHeader}>Create Note</Text>
        <View style={{ rowGap: 8 }}>
          <TextInput
            onChangeText={(value) =>
              setNotes((prev) => {
                return { ...prev, heading: value };
              })
            }
            style={commonStyles.input}
            placeholder='Heading'
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
