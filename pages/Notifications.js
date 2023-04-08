import React, { useState } from "react";
import { FlatList, Image, Text, View } from "react-native";
import { styles } from "../css/customer";
import { MaterialIcons } from "@expo/vector-icons";
import { orderdata } from "../data";
import Button from "../components/utilitise/Button";
import { Common } from "../App";
import { color } from "../components/utilitise/colors";
import BDT from "../components/utilitise/BDT";

const Notifications = ({ navigation }) => {
  const [showDetails, setShowDetails] = useState(-1);

  return (
    <Common>
      <View style={{ paddingBottom: 75 }}>
        <FlatList
          data={orderdata}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 5 }}
          renderItem={({ item, index: i }) => (
            <View style={styles.container}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View
                  onTouchStart={() =>
                    setShowDetails((prev) => (i === prev ? -1 : i))
                  }
                  style={{ flexDirection: "row", alignItems: "center" }}
                >
                  <Image
                    style={styles.profile}
                    source={require("../assets/no-photo.png")}
                  />
                  <View style={{ marginLeft: 6 }}>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Text style={{ fontSize: 16, fontWeight: 500 }}>
                        {item.shopName}
                      </Text>
                      {showDetails === i ? (
                        <MaterialIcons
                          name='keyboard-arrow-up'
                          size={24}
                          color={color.darkGray}
                        />
                      ) : (
                        <MaterialIcons
                          name='keyboard-arrow-down'
                          size={24}
                          color={color.darkGray}
                        />
                      )}
                    </View>
                    <Text style={{ color: color.darkGray }}>
                      {item.address}
                    </Text>
                  </View>
                </View>
                <View onTouchStart={(e) => e.stopPropagation()}>
                  <Text
                    style={{
                      ...styles.status,
                      backgroundColor:
                        item.status === "Undelivered" ? "#fde68a" : "#d9f99d",
                      color:
                        item.status === "Undelivered" ? "#d97706" : "#65a30d",
                    }}
                  >
                    {item.status}
                  </Text>
                  <Text style={{ fontSize: 13, marginRight: 3 }}>
                    {item.time}
                  </Text>
                </View>
              </View>

              {showDetails === i && (
                <View
                  style={{
                    marginLeft: 50,
                    marginTop: 10,
                    backgroundColor: "#f1f5f9",
                    paddingHorizontal: 8,
                    paddingVertical: 10,
                    borderRadius: 6,
                    width: 280,
                  }}
                >
                  <View
                    key={item.id}
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: 250,
                      borderBottomWidth: 1,
                      borderBottomColor: "#cbd5e1",
                      paddingBottom: 3,
                      marginBottom: 3,
                    }}
                  >
                    <Text>Name</Text>
                    <Text>Qty</Text>
                    <Text>Price</Text>
                    <Text>Total</Text>
                  </View>
                  {item.products.map((item, i) => (
                    <View
                      key={item.id}
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginVertical: 2,
                        width: 250,
                      }}
                    >
                      <Text>{item.name}</Text>
                      <Text>{item.qty}</Text>
                      <Text>{item.price}</Text>
                      <BDT
                        style={{ marginRight: i !== 0 ? 6 : 0 }}
                        ammount={item.total}
                      />
                    </View>
                  ))}

                  <View
                    style={{
                      marginTop: 4,
                      alignItems: "flex-end",
                    }}
                  >
                    <View
                      style={{
                        borderTopColor: "#cbd5e1",
                        borderTopWidth: 1,
                        paddingLeft: 10,
                        paddingTop: 3,
                        width: 100,

                        marginTop: 5,
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "flex-end",
                        }}
                      >
                        <Text
                          style={{
                            fontWeight: 500,
                            marginRight: 4,
                          }}
                        >
                          Total:
                        </Text>
                        <BDT ammount={item.totalSale} />
                      </View>
                      <View>
                        <Button
                          onPress={() =>
                            navigation.navigate("completeOrder", item)
                          }
                          style={{ marginTop: 4 }}
                          title='Complete'
                        />
                      </View>
                    </View>
                  </View>
                </View>
              )}
            </View>
          )}
        />
      </View>
    </Common>
  );
};

export default Notifications;
