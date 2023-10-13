import React, { useEffect, useState } from "react";
import { Common, socket } from "../App";
import { TextInput, View } from "react-native";
import { Text } from "react-native";
import { commonStyles } from "../css/common";
import Button from "../components/utilitise/Button";
import Select from "../components/utilitise/Select";
import useStore from "../context/useStore";
import { Fetch } from "../services/common";
import BDT from "../components/utilitise/BDT";

const BalanceTransfer = ({ route }) => {
  const user = route.params.user;
  const [users, setUsers] = useState(null);
  const [form, setForm] = useState({
    purpose: "",
    amount: 0,
    restAmount: 0,
    to: {},
  });
  const store = useStore();

  useEffect(() => {
    (async () => {
      try {
        store.setLoading(true);
        const users = await Fetch("/user", "GET");
        const rest = users.filter((item) => item.id !== user.id);
        if (store.user.designation === "Admin") {
          const supplier = await Fetch("/supplier", "GET");
          setUsers([...rest, ...supplier]);
        } else setUsers(rest);
      } catch (error) {
        store.setMessage({ msg: error.message, type: "error" });
      } finally {
        store.setLoading(false);
      }
    })();
  }, []);

  async function onSubmit() {
    try {
      store.setLoading(true);
      form.fromUser = user.id;
      form.toUser = form.to.userId;
      const body = { ...form };
      delete body.to;
      delete body.restAmount;
      const res = await Fetch("/user/balance_transfer", "POST", body);
      store.setMessage({ msg: res.message, type: "success" });
      if (socket) {
        socket.send(
          JSON.stringify({
            type: "balance_transfer_request",
            from: store.user.id,
            to: form.to.userId,
            formName: store.user.name,
          })
        );
      }
      store.setUpdateUser((prev) => !prev);
    } catch (error) {
      setForm((prev) => {
        return { ...prev, restAmount: user.haveMoney };
      });
      store.setMessage({ msg: error.message, type: "error" });
    } finally {
      store.setLoading(false);
    }
  }

  if (store.loading) return null;
  const options = [
    { id: 1, name: "Balance Transfer" },
    { id: 2, name: "Debt Payment" },
  ];
  if (store.user.designation === "Admin") {
    options.push(
      { id: 3, name: "Purchase Product" },
      { id: 4, name: "Salary" },
      { id: 5, name: "Incentive" }
    );
  }
  return (
    <Common>
      <View style={commonStyles.formContainer}>
        <Text style={commonStyles.formHeader}>Balance Transfer</Text>
        {form.purpose && form.purpose !== "Debt Payment" ? (
          <Text
            style={{ textAlign: "center", marginBottom: 5, fontWeight: 500 }}
          >
            {form.purpose}:<BDT amount={form.restAmount || user.haveMoney} />
          </Text>
        ) : null}
        <View style={{ rowGap: 9 }}>
          <Select
            name='purpose'
            placeholder='Purpose'
            header='name'
            zIndex={150}
            editable={false}
            handler={(_, info) =>
              setForm((prev) => {
                return { ...prev, purpose: info.name };
              })
            }
            options={options}
          />
          <TextInput
            defaultValue={form.phone?.toString()}
            onChangeText={(value) => {
              setForm((prev) => {
                return {
                  ...prev,
                  amount: parseInt(value),
                  restAmount: user.haveMoney - parseInt(value),
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
            disabled={!form.amount || !form.to.userId || !form.purpose}
            onPress={onSubmit}
            title='Submit'
          />
        </View>
      </View>
    </Common>
  );
};

export default BalanceTransfer;
