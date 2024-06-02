import { View } from "react-native";
import React from "react";

import { commonStyles } from "../../css/common";
import TimerComponent from "./TimerComponent";
import { styles } from "../../css/profile";
import Button from "../utilitise/Button";
import BDT from "../utilitise/BDT";
import P from "../utilitise/P";

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
      <P bold={500} style={commonStyles.heading}>
        Targets
      </P>
      <View style={styles.workContainer}>
        <View>
          <P>Targets Report</P>
          <P style={{ color: "#946f09" }}>Pending: {targets.pending}</P>
          <P style={{ color: "#75850c" }}>Running: {targets.running}</P>
          <P style={{ color: "#038a0a" }}>Achieved: {targets.achieved}</P>
          <P style={{ color: "#946f09" }}>Failed: {targets.failed}</P>
        </View>
        {pendingTarget || runningTarget ? (
          <TimerComponent
            pendingTarget={pendingTarget}
            runningTarget={runningTarget}
          />
        ) : null}

        {commision ? (
          <View>
            <P bold={500}>Pending Commission</P>
            <P>
              Targeted Amount: <BDT amount={commision.targetedAmount} />
            </P>
            <P>
              Got Commission: <BDT amount={commision.commission} />
            </P>
            <P>
              Status: <P color='green'>Achieve</P>
            </P>
            {activeUser.designation === "Admin" ? (
              <Button style={{ paddingVertical: 3 }} title='Give Commission' />
            ) : (
              <P color='orange'>Waiting to achieve</P>
            )}
          </View>
        ) : null}
      </View>
    </>
  );
};

export default Target;
