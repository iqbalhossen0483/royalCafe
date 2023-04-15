import React, { useState } from "react";
import { FlatList, View } from "react-native";
import { Common } from "../App";
import { transitions } from "../data";
import { Text } from "react-native";
import BDT from "../components/utilitise/BDT";
import { color } from "../components/utilitise/colors";

const Transitions = () => {
  let data = {
    Sales: 20000,
    Salary: 2000,
    Purchase: 16000,
  };

  return (
    <Common>
      <View style={{ marginBottom: 105 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 10,
            marginBottom: 0,
            flexWrap: "wrap",
            columnGap: 5,
          }}
        >
          <Text style={{ color: color.green }}>
            Sales: <BDT amount={data.Sales} />
          </Text>
          <Text style={{ color: color.orange }}>
            Salary: <BDT amount={data.Salary} />
          </Text>
          <Text style={{ color: "#1b39bf" }}>
            Purchase: <BDT amount={data.Purchase} />
          </Text>
        </View>
        <FlatList
          data={transitions}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ margin: 15 }}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 10,
                borderRadius: 10,
                backgroundColor:
                  item.purpose === "Sales" ? "#cdf0b6" : "#f0cfb6",
                marginBottom: 10,
              }}
            >
              <View>
                <Text>From: {item.fromUserName}</Text>
                <Text>To: {item.toUserName}</Text>
                <Text>Purpose: {item.purpose}</Text>
              </View>
              <View>
                <Text>
                  Amount: <BDT amount={item.amount} />
                </Text>
                <Text>Date: {item.date}</Text>
              </View>
            </View>
          )}
        />
      </View>
    </Common>
  );
};

export default Transitions;
