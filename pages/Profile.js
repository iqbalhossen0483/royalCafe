import React from "react";
import { Common } from "../App";
import { Image, Text, View } from "react-native";
import { styles } from "../css/profile";
import Button from "../components/utilitise/Button";
import { commonStyles } from "../css/common";
import BDT from "../components/utilitise/BDT";
import { alert } from "../components/utilitise/Alert";
import { serverUrl } from "../services/common";
import useStore from "../context/useStore";

const Profile = ({ route, navigation }) => {
  const { user } = useStore();
  function goForEdit() {
    navigation.navigate("addUser", {
      edit: true,
      data: user,
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
            {user.profile ? (
              <Image
                style={styles.profile}
                source={{ uri: serverUrl + user.profile }}
              />
            ) : (
              <Image
                style={styles.profile}
                source={require("../assets/no-photo.png")}
              />
            )}
            <View>
              <Text style={styles.name}>{user.name}</Text>
              <Text style={styles.designation}>{user.designation}</Text>
              <Text style={styles.phone}>{user.phone}</Text>
            </View>
          </View>
          <View style={{ marginTop: 8, flexDirection: "row", columnGap: 10 }}>
            <Button
              onPress={() =>
                navigation.navigate("balanceTransfer", { user: user })
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
            Dilivered Order: <BDT amount={user.delivered} bdtSign={false} />
          </Text>
          {user.debt ? (
            <Text style={{ ...styles.workText, color: "#e319a6" }}>
              Debt: <BDT amount={user.debt} />
            </Text>
          ) : null}
          {user.salesMoney ? (
            <Text style={{ ...styles.workText, color: "#191ce3" }}>
              Balance: <BDT amount={user.salesMoney} />
            </Text>
          ) : null}
        </View>
      </View>
    </Common>
  );
};

export default Profile;
