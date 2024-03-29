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
    if (page > 0) {
      fetchData(`/customer?page=${page}`, true);
    }

    return () => store.setLoading(false);
  }, [page]);

  useEffect(() => {
    fetchData("/customer", false);
    return () => store.setLoading(false);
  }, [store.updateCustomer]);

  async function fetchData(url, page) {
    try {
      store.setLoading(true);
      const data = await Fetch(url, "GET");
      if (page) {
        setCustomers({
          count: data.count,
          data: [...customers.data, ...data.data],
        });
      } else {
        setCustomers(data);
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
          placeholder='Shop name Or nddress'
          url='/customer'
          setData={setCustomers}
          filter={false}
        />
        {customers?.data?.length ? (
          customers.data.map((item, i, arr) => (
            <InView
              key={item.id}
              onChange={() => {
                if (customers?.count !== customers?.data?.length) {
                  i === arr.length - 1 ? setPage((prev) => prev + 1) : null;
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
