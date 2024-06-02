import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  FlatList,
  Keyboard,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

import Drawar from "../../components/Drawar";
import { alert } from "../../components/utilitise/Alert";
import Button from "../../components/utilitise/Button";
import P from "../../components/utilitise/P";
import useStore from "../../context/useStore";
import { commonStyles } from "../../css/common";
import { styles } from "../../css/manageProduct";
import { Fetch } from "../../services/common";
import SettingHeader from "./SettingHeader";

const initData = { id: null, title: "", name: "" };
const Branches = () => {
  const [data, setData] = useState(initData);
  const [branches, setBranch] = useState(null);
  const [showForm, setShowFrom] = useState(false);
  const [keyboard, setKeyboard] = useState(false);
  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState(false);
  const [add, setAdd] = useState(false);
  const store = useStore();

  useEffect(() => {
    const show = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboard(true);
    });
    const hide = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboard(false);
    });

    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  useEffect(() => {
    (async () => {
      try {
        store.setLoading(true);
        const braches = await Fetch("/admin/branch", "GET");
        setBranch(braches);
      } catch (error) {
        store.setMessage({ msg: error.message, type: "error" });
      } finally {
        store.setLoading(false);
      }
    })();
    return () => store.setLoading(false);
  }, [update]);

  async function onsubmit(method, id = null) {
    try {
      Keyboard.dismiss();

      if (method === "DELETE") {
        alert("Are you sure you want to delete?", async () => {
          await action(method, id);
        });
      } else await action(method, id);
    } catch (error) {
      store.setMessage({ msg: error.message, type: "error" });
    }
  }

  async function action(method, id) {
    try {
      setLoading(true);
      const payload = { title: data.title, name: data.name, id };
      const { message } = await Fetch("/admin/branch", method, payload);
      store.setMessage({ msg: message, type: "success" });
      setShowFrom(false);
      setUpdate((prev) => !prev);
      setData(initData);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }

  return (
    <SettingHeader>
      <View style={styles.addBtn}>
        <Button
          onPress={() => {
            setShowFrom(true);
            setAdd(true);
          }}
          style={{ width: 40, height: 40, borderRadius: 100 }}
          title={<AntDesign name='pluscircle' size={22} color='#fff' />}
        />
      </View>

      <FlatList
        style={{ marginBottom: 57 }}
        data={branches}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.contentContainer}
        ItemSeparatorComponent={() => <View style={{ marginBottom: 6 }} />}
        ListEmptyComponent={() => (
          <Text style={{ textAlign: "center" }}>No Branch added</Text>
        )}
        renderItem={({ item, index }) => (
          <Pressable style={styles.itemContainer}>
            <P bold={500}>
              {index + 1}: {item.title}
            </P>
            <View style={{ flexDirection: "row", gap: 6 }}>
              <Pressable
                onPress={() => {
                  setShowFrom(true);
                  setData(item);
                }}
              >
                <Feather name='edit' size={18} color='black' />
              </Pressable>
              <Pressable onPress={() => onsubmit("DELETE", item.id)}>
                <MaterialIcons name='delete' size={20} color='black' />
              </Pressable>
            </View>
          </Pressable>
        )}
      />

      <Drawar
        setShowModal={() => setShowFrom(false)}
        show={showForm}
        bottom={keyboard ? 350 : 300}
      >
        <View style={{ rowGap: 9 }}>
          <P
            align='center'
            size={17}
            bold={500}
            style={{ textDecorationLine: "underline" }}
          >
            {add ? "Add New " : "Edit "} Branch
          </P>
          <TextInput
            defaultValue={data.name}
            onChangeText={(value) =>
              setData((prev) => {
                return { ...prev, name: value };
              })
            }
            style={commonStyles.input}
            placeholder='Branch name'
          />
          <TextInput
            defaultValue={data.title}
            onChangeText={(value) =>
              setData((prev) => {
                return { ...prev, title: value };
              })
            }
            style={commonStyles.input}
            placeholder='Branch title'
          />

          <Button
            disabled={loading}
            title={loading ? "Saving..." : "Save"}
            onPress={() => {
              if (data.id) onsubmit("PUT", data.id);
              else onsubmit("POST");
            }}
          />
        </View>
      </Drawar>
    </SettingHeader>
  );
};

export default Branches;
