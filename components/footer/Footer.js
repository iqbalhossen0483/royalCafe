import { Text, View } from "react-native";
import { styles } from "../../css/footer";
import {
  Ionicons,
  FontAwesome5,
  Foundation,
  MaterialIcons,
  Entypo,
  FontAwesome,
  Fontisto,
} from "@expo/vector-icons";
import { useState } from "react";
import Modal from "react-native-modal";
import { commonStyles } from "../../css/common";
import { useNavigation, useRoute } from "@react-navigation/native";

const Footer = () => {
  const [createModal, setCreateModal] = useState(false);
  const [moreOption, setMoreOption] = useState(false);
  const route = useRoute();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* home */}
      <View
        onTouchEnd={() => navigation.navigate("home")}
        style={[styles.iconWrapper, route.name === "home" && styles.highlight]}
      >
        <Ionicons
          style={[
            route.name === "home" ? { color: "#fff" } : { color: "#4b5563" },
            { fontSize: 20 },
          ]}
          name='md-home'
          size={24}
          color='black'
        />
        <Text style={[route.name === "home" && { color: "#fff" }]}>Home</Text>
      </View>

      {/* customer */}
      <View
        onTouchEnd={() => navigation.navigate("customer")}
        style={[
          styles.iconWrapper,
          route.name === "customer" && styles.highlight,
        ]}
      >
        <FontAwesome5
          style={[
            route.name === "customer"
              ? { color: "#fff" }
              : { color: "#4b5563" },
            { fontSize: 20 },
          ]}
          name='users'
          size={24}
          color='black'
        />
        <Text style={[route.name === "customer" && { color: "#fff" }]}>
          Customers
        </Text>
      </View>

      {/* plus */}
      <View>
        <Ionicons
          style={styles.plusIcon}
          onTouchStart={() => setCreateModal(true)}
          name='ios-add-circle-sharp'
          size={24}
          color='black'
        />
      </View>

      {/* order */}
      <View
        onTouchEnd={() => navigation.navigate("order")}
        style={[styles.iconWrapper, route.name === "order" && styles.highlight]}
      >
        <Foundation
          style={[
            route.name === "order" ? { color: "#fff" } : { color: "#4b5563" },
            { fontSize: 20 },
          ]}
          name='shopping-cart'
          size={24}
          color='black'
        />
        <Text style={[route.name === "order" && { color: "#fff" }]}>
          Orders
        </Text>
      </View>

      {/* more */}
      <View onTouchStart={() => setMoreOption(true)} style={styles.iconWrapper}>
        <MaterialIcons
          style={{ color: "#4b5563", fontSize: 20 }}
          name='more'
          size={24}
          color='black'
        />
        <Text>More</Text>
      </View>

      {/* add menu modals */}
      <Modal
        onBackButtonPress={() => setCreateModal(false)}
        isVisible={createModal}
        coverScreen={false}
        style={styles.modal}
      >
        <View style={{ flex: 1 }}>
          <View style={styles.closeIconWrapper}>
            <Ionicons
              style={styles.closeIcon}
              onTouchStart={() => setCreateModal(false)}
              name='close-sharp'
              size={24}
              color='black'
            />
          </View>
          <View
            onTouchStart={() => {
              navigation.navigate("addshop");
              setCreateModal(false);
            }}
            style={{
              marginTop: 30,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={{
                ...commonStyles.iconWrapper,
                backgroundColor: "#d1fae5",
              }}
            >
              <Entypo name='shop' size={20} color='#10b981' />
            </View>
            <Text style={{ fontSize: 18, marginLeft: 5 }}>Add Shop</Text>
          </View>

          <View
            onTouchStart={() => {
              navigation.navigate("createOrder");
              setCreateModal(false);
            }}
            style={{
              marginTop: 15,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={{
                ...commonStyles.iconWrapper,
                backgroundColor: "#cffafe",
              }}
            >
              <FontAwesome name='shopping-basket' size={18} color='#06b6d4' />
            </View>
            <Text style={{ fontSize: 18, marginLeft: 5 }}>Create Order</Text>
          </View>

          <View
            onTouchStart={() => {
              navigation.navigate("createNote");
              setCreateModal(false);
            }}
            style={{
              marginTop: 15,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={{
                ...commonStyles.iconWrapper,
                backgroundColor: "#ecfccb",
              }}
            >
              <MaterialIcons name='note-add' size={24} color='#84cc16' />
            </View>
            <Text style={{ fontSize: 18, marginLeft: 5 }}>Create Note</Text>
          </View>
        </View>
      </Modal>

      {/* more modal */}
      <Modal
        onBackButtonPress={() => setMoreOption(false)}
        isVisible={moreOption}
        coverScreen={false}
        style={styles.modal}
      >
        <View style={{ flex: 1 }}>
          <View style={styles.closeIconWrapper}>
            <Ionicons
              style={styles.closeIcon}
              onTouchStart={() => setMoreOption(false)}
              name='close-sharp'
              size={24}
              color='black'
            />
          </View>

          <View
            onTouchStart={() => {
              navigation.navigate("manageProduct");
              setMoreOption(false);
            }}
            style={{
              marginTop: 30,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={{
                ...commonStyles.iconWrapper,
                backgroundColor: "#ecfccb",
              }}
            >
              <Fontisto name='shopping-store' size={18} color='#84cc16' />
            </View>
            <Text style={{ fontSize: 18, marginLeft: 5 }}>Manage Product</Text>
          </View>

          <View
            onTouchStart={() => {
              navigation.navigate("manageUsers");
              setMoreOption(false);
            }}
            style={{
              marginTop: 10,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={{
                ...commonStyles.iconWrapper,
                backgroundColor: "#e0f2fe",
              }}
            >
              <Ionicons name='md-man' size={24} color='#0284c7' />
            </View>
            <Text style={{ fontSize: 18, marginLeft: 5 }}>Manage Users</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Footer;
