import { useEffect, useState } from "react";
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
import useStore from "../context/useStore";
import { Fetch } from "../services/common";

const CreateOrder = ({ route, navigation }) => {
  const [showDelete, setShowDelete] = useState(-1);
  const [product, setProduct] = useState({});
  const [show, setShow] = useState(false);
  const store = useStore();
  const [form, setForm] = useState({
    shopInfo: {},
    products: [],
    totalSale: 0,
    billno: "",
  });

  //for editing initialize;
  useEffect(() => {
    const order = route.params?.order;
    if (!route.params?.edit) return;
    setForm({
      shopInfo: {
        shopName: order.shopName,
        address: order.address,
        phone: order.phone,
      },
      products: order.products,
      totalSale: order.totalSale,
      billno: order.billno,
    });
  }, [route.params]); //till;

  function addToListProduct() {
    const exist = form.products.find((p) => p.productId === product.productId);
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

  function deleteProductFromList(id, totalPrice) {
    setForm((prev) => {
      const filtered = prev.products.filter((p) => p.id !== id);
      prev.products = filtered;
      if (prev.deleteProduct) prev.deleteProduct.push(id);
      else prev.deleteProduct = [id];
      prev.totalSale = parseInt(prev.totalSale) - parseInt(totalPrice);
      return { ...prev };
    });
    setShowDelete(-1);
  }

  async function onSubmit() {
    try {
      store.setLoading(true);
      const edit = route.params?.edit;
      const data = form;
      data.shopId = data.shopInfo.id;
      delete data.shopInfo;
      data.created_by = store.user.id;
      if (!edit) {
        const date = new Date();
        data.time = formatAMPM(date);
      }
      const method = edit ? "PUT" : "POST";
      const url = edit ? `/order?id=${route.params?.order.id}` : "/order";
      const { message } = await Fetch(url, method, data);
      store.setMessage({ msg: message, type: "success" });
      store.setUpdateOrder((prev) => !prev);
      navigation.goBack();
    } catch (error) {
      store.setMessage({ msg: error.message, type: "error" });
    } finally {
      store.setLoading(false);
    }
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

  const submitBtnDisable =
    route.params?.edit && form.products.length
      ? false
      : !form.shopInfo?.id || !form.products.length || !form.billno;

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
            url='/customer?opt=id,shopName,address,phone'
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
            keyboardType='phone-pad'
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
                          onPress={() =>
                            deleteProductFromList(item.id, item.total)
                          }
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
              disabled={route.params?.edit ? false : !form.shopInfo?.id}
              style={{ width: 40, height: 40, borderRadius: 100 }}
              title={
                <Ionicons name='ios-add-circle-sharp' size={24} color='#fff' />
              }
            />
          </View>

          <Button
            disabled={submitBtnDisable}
            onPress={onSubmit}
            title='Submit'
          />
        </View>

        {/* add product form */}
        <View
          style={{
            ...styles.productContainer,
            display: show ? "flex" : "none",
          }}
        >
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
            url='/product?opt=id,name,price'
            handler={(_, info) =>
              setProduct({
                productId: info.id,
                name: info.name,
                price: info.price,
              })
            }
          />
          {product.name ? (
            <>
              <TextInput
                style={commonStyles.input}
                placeholder='Qty'
                keyboardType='phone-pad'
                defaultValue='1'
                onChangeText={(value) =>
                  setProduct((prev) => {
                    return { ...prev, qty: value };
                  })
                }
              />
              <TextInput
                style={commonStyles.input}
                placeholder='Price'
                keyboardType='phone-pad'
                defaultValue={
                  product.price === 0 ? "" : product.price.toString()
                }
                onChangeText={(value) =>
                  setProduct((prev) => {
                    return { ...prev, price: value };
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
      </View>
    </Common>
  );
};

export default CreateOrder;
