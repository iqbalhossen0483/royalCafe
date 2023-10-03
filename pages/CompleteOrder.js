import { useEffect, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { Common } from "../App";
import Button from "../components/utilitise/Button";
import { color } from "../components/utilitise/colors";
import { commonStyles } from "../css/common";
import { FontAwesome5 } from "@expo/vector-icons";
import BDT from "../components/utilitise/BDT";
import { Fetch, dateFormatter } from "../services/common";
import { styles } from "../css/orderDetails";
import useStore from "../context/useStore";

const CompleteOrder = ({ route, navigation }) => {
  const [payment, setPayment] = useState(0);
  const [data, setData] = useState(null);
  const store = useStore();

  useEffect(() => {
    (async () => {
      try {
        store.setLoading(true);
        const url = `/order?id=${route.params?.id}`;
        const result = await Fetch(url, "GET");
        setData(result);
      } catch (error) {
        store.setMessage({ msg: error.message, type: "error" });
      } finally {
        store.setLoading(false);
      }
    })();
  }, [route.params?.id, store.updateOrder]);

  async function completeOrder(discount, due) {
    try {
      store.setLoading(true);
      const peyload = {
        payment,
        due,
        discount,
        shopId: data.shopId,
        delivered_by: store.user.id,
        created_by: data.created_by,
        prevSale: data.prevSale,
        forShop: {
          totalSale: data.totalSale,
          dueSale: due,
          due,
          discount,
          lastOrder: new Date().toISOString(),
          commission: data.commission,
        },
      };
      const url = `/order?id=${route.params?.id}`;
      const { message } = await Fetch(url, "PUT", peyload);
      store.setMessage({ msg: message, type: "success" });
      store.setUpdateOrder((prev) => !prev);
      store.setUpdateReport((prev) => !prev);
      store.setUpdateUser((prev) => !prev);
      store.setUpNotification((prev) => !prev);
      navigation.goBack();
    } catch (error) {
      store.setMessage({ msg: error.message, type: "error" });
    } finally {
      store.setLoading(false);
    }
  }

  if (!data) return null;
  const disable =
    payment > data.totalSale ||
    payment <= data.totalSale - data.totalSale * 0.03;
  return (
    <Common>
      <View style={styles.container}>
        <View style={styles.headerWrapper}>
          <Text style={styles.header}>M/S Hazera Enterprise</Text>
          <Text style={styles.address}>
            Dharmopur, College Reoad, Adarsha Sadar, Cumilla.
          </Text>
        </View>
        <View style={{ padding: 15 }}>
          <View style={styles.shopwrapper}>
            <View>
              <Text style={{ fontSize: 16, fontWeight: 500 }}>
                {data.shopName}
              </Text>
              <Text style={{ color: color.darkGray }}>{data.address}</Text>
            </View>
            <View>
              <View style={{ flexDirection: "row", gap: 5 }}>
                <Text style={{ color: color.darkGray }}>Bill no:</Text>
                <Text style={{ color: color.darkGray }}>{data.billno}</Text>
              </View>
              <View style={{ flexDirection: "row", gap: 5 }}>
                <Text style={{ color: color.darkGray }}>Date:</Text>
                <Text style={{ color: color.darkGray }}>
                  {dateFormatter(data.date)}
                </Text>
              </View>
            </View>
          </View>

          <View style={{ marginTop: 10 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 6,
              }}
            >
              <Pressable
                style={{ flexDirection: "row", gap: 4, alignItems: "center" }}
                onPress={() =>
                  navigation.navigate("createOrder", {
                    edit: true,
                    order: data,
                  })
                }
              >
                <View style={{ flexDirection: "row", gap: 3 }}>
                  <Text>Total Amount:</Text>
                  <BDT amount={data.totalSale} />
                </View>

                <FontAwesome5 name='edit' size={16} color={color.orange} />
              </Pressable>
              {payment ? (
                <Text>Due Amount: {data.totalSale - payment}৳</Text>
              ) : null}
            </View>
          </View>

          <TextInput
            style={commonStyles.input}
            onChangeText={(value) => setPayment(parseInt(value || 0))}
            placeholder='Payment ৳'
            keyboardType='numeric'
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              gap: 8,
              marginTop: 6,
            }}
          >
            <Button
              onPress={() => completeOrder(data.totalSale - payment, 0)}
              disabled={disable}
              title={payment >= data.totalSale ? "Complete" : "Discount"}
            />
            <Button
              onPress={() => completeOrder(0, data.totalSale - payment)}
              disabled={payment >= data.totalSale}
              title='Continue with due'
            />
          </View>
        </View>
      </View>
    </Common>
  );
};

export default CompleteOrder;
