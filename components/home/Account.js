import React, { useState } from "react";
import { View } from "react-native";
import { Text } from "react-native";
import { commonStyles } from "../../css/common";
import { accounts, users } from "../../data";
import { style } from "../../css/home";
import BDT from "../utilitise/BDT";

const Account = () => {
  const styles = { width: "30%" };
  return (
    <View style={style.accountContainer}>
      <Text style={{ ...commonStyles.heading, marginTop: 0, marginBottom: 15 }}>
        Account of Money
      </Text>
      <View style={commonStyles.tableRow}>
        <Text style={{ ...styles, fontWeight: 500 }}>Name</Text>
        <Text style={{ ...styles, fontWeight: 500 }}>Debt</Text>
        <Text style={{ ...styles, fontWeight: 500 }}>Balance</Text>
      </View>
      {users.map((item) => (
        <View style={commonStyles.tableRow} key={item.id}>
          <Text style={styles}>{item.name}</Text>
          <BDT style={styles} amount={item.salesMoney} />
          <BDT style={styles} amount={item.debt || 0} />
        </View>
      ))}
    </View>
  );
};

export default Account;
