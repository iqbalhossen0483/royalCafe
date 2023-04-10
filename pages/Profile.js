import React from "react";
import { Common } from "../App";
import { Image, Text, View } from "react-native";
import { styles } from "../css/profile";
import Button from "../components/utilitise/Button";
import { commonStyles } from "../css/common";

const Profile = ({ route, navigation }) => {
  const data = route.params.data;
  function goForEdit() {
    navigation.navigate("addUser", {
      edit: true,
      data: data,
      user: true,
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
          {route.params.edit ? (
            <View style={{ marginTop: 8 }}>
              <Button onPress={goForEdit} title='Edit Profile' />
            </View>
          ) : null}
        </View>

        <Text style={commonStyles.heading}>Work Report</Text>

        <View style={styles.workContainer}>
          <Text style={styles.workText}>Dilivered Order: {data.delivered}</Text>
          <Text style={styles.workText}>Avarage: {data.average}</Text>
          <Text style={styles.workText}>
            Response Time: {data.responseTime} h
          </Text>
        </View>
      </View>
    </Common>
  );
};

export default Profile;
