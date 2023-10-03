import React, { useState } from "react";
import { Keyboard, Text, TextInput, View } from "react-native";
import { Common } from "../App";
import { commonStyles } from "../css/common";
import Select from "../components/utilitise/Select";
import Button from "../components/utilitise/Button";
import useStore from "../context/useStore";
import { Fetch } from "../services/common";

const AddExpense = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    type: "",
    amount: 0,
  });
  const store = useStore();

  async function onSubmit() {
    try {
      setLoading(true);
      Keyboard.dismiss();
      data.amount = parseInt(data.amount);
      data.created_by = store.user.id;
      data.userDesignation = store.user.designation;
      data.date = new Date().toISOString();
      const { message } = await Fetch("/expense", "POST", data);
      store.setMessage({ msg: message, type: "success" });
      store.setUpdateUser((prev) => !prev);
      store.setUpdateReport((prev) => !prev);
      store.setUpdateExpense((prev) => !prev);
    } catch (error) {
      store.setMessage({ msg: error.message, type: "error" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Common>
      <View style={commonStyles.formContainer}>
        <Text style={commonStyles.formHeader}>Add Expense</Text>

        <View style={{ rowGap: 10 }}>
          <Select
            name='expense_type'
            placeholder='Expense Type'
            url='/expense/type'
            header='title'
            handler={(_, info) => {
              setData((prev) => {
                return { amount: prev.amount, type: info.title };
              });
            }}
          />
          <TextInput
            onChangeText={(value) =>
              setData((prev) => {
                return { amount: value, type: prev.type };
              })
            }
            keyboardType='phone-pad'
            style={commonStyles.input}
            placeholder='Amount $'
          />
          <Button
            title={loading ? "Saving..." : "Save"}
            disabled={!data.type || !data.amount}
            onPress={onSubmit}
          />
        </View>
      </View>
    </Common>
  );
};

export default AddExpense;
