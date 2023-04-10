import React, { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { Common } from "../App";
import { style } from "../css/report";
import { commonStyles } from "../css/common";
import { BarChart } from "react-native-chart-kit";
import { MaterialIcons } from "@expo/vector-icons";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

const Report = ({ route }) => {
  const [date, setDate] = useState(new Date());
  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        data: [50, 45, 48, 80, 99, 43, 46, 65, 98, 89, 77, 56],
        strokeWidth: 2,
      },
    ],
  };

  const showDatepicker = () => {
    DateTimePickerAndroid.open({
      value: date,
      mode: "date",
      is24Hour: true,
      onChange: (event, selectedDate) => {
        const currentDate = selectedDate;
        setDate(currentDate);
      },
    });
  };

  return (
    <Common>
      <View style={style.profileWrapper}>
        <Image
          style={style.profile}
          source={require("../assets/no-photo.png")}
        />
        <Text style={style.name}>{route.params.name}</Text>
      </View>
      <Text style={{ ...commonStyles.heading, marginTop: 20 }}>
        Sales Report
      </Text>

      <View style={style.reportContainer}>
        <Text style={style.workText}>Total Sold: {route.params.totalSold}</Text>
        <Text style={style.workText}>
          This month's sold: {route.params.thisMonthSold}
        </Text>
        <Text style={style.workText}>
          Previous day's sold: {route.params.previousDaySold}
        </Text>

        <View style={style.subHeaderWrapper}>
          <Text style={style.subHeader}>Monthly Report</Text>
          <Pressable style={style.icon} onPress={showDatepicker}>
            <MaterialIcons name='filter-list' size={20} color='black' />
          </Pressable>
        </View>
        <BarChart
          style={{ borderRadius: 10, marginTop: 5 }}
          data={data}
          width={365}
          height={220}
          chartConfig={{
            backgroundGradientFrom: "#e6e9f5",
            backgroundGradientTo: "#e6e9f5",
            color: (opacity = 1) => `rgba(52, 85, 235, ${opacity})`,
            labelColor: () => "#5b75eb",
            barPercentage: 0.5,
          }}
        />
      </View>
    </Common>
  );
};

export default Report;
