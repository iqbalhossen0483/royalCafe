import React, { useEffect, useState } from "react";
import { Common } from "../App";
import { TextInput, View } from "react-native";
import { Text } from "react-native";
import { commonStyles } from "../css/common";
import Button from "../components/utilitise/Button";
import Select from "../components/utilitise/Select";
import useStore from "../context/useStore";
import { Fetch } from "../services/common";

const BalanceTransfer = ({ route }) => {
  const [users, setUsers] = useState(null);
  const [info, setInfo] = useState({
    name: "",
    amount: 0,
    restAmount: 0,
  });
  const [form, setForm] = useState({
    amount: 0,
    to: null,
    purpose: "",
  });
  const user = route.params.user;
  const store = useStore();

  useEffect(() => {
    (async () => {
      try {
        const users = await Fetch("/user", "GET");
        const rest = users.filter((item) => item.id !== store.user.id);
        setUsers(rest);
      } catch (error) {
        store.setMessage({ msg: error.message, type: "error" });
      }
    })();
  }, []);

  function handlePurpose(info) {
    setForm((prev) => {
      return {
        ...prev,
        purpose: info.name,
      };
    });
    setInfo({
      name: info.name === "Sale" ? "Balance" : info.name,
      amount: info.name === "Debt" ? user.debt : user.salesMoney,
      restAmount: info.name === "Debt" ? user.debt : user.salesMoney,
    });
  }

  function handleChange(name, value) {
    setForm((prev) => {
      return { ...prev, [name]: value };
    });
  }
  function onSubmit() {
    console.log(form);
  }

  return (
    <Common>
      <View style={commonStyles.formContainer}>
        <Text style={commonStyles.formHeader}>Balance Transfer</Text>
        {info.name ? (
          <Text
            style={{ textAlign: "center", marginBottom: 5, fontWeight: 500 }}
          >
            {info.name}: {info.restAmount}
          </Text>
        ) : null}
        <View style={{ rowGap: 9 }}>
          <Select
            name='purpose'
            placeholder='Purpose'
            url=''
            header='name'
            zIndex={150}
            handler={(_, info) => handlePurpose(info)}
            options={[
              { id: 1, name: "Sale" },
              { id: 2, name: "Debt" },
            ]}
          />
          <TextInput
            defaultValue={form.phone?.toString()}
            onChangeText={(value) => {
              handleChange("amount", parseInt(value));
              setInfo((prev) => {
                return {
                  ...prev,
                  restAmount: prev.amount - parseInt(value || 0),
                };
              });
            }}
            style={commonStyles.input}
            placeholder='Amount ৳'
            keyboardType='numeric'
          />

          <Select
            name='to'
            placeholder='To'
            url=''
            header='name'
            handler={(_, info) =>
              setForm((prev) => {
                return {
                  ...prev,
                  to: {
                    userId: info.id,
                    name: info.name,
                  },
                };
              })
            }
            options={users}
          />
          <Button
            disabled={
              !form.amount || !form.to || !form.purpose || info.restAmount < 0
            }
            onPress={onSubmit}
            title='Submit'
          />
        </View>
      </View>
    </Common>
  );
};

export default BalanceTransfer;
