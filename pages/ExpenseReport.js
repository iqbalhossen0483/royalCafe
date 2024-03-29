import React, { useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import { IOScrollView, InView } from "react-native-intersection-observer";

import { Common } from "../components/Common";
import { socket } from "../components/Layout";
import SearchFilter from "../components/SearchFilter";
import BDT from "../components/utilitise/BDT";
import Button from "../components/utilitise/Button";
import P from "../components/utilitise/P";
import { color } from "../components/utilitise/colors";
import useStore from "../context/useStore";
import { styles } from "../css/customer";
import { Fetch, dateFormatter } from "../services/common";

const ExpenseReport = () => {
  const [expense, setExpense] = useState({});
  const store = useStore();
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (page > 0) {
      const url =
        store.user.designation === "Admin"
          ? `/expense?page=${page}`
          : `/expense?page=${page}&userId=${store.user.id}`;
      fetchData(url, true);
    }
    return () => store.setLoading(false);
  }, [page]);

  useEffect(() => {
    const url =
      store.user.designation === "Admin"
        ? `/expense`
        : `/expense?userId=${store.user.id}`;
    fetchData(url, false);
    return () => store.setLoading(false);
  }, [store.updateExpense]);

  async function fetchData(url, page) {
    try {
      store.setLoading(true);
      const expenses = await Fetch(url, "GET");
      if (page) {
        setExpense({
          count: expenses.count || 0,
          pendingExpense: expenses.pendingExpense,
          data: [...expense.data, ...expenses.data],
        });
      } else if (expenses.type) {
        setExpense({
          count: expenses.data.length || 0,
          pendingExpense: expenses.pendingExpense,
          data: expenses.data,
          type: expenses.type,
        });
      } else {
        setExpense(expenses);
      }
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
      if (socket) {
        socket.send(
          JSON.stringify({
            type: "expense_req_accepted",
            to: data.created_by,
            by: store.user.name,
          })
        );
      }
    } catch (error) {
      store.setMessage({ msg: error.message, type: "error" });
    } finally {
      store.setLoading(false);
    }
  }

  async function decline(id, created_by) {
    try {
      store.setLoading(true);
      const result = await Fetch(`/expense?id=${id}`, "DELETE");
      store.setMessage({ msg: result.message, type: "success" });
      store.setUpdateExpense((prev) => !prev);

      if (socket) {
        socket.send(
          JSON.stringify({
            type: "expense_req_decline",
            to: created_by,
            by: store.user.name,
          })
        );
      }
    } catch (error) {
      store.setMessage({ msg: error.message, type: "error" });
    } finally {
      store.setLoading(false);
    }
  }

  return (
    <Common>
      <IOScrollView style={{ marginBottom: 57 }}>
        <SearchFilter
          url='/expense'
          placeholder='Name Or type'
          setData={setExpense}
          searchfeild={store.user.desigantion === "Admin" ? true : false}
        />
        {store.user.designation === "Admin" ? (
          <View>
            {expense?.type === "pending" ? (
              <Pressable onPress={() => fetchData(`/expense`)}>
                <P size={15} bold={500}>
                  See all expense reports
                </P>
              </Pressable>
            ) : (
              <Pressable onPress={() => fetchData(`/expense?pending=true`)}>
                <P size={15} bold={500}>
                  Pending Request: {expense.pendingExpense || 0}
                  <P color='orange'> Check it</P>
                </P>
              </Pressable>
            )}
          </View>
        ) : null}
        {expense?.data?.length ? (
          expense.data.map((item, i, arr) => (
            <InView
              key={item.id}
              style={styles.container}
              onChange={() => {
                if (expense?.count !== expense?.data?.length) {
                  i === arr.length - 1 ? setPage((prev) => prev + 1) : null;
                }
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View style={{ marginLeft: 6 }}>
                    <P>
                      Expense For: <P bold={500}>{item.type}</P>
                    </P>
                    <P>
                      Expense Amount: <BDT amount={item.amount} />
                    </P>
                  </View>
                </View>
                <View>
                  <P>
                    Expense By: <P bold={500}>{item.userName}</P>
                  </P>
                  <P color='darkGray' size={13} style={{ marginTop: 3 }}>
                    Date:
                    {dateFormatter(item.date)}
                  </P>
                </View>
              </View>
              {expense?.type === "pending" ? (
                <View
                  style={{
                    flexDirection: "row",
                    gap: 3,
                    justifyContent: "center",
                  }}
                >
                  <Button
                    disabled={store.loading}
                    onPress={() => achievedReq(item)}
                    style={{
                      backgroundColor: color.green,
                      paddingVertical: 3,
                      marginTop: 3,
                    }}
                    title='Achieve'
                  />
                  <Button
                    disabled={store.loading}
                    onPress={() => decline(item.id, item.created_by)}
                    style={{
                      backgroundColor: color.orange,
                      paddingVertical: 3,
                      marginTop: 3,
                    }}
                    title='Decline'
                  />
                </View>
              ) : null}
            </InView>
          ))
        ) : (
          <P align='center'>No Expense Report</P>
        )}
      </IOScrollView>
    </Common>
  );
};

export default ExpenseReport;
