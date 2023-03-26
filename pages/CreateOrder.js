import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { Common } from "../App";
import Button from "../components/utilitise/Button";
import Select from "../components/utilitise/Select";
import { commonStyles } from "../css/common";
import { Ionicons } from "@expo/vector-icons";
import { customerData, products } from "../data";
import { color } from "../components/utilitise/colors";
import BDT from "../components/utilitise/BDT";

const productContainer = {
  position: "absolute",
  top: 80,
  left: 100,
  backgroundColor: "#fff",
  padding: 15,
  borderRadius: 5,
  width: 200,
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.22,
  shadowRadius: 2.22,
  elevation: 3,
  gap: 6,
};

const CreateOrder = () => {
  const [product, setProduct] = useState({});
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    shopInfo: {},
    products: [],
    totalSale: 0,
    billno: "",
  });

  function onSubmit() {
    const data = form;
    delete data.shopInfo;
    data.shopId = form.shopInfo.id;
    data.status = "Undelivered";
    const date = new Date();
    data.date = date.toISOString();
    data.time = date.getTime();
    console.log(data);
  }

  console.log(product);

  return (
    <Common>
      <View style={{ ...commonStyles.formContainer, zIndex: 0 }}>
        <Text style={commonStyles.formHeader}>Create Order</Text>
        <View style={{ rowGap: 5 }}>
          <Select
            name='shopInfo'
            placeholder='Shop name'
            url=''
            header='shopName'
            title='address'
            handler={(_, info) =>
              setForm((prev) => {
                return { ...prev, shopInfo: info };
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
            style={commonStyles.input}
            placeholder='Bill no.'
          />

          {form.shopInfo.address && (
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
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  borderBottomColor: color.gray,
                  borderBottomWidth: 0.5,
                  paddingBottom: 4,
                  marginTop: 7,
                }}
              >
                <Text style={{ width: 95 }}>Name</Text>
                <Text>Qty</Text>
                <Text>Price</Text>
                <Text>Total</Text>
              </View>
              {form.products.map((item, i) => (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    borderBottomColor: color.gray,
                    borderBottomWidth: 0.5,
                    paddingBottom: 4,
                  }}
                  key={i}
                >
                  <Text style={{ width: 95 }}>{item.name}</Text>
                  <Text>{item.qty}</Text>
                  <Text>{item.price}</Text>
                  <BDT style={{ fontWeight: "normal" }} ammount={item.total} />
                </View>
              ))}

              <View
                style={{ flexDirection: "row", justifyContent: "flex-end" }}
              >
                <Text>Total:</Text>
                <BDT ammount={form.totalSale} />
              </View>
            </>
          ) : null}

          <View
            onTouchStart={() => setShow((prev) => !prev)}
            style={{ alignItems: "flex-end" }}
          >
            <Button
              disabled={!form.shopInfo.shopName}
              style={{ width: 40, height: 40, borderRadius: 100 }}
              title={
                <Ionicons name='ios-add-circle-sharp' size={24} color='#fff' />
              }
            />
          </View>

          <Button
            disabled={
              !form.shopInfo.shopName || !form.products.length || !form.billno
            }
            onPress={onSubmit}
            title='Submit'
          />
        </View>

        {show ? (
          <View style={productContainer}>
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
              handler={(_, info) => setProduct(info)}
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
              onPress={() => {
                setForm((prev) => {
                  if (!product.qty) product.qty = 1;
                  product.total = product.qty * product.price;
                  prev.totalSale += product.total;
                  prev.products.push(product);
                  return { ...prev };
                });
                setProduct({});
                setShow(false);
              }}
            />
          </View>
        ) : null}
      </View>
    </Common>
  );
};

export default CreateOrder;
