import { useEffect, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";

import { Common } from "../components/Common";
import Drawar from "../components/Drawar";
import SeeCollectionList from "../components/order/SeeCollectionList";
import CollectionForm from "../components/purchase/Collection";
import BDT from "../components/utilitise/BDT";
import Button from "../components/utilitise/Button";
import P from "../components/utilitise/P";
import useStore from "../context/useStore";
import { commonStyles } from "../css/common";
import { styles } from "../css/orderDetails";
import { Fetch, dateFormatter, serverUrl } from "../services/common";

const PurchasedDetails = ({ route }) => {
  const [showCollnForm, setShowCollForm] = useState(false);
  const [showCollInfo, setShowCollInfo] = useState(false);
  const [data, setData] = useState(null);
  const [showImg, setShowImg] = useState("");
  const store = useStore();

  useEffect(() => {
    (async () => {
      try {
        store.setLoading(true);
        const result = await Fetch(`/purchase?id=${route.params?.id}`, "GET");
        setData(result);
      } catch (error) {
        store.setMessage({ msg: error.message, type: "error" });
      } finally {
        store.setLoading(false);
      }
    })();
  }, [route.params?.id, store.updatePurchase]);

  if (!data) return null;

  return (
    <Common>
      <View style={styles.container}>
        <View style={styles.headerWrapper}>
          <P align='center' bold={500} size={18} style={{ color: "#4b5cbf" }}>
            {store.siteInfo?.name}
          </P>
          <P align='center' style={{ color: "#4b5cbf" }}>
            {store.siteInfo?.address}
          </P>
        </View>
        <View style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
          <View style={styles.dateNbill}>
            <P>
              <P bold={500}>Date: </P>
              {dateFormatter(data.date)}
            </P>
          </View>

          <View style={{ flexDirection: "row", columnGap: 5, marginTop: 5 }}>
            <P bold={500}>Name:</P>
            <Text style={styles.shopNameNaddress}>{data.name}</Text>
          </View>
          <View style={{ flexDirection: "row", columnGap: 5 }}>
            <P bold={500}>Address:</P>
            <Text style={styles.shopNameNaddress}>{data.address}</Text>
          </View>

          {/* details */}
          <View style={styles.detailsWrapper}>
            <View
              style={{
                ...commonStyles.tableRow,
                justifyContent: "space-between",
              }}
            >
              <P bold={500} style={{ width: "70%" }}>
                Product
              </P>
              <P bold={500} style={{ width: "30%" }}>
                Qty
              </P>
            </View>
            {data.products.length ? (
              data.products.map((item) => (
                <View
                  key={item.id}
                  style={{
                    ...commonStyles.tableRow,
                    justifyContent: "space-between",
                  }}
                >
                  <P style={{ width: "70%" }}>{item.full_name}</P>
                  <P style={{ width: "30%" }}>{item.qty}</P>
                </View>
              ))
            ) : (
              <P align='center'>No product</P>
            )}
            <View
              style={{
                marginTop: 10,
                alignItems: "flex-end",
              }}
            >
              <Account name='Total' amount={data.total_amount} />
              <Account name='Payment' amount={data.payment} />
              <Account
                style={{ color: data.due ? "#dc2626" : "#000" }}
                name='Due'
                amount={data.due}
              />

              {data.due !== 0 && (
                <Button
                  onPress={() => setShowCollForm(true)}
                  style={{ marginVertical: 5 }}
                  title='Give Payment'
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

        <View style={{ flexDirection: "row", gap: 5, flexWrap: "wrap" }}>
          {data.files
            ? data.files.split(",").map((img, i) => {
                if (img)
                  return (
                    <Pressable key={i} onPress={() => setShowImg(img)}>
                      <Image
                        source={{ uri: serverUrl + img }}
                        style={{
                          width: 100,
                          height: 60,
                          resizeMode: "cover",
                        }}
                      />
                    </Pressable>
                  );
                else null;
              })
            : null}
        </View>

        {showCollnForm && (
          <CollectionForm
            purchase={true}
            data={data}
            setShow={setShowCollForm}
          />
        )}
        {showCollInfo && (
          <SeeCollectionList
            data={data.collections}
            setShow={setShowCollInfo}
          />
        )}
        <Drawar
          setShowModal={() => setShowImg("")}
          width='100%'
          show={showImg ? true : false}
        >
          {showImg ? (
            <Image
              source={{ uri: serverUrl + showImg }}
              style={{
                width: "100%",
                height: 190,
                resizeMode: "cover",
                marginTop: 10,
              }}
            />
          ) : null}
        </Drawar>
      </View>
    </Common>
  );
};

export default PurchasedDetails;

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
      <P
        style={{
          fontWeight: 500,
          marginRight: 4,
          ...style,
        }}
      >
        {name}:
      </P>
      <BDT style={style} amount={amount} />
    </View>
  );
}
