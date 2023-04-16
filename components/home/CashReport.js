import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { commonStyles } from "../../css/common";
import { totalReport } from "../../data";
import BDT from "../utilitise/BDT";
import Button from "../utilitise/Button";
import Select from "../utilitise/Select";
import { style } from "../../css/home";

const CashReport = () => {
  const [date, setDate] = useState(new Date());
  const [methods, setMethods] = useState("Days");

  const showDatepicker = () => {
    DateTimePickerAndroid.open({
      value: date,
      onChange: (event, selectedDate) => {
        const currentDate = selectedDate;
        setDate(currentDate);
      },
      mode: "date",
      is24Hour: true,
    });
  };
  return (
    <View style={style.totalReportContainer}>
      <Text style={{ ...commonStyles.heading, width: "100%", marginTop: 0 }}>
        At a glance your business
      </Text>
      {totalReport.map((item) => (
        <View
          style={{ ...style.totalReportItem, backgroundColor: item.bgColor }}
          key={item.id}
        >
          <Text style={{ ...style.totalReportName, color: item.textColor }}>
            {item.name}
          </Text>
          <BDT
            style={{ fontSize: 15, color: item.textColor }}
            amount={item.amount}
          />
        </View>
      ))}
      <View
        style={{ justifyContent: "center", alignItems: "center", width: "40%" }}
      >
        <Select
          defaultValue='Days'
          header='name'
          name='method'
          editable={false}
          top={true}
          placeholder='Select method'
          options={[
            { name: "Days" },
            { name: "Month" },
            { name: "Year" },
            { name: "All" },
          ]}
          handler={(_, info) => setMethods(info)}
        />
      </View>
      <Button
        onPress={showDatepicker}
        style={{ width: "100%" }}
        title='Be Specific'
      />
    </View>
  );
};

export default CashReport;
