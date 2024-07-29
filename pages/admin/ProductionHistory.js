import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import { InView } from "react-native-intersection-observer";

import { Common } from "../../components/Common";
import BDT from "../../components/utilitise/BDT";
import { color } from "../../components/utilitise/colors";
import P from "../../components/utilitise/P";
import useStore from "../../context/useStore";
import { commonStyles } from "../../css/common";
import { styles } from "../../css/production";
import { dateFormatter, Fetch } from "../../services/common";

const ProductionHistory = () => {
  const [production, setProduction] = useState(null);
  const [show, setShow] = useState(0);
  const [page, setPage] = useState(0);
  const store = useStore();

  useEffect(() => {
    (async () => {
      try {
        store.setLoading(true);
        const data = await Fetch(
          store.database.name,
          `/production?page=${page}`,
          "GET"
        );
        setProduction(data);
      } catch (error) {
        store.setMessage({ msg: error.message, type: "error" });
      } finally {
        store.setLoading(false);
      }
    })();
  }, []);

  const rowStyle = {
    width: "40%",
    borderRightWidth: 1,
    borderRightColor: color.gray,
    paddingVertical: 6,
    paddingHorizontal: 16,
  };
  if (!production) return null;
  return (
    <Common>
      <View style={styles.wrapper}>
        {!store.loading ? (
          <View style={{ marginVertical: 4, marginLeft: 8 }}>
            <P size={13}>
              Showing Result {production.data.length} Of {production.count}
            </P>
          </View>
        ) : null}

        {production.data.map((production, i, arr) => (
          <InView
            onChange={() => {
              if (
                production.count &&
                production.count !== production?.data.length &&
                i === arr.length - 1
              ) {
                setPage((prev) => prev + 1);
              }
            }}
            style={styles.container}
            key={production.id}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View>
                <P>
                  Product Name: <P bold>{production.product_name}</P>
                </P>
                <P>
                  Production Amount:{" "}
                  <BDT amount={production.production} bdtSign={false} />
                  kg
                </P>
                <P>
                  Production By: <P bold>{production.production_by}</P>
                </P>
              </View>
              <Pressable
                onPress={() =>
                  setShow((prev) => {
                    if (prev === production.id) return 0;
                    else return production.id;
                  })
                }
                style={{ justifyContent: "space-between" }}
              >
                <P>Date: {dateFormatter(production.date)}</P>
                <View style={{ alignItems: "flex-end" }}>
                  <AntDesign
                    name={show === production.id ? "caretup" : "caretdown"}
                    size={20}
                    color={color.darkGray}
                  />
                </View>
              </Pressable>
            </View>
            {show === production.id ? (
              <View style={{ alignItems: "center" }}>
                <View style={{ marginTop: 15, width: "80%" }}>
                  <View style={commonStyles.tableRow}>
                    <P style={{ ...rowStyle, width: "60%" }}>Name</P>
                    <P style={{ ...rowStyle, borderRightWidth: 0 }}>Qty</P>
                  </View>
                  {production.list.map((list) => (
                    <View
                      style={{ ...commonStyles.tableRow, borderTopWidth: 0 }}
                      key={list.id}
                    >
                      <P style={{ ...rowStyle, width: "60%" }}>{list.name}</P>
                      <P style={{ ...rowStyle, borderRightWidth: 0 }}>
                        <BDT amount={list.production} bdtSign={false} />
                      </P>
                    </View>
                  ))}
                  <View style={{ alignItems: "flex-end" }}>
                    <P bold style={{ width: "40%", padding: 5 }}>
                      Total:{" "}
                      <BDT amount={production.production} bdtSign={false} />
                      kg
                    </P>
                  </View>
                </View>
              </View>
            ) : null}
          </InView>
        ))}
      </View>
    </Common>
  );
};

export default ProductionHistory;
