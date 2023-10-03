import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import React, { createRef, useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import DelayInput from "react-native-debounce-input";
import { commonStyles } from "../css/common";
import { Ionicons } from "@expo/vector-icons";
import { color } from "./utilitise/colors";
import { MaterialIcons } from "@expo/vector-icons";
import useStore from "../context/useStore";
import { Fetch } from "../services/common";

const SearchFilter = ({ url, setData, filter = true }) => {
  const [fromDate, setFromDate] = useState(new Date());
  const [endDate, setendDate] = useState(new Date());
  const [dofilter, seDotFilter] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const inputRef = createRef();
  const store = useStore();

  async function search(value) {
    try {
      const data = await Fetch(`${url}?search=${value}`, "GET");
      setData(data);
    } catch (error) {
      store.setMessage({ msg: error.message, type: "error" });
    }
  }

  useEffect(() => {
    const prevDay = new Date(fromDate.valueOf() - 1000 * 60 * 60 * 24);
    search(`${searchValue}&from=${prevDay}&end=${endDate}`);
  }, [fromDate, endDate]);

  useEffect(() => {
    if (!dofilter) search("");
  }, [dofilter]);

  const showDatepicker = (setDate) => {
    DateTimePickerAndroid.open({
      value: new Date(),
      onChange: (event, selectedDate) => {
        const currentDate = selectedDate;
        setDate(currentDate);
      },
      mode: "date",
      is24Hour: true,
    });
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
      <View style={{ position: "relative", width: 200 }}>
        <DelayInput
          minLength={3}
          inputRef={inputRef}
          onChangeText={(value) => {
            search(value);
            setSearchValue(value);
          }}
          delayTimeout={500}
          placeholder='Search'
          style={{ ...commonStyles.input }}
        />
        <View style={{ position: "absolute", right: 5, top: 6 }}>
          <Ionicons name='search-sharp' size={24} color={color.gray} />
        </View>
      </View>

      {filter ? (
        <View>
          {!dofilter ? (
            <Pressable onPress={() => seDotFilter(true)}>
              <Text
                style={{
                  fontSize: 13,
                  textAlign: "center",
                  fontWeight: 500,
                  color: color.darkGray,
                }}
              >
                Filter
              </Text>
            </Pressable>
          ) : (
            <Pressable onPress={() => seDotFilter(false)}>
              <Text
                style={{
                  fontSize: 13,
                  textAlign: "center",
                  fontWeight: 500,
                  color: color.darkGray,
                }}
              >
                Reset
              </Text>
            </Pressable>
          )}
          {dofilter ? (
            <View style={{ flexDirection: "row", gap: 10, marginTop: -5 }}>
              <Pressable onPress={() => showDatepicker(setFromDate)}>
                <Text style={{ fontWeight: 500, textAlign: "center" }}>
                  From
                </Text>
                <Text>{fromDate.toLocaleDateString("en-GB")}</Text>
              </Pressable>
              <Pressable onPress={() => showDatepicker(setendDate)}>
                <Text style={{ fontWeight: 500, textAlign: "center" }}>
                  End
                </Text>
                <Text>{endDate.toLocaleDateString("en-GB")}</Text>
              </Pressable>
            </View>
          ) : null}
        </View>
      ) : null}
    </View>
  );
};

export default SearchFilter;
