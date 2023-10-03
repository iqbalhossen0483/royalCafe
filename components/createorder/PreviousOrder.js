import React from "react";
import { commonStyles } from "../../css/common";
import { Text, TextInput, View } from "react-native";
import Checkbox from "expo-checkbox";

const PreviousOrder = ({ form, setForm }) => {
  return (
    <>
      {form.prevSale ? (
        <TextInput
          onChangeText={(value) =>
            setForm((prev) => {
              return { ...prev, totalSale: value };
            })
          }
          keyboardType='phone-pad'
          defaultValue={form.totalSale?.toString()}
          style={commonStyles.input}
          placeholder='Sold amount $'
        />
      ) : null}
      <View
        style={{
          flexDirection: "row",
          columnGap: 4,
          alignItems: "center",
          marginTop: 4,
        }}
      >
        <Checkbox
          value={form.prevSale}
          color={form.prevSale ? "green" : "gray"}
          onValueChange={() =>
            setForm((prev) => {
              return { ...prev, prevSale: !prev.prevSale };
            })
          }
        />
        <Text style={{ fontSize: 16 }}>Previous sold order?</Text>
      </View>
    </>
  );
};

export default PreviousOrder;
