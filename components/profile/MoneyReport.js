import React, { useState } from "react";
import { Text, View } from "react-native";
import { commonStyles } from "../../css/common";
import { color } from "../utilitise/colors";
import { styles } from "../../css/profile";
import useStore from "../../context/useStore";
import { Fetch } from "../../services/common";
import Button from "../utilitise/Button";
import BDT from "../utilitise/BDT";
import { Pressable } from "react-native";

const MoneyReport = ({ transactions, user }) => {
  const [showDate, setShowDate] = useState(-1);
  const store = useStore();

  async function achieveBalance(data) {
    try {
      store.setLoading(true);
      const result = await Fetch("/user/receive_balance", "POST", data);
      store.setMessage({ msg: result.message, type: "success" });
      store.setUpdateUser((prev) => !prev);
      store.setUpdateReport((prev) => !prev);
    } catch (error) {
      store.setMessage({ msg: error.message, type: "error" });
    } finally {
      store.setLoading(false);
    }
  }

  return (
    <>
      <Text style={commonStyles.heading}>Money Report</Text>
      <View style={{ ...styles.workContainer, marginBottom: 20 }}>
        {!transactions.length ? (
          <Text>No money transition pending </Text>
        ) : (
          transactions.map((trs, i) => {
            return (
              <View style={{ width: "100%" }} key={trs.id}>
                <View
                  style={{
                    ...commonStyles.tableRow,
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ fontWeight: 500 }}>From User</Text>
                  <Text style={{ fontWeight: 500 }}>To User</Text>
                  <Text style={{ fontWeight: 500 }}>Purpose</Text>
                  <Text style={{ fontWeight: 500 }}>Amount</Text>
                </View>
                <Pressable
                  onPress={() =>
                    setShowDate((prev) => {
                      if (prev === i) return -1;
                      return i;
                    })
                  }
                  style={{
                    rowGap: 3,
                    borderBottomWidth: 1,
                    paddingBottom: 3,
                    borderBottomColor: color.gray,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      backgroundColor: "#e3ac07",
                    }}
                  >
                    <Text>{trs.fromUsername}</Text>
                    <Text>{trs.toUsername}</Text>
                    <Text>{trs.purpose}</Text>
                    <BDT amount={trs.amount} />
                  </View>
                  {showDate === i ? (
                    <Text
                      style={{ textAlign: "center", color: color.darkGray }}
                    >
                      Req Time: {new Date(trs.transfer_time).toLocaleString()}
                    </Text>
                  ) : null}
                  {trs.toUser === user.id ? (
                    <Button
                      onPress={() => achieveBalance(trs)}
                      style={{ paddingVertical: 3 }}
                      title='Achieve'
                    />
                  ) : null}
                </Pressable>
              </View>
            );
          })
        )}
      </View>
    </>
  );
};

export default MoneyReport;
