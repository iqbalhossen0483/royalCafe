import { AntDesign, Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Image,
  Keyboard,
  Pressable,
  ScrollView,
  TextInput,
  View,
} from "react-native";

import { Common } from "../../components/Common";
import { alert } from "../../components/utilitise/Alert";
import Button from "../../components/utilitise/Button";
import FileInput from "../../components/utilitise/FileInput";
import P from "../../components/utilitise/P";
import Select from "../../components/utilitise/Select";
import { color } from "../../components/utilitise/colors";
import useStore from "../../context/useStore";
import { commonStyles } from "../../css/common";
import { Fetch } from "../../services/common";

const PurchaseProduct = ({ navigation }) => {
  const [data, setData] = useState({ supplier: null, products: null });
  const [numOfShow, setNumOfShow] = useState(1);
  const [bottomMargin, setBottomMargin] = useState(57);
  const [supplier, setSupplier] = useState({
    supplierId: 0,
    totalPurchased: 0,
    giveAmount: 0,
    payment_info: "",
    files: [],
  });
  const [form, setForm] = useState([]);
  const store = useStore();

  useEffect(() => {
    (async () => {
      try {
        store.setLoading(true);
        const supplier = await Fetch("/supplier?opt=id,name", "GET");
        const products = await Fetch("/product?opt=id,name,stock", "GET");
        setData({ supplier, products });
      } catch (error) {
        store.setMessage({ msg: error.message, type: "error" });
      } finally {
        store.setLoading(false);
      }
      return () => store.setLoading(false);
    })();
  }, []);

  useEffect(() => {
    const show = Keyboard.addListener("keyboardDidShow", (event) => {
      setBottomMargin(event.endCoordinates.height);
    });
    const hide = Keyboard.addListener("keyboardDidHide", () => {
      setBottomMargin(57);
    });

    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  function onSubmit() {
    const txtMessage =
      "Please be sure to purchase.\n After purchasing you won't change it anymore";
    alert(txtMessage, async () => {
      try {
        store.setLoading(true);
        const data = {
          ...supplier,
          debtAmount: supplier.totalPurchased - supplier.giveAmount,
          product: form,
          userId: store.user.id,
        };
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
          if (key === "files") {
            value.forEach((file) => formData.append("files", file));
          } else if (key === "product") {
            formData.append("product", JSON.stringify(value));
          } else formData.append(key, value);
        });

        const { message } = await Fetch("/purchase", "POST", formData, true);
        store.setMessage({ msg: message, type: "success" });
        store.setUpdateReport((prev) => !prev);
        store.setUpdateUser((prev) => !prev);
        navigation.goBack();
      } catch (error) {
        store.setMessage({ msg: error.message, type: "error" });
      } finally {
        store.setLoading(false);
      }
    });
  }

  function addfile(file) {
    setSupplier((prev) => {
      file.id = prev.files.length;
      prev.files.push(file);
      return { ...prev };
    });
  }

  function removeFile(id) {
    setSupplier((prev) => {
      const rest = prev.files.filter((file) => file.id !== id);
      prev.files = rest;
      return { ...prev };
    });
  }

  if (!data.products || !data.supplier) return null;
  return (
    <Common>
      <ScrollView style={{ marginBottom: bottomMargin }}>
        <View style={commonStyles.formContainer}>
          <P bold={500} style={commonStyles.formHeader}>
            Purchase Product
          </P>
          <View style={{ rowGap: 10 }}>
            <Select
              header='name'
              zIndex={20000}
              name='supplier'
              placeholder='Select supplier'
              options={data.supplier}
              height='auto'
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
                <AntDesign
                  onPress={() => setNumOfShow((prev) => prev + 1)}
                  name='pluscircle'
                  size={18}
                  color='#fff'
                />
              }
            />
            <TextInput
              onChangeText={(value) =>
                setSupplier((prev) => {
                  return { ...prev, totalPurchased: parseInt(value) };
                })
              }
              style={commonStyles.input}
              placeholder='Total purchase $'
              keyboardType='phone-pad'
            />
            <TextInput
              onChangeText={(value) =>
                setSupplier((prev) => {
                  return { ...prev, giveAmount: parseInt(value) };
                })
              }
              style={commonStyles.input}
              placeholder='Give amount'
              keyboardType='phone-pad'
            />

            <TextInput
              onChangeText={(value) =>
                setSupplier((prev) => {
                  return { ...prev, payment_info: value };
                })
              }
              editable={supplier.giveAmount ? true : false}
              style={{
                textAlignVertical: "top",
                ...commonStyles.input,
                paddingTop: 5,
                height: 100,
              }}
              placeholder='Payment Information'
              multiline
            />
            {supplier.files.length ? (
              <View style={{ flexDirection: "row", gap: 5, flexWrap: "wrap" }}>
                {supplier.files.map((file) => (
                  <Pressable key={file.id} onPress={() => removeFile(file.id)}>
                    <Image
                      source={{ uri: file.uri }}
                      style={{
                        width: 100,
                        height: 60,
                        resizeMode: "cover",
                      }}
                    />
                    <Ionicons
                      style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        backgroundColor: color.gray,
                      }}
                      name='close-sharp'
                      size={20}
                      color='black'
                    />
                  </Pressable>
                ))}
              </View>
            ) : null}
            <FileInput
              disable={!supplier.payment_info}
              setImage={(file) => addfile(file)}
              title='Add file +'
            />

            <Button
              title='Submit'
              onPress={onSubmit}
              disabled={
                store.loading ||
                !supplier.supplierId ||
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
      purchased: parseInt(value),
      stock: product.stock,
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
        height={200}
        options={products}
        handler={(_, info) =>
          setProduct({ id: info.id, name: info.name, stock: info.stock })
        }
      />

      <TextInput
        onChangeText={(value) => handleChange(value)}
        editable={product ? true : false}
        style={commonStyles.input}
        placeholder='Quantity'
        keyboardType='phone-pad'
      />
    </React.Fragment>
  );
}
