import React, { useState } from "react";
import { FlatList, Pressable, Text, TextInput } from "react-native";
import { View } from "react-native";
import Button from "../components/utilitise/Button";
import { styles } from "../css/orderDetails";
import { commonStyles } from "../css/common";
import { Ionicons } from "@expo/vector-icons";
import { Common } from "../App";
import { color } from "../components/utilitise/colors";
import BDT from "../components/utilitise/BDT";

const OrderDetails = ({ route }) => {
  const [showCollectionForm, setShowCollectionForm] = useState(false);
  const [showCollectionInfo, setShowCollectionInfo] = useState(0);
  const data = route.params;
  const [payment, setPayment] = useState(0);

  return (
    <Common>
      <View style={styles.container}>
        <Text style={{ fontSize: 19, fontWeight: 500, textAlign: "center" }}>
          M/S Hazera Enterprise
        </Text>
        <Text style={{ marginTop: -2, textAlign: "center" }}>
          Dharmopur, College Reoad, Adarsha Sadar, Cumilla.
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 5,
            marginTop: 10,
          }}
        >
          <Text>
            <Text style={{ fontWeight: 500 }}>Bill No:</Text> {data.billno}
          </Text>
          <Text>
            <Text style={{ fontWeight: 500 }}>Date: </Text>
            {data.date}
          </Text>
        </View>

        <View style={{ flexDirection: "row", columnGap: 5, marginTop: 8 }}>
          <Text style={{ fontWeight: 500, fontSize: 16 }}>Name:</Text>
          <Text
            style={{
              fontSize: 16,
              borderBottomWidth: 0.7,
              borderBottomColor: "#cbd5e1",
            }}
          >
            {data.shopInfo.shopName}
          </Text>
        </View>
        <View style={{ flexDirection: "row", columnGap: 5 }}>
          <Text style={{ fontWeight: 500, fontSize: 16 }}>Address:</Text>
          <Text
            style={{
              fontSize: 16,
              borderBottomWidth: 0.7,
              borderBottomColor: "#cbd5e1",
            }}
          >
            {data.shopInfo.address}
          </Text>
        </View>

        {/* details */}
        <View
          style={{
            marginTop: 10,
            paddingHorizontal: 8,
            paddingVertical: 10,
            borderRadius: 6,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              borderBottomWidth: 0.7,
              borderBottomColor: "#cbd5e1",
              paddingBottom: 4,
              marginBottom: 4,
            }}
          >
            <Text style={{ fontWeight: 500 }}>Product</Text>
            <Text style={{ fontWeight: 500 }}>Qty</Text>
            <Text style={{ fontWeight: 500 }}>Price</Text>
            <Text style={{ fontWeight: 500 }}>Total</Text>
          </View>
          <FlatList
            data={data.products}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  borderBottomWidth: 0.7,
                  borderBottomColor: "#cbd5e1",
                  marginBottom: 4,
                  paddingBottom: 4,
                }}
              />
            )}
            renderItem={({ item }) => (
              <View
                key={item.id}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text>{item.name}</Text>
                <Text>{item.qty}</Text>
                <Text>{item.price}</Text>
                <BDT amount={item.total} />
              </View>
            )}
          />
          <View
            style={{
              marginTop: 10,
              alignItems: "flex-end",
            }}
          >
            <Account name='Total' amount={data.totalSale} width='100%' />
            <Account name='Payment' amount={data.payment} />

            {data.collection && (
              <FlatList
                keyExtractor={(data) => data.id}
                data={data.collection}
                renderItem={({ item }) => (
                  <View>
                    <Pressable
                      onPress={() =>
                        setShowCollectionInfo((prev) => {
                          if (prev === item.id) return 0;
                          else return item.id;
                        })
                      }
                    >
                      <Account name={item.collectedBy} amount={item.amount} />
                    </Pressable>
                    {showCollectionInfo === item.id ? (
                      <Text
                        style={{ textAlign: "right", color: color.darkGray }}
                      >
                        Date: {item.date}
                      </Text>
                    ) : null}
                  </View>
                )}
              />
            )}

            {data.discount ? (
              <Account name='Discount' amount={data.discount} />
            ) : null}

            <Account
              style={{ color: data.due ? "#dc2626" : "#000" }}
              name='Due'
              amount={data.due}
            />

            <View>
              {data.due ? (
                <View>
                  <Button
                    onPress={() => setShowCollectionForm(true)}
                    style={{ marginTop: 4 }}
                    title='Collection'
                  />
                </View>
              ) : null}
            </View>
          </View>
        </View>

        {showCollectionForm && (
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "#fff",
              borderRadius: 5,
              paddingVertical: 30,
              paddingHorizontal: 20,
              alignItems: "center",
            }}
          >
            <View
              onTouchStart={() => setShowCollectionForm(false)}
              style={commonStyles.closeIconWrapper}
            >
              <Ionicons
                style={commonStyles.closeIcon}
                name='close-sharp'
                size={24}
                color='black'
              />
            </View>
            <View style={{ width: "80%" }}>
              <View
                style={{
                  flexDirection: "row",
                  gap: 5,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ fontWeight: 500, fontSize: 18, color: "#dc2626" }}
                >
                  Due:
                </Text>
                <Text
                  style={{ fontSize: 18, color: "#dc2626", fontWeight: 500 }}
                >
                  {data.due - payment}৳
                </Text>
              </View>
              <TextInput
                style={{ ...commonStyles.input, marginVertical: 20 }}
                placeholder='Collection ৳'
                keyboardType='numeric'
                onChangeText={(value) => setPayment(parseInt(value || 0))}
              />
              <View
                style={{
                  flexDirection: "row",
                  gap: 8,
                  justifyContent: "center",
                }}
              >
                <Button
                  disabled={payment === 0 || payment > data.due}
                  title='Submit'
                />
                <Button
                  disabled={payment >= data.due || data.due - 100 > payment}
                  title='Continue with discount'
                />
              </View>
            </View>
          </View>
        )}
      </View>
    </Common>
  );
};

export default OrderDetails;

function Account({ name, amount, width, style }) {
  return (
    <View
      style={{
        borderTopColor: "#cbd5e1",
        borderTopWidth: 0.7,
        flexDirection: "row",
        justifyContent: "flex-end",
        paddingLeft: 10,
        paddingTop: 3,
        width: width || 110,
        paddingBottom: 4,
      }}
    >
      <Text style={{ fontWeight: 500, marginRight: 4, ...style }}>{name}:</Text>
      <BDT style={style} amount={amount} />
    </View>
  );
}
