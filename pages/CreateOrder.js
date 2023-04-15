import React, { useEffect, useState } from "react";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";
import { Common } from "../App";
import Button from "../components/utilitise/Button";
import Select from "../components/utilitise/Select";
import { commonStyles } from "../css/common";
import { Ionicons } from "@expo/vector-icons";
import { customerData, products } from "../data";
import BDT from "../components/utilitise/BDT";
import { styles } from "../css/createOrder";
import { Alert } from "react-native";

const CreateOrder = ({ route }) => {
  const [showDelete, setShowDelete] = useState(-1);
  const [product, setProduct] = useState({});
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    shopInfo: {},
    products: [],
    totalSale: 0,
    billno: "",
  });

  useEffect(() => {
    const order = route.params?.order;
    if (!route.params?.edit) return;
    setForm({
      shopInfo: {
        shopName: order.shopInfo.shopName,
        address: order.shopInfo.address,
        phone: order.shopInfo.phone,
      },
      products: order.products,
      totalSale: order.totalSale,
      billno: order.billno,
    });
  }, [route.params]);

  function addToListProduct() {
    const exist = form.products.find((p) => p.id === product.id);
    if (exist) return Alert.alert("Alrady added");
    setForm((prev) => {
      if (!product.qty) product.qty = 1;
      product.total = product.qty * product.price;
      prev.totalSale += product.total;
      prev.products.push(product);
      return { ...prev };
    });
    setProduct({});
    setShow(false);
  }

  function deleteProductFromList(id) {
    setForm((prev) => {
      const filtered = prev.products.filter((p) => p.id !== id);
      prev.products = filtered;
      return { ...prev };
    });
    setShowDelete(-1);
  }

  function onSubmit() {
    const data = form;
    data.status = "Undelivered";
    const date = new Date();
    data.date = date.toISOString().slice(0, 10);
    data.time = formatAMPM(date);
    console.log(JSON.stringify(data, undefined, 4));
  }

  function formatAMPM(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    const strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  }

  return (
    <Common>
      <View style={{ ...commonStyles.formContainer, zIndex: 0 }}>
        <Text style={commonStyles.formHeader}>
          {route.params?.edit ? "Edit" : "Create"} Order
        </Text>
        <View style={{ rowGap: 5, overflow: "visible" }}>
          <Select
            name='shopInfo'
            placeholder='Shop name'
            url=''
            defaultValue={route.params?.edit && form.shopInfo?.shopName}
            header='shopName'
            title='address'
            handler={(_, info) =>
              setForm((prev) => {
                return {
                  ...prev,
                  shopInfo: {
                    id: info.id,
                    shopName: info.shopName,
                    address: info.address,
                    phone: info.phone,
                  },
                };
              })
            }
            options={customerData}
          />
          <TextInput
            onChangeText={(value) =>
              setForm((prev) => {
                return { ...prev, billno: value };
              })
            }
            keyboardType='numeric'
            defaultValue={form.billno?.toString()}
            style={commonStyles.input}
            placeholder='Bill no.'
          />

          {form.shopInfo?.address && (
            <>
              <TextInput
                style={commonStyles.input}
                editable={false}
                value={form.shopInfo.address}
              />
              <TextInput
                style={commonStyles.input}
                editable={false}
                value={form.shopInfo.phone}
              />
            </>
          )}

          {form.products.length ? (
            <>
              <View style={styles.productTableHeader}>
                <Text style={{ width: 95 }}>Name</Text>
                <Text>Qty</Text>
                <Text>Price</Text>
                <Text>Total</Text>
              </View>
              <FlatList
                keyExtractor={(_, i) => i}
                data={form.products}
                renderItem={({ item, index }) => (
                  <Pressable
                    onLongPress={() => setShowDelete(index)}
                    onPress={() => setShowDelete(-1)}
                    style={styles.productTableItem}
                  >
                    <Text style={{ width: 95 }}>{item.name}</Text>
                    <Text>{item.qty}</Text>
                    <Text>{item.price}</Text>
                    <BDT style={{ fontWeight: "normal" }} amount={item.total} />

                    {showDelete === index ? (
                      <View style={styles.deleteBtn}>
                        <Pressable
                          onPress={() => deleteProductFromList(item.id)}
                        >
                          <Text style={styles.deleteBtnText}>Delete</Text>
                        </Pressable>
                      </View>
                    ) : null}
                  </Pressable>
                )}
              />

              <View
                style={{ flexDirection: "row", justifyContent: "flex-end" }}
              >
                <Text>Total:</Text>
                <BDT amount={form.totalSale} />
              </View>
            </>
          ) : null}

          <View style={{ alignItems: "flex-end" }}>
            <Button
              onPress={() => setShow((prev) => !prev)}
              disabled={!form.shopInfo.id}
              style={{ width: 40, height: 40, borderRadius: 100 }}
              title={
                <Ionicons name='ios-add-circle-sharp' size={24} color='#fff' />
              }
            />
          </View>

          <Button
            disabled={
              !form.shopInfo.id || !form.products.length || !form.billno
            }
            onPress={onSubmit}
            title='Submit'
          />
        </View>

        {/* add product form */}
        {show ? (
          <View style={styles.productContainer}>
            <Text
              style={{
                textAlign: "center",
                fontWeight: 500,
                marginBottom: 4,
              }}
            >
              Add a product
            </Text>
            <Select
              placeholder='Select Product'
              header='name'
              options={products}
              handler={(_, info) =>
                setProduct({ id: info.id, name: info.name, price: info.price })
              }
            />
            {product.name ? (
              <>
                <TextInput
                  style={commonStyles.input}
                  placeholder='Qty'
                  keyboardType='numeric'
                  defaultValue='1'
                  onChangeText={(value) =>
                    setProduct((prev) => {
                      return { ...prev, qty: parseInt(value || 0) };
                    })
                  }
                />
                <TextInput
                  style={commonStyles.input}
                  placeholder='Price'
                  keyboardType='numeric'
                  defaultValue={
                    product.price === 0 ? "" : product.price.toString()
                  }
                  onChangeText={(value) =>
                    setProduct((prev) => {
                      return { ...prev, price: parseInt(value || 0) };
                    })
                  }
                />
              </>
            ) : null}
            <Button
              style={{ marginTop: 5 }}
              disabled={!product.name}
              title='Add'
              onPress={addToListProduct}
            />
          </View>
        ) : null}
      </View>
    </Common>
  );
};

export default CreateOrder;
