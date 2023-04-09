import { Image, Pressable, Text, View } from "react-native";
import { styles } from "../../css/header";
import { Ionicons } from "@expo/vector-icons";
import { commonStyles } from "../../css/common";
import { useNavigation } from "@react-navigation/native";
import { color } from "../utilitise/colors";

const Header = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.profileWrapper}
        onPress={() => navigation.navigate("editProfile")}
      >
        <Image
          style={{ width: 40, height: 40, borderRadius: 100 }}
          source={require("../../assets/no-photo.png")}
        />
        <View style={{ marginLeft: 5 }}>
          <Text style={styles.name}>Mohammad Kamal</Text>
          <Text>Admin</Text>
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
