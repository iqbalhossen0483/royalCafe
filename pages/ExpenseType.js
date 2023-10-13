import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Keyboard,
  Pressable,
  TextInput,
} from "react-native";
import { Text, View } from "react-native";
import { Common } from "../App";
import Button from "../components/utilitise/Button";
import { Ionicons } from "@expo/vector-icons";
import { alert } from "../components/utilitise/Alert";
import { styles } from "../css/manageProduct";
import Drawar from "../components/Drawar";
import useStore from "../context/useStore";
import { Fetch } from "../services/common";
import { commonStyles } from "../css/common";
import { Feather, MaterialIcons } from "@expo/vector-icons";

const ExpenseType = () => {
  const [showForm, setShowFrom] = useState(false);
  const [loading, setLoading] = useState(false);
  const [expenses, setExpenses] = useState(null);
  const [keyboard, setKeyboard] = useState(false);
  const [data, setData] = useState({ id: null, title: "" });
  const [update, setUpdate] = useState(false);
  const store = useStore();
  const height = Dimensions.get("window").height;

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
        const expense = await Fetch("/expense/type", "GET");
        setExpenses(expense);
      } catch (error) {
        store.setMessage({ msg: error.message, type: "error" });
      } finally {
        store.setLoading(false);
      }
    })();
    return () => store.setLoading(false);
  }, [update]);

  async function actionsForExpenseType(method, id = null) {
    try {
      Keyboard.dismiss();

      if (method === "DELETE")
        alert("Are you sure you want to delete?", async () => {
          await action(method, id);
        });
      else await action(method, id);
    } catch (error) {
      store.setMessage({ msg: error.message, type: "error" });
    }
  }
  async function action(method, id) {
    try {
      setLoading(true);
      const payload = { title: data.title, id };
      const { message } = await Fetch("/expense/type", method, payload);
      store.setMessage({ msg: message, type: "success" });
      setShowFrom(false);
      setUpdate((prev) => !prev);
      setData("");
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }

  return (
    <Common>
      <View style={styles.addBtn}>
        <Button
          onPress={() => setShowFrom(true)}
          style={{ width: 40, height: 40, borderRadius: 100 }}
          title={
            <Ionicons name='ios-add-circle-sharp' size={24} color='#fff' />
          }
        />
      </View>

      <FlatList
        style={{ marginBottom: height - height * 0.93 }}
        data={expenses}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.contentContainer}
        ItemSeparatorComponent={() => <View style={{ marginBottom: 6 }} />}
        ListEmptyComponent={() => (
          <Text style={{ textAlign: "center" }}>No expense type added</Text>
        )}
        renderItem={({ item, index }) => (
          <Pressable style={styles.itemContainer}>
            <Text style={{ fontWeight: 500 }}>
              {index + 1}: {item.title}
            </Text>
            <View style={{ flexDirection: "row", gap: 6 }}>
              <Pressable
                onPress={() => {
                  setShowFrom(true);
                  setData({ id: item.id, title: item.title });
                }}
              >
                <Feather name='edit' size={18} color='black' />
              </Pressable>
              <Pressable
                onPress={() => actionsForExpenseType("DELETE", item.id)}
              >
                <MaterialIcons name='delete' size={20} color='black' />
              </Pressable>
            </View>
          </Pressable>
        )}
      />
      <Drawar
        setShowModal={() => setShowFrom(null)}
        show={showForm}
        bottom={keyboard ? 350 : 300}
      >
        <View style={{ rowGap: 9 }}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 17,
              fontWeight: "500",
              textDecorationLine: "underline",
            }}
          >
            Add Expense Type
          </Text>
          <TextInput
            defaultValue={data.title}
            onChangeText={(value) =>
              setData((prev) => {
                return { id: prev.id, title: value };
              })
            }
            style={commonStyles.input}
            placeholder='Expense type / title'
          />
          <Button
            disabled={!data || loading}
            title={loading ? "Saving..." : "Save"}
            onPress={() => {
              if (data.id) actionsForExpenseType("PUT", data.id);
              else actionsForExpenseType("POST");
            }}
          />
        </View>
      </Drawar>
    </Common>
  );
};

export default ExpenseType;
