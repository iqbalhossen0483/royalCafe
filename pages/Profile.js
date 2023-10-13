import React, { useEffect, useState } from "react";
import { Common } from "../App";
import { Dimensions, Image, Text, View } from "react-native";
import { styles } from "../css/profile";
import Button from "../components/utilitise/Button";
import { alert } from "../components/utilitise/Alert";
import { Fetch, serverUrl } from "../services/common";
import useStore from "../context/useStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native";
import { LoadingOnComponent } from "../components/utilitise/Loading";
import Summery from "../components/profile/Summery";
import Notes from "../components/profile/Notes";
import Target from "../components/profile/Target";
import MoneyReport from "../components/profile/MoneyReport";

const Profile = ({ route, navigation }) => {
  const store = useStore();
  const [user, setUser] = useState(null);
  const height = Dimensions.get("window").height;
  function goForEdit() {
    navigation.navigate("addUser", {
      edit: true,
      data: user,
      user: true,
    });
  }

  useEffect(() => {
    (async () => {
      try {
        const user = await Fetch(
          `/user?id=${route.params?.userId || store.user.id}`,
          "GET"
        );
        setUser(user[0]);
      } catch (error) {
        store.setMessage({ msg: error.message, type: "error" });
      }
    })();
  }, [store.updateUser, route.params?.userId]);

  function logOut() {
    alert("Are you sure to log Out?", async () => {
      await AsyncStorage.removeItem("token");
      store.setUser(null);
    });
  }

  if (!user) return <LoadingOnComponent />;

  const money_transactions = user?.money_transactions;

  return (
    <Common>
      <ScrollView
        style={{ ...styles.container, marginBottom: height - height * 0.93 }}
      >
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
            {user?.id === store?.user?.id ? (
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

        <Summery user={user} />

        {/* notes  */}
        <Notes id={user.id} navigation={navigation} />

        {money_transactions ? (
          <>
            {/* target report */}
            <Target
              commision={money_transactions?.commision}
              user={user}
              activeUser={store.user}
            />

            {/* money report */}
            <MoneyReport
              transactions={money_transactions?.transactions}
              user={store.user}
            />
          </>
        ) : null}
      </ScrollView>
    </Common>
  );
};

export default Profile;
