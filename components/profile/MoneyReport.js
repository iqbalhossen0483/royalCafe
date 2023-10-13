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
import { socket } from "../../App";

const MoneyReport = ({ transactions, user }) => {
  const [showDate, setShowDate] = useState(-1);
  const store = useStore();

  async function achieveBalance(data) {
    try {
      store.setLoading(true);
      const result = await Fetch("/user/receive_balance", "POST", data);
      store.setMessage({ msg: result.message, type: "success" });
      if (socket) {
        socket.send(
          JSON.stringify({
            type: "balance_accepted",
            fromUser: data.fromUser,
            toUser: user.id,
            toUserName: user.name,
          })
        );
      }
      store.setUpdateUser((prev) => !prev);
      store.setUpdateReport((prev) => !prev);
    } catch (error) {
      store.setMessage({ msg: error.message, type: "error" });
    } finally {
      store.setLoading(false);
    }
  }

  async function declineRequest(id, fromUser) {
    try {
      const result = await Fetch(`/user/decline_balance?id=${id}`, "DELETE");
      store.setMessage({ msg: result.message, type: "success" });
      if (socket) {
        socket.send(
          JSON.stringify({
            type: "balance_decline",
            fromUser: fromUser,
            toUser: user.id,
            toUserName: user.name,
          })
        );
      }
      store.setUpdateUser((prev) => !prev);
    } catch (error) {
      store.setMessage({ msg: error.message, type: "error" });
    }
  }

  return (
    <>
      <Text style={commonStyles.heading}>Money Report</Text>
      <View style={{ ...styles.workContainer, marginBottom: 20 }}>
        <View style={{ width: "100%" }}>
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
          {!transactions.length ? (
            <Text style={{ textAlign: "center" }}>
              No money transition pending{" "}
            </Text>
          ) : (
            transactions.map((trs, i) => {
              return (
                <Pressable
                  key={trs.id}
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
                    <View
                      style={{
                        justifyContent: "center",
                        flexDirection: "row",
                        width: "100%",
                        columnGap: 10,
                      }}
                    >
                      <Button
                        onPress={() => achieveBalance(trs)}
                        style={{ paddingVertical: 3, width: "45%" }}
                        title='Achieve'
                      />
                      <Button
                        onPress={() => declineRequest(trs.id, trs.fromUser)}
                        style={{
                          paddingVertical: 3,
                          width: "45%",
                          backgroundColor: color.orange,
                        }}
                        title='Decline'
                      />
                    </View>
                  ) : null}
                </Pressable>
              );
            })
          )}
        </View>
      </View>
    </>
  );
};

export default MoneyReport;
