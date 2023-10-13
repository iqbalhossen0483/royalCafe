import { useEffect, useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
import { Common, socket } from "../App";
import Button from "../components/utilitise/Button";
import Select from "../components/utilitise/Select";
import { commonStyles } from "../css/common";
import { Ionicons } from "@expo/vector-icons";
import BDT from "../components/utilitise/BDT";
import useStore from "../context/useStore";
import { Fetch } from "../services/common";
import AddProduct from "../components/createorder/AddProduct";
import PreviousOrder from "../components/createorder/PreviousOrder";
import Product from "../components/createorder/Product";

const CreateOrder = ({ route, navigation }) => {
  const [show, setShow] = useState(false);
  const store = useStore();
  const [form, setForm] = useState({
    shopInfo: {},
    products: [],
    totalSale: 0,
    billno: 0,
    prevSale: false,
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
      prevSale: order.prevSale === "false" ? false : true,
    });
  }, [route.params]); //till;

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

  async function onSubmit() {
    try {
      store.setLoading(true);
      const edit = route.params?.edit;
      const data = { ...form };
      data.shopId = data.shopInfo.id;
      delete data.shopInfo;
      data.deleteProduct;
      data.created_by = store.user.id;
      if (!edit) {
        const date = new Date();
        data.time = formatAMPM(date);
      }
      const method = edit ? "PUT" : "POST";
      const url = edit
        ? `/order?id=${route.params?.order.id}&editOrder=true`
        : "/order";
      const { message } = await Fetch(url, method, data);
      store.setMessage({ msg: message, type: "success" });
      navigation.goBack();
      if (socket) {
        socket.send(
          JSON.stringify({
            type: "createdOrder",
            id: store.user.id,
            name: store.user.name,
          })
        );
      }
    } catch (error) {
      store.setMessage({ msg: error.message, type: "error" });
    } finally {
      store.setLoading(false);
    }
  }

  const submitBtnDisable = route.params?.edit
    ? false
    : form.prevSale && form.shopInfo?.id && form.totalSale
    ? false
    : !form.shopInfo?.id || !form.products.length;

  return (
    <Common>
      <ScrollView>
        <View style={commonStyles.formContainer}>
          <Text style={commonStyles.formHeader}>
            {route.params?.edit ? "Edit" : "Create"} Order
          </Text>
          <View style={{ rowGap: 5, overflow: "visible" }}>
            <Select
              name='shopInfo'
              placeholder='Shop name'
              url='/customer?opt=id,shopName,address,phone'
              search={true}
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
            />
            <TextInput
              onChangeText={(value) =>
                setForm((prev) => {
                  return { ...prev, billno: value };
                })
              }
              keyboardType='phone-pad'
              defaultValue={form.billno ? form.billno.toString() : ""}
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
                <Product products={form.products} setForm={setForm} />
                <View
                  style={{ flexDirection: "row", justifyContent: "flex-end" }}
                >
                  <Text>Total: </Text>
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
                  <Ionicons
                    name='ios-add-circle-sharp'
                    size={24}
                    color='#fff'
                  />
                }
              />
            </View>

            {/* in case of Previous sold order; */}
            {store.user.designation === "Admin" ? (
              <PreviousOrder form={form} setForm={setForm} />
            ) : null}

            {/* create order */}
            <Button
              disabled={submitBtnDisable}
              onPress={onSubmit}
              title='Submit'
            />
          </View>

          {/* add product form */}
          <AddProduct
            products={form.products}
            setForm={setForm}
            setShow={setShow}
            show={show}
            form={form}
          />
        </View>
      </ScrollView>
    </Common>
  );
};

export default CreateOrder;
