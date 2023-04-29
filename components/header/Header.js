import { Image, Pressable, Text, View } from "react-native";
import { styles } from "../../css/header";
import { Ionicons } from "@expo/vector-icons";
import { commonStyles } from "../../css/common";
import { useNavigation } from "@react-navigation/native";
import { color } from "../utilitise/colors";
import BDT from "../utilitise/BDT";
import useStore from "../../context/useStore";
import { serverUrl } from "../../services/common";

const Header = () => {
  const navigation = useNavigation();
  const { user } = useStore();

  if (!user) return null;
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.profileWrapper}
        onPress={() =>
          navigation.navigate("profile", { data: user, edit: true })
        }
      >
        <Image
          style={{ width: 40, height: 40, borderRadius: 100 }}
          source={{ uri: serverUrl + user.profile }}
          resizeMode='cover'
        />
        <View style={{ marginLeft: 5 }}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={{ color: "#e6e6f2" }}>
            AC: <BDT amount={user?.salesMoney || 0} />
          </Text>
        </View>
      </Pressable>
      <View
        onTouchStart={() => navigation.navigate("notification")}
        style={{ marginRight: 13, position: "relative" }}
      >
        <View style={styles.notificationNose} />
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
