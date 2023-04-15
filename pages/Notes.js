import React, { useState } from "react";
import { Text } from "react-native";
import { View } from "react-native";
import { Common } from "../App";
import { FlatList } from "react-native";
import { notes } from "../data";
import { Pressable } from "react-native";
import Drawar from "../components/Drawar";
import SubMenu from "../components/footer/SubMenu";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { color } from "../components/utilitise/colors";

const Notes = ({ navigation }) => {
  const [show, setShow] = useState(false);
  const [showForm, setShowFrom] = useState(null);

  function removeProduct(id) {
    alert("Are you sure to remove?", () => {
      console.log(id);
    });
  }

  return (
    <Common>
      <FlatList
        data={notes}
        contentContainerStyle={{ margin: 15 }}
        ItemSeparatorComponent={() => <View style={{ marginVertical: 5 }} />}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <Pressable
            onLongPress={() => setShowFrom(item)}
            style={{
              backgroundColor: "#fff",
              padding: 10,
              borderRadius: 10,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.22,
              shadowRadius: 2.22,
              elevation: 3,
            }}
          >
            <Text style={{ fontWeight: 500, fontSize: 17 }}>
              {item.heading}
            </Text>

            <Text
              numberOfLines={show === index ? undefined : 3}
              style={{ fontSize: 15 }}
            >
              {item.description}
            </Text>
            <Pressable
              onPress={() => setShow((prev) => (prev === index ? -1 : index))}
            >
              <Text style={{ fontWeight: 500, color: "#c34fe3" }}>
                {show === index ? "Show less" : "See more"}
              </Text>
            </Pressable>
          </Pressable>
        )}
      />
      <Drawar
        setShowModal={() => setShowFrom(null)}
        show={showForm ? true : false}
        bottom={300}
      >
        <SubMenu
          name='Edit'
          navigate={false}
          onPress={() =>
            navigation.navigate("createNote", { edit: true, data: showForm })
          }
          bgColor='#f7d5f6'
          showModal={setShowFrom}
          icon={<Feather name='edit' size={16} color='#d638d2' />}
        />
        <SubMenu
          name='Remove'
          bgColor={color.lightOrange}
          navigate={false}
          showModal={setShowFrom}
          onPress={() => removeProduct(showForm.id)}
          icon={
            <MaterialCommunityIcons
              name='archive-remove'
              size={18}
              color={color.orange}
            />
          }
        />
      </Drawar>
    </Common>
  );
};

export default Notes;
