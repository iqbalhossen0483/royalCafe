import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Pressable, View } from "react-native";

import useStore from "../../context/useStore";
import { commonStyles } from "../../css/common";
import { styles } from "../../css/header";
import { Fetch } from "../../services/common";
import Avater from "../utilitise/Avater";
import BDT from "../utilitise/BDT";
import P from "../utilitise/P";
import { color } from "../utilitise/colors";

const Header = () => {
  const navigation = useNavigation();
  const [notification, setNotification] = useState(0);
  const { user, setMessage, upNotification } = useStore();

  useEffect(() => {
    (async () => {
      try {
        const notify = await Fetch("/admin/notification", "GET");
        setNotification(notify.length);
      } catch (error) {
        setMessage({ msg: error.message, type: "error" });
      }
    })();
  }, [upNotification]);
  if (!user) return null;
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.profileWrapper}
        onPress={() =>
          navigation.navigate("profile", { userId: user.id, edit: true })
        }
      >
        <Avater url={user.profile} />

        <View style={{ marginLeft: 5 }}>
          <P color='lightGray' bold={500} size={16}>
            {user.name}
          </P>
          <P color='lightGray' size={13}>
            AC:{" "}
            <BDT
              style={{ color: "#edeef5", fontSize: 13 }}
              amount={user?.haveMoney || 0}
            />
          </P>
        </View>
      </Pressable>
      <View
        onTouchStart={() => navigation.navigate("notification")}
        style={{ marginRight: 13, position: "relative" }}
      >
        {notification ? <View style={styles.notificationNose} /> : null}
        <View
          style={{
            ...commonStyles.iconWrapper,
            backgroundColor: color.lightOrange,
          }}
        >
          <Ionicons
            name='notifications-outline'
            size={24}
            color={color.orange}
          />
        </View>
      </View>
    </View>
  );
};

export default Header;
