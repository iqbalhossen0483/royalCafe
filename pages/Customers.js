import React, { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { IOScrollView, InView } from "react-native-intersection-observer";

import { Common } from "../components/Common";
import SearchFilter from "../components/SearchFilter";
import Avater from "../components/utilitise/Avater";
import BDT from "../components/utilitise/BDT";
import P from "../components/utilitise/P";
import { color } from "../components/utilitise/colors";
import useStore from "../context/useStore";
import { styles } from "../css/customer";
import { Fetch, dateFormatter, openNumber } from "../services/common";

const Customers = ({ navigation }) => {
  const [customers, setCustomers] = useState(null);
  const [page, setPage] = useState(0);
  const store = useStore();

  useEffect(() => {
    (async () => {
      try {
        store.setLoading(true);
        const data = await Fetch(`/customer?page=${page}`, "GET");
        if (page === 0) setCustomers(data);
        else
          setCustomers({
            count: data.count,
            data: [...customers.data, ...data.data],
          });
      } catch (error) {
        store.setMessage({ msg: error.message, type: "error" });
      } finally {
        store.setLoading(false);
      }
    })();
    return () => store.setLoading(false);
  }, [store.updateCustomer, page]);

  async function search(query) {
    try {
      store.setLoading(true);
      setPage(0);
      const value = query.split("=")[1];
      const result = await Fetch(`/customer?${query}`, "GET");
      if (value) setCustomers({ data: result });
      else setCustomers(result);
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
          placeholder='Shop name Or nddress'
          search={search}
          filter={false}
        />
        {!store.loading ? (
          <View style={{ marginVertical: 4, marginLeft: 8 }}>
            <P size={13}>
              Showing Result {customers?.data?.length} Of {customers?.count}
            </P>
          </View>
        ) : null}

        {customers?.data?.length ? (
          customers.data.map((item, i, arr) => (
            <InView
              key={item.id}
              onChange={() => {
                if (
                  customers?.count &&
                  customers?.count !== customers?.data?.length + 1 &&
                  i === arr.length - 1
                ) {
                  setPage((prev) => prev + 1);
                }
              }}
            >
              <Pressable
                onPress={() =>
                  navigation.navigate("customerDetails", { id: item.id })
                }
                style={{
                  ...styles.container,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Avater url={item.profile} />

                  <View
                    style={{ marginLeft: 6, flexDirection: "row", gap: 10 }}
                  >
                    <View style={{ width: "50%" }}>
                      <P size={15} bold={500}>
                        {item.shopName}
                      </P>
                      <P size={13} color='darkGray'>
                        {item.address}
                      </P>
                      <Pressable
                        onPress={(e) => {
                          e.stopPropagation();
                          openNumber(item.phone);
                        }}
                      >
                        <P size={13} color='green'>
                          {item.phone}
                        </P>
                      </Pressable>
                    </View>

                    <View>
                      {item.lastOrder ? (
                        <P color='darkGray' size={13}>
                          Last Order: {dateFormatter(item.lastOrder)}
                        </P>
                      ) : null}
                      <P size={13}>Added By: {item.added_by_name}</P>
                      {item.due ? (
                        <P color='orange' size={13} bold={500}>
                          Due:
                          <BDT
                            style={{ color: color.orange }}
                            amount={item.due}
                          />
                        </P>
                      ) : null}
                    </View>
                  </View>
                </View>
              </Pressable>
            </InView>
          ))
        ) : (
          <Text style={{ textAlign: "center" }}>No Customer</Text>
        )}
      </IOScrollView>
    </Common>
  );
};

export default Customers;
