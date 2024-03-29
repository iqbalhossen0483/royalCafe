import { useEffect, useState } from "react";
import { Text, View } from "react-native";

import { Common } from "../components/Common";
import CollectionForm from "../components/order/CollectionForm";
import SeeCollectionList from "../components/order/SeeCollectionList";
import BDT from "../components/utilitise/BDT";
import Button from "../components/utilitise/Button";
import P from "../components/utilitise/P";
import useStore from "../context/useStore";
import { commonStyles } from "../css/common";
import { styles } from "../css/orderDetails";
import { Fetch, dateFormatter } from "../services/common";

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

  const rowstyles = {
    width: "25%",
    borderRightWidth: 1,
    borderRightColor: "#d1d5db",
  };

  return (
    <Common>
      <View style={styles.container}>
        <View style={styles.headerWrapper}>
          <P align='center' bold={500} size={18} style={{ color: "#4b5cbf" }}>
            {store?.siteInfo?.name}
          </P>
          <P align='center' style={{ color: "#4b5cbf" }}>
            {store?.siteInfo?.address}
          </P>
        </View>
        <View style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
          <View style={styles.dateNbill}>
            <P>
              <P size={13} bold={500}>
                Bill No:
              </P>{" "}
              {data.billno}
            </P>
            <P>
              <P size={13} bold={500}>
                Date:{" "}
              </P>
              {dateFormatter(data.date)}
            </P>
          </View>

          <View style={{ flexDirection: "row", columnGap: 5, marginTop: 5 }}>
            <P size={13} bold={500}>
              Name:
            </P>
            <P style={styles.shopNameNaddress}>{data.shopName}</P>
          </View>
          <View style={{ flexDirection: "row", columnGap: 5 }}>
            <P size={13} bold={500}>
              Address:
            </P>
            <P style={styles.shopNameNaddress}>{data.address}</P>
          </View>

          {/* details */}
          <View style={styles.detailsWrapper}>
            <View style={commonStyles.tableRow}>
              <P align='center' bold={500} style={{ width: "25%" }}>
                Product
              </P>
              <P align='center' bold={500} style={{ width: "25%" }}>
                Qty
              </P>
              <P align='center' bold={500} style={{ width: "25%" }}>
                Price
              </P>
              <P align='center' bold={500} style={{ width: "25%" }}>
                Total
              </P>
            </View>
            {data.products?.length ? (
              data.products.map((item) => (
                <View key={item.id} style={commonStyles.tableRow}>
                  <P align='center' style={rowstyles}>
                    {item?.name}
                  </P>
                  <P align='center' style={rowstyles}>
                    {item.qty}
                  </P>
                  <P align='center' style={rowstyles}>
                    {item.price}
                  </P>
                  <BDT
                    style={{ width: "25%", textAlign: "center" }}
                    amount={item.total}
                  />
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
              {data.collections?.length !== 0 && (
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
      <P bold={500} style={{ marginRight: 4, ...style }}>
        {name}:
      </P>
      <BDT style={style} amount={amount} />
    </View>
  );
}
