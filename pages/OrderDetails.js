import { useEffect, useState } from "react";
import { Text } from "react-native";
import { View } from "react-native";
import Button from "../components/utilitise/Button";
import { styles } from "../css/orderDetails";
import { Common } from "../App";
import BDT from "../components/utilitise/BDT";
import useStore from "../context/useStore";
import { Fetch, dateFormatter } from "../services/common";
import CollectionForm from "../components/order/CollectionForm";
import SeeCollectionList from "../components/order/SeeCollectionList";
import { commonStyles } from "../css/common";

const OrderDetails = ({ route }) => {
  const [showCollnForm, setShowCollForm] = useState(false);
  const [showCollInfo, setShowCollInfo] = useState(false);
  const [data, setData] = useState(null);
  const store = useStore();

  useEffect(() => {
    (async () => {
      try {
        store.setLoading(true);
        const result = await Fetch(`/order?id=${route.params?.id}`, "GET");
        setData(result);
      } catch (error) {
        store.setMessage({ msg: error.message, type: "error" });
      } finally {
        store.setLoading(false);
      }
    })();
  }, [route.params?.id, store.updateOrder]);

  if (!data) return null;
  const tablerowStyle = { width: "25%", textAlign: "center" };
  const tableheaderStyle = {
    fontWeight: 500,
    ...tablerowStyle,
  };

  return (
    <Common>
      <View style={styles.container}>
        <View style={styles.headerWrapper}>
          <Text style={styles.header}>M/S Hazera Enterprise</Text>
          <Text style={styles.address}>
            Dharmopur, College Reoad, Adarsha Sadar, Cumilla.
          </Text>
        </View>
        <View style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
          <View style={styles.dateNbill}>
            <Text>
              <Text style={{ fontWeight: 500 }}>Bill No:</Text> {data.billno}
            </Text>
            <Text>
              <Text style={{ fontWeight: 500 }}>Date: </Text>
              {dateFormatter(data.date)}
            </Text>
          </View>

          <View style={{ flexDirection: "row", columnGap: 5, marginTop: 5 }}>
            <Text style={{ fontWeight: 500 }}>Name:</Text>
            <Text style={styles.shopNameNaddress}>{data.shopName}</Text>
          </View>
          <View style={{ flexDirection: "row", columnGap: 5 }}>
            <Text style={{ fontWeight: 500 }}>Address:</Text>
            <Text style={styles.shopNameNaddress}>{data.address}</Text>
          </View>

          {/* details */}
          <View style={styles.detailsWrapper}>
            <View style={commonStyles.tableRow}>
              <Text style={tableheaderStyle}>Product</Text>
              <Text style={tableheaderStyle}>Qty</Text>
              <Text style={tableheaderStyle}>Price</Text>
              <Text style={tableheaderStyle}>Total</Text>
            </View>
            {data.products.length ? (
              data.products.map((item) => (
                <View key={item.id} style={commonStyles.tableRow}>
                  <Text style={tablerowStyle}>{item.name.split(" ")[0]}</Text>
                  <Text style={tablerowStyle}>{item.qty}</Text>
                  <Text style={tablerowStyle}>{item.price}</Text>
                  <BDT style={tableheaderStyle} amount={item.total} />
                </View>
              ))
            ) : (
              <Text style={{ textAlign: "center" }}>No product</Text>
            )}
            <View
              style={{
                marginTop: 10,
                alignItems: "flex-end",
              }}
            >
              <Account name='Total' amount={data.totalSale} width='100%' />
              <Account name='Payment' amount={data.payment} />

              {data.discount ? (
                <Account name='Discount' amount={data.discount} />
              ) : null}

              <Account
                style={{ color: data.due ? "#dc2626" : "#000" }}
                name='Due'
                amount={data.due}
              />

              {data.due !== 0 && (
                <Button
                  onPress={() => setShowCollForm(true)}
                  style={{ marginVertical: 5 }}
                  title='Get Collection'
                />
              )}
              {data.collections.length !== 0 && (
                <Button
                  onPress={() => setShowCollInfo(true)}
                  title='See Collection Info'
                />
              )}
            </View>
          </View>
        </View>

        {showCollnForm && (
          <CollectionForm data={data} setShow={setShowCollForm} />
        )}
        {showCollInfo && (
          <SeeCollectionList
            data={data.collections}
            setShow={setShowCollInfo}
          />
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
