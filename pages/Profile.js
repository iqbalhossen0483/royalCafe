import React, { useEffect, useState } from "react";
import { Common } from "../App";
import { Image, Text, View } from "react-native";
import { styles } from "../css/profile";
import Button from "../components/utilitise/Button";
import { commonStyles } from "../css/common";
import BDT from "../components/utilitise/BDT";
import { alert } from "../components/utilitise/Alert";
import { Fetch, dateFormatter, serverUrl } from "../services/common";
import useStore from "../context/useStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { color } from "../components/utilitise/colors";
import { ScrollView } from "react-native";

const Profile = ({ route, navigation }) => {
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState(null);
  const { setUser, updateNote, setMessage } = useStore();
  const user = route.params?.data;
  function goForEdit() {
    navigation.navigate("addUser", {
      edit: true,
      data: user,
      user: true,
    });
  }

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const notes = await Fetch(`/notes?userId=${user.id}`, "GET");
        setNotes(notes);
      } catch (error) {
        Store.setMessage({ msg: error.message, type: "error" });
      } finally {
        setLoading(false);
      }
    })();
  }, [updateNote]);

  function logOut() {
    alert("Are you sure to log Out?", async () => {
      await AsyncStorage.removeItem("token");
      setUser(null);
    });
  }

  function deleteNotes(id) {
    alert("Are you sure to log Out?", async () => {
      try {
        setLoading(true);
        const { message } = await Fetch(`/notes?id=${id}`, "DELETE");
        setLoading(false);
        setMessage({ msg: message, type: "success" });
        const rest = notes.filter((item) => item.id !== id);
        setNotes(rest);
      } catch (error) {
        setLoading(false);
        setMessage({ msg: error.message, type: "error" });
      }
    });
  }

  if (!user) return null;
  return (
    <Common>
      <ScrollView style={styles.container}>
        <View style={styles.profileContainer}>
          <View style={styles.profileWrapper}>
            {user.profile ? (
              <Image
                style={styles.profile}
                source={{ uri: serverUrl + user.profile }}
              />
            ) : (
              <Image
                style={styles.profile}
                source={require("../assets/no-photo.png")}
              />
            )}
            <View>
              <Text style={styles.name}>{user.name}</Text>
              <Text style={styles.designation}>{user.designation}</Text>
              <Text style={styles.phone}>{user.phone}</Text>
            </View>
          </View>
          <View style={{ marginTop: 8, flexDirection: "row", columnGap: 10 }}>
            <Button
              onPress={() =>
                navigation.navigate("balanceTransfer", { user: user })
              }
              title='Money Transfer'
            />
            {route.params.edit ? (
              <>
                <Button onPress={goForEdit} title='Edit Profile' />
                <Button
                  style={{ backgroundColor: "#e8a72e" }}
                  onPress={logOut}
                  title='LogOut'
                />
              </>
            ) : null}
          </View>
        </View>

        <Text style={commonStyles.heading}>Summery</Text>
        <View style={styles.workContainer}>
          <Text style={{ ...styles.workText, color: "#191ce3" }}>
            Balance: <BDT amount={user.haveMoney} />
          </Text>
          <Text style={{ ...styles.workText, color: "#e319a6" }}>
            Debt: <BDT amount={user.debt} />
          </Text>
          <Text style={styles.workText}>
            Dilivered Order: <BDT amount={user.delivered} bdtSign={false} />
          </Text>
        </View>

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
      </ScrollView>
    </Common>
  );
};

export default Profile;
