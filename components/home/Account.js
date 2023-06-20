import { View } from "react-native";
import { Text } from "react-native";
import { commonStyles } from "../../css/common";
import { style } from "../../css/home";
import BDT from "../utilitise/BDT";

const Account = ({ users }) => {
  const styles = { width: "30%" };
  const headerStyle = { width: "30%", fontWeight: 500 };
  return (
    <View style={style.accountContainer}>
      <Text style={{ ...commonStyles.heading, marginTop: 0, marginBottom: 15 }}>
        Account of Money
      </Text>
      <View style={commonStyles.tableRow}>
        <Text style={headerStyle}>Name</Text>
        <Text style={headerStyle}>Debt</Text>
        <Text style={headerStyle}>Balance</Text>
      </View>
      {users && users.length ? (
        users.map((item) => (
          <View style={commonStyles.tableRow} key={item.id}>
            <Text style={styles}>{item.name}</Text>
            <BDT style={styles} amount={item.debt} />
            <BDT style={styles} amount={item.haveMoney} />
          </View>
        ))
      ) : (
        <Text style={{ textAlign: "center", marginTop: 4 }}>No Balance</Text>
      )}
    </View>
  );
};

export default Account;
