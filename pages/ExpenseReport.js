import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, Text, View } from "react-native";
import { styles } from "../css/customer";
import { Common } from "../App";
import SearchFilter from "../components/SearchFilter";
import { color } from "../components/utilitise/colors";
import { Pressable } from "react-native";
import useStore from "../context/useStore";
import { Fetch, dateFormatter } from "../services/common";
import BDT from "../components/utilitise/BDT";
import Button from "../components/utilitise/Button";

const ExpenseReport = () => {
  const [expense, setExpense] = useState({});
  const [pendingReq, setPendingReq] = useState(false);
  const store = useStore();
  const height = Dimensions.get("window").height;

  useEffect(() => {
    fetchData("/expense", false);
    return () => store.setLoading(false);
  }, [store.updateExpense]);

  async function fetchData(url, pending) {
    try {
      store.setLoading(true);
      const expenses = await Fetch(url, "GET");
      setPendingReq(pending);
      setExpense(expenses);
    } catch (error) {
      store.setMessage({ msg: error.message, type: "error" });
    } finally {
      store.setLoading(false);
    }
  }

  async function achievedReq(data) {
    try {
      store.setLoading(true);
      const result = await Fetch("/expense/achieve", "POST", data);
      store.setMessage({ msg: result.message, type: "success" });
      store.setUpdateUser((prev) => !prev);
      store.setUpdateReport((prev) => !prev);
      store.setUpdateExpense((prev) => !prev);
    } catch (error) {
      store.setMessage({ msg: error.message, type: "error" });
    } finally {
      store.setLoading(false);
    }
  }

  return (
    <Common>
      <View style={{ marginBottom: height - height * 0.79 }}>
        <SearchFilter url='/expense' setData={setExpense} />
        <FlatList
          data={expense?.data}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={() => (
            <>
              {store?.user?.designation === "Admin" ? (
                <Pressable
                  onPress={() =>
                    fetchData(`/expense?pending=${!pendingReq}`, !pendingReq)
                  }
                  style={{ alignItems: "flex-end" }}
                >
                  <Text style={{ fontWeight: 500, fontSize: 15 }}>
                    {!pendingReq
                      ? `Pending Request: ${expense?.pendingExpense || 0}, `
                      : "See all expense reports "}
                    {!pendingReq ? (
                      <Text style={{ color: color.orange }}>Check it</Text>
                    ) : null}
                  </Text>
                </Pressable>
              ) : null}
            </>
          )}
          ListEmptyComponent={() => (
            <Text style={{ textAlign: "center" }}>No Expense Report</Text>
          )}
          renderItem={({ item }) => (
            <View
              style={{
                ...styles.container,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={{ marginLeft: 6 }}>
                  <Text>
                    Expense For:{" "}
                    <Text style={{ fontWeight: 500 }}>{item.type}</Text>
                  </Text>
                  <Text>
                    Expense Amount:{" "}
                    <BDT style={{ fontWeight: 500 }} amount={item.amount} />
                  </Text>
                </View>
              </View>
              <View>
                <Text>
                  Expense By:{" "}
                  <Text style={{ fontWeight: 500 }}>{item.userName}</Text>
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    marginTop: 3,
                    color: color.darkGray,
                  }}
                >
                  Date:
                  {dateFormatter(item.date)}
                </Text>
                {pendingReq ? (
                  <Button
                    disabled={store.loading}
                    onPress={() => achievedReq(item)}
                    style={{
                      backgroundColor: color.orange,
                      paddingVertical: 3,
                      marginTop: 3,
                    }}
                    title='Achieve Request'
                  />
                ) : null}
              </View>
            </View>
          )}
        />
      </View>
    </Common>
  );
};

export default ExpenseReport;
