import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Keyboard,
  Pressable,
  TextInput,
} from "react-native";
import { Image } from "react-native";
import { Text, View } from "react-native";
import { Common } from "../App";
import Button from "../components/utilitise/Button";
import { color } from "../components/utilitise/colors";
import {
  Ionicons,
  Feather,
  MaterialCommunityIcons,
  Octicons,
} from "@expo/vector-icons";
import { alert } from "../components/utilitise/Alert";
import { styles } from "../css/manageProduct";
import Drawar from "../components/Drawar";
import SubMenu from "../components/footer/SubMenu";
import useStore from "../context/useStore";
import { Fetch, serverUrl } from "../services/common";
import { commonStyles } from "../css/common";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import Commission from "../components/manageUser/Commission";

const ManageUsers = ({ navigation }) => {
  const [showForm, setShowFrom] = useState(null);
  const [users, setUsers] = useState(null);
  const [targetForm, setTargetForm] = useState(null);
  const height = Dimensions.get("window").height;

  const store = useStore();
  const [data, setData] = useState({
    targetedAmount: 0,
    end_date: null,
    start_date: null,
    commission: 0,
  });

  useEffect(() => {
    (async () => {
      try {
        store.setLoading(true);
        const users = await Fetch("/user", "GET");
        const rest = users.filter((item) => item.id !== store.user.id);
        setUsers(rest);
      } catch (error) {
        store.setMessage({ msg: error.message, type: "error" });
      } finally {
        store.setLoading(false);
      }
    })();
  }, [store.updateUser]);

  function removeUser(id, profile) {
    alert("Are you sure to remove?", async () => {
      try {
        store.setLoading(true);
        const { message } = await Fetch(
          `/user?id=${id}&profile=${profile}`,
          "DELETE"
        );
        store.setMessage({ msg: message, type: "success" });
        const rest = users.filter((user) => user.id !== id);
        setUsers(rest);
      } catch (error) {
        store.setMessage({ msg: error.message, type: "error" });
      } finally {
        store.setLoading(false);
      }
    });
  }

  const showDatepicker = (col) => {
    DateTimePickerAndroid.open({
      value: new Date(),
      onChange: (event, selectedDate) => {
        setData((prev) => {
          return { ...prev, [col]: selectedDate };
        });
      },
      mode: "date",
      is24Hour: true,
    });
  };

  async function handleTarget() {
    try {
      Keyboard.dismiss();
      store.setLoading(true);
      data.user_id = targetForm.id;
      const selectedDay = data.start_date.getTime();
      const today = new Date().getTime();
      if (selectedDay <= today) {
        data.status = "running";
      } else {
        data.status = "pending";
      }
      data.remainingAmount = data.targetedAmount;
      const { message } = await Fetch(`/user/target`, "POST", data);
      setTargetForm(null);
      store.setMessage({ msg: message, type: "success" });
    } catch (error) {
      store.setMessage({ msg: error.message, type: "error" });
    } finally {
      store.setLoading(false);
    }
  }

  const isExistTarget = targetForm?.targets?.find(
    (tc) => tc.status === "pending" || tc.status === "running"
  );

  return (
    <Common>
      <View style={styles.addBtn}>
        <Button
          onPress={() => navigation.navigate("addUser")}
          style={{ width: 40, height: 40, borderRadius: 100 }}
          title={
            <Ionicons name='ios-add-circle-sharp' size={24} color='#fff' />
          }
        />
      </View>

      <FlatList
        style={{ marginBottom: height - height * 0.93 }}
        data={users}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.contentContainer}
        ItemSeparatorComponent={() => <View style={{ marginBottom: 6 }} />}
        ListEmptyComponent={() => (
          <Text style={{ textAlign: "center" }}>No user</Text>
        )}
        ListHeaderComponent={() => <Commission store={store} />}
        renderItem={({ item: user }) => {
          const targets = {
            pending: 0,
            running: 0,
            achieved: 0,
            failed: 0,
          };
          user.targets?.forEach((tc) => {
            if (tc.status === "pending") targets.pending++;
            else if (tc.status === "running") targets.running++;
            else if (tc.status === "achieved") targets.achieved++;
            else if (tc.status === "failed") targets.failed++;
          });
          return (
            <Pressable
              style={styles.itemContainer}
              onPress={() => setShowFrom(user)}
            >
              <View style={{ flexDirection: "row", gap: 7 }}>
                {user.profile ? (
                  <Image
                    style={{ width: 40, height: 55, borderRadius: 5 }}
                    source={{ uri: serverUrl + user.profile }}
                    alt=''
                  />
                ) : (
                  <Image
                    style={{ width: 40, height: 55, borderRadius: 5 }}
                    source={require("../assets/no-photo.png")}
                    alt=''
                  />
                )}
                <View>
                  <Text style={{ fontSize: 16, fontWeight: 500 }}>
                    {user.name}
                  </Text>
                  <Text style={{ color: color.darkGray, fontWeight: 500 }}>
                    {user.designation}
                  </Text>
                  <Text style={{ color: color.darkGray }}>{user.phone}</Text>
                </View>
              </View>
              <View>
                <Text style={{ textAlign: "center", fontWeight: 500 }}>
                  Targets Report
                </Text>
                <Text style={{ color: "#946f09" }}>
                  Pending: {targets.pending}
                </Text>
                <Text style={{ color: "#75850c" }}>
                  Running: {targets.running}
                </Text>
                <Text style={{ color: "#038a0a" }}>
                  Achieved: {targets.achieved}
                </Text>
                <Text style={{ color: "#946f09" }}>
                  Failed: {targets.failed}
                </Text>
              </View>
            </Pressable>
          );
        }}
      />
      <Drawar
        setShowModal={() => setShowFrom(null)}
        show={showForm ? true : false}
      >
        <SubMenu
          name='Edit'
          navigate={false}
          onPress={() =>
            navigation.navigate("addUser", { edit: true, data: showForm })
          }
          bgColor='#f7d5f6'
          showModal={setShowFrom}
          icon={<Feather name='edit' size={16} color='#d638d2' />}
        />
        <SubMenu
          name='Remove'
          bgColor={color.lightOrange}
          navigate={false}
          showModal={setShowFrom}
          onPress={() => removeUser(showForm.id, showForm.profile)}
          icon={
            <MaterialCommunityIcons
              name='archive-remove'
              size={18}
              color={color.orange}
            />
          }
        />

        <SubMenu
          name='Report'
          navigate={false}
          onPress={() =>
            navigation.navigate("profile", { userId: showForm.id, edit: false })
          }
          bgColor='#d7e5f5'
          showModal={setShowFrom}
          icon={<Octicons name='report' size={16} color='#3b83db' />}
        />
        <SubMenu
          name='Give Target'
          navigate={false}
          onPress={() => setTargetForm(showForm)}
          bgColor='#d3b0e8'
          showModal={setShowFrom}
          icon={
            <MaterialCommunityIcons
              name='target-account'
              size={24}
              color='#970ced'
            />
          }
        />
      </Drawar>

      <Drawar
        setShowModal={() => setTargetForm(null)}
        show={targetForm ? true : false}
        coverScreen
      >
        <View style={{ rowGap: 6 }}>
          <Text style={{ ...commonStyles.formHeader, fontSize: 14 }}>
            Give a target to {targetForm?.name}
          </Text>
          {isExistTarget ? (
            <Text style={{ marginTop: -10, color: "#ad6109" }}>
              A target is pending or running
            </Text>
          ) : null}
          <TextInput
            style={commonStyles.input}
            placeholder='Targeted Amount $'
            keyboardType='phone-pad'
            onChangeText={(value) =>
              setData((prev) => {
                return {
                  ...prev,
                  targetedAmount: value,
                };
              })
            }
          />
          <Pressable onPress={() => showDatepicker("start_date")}>
            <TextInput
              style={commonStyles.input}
              placeholder='Start Date'
              editable={false}
              value={
                data.start_date
                  ? data.start_date.toLocaleDateString("en-GB")
                  : "Start Date"
              }
            />
          </Pressable>
          <Pressable onPress={() => showDatepicker("end_date")}>
            <TextInput
              style={commonStyles.input}
              placeholder='End Date'
              editable={false}
              value={
                data.end_date
                  ? data.end_date.toLocaleDateString("en-GB")
                  : "End Date"
              }
            />
          </Pressable>
          <TextInput
            style={commonStyles.input}
            placeholder='commission %'
            keyboardType='phone-pad'
            onChangeText={(value) =>
              setData((prev) => {
                return {
                  ...prev,
                  commission: value,
                };
              })
            }
          />
          <Button
            disabled={
              !data.targetedAmount ||
              !data.commission ||
              !data.end_date ||
              !data.start_date ||
              isExistTarget
            }
            onPress={handleTarget}
            title={store.loading ? "Loading..." : "Save Target"}
          />
        </View>
      </Drawar>
    </Common>
  );
};

export default ManageUsers;
