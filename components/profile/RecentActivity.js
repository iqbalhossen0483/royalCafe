import React, { useEffect, useState } from "react";
import { Pressable, View } from "react-native";

import useStore from "../../context/useStore";
import { commonStyles } from "../../css/common";
import { styles } from "../../css/customer";
import { Fetch, dateFormatter, openNumber } from "../../services/common";
import BDT from "../utilitise/BDT";
import P from "../utilitise/P";
import { color } from "../utilitise/colors";

const RecentActivity = ({ navigation }) => {
  const [data, setData] = useState(null);
  const store = useStore();

  useEffect(() => {
    (async () => {
      try {
        const result = await Fetch(
          `/user/recentactivity?user_id=${store.user.id}&today=true`,
          "GET"
        );
        setData(result);
      } catch (error) {
        store.setMessage({ msg: error.message, type: "error" });
      }
    })();
  }, []);

  return (
    <View style={{ marginBottom: 20 }}>
      <P bold={500} style={commonStyles.heading}>
        Today's Activities
      </P>

      <P bold={500} size={16}>
        Orders:
      </P>
      {data && data.orders.length
        ? data.orders.map((order) => (
            <Pressable
              key={order.id}
              style={styles.container}
              onPress={() =>
                navigation.navigate("orderDetails", { id: order.id })
              }
            >
              <View
                style={{
                  flexDirection: "row",
                  alignorders: "center",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignorders: "center",
                  }}
                >
                  <View style={{ marginLeft: 6 }}>
                    <P size={15} bold={500}>
                      {order.shopName}
                    </P>
                    <P color='darkGray' size={13}>
                      {order.address}
                    </P>
                    <Pressable
                      onPress={(e) => {
                        e.stopPropagation();
                        openNumber(order.phone);
                      }}
                    >
                      <P color='darkGray' size={13}>
                        {order.phone}
                      </P>
                    </Pressable>

                    <P size={12} color='darkGray'>
                      {dateFormatter(order.date)}
                    </P>
                  </View>
                </View>
                <View>
                  <P>
                    Bill no: <BDT amount={order.billno} bdtSign={false} />
                  </P>
                  <P>
                    Toal sale: <BDT amount={order.totalSale} />
                  </P>
                  <P>
                    Due:{" "}
                    <BDT style={{ color: color.orange }} amount={order.due} />
                  </P>
                </View>
              </View>
            </Pressable>
          ))
        : null}

      <P bold={500} size={16} style={{ marginTop: 10 }}>
        Collections:
      </P>
      {data && data.collections.length
        ? data.collections.map((coll) => (
            <Pressable
              key={coll.id}
              style={styles.container}
              onPress={() =>
                navigation.navigate("orderDetails", { id: coll.order_id })
              }
            >
              <View
                style={{
                  flexDirection: "row",
                  alignorders: "center",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignorders: "center",
                  }}
                >
                  <View style={{ marginLeft: 6 }}>
                    <P size={15} bold={500}>
                      {coll.shopName}
                    </P>
                    <P color='darkGray' size={13}>
                      {coll.address}
                    </P>
                    <Pressable
                      onPress={(e) => {
                        e.stopPropagation();
                        openNumber(order.phone);
                      }}
                    >
                      <P color='darkGray' size={13}>
                        {coll.phone}
                      </P>
                    </Pressable>
                    <P size={12} color='darkGray'>
                      Order Date: {dateFormatter(coll.order_date)}
                    </P>
                    <P size={12} color='darkGray'>
                      Coll. Date: {dateFormatter(coll.coll_date)}
                    </P>
                  </View>
                </View>
                <View>
                  <P>
                    Bill no: <BDT amount={coll.billno} bdtSign={false} />
                  </P>
                  <P>
                    Total Amount: <BDT amount={coll.totalSale} />
                  </P>
                  <P>
                    Collection: <BDT amount={coll.payment} />
                  </P>
                  <P>
                    Due:{" "}
                    <BDT style={{ color: color.orange }} amount={coll.due} />
                  </P>
                </View>
              </View>
            </Pressable>
          ))
        : null}

      {data && !data.orders.length && !data.collections.length ? (
        <P>No activity</P>
      ) : null}
    </View>
  );
};

export default RecentActivity;
