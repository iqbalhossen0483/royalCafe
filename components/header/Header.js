import { Image, Pressable, Text, View } from "react-native";
import { styles } from "../../css/header";
import { Ionicons } from "@expo/vector-icons";
import { commonStyles } from "../../css/common";
import { useNavigation } from "@react-navigation/native";
import { color } from "../utilitise/colors";
import BDT from "../utilitise/BDT";
import useStore from "../../context/useStore";
import { Fetch, serverUrl } from "../../services/common";
import { useEffect, useState } from "react";

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
        {user.profile ? (
          <Image
            style={{ width: 40, height: 40, borderRadius: 100 }}
            source={{ uri: serverUrl + user.profile }}
            resizeMode='cover'
          />
        ) : (
          <Image
            style={{ width: 40, height: 40, borderRadius: 100 }}
            source={require("../../assets/no-photo.png")}
            resizeMode='cover'
          />
        )}
        <View style={{ marginLeft: 5 }}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={{ color: "#e6e6f2" }}>
            AC: <BDT amount={user?.haveMoney || 0} />
          </Text>
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
