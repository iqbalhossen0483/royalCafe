import React, { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { commonStyles } from "../../css/common";
import { styles } from "../../css/profile";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import useStore from "../../context/useStore";
import { Fetch, dateFormatter } from "../../services/common";
import { alert } from "../utilitise/Alert";
import { color } from "../utilitise/colors";

const Notes = ({ navigation, id }) => {
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState(null);
  const store = useStore();

  useEffect(() => {
    (async () => {
      try {
        const notes = await Fetch(`/notes?userId=${id}`, "GET");
        setNotes(notes);
      } catch (error) {
        store.setMessage({ msg: error.message, type: "error" });
      }
    })();
  }, [store.updateNote]);

  function deleteNotes(id) {
    alert("Are you sure to log Out?", async () => {
      try {
        setLoading(true);
        const { message } = await Fetch(`/notes?id=${id}`, "DELETE");
        setLoading(false);
        store.setMessage({ msg: message, type: "success" });
        const rest = notes.filter((item) => item.id !== id);
        setNotes(rest);
      } catch (error) {
        setLoading(false);
        store.setMessage({ msg: error.message, type: "error" });
      }
    });
  }

  return (
    <>
      <Text style={commonStyles.heading}>Your Notes</Text>
      <View style={styles.noteContainer}>
        {loading ? (
          <Text style={{ textAlign: "center" }}>Loading...</Text>
        ) : null}
        {notes && notes.length ? (
          notes.map((item, i, arr) => (
            <View
              key={item.id}
              style={arr.length - 1 !== i ? styles.noteItem : {}}
            >
              <View style={styles.headingContainer}>
                <View>
                  <Text style={styles.noteHeader}>{item.heading}</Text>
                  <Text style={styles.date}>{dateFormatter(item.date)}</Text>
                  <Text>{item.description}</Text>
                </View>

                <View style={{ rowGap: 5 }}>
                  <Pressable
                    onPress={() =>
                      navigation.navigate("createNote", {
                        data: item,
                        edit: true,
                      })
                    }
                  >
                    <AntDesign name='edit' size={20} color={color.darkGray} />
                  </Pressable>
                  <Pressable onPress={() => deleteNotes(item.id)}>
                    <MaterialIcons
                      name='delete'
                      size={20}
                      color={color.orange}
                    />
                  </Pressable>
                </View>
              </View>
            </View>
          ))
        ) : (
          <Text style={{ textAlign: "center" }}>No notes</Text>
        )}
      </View>
    </>
  );
};

export default Notes;
