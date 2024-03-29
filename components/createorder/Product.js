import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";

import { styles } from "../../css/createOrder";
import BDT from "../utilitise/BDT";
import P from "../utilitise/P";

const Product = ({ products, setForm }) => {
  const [showDelete, setShowDelete] = useState(-1);

  function deleteProductFromList(item) {
    const id = item.id ? "id" : "productId";
    setForm((prev) => {
      const filtered = prev.products.filter((p) => p[id] !== item[id]);
      prev.products = filtered;
      if (item.id) {
        if (prev.deleteProduct) prev.deleteProduct.push(item.id);
        else prev.deleteProduct = [item.id];
      }
      prev.totalSale = parseInt(prev.totalSale) - parseInt(item.total);
      return { ...prev };
    });
    setShowDelete(-1);
  }

  return (
    <>
      <View style={styles.productTableHeader}>
        <P bold={500} style={{ width: "40%" }}>
          Name
        </P>
        <P align='center' bold={500} style={{ width: "20%" }}>
          Qty
        </P>
        <P align='center' bold={500} style={{ width: "20%" }}>
          Price
        </P>
        <P align='center' bold={500} style={{ width: "20%" }}>
          Total
        </P>
      </View>
      {products.map((item, index) => (
        <Pressable
          key={index}
          onLongPress={() => setShowDelete(index)}
          onPress={() => setShowDelete(-1)}
          style={styles.productTableItem}
        >
          <P style={{ width: "40%" }}>{item.name}</P>
          <P style={{ width: "20%", textAlign: "center" }}>{item.qty}</P>
          <P style={{ width: "20%", textAlign: "center" }}>
            {item.isFree === "false" ? item.price : "Free"}
          </P>
          <BDT
            style={{ width: "20%", textAlign: "center" }}
            amount={item.total}
          />

          {showDelete === index ? (
            <View style={styles.deleteBtn}>
              <Pressable onPress={() => deleteProductFromList(item)}>
                <Text style={styles.deleteBtnText}>Delete</Text>
              </Pressable>
            </View>
          ) : null}
        </Pressable>
      ))}
    </>
  );
};

export default Product;
