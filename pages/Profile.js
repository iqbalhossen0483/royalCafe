import React from "react";
import { Common } from "../App";
import { Image, Text, View } from "react-native";
import { styles } from "../css/profile";
import Button from "../components/utilitise/Button";
import { commonStyles } from "../css/common";
import BDT from "../components/utilitise/BDT";
import { alert } from "../components/utilitise/Alert";

const Profile = ({ route, navigation }) => {
  const data = route.params.data;
  function goForEdit() {
    navigation.navigate("addUser", {
      edit: true,
      data: data,
      user: true,
    });
  }

  function logOut() {
    alert("Are you sure to log Out?", () => {
      console.log("ok");
    });
  }

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
              <Text style={styles.designation}>{data.designation}</Text>
              <Text style={styles.phone}>{data.phone}</Text>
            </View>
          </View>
          <View style={{ marginTop: 8, flexDirection: "row", columnGap: 10 }}>
            <Button
              onPress={() =>
                navigation.navigate("balanceTransfer", { user: data })
              }
              title='Money Transfer'
            />
            {route.params.edit ? (
              <>
                <Button onPress={goForEdit} title='Edit Profile' />
                <Button
                  style={{ backgroundColor: "#e8a72e" }}
                  onPress={logOut}
                  title='LogOut'
                />
              </>
            ) : null}
          </View>
        </View>

        <Text style={commonStyles.heading}>Work Report</Text>

        <View style={styles.workContainer}>
          <Text style={styles.workText}>
            Dilivered Order: <BDT amount={data.delivered} bdtSign={false} />
          </Text>
          {data.debt ? (
            <Text style={{ ...styles.workText, color: "#e319a6" }}>
              Debt: <BDT amount={data.debt} />
            </Text>
          ) : null}
          {data.salesMoney ? (
            <Text style={{ ...styles.workText, color: "#191ce3" }}>
              Balance: <BDT amount={data.salesMoney} />
            </Text>
          ) : null}
        </View>
      </View>
    </Common>
  );
};

export default Profile;
