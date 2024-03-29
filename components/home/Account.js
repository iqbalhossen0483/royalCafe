import { View } from "react-native";

import { commonStyles } from "../../css/common";
import { style } from "../../css/home";
import BDT from "../utilitise/BDT";
import P from "../utilitise/P";

const Account = ({ users }) => {
  const styles = { width: "30%" };

  return (
    <View style={style.accountContainer}>
      <P
        bold={500}
        style={{
          ...commonStyles.heading,
          marginTop: 0,
          width: "100%",
          marginBottom: 15,
        }}
      >
        Account of Money
      </P>
      <View style={commonStyles.tableRow}>
        <P
          style={{
            width: "40%",
          }}
          bold={500}
        >
          Name
        </P>
        <P style={styles} bold={500}>
          Debt
        </P>
        <P style={styles} bold={500}>
          Balance
        </P>
      </View>
      {users && users.length ? (
        users.map((item) => (
          <View style={commonStyles.tableRow} key={item.id}>
            <P style={{ width: "40%" }}>{item.name}</P>
            <BDT style={styles} amount={item.debt} />
            <BDT style={styles} amount={item.haveMoney} />
          </View>
        ))
      ) : (
        <P align='center' style={{ marginTop: 4 }}>
          No Balance
        </P>
      )}
    </View>
  );
};

export default Account;
