import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { styles } from "../../css/createOrder";
import BDT from "../utilitise/BDT";

const Product = ({ products, setForm }) => {
  const [showDelete, setShowDelete] = useState(-1);

  function deleteProductFromList(item) {
    const id = item.id ? "id" : "productId";
    setForm((prev) => {
      const filtered = prev.products.filter((p) => p[id] !== item[id]);
      prev.products = filtered;
      if (item.id) {
        if (prev.deleteProduct) prev.deleteProduct.push(id);
        else prev.deleteProduct = [id];
      }
      prev.totalSale = parseInt(prev.totalSale) - parseInt(item.total);
      return { ...prev };
    });
    setShowDelete(-1);
  }

  return (
    <>
      <View style={styles.productTableHeader}>
        <Text style={{ width: "40%" }}>Name</Text>
        <Text style={{ width: "20%", textAlign: "center" }}>Qty</Text>
        <Text style={{ width: "20%", textAlign: "center" }}>Price</Text>
        <Text style={{ width: "20%", textAlign: "center" }}>Total</Text>
      </View>
      {products.map((item, index) => (
        <Pressable
          key={index}
          onLongPress={() => setShowDelete(index)}
          onPress={() => setShowDelete(-1)}
          style={styles.productTableItem}
        >
          <Text style={{ width: "40%" }}>{item.name}</Text>
          <Text style={{ width: "20%", textAlign: "center" }}>{item.qty}</Text>
          <Text style={{ width: "20%", textAlign: "center" }}>
            {item.isFree === "false" ? item.price : "Free"}
          </Text>
          <BDT
            style={{ fontWeight: "normal", width: "20%", textAlign: "center" }}
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
