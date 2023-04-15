import React, { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { Common } from "../App";
import Button from "../components/utilitise/Button";
import { color } from "../components/utilitise/colors";
import { commonStyles } from "../css/common";
import { FontAwesome5 } from "@expo/vector-icons";
import BDT from "../components/utilitise/BDT";

const CompleteOrder = ({ route, navigation }) => {
  const data = route.params;
  const [payment, setPayment] = useState(0);

  return (
    <Common>
      <View
        style={{
          backgroundColor: "#fff",
          margin: 10,
          borderRadius: 5,
          paddingHorizontal: 20,
          paddingVertical: 15,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <Text style={{ fontSize: 16, fontWeight: 500 }}>
              {data.shopInfo.shopName}
            </Text>
            <Text style={{ color: color.darkGray }}>
              {data.shopInfo.address}
            </Text>
          </View>
          <View>
            <View style={{ flexDirection: "row", gap: 5 }}>
              <Text style={{ fontWeight: 500, color: color.darkGray }}>
                Bill no:
              </Text>
              <Text style={{ color: color.darkGray, fontWeight: 500 }}>
                {data.billno}
              </Text>
            </View>
            <View style={{ flexDirection: "row", gap: 5 }}>
              <Text style={{ fontWeight: 500, color: color.darkGray }}>
                Date:
              </Text>
              <Text style={{ color: color.darkGray, fontWeight: 500 }}>
                {data.date}
              </Text>
            </View>
          </View>
        </View>

        <View style={{ marginTop: 30 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 6,
            }}
          >
            <Pressable
              onPress={() =>
                navigation.navigate("createOrder", {
                  edit: true,
                  order: data,
                })
              }
              style={{ flexDirection: "row", gap: 4, alignItems: "center" }}
            >
              <View style={{ flexDirection: "row", gap: 3 }}>
                <Text>Total Amount:</Text>
                <BDT amount={data.totalSale} />
              </View>

              <FontAwesome5 name='edit' size={16} color={color.orange} />
            </Pressable>
            {payment ? (
              <Text>Due Amount: {data.totalSale - payment}৳</Text>
            ) : null}
          </View>

          <TextInput
            style={commonStyles.input}
            onChangeText={(value) => setPayment(parseInt(value || 0))}
            placeholder='Payment ৳'
            keyboardType='numeric'
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              gap: 8,
              marginTop: 6,
            }}
          >
            <Button
              disabled={payment && payment <= data.totalSale ? false : true}
              title='Submit'
            />
            <Button
              disabled={payment >= data.totalSale}
              title='Continue with due'
            />
          </View>
        </View>
      </View>
    </Common>
  );
};

export default CompleteOrder;
