import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { commonStyles } from "../../css/common";
import BDT from "../utilitise/BDT";
import Button from "../utilitise/Button";
import Select from "../utilitise/Select";
import { style } from "../../css/home";
import useStore from "../../context/useStore";
import { Fetch } from "../../services/common";
import { modifyCashReport } from "../../services/report";

const CashReport = ({ data }) => {
  const [date, setDate] = useState(null);
  const [methods, setMethods] = useState("Days");
  const [report, setReport] = useState(data);
  const store = useStore();

  const showDatepicker = () => {
    DateTimePickerAndroid.open({
      value: date || new Date(),
      onChange: (_, selectedDate) => {
        const currentDate = selectedDate;
        setDate(currentDate);
      },
      mode: "date",
      is24Hour: true,
    });
  };

  useEffect(() => {
    async function fetchData() {
      try {
        store.setLoading(true);
        let base = "/admin?cashReport=true&";
        const method = methods.name;
        const url =
          method === "Days"
            ? (base += `method=date&date=${date.toISOString()}`)
            : method === "Month"
            ? (base += `method=month&date=${date.toLocaleString("en-us", {
                month: "long",
              })}&year=${date.getFullYear()}`)
            : (base += `method=year&date=${date.getFullYear()}`);
        const report = await Fetch(url, "GET");
        const modified = modifyCashReport(report);
        setReport(modified);
        store.setLoading(false);
      } catch (error) {
        store.setLoading(false);
        store.setMessage({ msg: error.message, type: "error" });
      }
    }
    if (date) fetchData();
  }, [date]);

  useEffect(() => {
    if (methods.name === "Clear") setReport(data);
  }, [methods.name]);

  return (
    <View style={style.totalReportContainer}>
      <Text style={{ ...commonStyles.heading, width: "100%", marginTop: 0 }}>
        At a glance your business
      </Text>
      {report &&
        report.map((item) => (
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
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          columnGap: 10,
        }}
      >
        <Button
          onPress={showDatepicker}
          style={{ width: "65%" }}
          title='Be Specific'
        />
        <Select
          defaultValue='Days'
          header='name'
          name='method'
          style={{ width: "25%" }}
          editable={false}
          top={true}
          placeholder='Select method'
          options={[
            { name: "Days" },
            { name: "Month" },
            { name: "Year" },
            { name: "Clear" },
          ]}
          handler={(_, info) => setMethods(info)}
        />
      </View>
    </View>
  );
};

export default CashReport;
