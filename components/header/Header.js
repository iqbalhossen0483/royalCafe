import { Image, Pressable, Text, View } from "react-native";
import { styles } from "../../css/header";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { commonStyles } from "../../css/common";
import { useNavigation } from "@react-navigation/native";
import { color } from "../utilitise/colors";
import { users } from "../../data";
import BDT from "../utilitise/BDT";

const Header = () => {
  const navigation = useNavigation();
  const data = users[0];

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.profileWrapper}
        onPress={() => navigation.navigate("profile", { data, edit: true })}
      >
        <Image
          style={{ width: 40, height: 40, borderRadius: 100 }}
          source={require("../../assets/no-photo.png")}
        />
        <View style={{ marginLeft: 5 }}>
          <Text style={styles.name}>{data.name}</Text>
          <Pressable
            onPress={() =>
              navigation.navigate("balanceTransfer", { user: data })
            }
            style={{
              flexDirection: "row",
              alignItems: "center",
              columnGap: 8,
              marginTop: -5,
            }}
          >
            <Text style={{ color: "#e6e6f2" }}>
              AC: <BDT amount={data.salesMoney || 0} />
            </Text>
            <MaterialCommunityIcons
              name='bank-transfer-out'
              size={28}
              color='#e6e6f2'
            />
          </Pressable>
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
