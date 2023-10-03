import React from "react";
import { Text, View } from "react-native";
import BDT from "../utilitise/BDT";
import { commonStyles } from "../../css/common";
import { styles } from "../../css/profile";

const Summery = ({ user }) => {
  return (
    <>
      <Text style={commonStyles.heading}>Summery</Text>
      <View style={styles.workContainer}>
        <View>
          <Text style={{ ...styles.workText, color: "#191ce3" }}>
            Balance: <BDT amount={user.haveMoney} />
          </Text>
          <Text style={{ ...styles.workText, color: "#e319a6" }}>
            Debt: <BDT amount={user.debt} />
          </Text>
          <Text style={styles.workText}>
            Got Salary: <BDT amount={user.get_salary} bdtSign={false} />
          </Text>
          <Text style={styles.workText}>
            Got Incentive: <BDT amount={user.incentive} bdtSign={false} />
          </Text>
        </View>
        <View>
          <Text style={styles.workText}>
            Delivered Order:
            <BDT amount={user.delivered_order} bdtSign={false} />
          </Text>
          <Text style={styles.workText}>
            Total Sale: <BDT amount={user.total_sale} bdtSign={false} />
          </Text>
          <Text style={styles.workText}>
            Due Sale: <BDT amount={user.due_sale} bdtSign={false} />
          </Text>
          <Text style={styles.workText}>
            Due Collection: <BDT amount={user.due_collection} bdtSign={false} />
          </Text>
        </View>
      </View>
    </>
  );
};

export default Summery;
