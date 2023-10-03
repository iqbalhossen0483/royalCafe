import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { style } from "../css/home";
import { commonStyles } from "../css/common";
import Button from "./utilitise/Button";
import Select from "./utilitise/Select";
import BDT from "./utilitise/BDT";
import useStore from "../context/useStore";
import { Fetch } from "../services/common";
import { modifyStockReport } from "../services/report";
import { LoadingOnComponent } from "./utilitise/Loading";

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
        const modified = modifyStockReport(data.products, report);
        setReport(modified);
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

  const styles = { width: "17%", textAlign: "center" };
  return (
    <View style={{ ...style.totalReportContainer, marginBottom: 10 }}>
      <Text style={{ ...commonStyles.heading, width: "100%", marginTop: 0 }}>
        Stock Report Of {"\n"}
        <Text style={{ color: "#8f1391" }}>
          {date ? prittyDate(date, methods) : prittyDate(new Date(), methods)}
        </Text>
      </Text>

      <View style={{ alignItems: "center", width: "100%" }}>
        <View style={commonStyles.tableRow}>
          <Text style={{ ...styles, fontWeight: 500 }}>Name</Text>
          <Text style={{ ...styles, fontWeight: 500 }}>Previous</Text>
          <Text style={{ ...styles, fontWeight: 500 }}>Purchase</Text>
          <Text style={{ width: "15%", textAlign: "center", fontWeight: 500 }}>
            Sale
          </Text>
          <Text style={{ width: "19%", textAlign: "center", fontWeight: 500 }}>
            Remaining
          </Text>
        </View>
        {report && report.length ? (
          report.map((item, i) => (
            <View style={commonStyles.tableRow} key={i}>
              <Text style={styles}>
                {item.name.length > 8 ? item.name.split(" ")[0] : item.name}
              </Text>
              <BDT bdtSign={false} style={styles} amount={item.previousStock} />
              <BDT bdtSign={false} style={styles} amount={item.purchased} />
              <BDT
                bdtSign={false}
                style={{ width: "15%", textAlign: "center" }}
                amount={item.totalSold}
              />
              <BDT
                bdtSign={false}
                style={{ width: "19%", textAlign: "center" }}
                amount={item.remainingStock}
              />
            </View>
          ))
        ) : (
          <Text>No sales</Text>
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
