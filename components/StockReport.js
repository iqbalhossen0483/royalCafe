import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { style } from "../css/home";
import { commonStyles } from "../css/common";
import Button from "./utilitise/Button";
import Select from "./utilitise/Select";
import { products, stockReport } from "../data";
import BDT from "./utilitise/BDT";

const StockReport = () => {
  const [date, setDate] = useState(new Date());
  const [data, setData] = useState(null);
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

  useEffect(() => {
    const demo = [];
    products.forEach((item) => {
      const product = stockReport.find((d) => item.name === d.name);
      if (product) demo.push(product);
      else {
        demo.push({
          name: item.name,
          productId: item.id,
          date: "",
          previousStock: item.stock,
          purchase: 0,
          todaySale: 0,
          remainingStock: item.stock,
        });
      }
      setData(demo);
    });
  }, []);

  const styles = { width: "17%", textAlign: "center" };
  return (
    <View style={{ ...style.totalReportContainer, marginBottom: 10 }}>
      <Text style={{ ...commonStyles.heading, width: "100%", marginTop: 0 }}>
        Stock Report
      </Text>

      <View style={{ alignItems: "center", width: "100%" }}>
        <View style={commonStyles.tableRow}>
          <Text style={styles}>Name</Text>
          <Text style={styles}>Previous</Text>
          <Text style={styles}>Purchase</Text>
          <Text style={{ width: "15%", textAlign: "center" }}>Sale</Text>
          <Text style={{ width: "19%", textAlign: "center" }}>Remaining</Text>
        </View>
        {data &&
          data.map((item, i) => (
            <View style={commonStyles.tableRow} key={i}>
              <Text style={styles}>
                {item.name.length > 8 ? item.name.split(" ")[0] : item.name}
              </Text>
              <BDT bdtSign={false} style={styles} amount={item.previousStock} />
              <BDT bdtSign={false} style={styles} amount={item.purchase} />
              <BDT
                bdtSign={false}
                style={{ width: "15%", textAlign: "center" }}
                amount={item.todaySale}
              />
              <BDT
                bdtSign={false}
                style={{ width: "19%", textAlign: "center" }}
                amount={item.remainingStock}
              />
            </View>
          ))}
      </View>

      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 15,
        }}
      >
        <Button
          onPress={showDatepicker}
          style={{ width: "70%" }}
          title='Be Specific'
        />
        <View style={{ width: "25%" }}>
          <Select
            defaultValue='Days'
            header='name'
            name='method'
            top='0%'
            editable={false}
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
      </View>
    </View>
  );
};

export default StockReport;
