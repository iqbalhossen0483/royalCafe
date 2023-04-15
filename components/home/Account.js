import React, { useState } from "react";
import { Entypo, Octicons } from "@expo/vector-icons";
import { View } from "react-native";
import { Text } from "react-native";
import { commonStyles } from "../../css/common";
import { accounts } from "../../data";
import { style } from "../../css/home";
import { Pressable } from "react-native";
import BDT from "../utilitise/BDT";
import { color } from "../utilitise/colors";
import Drawar from "../Drawar";
import { useNavigation } from "@react-navigation/native";

const Account = () => {
  const [show, setShow] = useState(null);
  const [data, setData] = useState({ name: "", haveMoney: 0 });
  const navigation = useNavigation();

  function handler(data) {
    setData({ name: data.name, haveMoney: data.haveMoney });
    setShow(data.details);
  }

  const textStyle = { width: "20%", textAlign: "center" };
  return (
    <View style={style.accountContainer}>
      <Text style={{ ...commonStyles.heading, marginTop: 0, marginBottom: 15 }}>
        Account of Money
      </Text>
      {accounts.map((item) => (
        <View style={style.accountItem} key={item.id}>
          <Text>{item.name}</Text>
          <BDT amount={item.haveMoney} />
          <Pressable
            onPress={() => {
              if (item.details.length) handler(item);
              else navigation.navigate("transitions");
            }}
            style={{ marginLeft: "auto" }}
          >
            {item.details.length ? (
              <Entypo name='eye' size={20} color={color.darkGray} />
            ) : (
              <Octicons name='history' size={19} color={color.darkGray} />
            )}
          </Pressable>
        </View>
      ))}
      <Drawar
        setShowModal={() => setShow(null)}
        show={show ? true : false}
        coverScreen={true}
        bottom={300}
        width='100%'
        rowGap={0}
      >
        <Text style={{ marginBottom: 5, textAlign: "center", fontWeight: 500 }}>
          {data.name}'s Report
        </Text>
        <View style={commonStyles.tableRow}>
          <Text style={{ ...textStyle, fontWeight: 500 }}>Name</Text>
          <Text style={{ ...textStyle, fontWeight: 500 }}>Amount</Text>
          <Text style={{ ...textStyle, fontWeight: 500 }}>Status</Text>
          <Text style={{ ...textStyle, fontWeight: 500 }}>Date</Text>
        </View>
        {show &&
          show.map((item) => (
            <View
              key={item.id}
              style={{
                ...commonStyles.tableRow,
                backgroundColor: item.status === "Debt" ? "#f0cfb6" : "#cdf0b6",
              }}
            >
              <Text style={textStyle}>{item.name}</Text>
              <Text style={textStyle}>{item.amount}</Text>
              <Text style={textStyle}>{item.status}</Text>
              <Text style={textStyle}>{item.date}</Text>
            </View>
          ))}
        <Text style={{ marginTop: 5, textAlign: "center" }}>
          Remaining: <BDT amount={data.haveMoney} />
        </Text>
      </Drawar>
    </View>
  );
};

export default Account;
