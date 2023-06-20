import React, { useEffect, useState } from "react";
import { ScrollView, Text } from "react-native";
import { Common } from "../App";
import { View } from "react-native";
import { commonStyles } from "../css/common";
import { TextInput } from "react-native";
import useStore from "../context/useStore";
import Button from "../components/utilitise/Button";
import { Fetch } from "../services/common";
import Select from "../components/utilitise/Select";
import { alert } from "../components/utilitise/Alert";
import { Ionicons } from "@expo/vector-icons";
import { Keyboard } from "react-native";

const PurchaseProduct = ({ navigation }) => {
  const [data, setData] = useState({ supplier: null, products: null });
  const [numOfShow, setNumOfShow] = useState(1);
  const [bottomMargin, setBottomMargin] = useState(0);
  const [supplier, setSupplier] = useState({
    supplierId: "",
    totalPurchased: "",
    giveAmount: "",
  });
  const [form, setForm] = useState([]);
  const store = useStore();

  useEffect(() => {
    (async () => {
      try {
        const supplier = await Fetch("/supplier?opt=id,name", "GET");
        const products = await Fetch("/product?opt=id,name", "GET");
        setData({ supplier, products });
      } catch (error) {
        store.setMessage({ msg: error.message, type: "error" });
      }
    })();
  }, []);

  useEffect(() => {
    const show = Keyboard.addListener("keyboardDidShow", (event) => {
      setBottomMargin(event.endCoordinates.height);
    });
    const hide = Keyboard.addListener("keyboardDidHide", () => {
      setBottomMargin(0);
    });

    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  function onSubmit() {
    try {
      const txtMessage = `Please be sure to purchase.
After purchasing you won't change it anymore`;
      alert(txtMessage, async () => {
        try {
          const data = {
            ...supplier,
            debtAmount: supplier.totalPurchased - supplier.giveAmount,
            product: form,
          };
          const { message } = await Fetch("/purchase", "POST", data);
          store.setMessage({ msg: message, type: "success" });
          navigation.goBack();
        } catch (error) {
          throw error;
        }
      });
    } catch (error) {
      store.setMessage({ msg: error.message, type: "error" });
    }
  }

  if (!data.products || !data.supplier) return null;
  return (
    <Common>
      <ScrollView style={{ marginBottom: bottomMargin }}>
        <View style={commonStyles.formContainer}>
          <Text style={commonStyles.formHeader}>Purchase Product</Text>
          <View style={{ rowGap: 10 }}>
            <Select
              header='name'
              zIndex={20000}
              name='supplier'
              placeholder='Select supplier'
              options={data.supplier}
              handler={(_, info) =>
                setSupplier((prev) => {
                  return { ...prev, supplierId: info.id };
                })
              }
            />
            {data.products &&
              data.products
                .slice(0, numOfShow)
                .map((product, i, arr) => (
                  <PurchaseInput
                    key={product.id}
                    arr={arr}
                    i={i}
                    products={data.products}
                    setForm={setForm}
                    form={form}
                  />
                ))}

            <Button
              disabled={!data.products || data.products.length <= numOfShow}
              style={{
                width: 30,
                height: 30,
                borderRadius: 100,
                paddingHorizontal: 3,
                paddingVertical: 5,
                alignSelf: "flex-end",
              }}
              title={
                <Ionicons
                  onPress={() => setNumOfShow((prev) => prev + 1)}
                  name='ios-add-circle-sharp'
                  size={18}
                  color='#fff'
                />
              }
            />
            <TextInput
              onChangeText={(value) =>
                setSupplier((prev) => {
                  return { ...prev, totalPurchased: value };
                })
              }
              style={commonStyles.input}
              placeholder='Total purchase'
              keyboardType='phone-pad'
            />
            <TextInput
              onChangeText={(value) =>
                setSupplier((prev) => {
                  return { ...prev, giveAmount: value };
                })
              }
              style={commonStyles.input}
              placeholder='Give amount'
              keyboardType='phone-pad'
            />

            <Button
              title='Submit'
              onPress={onSubmit}
              disabled={
                !supplier.supplierId ||
                !supplier.giveAmount ||
                !supplier.totalPurchased ||
                !form.length
              }
            />
          </View>
        </View>
      </ScrollView>
    </Common>
  );
};

export default PurchaseProduct;

function PurchaseInput({ arr, i, setForm, products, form }) {
  const [product, setProduct] = useState(null);

  function handleChange(value) {
    const rest = form.filter((info) => info.productId !== product.id);
    const data = {
      productId: product.id,
      product_name: product.name,
      purchased: value,
    };
    setForm(() => [...rest, data]);
  }
  return (
    <React.Fragment>
      <Select
        zIndex={150 * (arr.length - 1 || 1) - i * 100}
        header='name'
        name='product'
        placeholder='Select product'
        options={products}
        handler={(_, info) => setProduct({ id: info.id, name: info.name })}
      />

      <TextInput
        onChangeText={(value) => handleChange(value)}
        editable={product ? true : false}
        style={commonStyles.input}
        placeholder='Purchase amount'
        keyboardType='phone-pad'
      />
    </React.Fragment>
  );
}
