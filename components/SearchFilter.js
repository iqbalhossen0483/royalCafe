import { FontAwesome, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import React, { createRef, useState } from "react";
import { Pressable, Text, View } from "react-native";
import DelayInput from "react-native-debounce-input";

import { commonStyles } from "../css/common";
import P from "./utilitise/P";
import { color } from "./utilitise/colors";

const SearchFilter = ({
  search,
  filter = true,
  placeholder,
  searchfeild = true,
  orderPage = false,
}) => {
  const [fromDate, setFromDate] = useState(new Date());
  const [endDate, setendDate] = useState(new Date());
  const [dofilter, seDotFilter] = useState(false);
  const [highlight, setHighlight] = useState(1);
  const inputRef = createRef();

  const showDatepicker = (setDate, fn) => {
    DateTimePickerAndroid.open({
      value: new Date(),
      onChange: (event, selectedDate) => {
        const currentDate = selectedDate;
        setDate(currentDate);
        if (fn !== undefined) fn(currentDate);
      },
      mode: "date",
      is24Hour: true,
    });
  };

  function serchDate(date) {
    search(`from=${fromDate.toISOString()}&end=${date.toISOString()}`);
  }
  function searchInput(value) {
    let url = `search=${value}`;
    if (value) search(url);
    else search(url, true);
  }

  const iconcss = {
    borderRadius: 50,
    height: 30,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
  };
  return (
    <View
      style={{
        backgroundColor: "#fff",
        padding: 7,
        flexDirection: "row",
        justifyContent: filter ? "space-between" : "center",
        alignItems: "center",
        borderBottomColor: color.gray,
        borderBottomWidth: 0.4,
      }}
    >
      {searchfeild ? (
        <View style={{ position: "relative", width: 200 }}>
          <DelayInput
            minLength={3}
            inputRef={inputRef}
            onChangeText={(value) => searchInput(value)}
            delayTimeout={500}
            placeholder={placeholder || "Search"}
            style={{ ...commonStyles.input }}
          />
          <View style={{ position: "absolute", right: 5, top: 6 }}>
            <Ionicons name='search-sharp' size={24} color={color.gray} />
          </View>
        </View>
      ) : null}

      <View style={{ flexDirection: "row", gap: 20 }}>
        {orderPage && !dofilter ? (
          <>
            <Pressable
              onPress={() => {
                orderPage.seeAll();
                setHighlight(1);
              }}
              style={{
                ...iconcss,
                backgroundColor: highlight === 1 ? color.green : color.gray,
              }}
            >
              <P bold={500} color={highlight === 1 ? "light" : "black"}>
                All
              </P>
            </Pressable>
            <Pressable
              onPress={() => {
                orderPage.myOrders();
                setHighlight(2);
              }}
              style={{
                ...iconcss,
                backgroundColor: highlight === 2 ? color.green : color.gray,
              }}
            >
              <FontAwesome
                name='user'
                size={20}
                color={highlight === 2 ? "white" : "gray"}
              />
            </Pressable>
            <Pressable
              onPress={() => {
                orderPage.myCollections();
                setHighlight(3);
              }}
              style={{
                ...iconcss,
                backgroundColor: highlight === 3 ? color.green : color.gray,
              }}
            >
              <FontAwesome6
                name='circle-dollar-to-slot'
                size={20}
                color={highlight === 3 ? "white" : "gray"}
              />
            </Pressable>
          </>
        ) : null}

        {filter ? (
          <View>
            {!dofilter ? (
              <Pressable
                onPress={() => seDotFilter(true)}
                style={{
                  ...iconcss,
                  backgroundColor: highlight === 4 ? color.green : color.gray,
                }}
              >
                {orderPage ? (
                  <FontAwesome name='filter' size={20} color='gray' />
                ) : (
                  <P size={13} align='center' bold={500} color='darkGray'>
                    Filter
                  </P>
                )}
              </Pressable>
            ) : (
              <Pressable
                onPress={() => {
                  seDotFilter(false);
                  search("", true);
                }}
              >
                <P size={13} align='center' bold={500} color='darkGray'>
                  Reset
                </P>
              </Pressable>
            )}
            {dofilter ? (
              <View style={{ flexDirection: "row", gap: 10, marginTop: -5 }}>
                <Pressable onPress={() => showDatepicker(setFromDate)}>
                  <P bold={500} align='center'>
                    From
                  </P>
                  <Text>{fromDate.toLocaleDateString("en-GB")}</Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    showDatepicker(setendDate, serchDate);
                  }}
                >
                  <P bold={500} align='center'>
                    End
                  </P>
                  <P>{endDate.toLocaleDateString("en-GB")}</P>
                </Pressable>
              </View>
            ) : null}
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default SearchFilter;
