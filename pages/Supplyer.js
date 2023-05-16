import React, { useEffect, useState } from "react";
import { Common } from "../App";
import { Image, Text, View } from "react-native";
import { styles } from "../css/profile";
import { commonStyles } from "../css/common";
import BDT from "../components/utilitise/BDT";
import { color } from "../components/utilitise/colors";
import { Fetch, serverUrl } from "../services/common";
import useStore from "../context/useStore";

const Supplyer = ({ route }) => {
  const [data, setData] = useState(null);
  const store = useStore();
  const id = route.params.id;

  useEffect(() => {
    (async () => {
      try {
        const result = await Fetch(`/supplier?id=${id}`, "GET");
        setData(result);
      } catch (error) {
        store.setMessage({ msg: error.message, type: "error" });
      }
    })();
  }, [id]);

  if (!data) return null;
  return (
    <Common>
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <View style={styles.profileWrapper}>
            <Image
              style={styles.profile}
              source={{ uri: serverUrl + data.profile }}
            />
            <View>
              <Text style={styles.name}>{data.name}</Text>
              <Text style={styles.designation}>{data.address}</Text>
              <Text style={styles.phone}>{data.phone}</Text>
            </View>
          </View>

          <View style={{ marginTop: 15 }}>
            <Text style={{ color: "#1b39bf" }}>
              Total Purchased: <BDT amount={data.totalPurchased} />
            </Text>
            <Text style={{ color: color.green }}>
              Amount Given: <BDT amount={data.giveAmount} />
            </Text>
            <Text style={{ color: color.orange }}>
              Debt Amount: <BDT amount={data.debtAmount} />
            </Text>
          </View>
        </View>

        {data.products && (
          <>
            <Text style={commonStyles.heading}>Purchase Report</Text>

            <View style={styles.workContainer}>
              {data.products.map((item) => (
                <Text key={item.id} style={styles.workText}>
                  {item.name} : <BDT bdtSign={false} amount={item.purchased} />
                </Text>
              ))}
            </View>
          </>
        )}
      </View>
    </Common>
  );
};

export default Supplyer;
