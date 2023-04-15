import React from "react";
import { Common } from "../App";
import { Image, Text, View } from "react-native";
import { styles } from "../css/profile";
import Button from "../components/utilitise/Button";
import { commonStyles } from "../css/common";
import BDT from "../components/utilitise/BDT";
import { color } from "../components/utilitise/colors";

const Supplyer = ({ route, navigation }) => {
  const data = route.params.data;

  return (
    <Common>
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <View style={styles.profileWrapper}>
            <Image
              style={styles.profile}
              source={require("../assets/no-photo.png")}
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

        <Text style={commonStyles.heading}>Purchase Report</Text>

        <View style={styles.workContainer}>
          {data.products.map((item) => (
            <Text key={item.id} style={styles.workText}>
              {item.name} : <BDT bdtSign={false} amount={item.purchased} />
            </Text>
          ))}
        </View>
      </View>
    </Common>
  );
};

export default Supplyer;
