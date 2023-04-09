import { View } from "react-native";
import { styles } from "../../css/footer";
import {
  Ionicons,
  FontAwesome5,
  Foundation,
  MaterialIcons,
  Entypo,
  FontAwesome,
  Fontisto,
  AntDesign,
} from "@expo/vector-icons";
import { useState } from "react";
import { useRoute } from "@react-navigation/native";
import Menu from "./Menu";
import { color } from "../utilitise/colors";
import Drawar from "../Drawar";
import SubMenu from "./SubMenu";

const Footer = () => {
  const [createModal, setCreateModal] = useState(false);
  const [moreOption, setMoreOption] = useState(false);
  const route = useRoute();

  return (
    <View style={styles.container}>
      {/* home */}
      <Menu
        name='home'
        Icon={
          <Ionicons
            style={[
              route.name === "home"
                ? { color: color.green }
                : { color: "#4b5563" },
              { fontSize: 20 },
            ]}
            name='md-home'
            size={24}
            color='black'
          />
        }
      />
      {/* customer */}
      <Menu
        name='customer'
        Icon={
          <FontAwesome5
            style={[
              route.name === "customer"
                ? { color: color.green }
                : { color: "#4b5563" },
              { fontSize: 20 },
            ]}
            name='users'
            size={24}
            color='black'
          />
        }
      />

      {/* plus */}
      <Menu
        name=''
        navigate={false}
        showModal={setCreateModal}
        Icon={
          <Ionicons
            style={{ color: "#4b5563" }}
            name='ios-add-circle-sharp'
            size={40}
            color='black'
          />
        }
      />

      {/* order */}
      <Menu
        name='order'
        Icon={
          <Foundation
            style={[
              route.name === "order"
                ? { color: color.green }
                : { color: "#4b5563" },
              { fontSize: 20 },
            ]}
            name='shopping-cart'
            size={24}
            color='black'
          />
        }
      />

      {/* more */}
      <Menu
        name='more'
        showModal={setMoreOption}
        navigate={false}
        Icon={
          <MaterialIcons
            style={{ color: "#4b5563", fontSize: 20 }}
            name='more'
            size={24}
            color='black'
          />
        }
      />

      {/* add menu modals */}
      <Drawar setShowModal={setCreateModal} show={createModal}>
        <SubMenu
          name='Add Shop'
          url='addshop'
          bgColor='#d1fae5'
          showModal={setCreateModal}
          icon={<Entypo name='shop' size={20} color='#10b981' />}
        />
        <SubMenu
          name='Create Order'
          url='createOrder'
          bgColor='#cffafe'
          showModal={setCreateModal}
          icon={
            <FontAwesome name='shopping-basket' size={18} color='#06b6d4' />
          }
        />
        <SubMenu
          name='Create Note'
          url='createNote'
          bgColor='#ecfccb'
          showModal={setCreateModal}
          icon={<MaterialIcons name='note-add' size={24} color='#84cc16' />}
        />
      </Drawar>

      {/* more modal */}
      <Drawar setShowModal={setMoreOption} show={moreOption}>
        <SubMenu
          name='Manage Product'
          url='manageProduct'
          bgColor='#ecfccb'
          showModal={setMoreOption}
          icon={<Fontisto name='shopping-store' size={16} color='#84cc16' />}
        />
        <SubMenu
          name='Manage Users'
          url='manageUsers'
          bgColor='#e0f2fe'
          showModal={setMoreOption}
          icon={<Ionicons name='md-man' size={24} color='#0284c7' />}
        />
        <SubMenu
          name='Add User'
          url='addUser'
          bgColor='#eddaf5'
          showModal={setMoreOption}
          icon={<AntDesign name='adduser' size={21} color='#af3ae0' />}
        />
      </Drawar>
    </View>
  );
};

export default Footer;
