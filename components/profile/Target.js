import React from "react";
import { Text, View } from "react-native";
import { commonStyles } from "../../css/common";
import { styles } from "../../css/profile";
import TimerComponent from "./TimerComponent";
import { color } from "../utilitise/colors";
import BDT from "../utilitise/BDT";
import Button from "../utilitise/Button";

const Target = ({ commision, activeUser, user }) => {
  const targets = {
    pending: 0,
    running: 0,
    achieved: 0,
    failed: 0,
  };
  let pendingTarget = null;
  let runningTarget = null;
  user.targets?.forEach((tc) => {
    if (tc.status === "pending") {
      targets.pending++;
      pendingTarget = tc;
    } else if (tc.status === "running") {
      targets.running++;
      runningTarget = tc;
    } else if (tc.status === "achieved") targets.achieved++;
    else if (tc.status === "failed") targets.failed++;
  });

  return (
    <>
      <Text style={commonStyles.heading}>Targets</Text>
      <View style={styles.workContainer}>
        <View>
          <Text style={{ textAlign: "center", fontWeight: 500 }}>
            Targets Report
          </Text>
          <Text style={{ color: "#946f09" }}>Pending: {targets.pending}</Text>
          <Text style={{ color: "#75850c" }}>Running: {targets.running}</Text>
          <Text style={{ color: "#038a0a" }}>Achieved: {targets.achieved}</Text>
          <Text style={{ color: "#946f09" }}>Failed: {targets.failed}</Text>
        </View>
        {pendingTarget || runningTarget ? (
          <TimerComponent
            pendingTarget={pendingTarget}
            runningTarget={runningTarget}
          />
        ) : null}

        {commision ? (
          <View>
            <Text style={{ fontWeight: 500 }}>Pending Commission</Text>
            <Text>
              Targeted Amount: <BDT amount={commision.targetedAmount} />
            </Text>
            <Text>
              Got Commission: <BDT amount={commision.commission} />
            </Text>
            <Text>
              Status: <Text style={{ color: color.green }}>Achieve</Text>{" "}
            </Text>
            {activeUser.designation === "Admin" ? (
              <Button style={{ paddingVertical: 3 }} title='Give Commission' />
            ) : (
              <Text style={{ color: color.orange }}>Waiting to achieve</Text>
            )}
          </View>
        ) : null}
      </View>
    </>
  );
};

export default Target;
