import React, { useState } from "react";
import { Pressable, View } from "react-native";

import useStore from "../../context/useStore";
import { commonStyles } from "../../css/common";
import { styles } from "../../css/profile";
import { Fetch } from "../../services/common";
import { socket } from "../Layout";
import BDT from "../utilitise/BDT";
import Button from "../utilitise/Button";
import P from "../utilitise/P";
import { color } from "../utilitise/colors";

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
      store.setLoading(true);
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
    } finally {
      store.setLoading(false);
    }
  }

  return (
    <View>
      <P bold={500} style={commonStyles.heading}>
        Money Report
      </P>
      <View style={{ ...styles.workContainer }}>
        <View style={{ width: "100%" }}>
          <View
            style={{
              ...commonStyles.tableRow,
              justifyContent: "space-between",
            }}
          >
            <P bold={500}>From User</P>
            <P bold={500}>To User</P>
            <P bold={500}>Purpose</P>
            <P bold={500}>Amount</P>
          </View>
          {!transactions.length ? (
            <P align='center'>No money transition pending </P>
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
                    <P>{trs.fromUsername}</P>
                    <P>{trs.toUsername}</P>
                    <P>{trs.purpose}</P>
                    <BDT amount={trs.amount} />
                  </View>
                  {showDate === i ? (
                    <P align='center' color='darkGray'>
                      Req Time: {new Date(trs.transfer_time).toLocaleString()}
                    </P>
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
                        disabled={store.loading}
                        onPress={() => achieveBalance(trs)}
                        style={{ paddingVertical: 3, width: "45%" }}
                        title='Achieve'
                      />
                      <Button
                        disabled={store.loading}
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
    </View>
  );
};

export default MoneyReport;
