import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";
import { View } from "react-native";

import useStore from "../context/useStore";
import { commonStyles } from "../css/common";
import { style } from "../css/home";
import { Fetch } from "../services/common";
import { modifyStockReport } from "../services/report";
import BDT from "./utilitise/BDT";
import Button from "./utilitise/Button";
import { LoadingOnComponent } from "./utilitise/Loading";
import P from "./utilitise/P";
import Select from "./utilitise/Select";
import { color } from "./utilitise/colors";

const StockReport = ({ data }) => {
  const [date, setDate] = useState(null);
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [methods, setMethods] = useState({ name: "Days" });
  const store = useStore();

  const showDatepicker = () => {
    DateTimePickerAndroid.open({
      value: date || new Date(),
      onChange: (event, selectedDate) => {
        const currentDate = selectedDate;
        if (methods.name === "Clear") setMethods({ name: "Days" });
        setDate(currentDate);
      },
      mode: "date",
      is24Hour: true,
    });
  };

  useEffect(() => {
    const modified = modifyStockReport(data.products, data.stockReport);
    setReport(modified);
  }, [data]);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const method = methods.name;
        if (method === "Clear") return;
        let base = "/admin?stockReport=true&";
        const url =
          method === "Days"
            ? (base += `method=date&date=${date.toISOString()}`)
            : method === "Month"
            ? (base += `method=month&date=${date.toLocaleString("en-us", {
                month: "long",
              })}&year=${date.getFullYear()}`)
            : (base += `method=year&date=${date.getFullYear()}`);
        const report = await Fetch(url, "GET");
        setReport(report);
      } catch (error) {
        store.setMessage({ msg: error.message, type: "error" });
      } finally {
        setLoading(false);
      }
    }
    if (date) fetchData();
  }, [date]);

  useEffect(() => {
    if (methods.name === "Clear") {
      const modified = modifyStockReport(data.products, data.stockReport);
      setReport(modified);
      setDate(null);
    }
  }, [methods.name]);

  const styles = { width: "20%", textAlign: "center" };
  const rowStyles = {
    ...styles,
    borderRightWidth: 1,
    borderRightColor: color.gray,
  };
  return (
    <View style={{ ...style.totalReportContainer, marginBottom: 10 }}>
      <P
        bold={500}
        style={{ ...commonStyles.heading, width: "100%", marginTop: 0 }}
      >
        Stock Report Of {"\n"}
        <P size={15} style={{ color: "#8f1391" }}>
          {date ? prittyDate(date, methods) : prittyDate(new Date(), methods)}
        </P>
      </P>

      <View style={{ width: "100%" }}>
        <View style={commonStyles.tableRow}>
          <P style={styles}>Name</P>
          <P style={styles}>Previous</P>
          <P style={styles}>Purchase</P>
          <P style={styles}>Sale</P>
          <P style={styles}>Remain</P>
        </View>
        {report && report.length ? (
          report.map((item, i) => (
            <View style={commonStyles.tableRow} key={i}>
              <P style={rowStyles}>{item.name}</P>
              <BDT
                bdtSign={false}
                style={rowStyles}
                amount={item.previousStock}
              />
              <BDT bdtSign={false} style={rowStyles} amount={item.purchased} />
              <BDT bdtSign={false} style={rowStyles} amount={item.totalSold} />
              <BDT
                bdtSign={false}
                style={styles}
                amount={item.remainingStock}
              />
            </View>
          ))
        ) : (
          <P>No sales</P>
        )}
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
            defaultValue={methods.name}
            header='name'
            name='method'
            top={true}
            editable={false}
            placeholder='Select method'
            height={140}
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
      {loading ? <LoadingOnComponent /> : null}
    </View>
  );
};

export default StockReport;

function prittyDate(date, method) {
  if (method.name === "Month") {
    return (
      date.toLocaleDateString("en-GB", { month: "long" }) +
      " " +
      date.getFullYear()
    );
  } else if (method.name === "Year") {
    return date.getFullYear();
  }
  return date.toLocaleDateString("en-GB");
}
