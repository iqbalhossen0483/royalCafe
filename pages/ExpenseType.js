import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Keyboard,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

import { Common } from "../components/Common";
import Drawar from "../components/Drawar";
import { alert } from "../components/utilitise/Alert";
import Button from "../components/utilitise/Button";
import P from "../components/utilitise/P";
import useStore from "../context/useStore";
import { commonStyles } from "../css/common";
import { styles } from "../css/manageProduct";
import { Fetch } from "../services/common";

const ExpenseType = () => {
  const [showForm, setShowFrom] = useState(false);
  const [loading, setLoading] = useState(false);
  const [expenses, setExpenses] = useState(null);
  const [keyboard, setKeyboard] = useState(false);
  const [data, setData] = useState({ id: null, title: "" });
  const [update, setUpdate] = useState(false);
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
          title={<AntDesign name='pluscircle' size={22} color='#fff' />}
        />
      </View>

      <FlatList
        style={{ marginBottom: 57 }}
        data={expenses}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.contentContainer}
        ItemSeparatorComponent={() => <View style={{ marginBottom: 6 }} />}
        ListEmptyComponent={() => (
          <Text style={{ textAlign: "center" }}>No expense type added</Text>
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
          <P
            align='center'
            size={17}
            bold={500}
            style={{ textDecorationLine: "underline" }}
          >
            Add Expense Type
          </P>
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
