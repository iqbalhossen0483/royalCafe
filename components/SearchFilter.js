import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import React, { createRef, useState } from "react";
import { Pressable, View } from "react-native";
import DelayInput from "react-native-debounce-input";
import { commonStyles } from "../css/common";
import { Ionicons } from "@expo/vector-icons";
import { color } from "./utilitise/colors";
import { MaterialIcons } from "@expo/vector-icons";

const SearchFilter = () => {
  const [date, setDate] = useState(new Date());
  const [value, setValue] = useState("");
  const inputRef = createRef();

  const showDatepicker = () => {
    DateTimePickerAndroid.open({
      value: date,
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
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomColor: color.gray,
        borderBottomWidth: 0.4,
      }}
    >
      <View style={{ position: "relative", width: 200 }}>
        <DelayInput
          value={value}
          minLength={3}
          inputRef={inputRef}
          onChangeText={setValue}
          delayTimeout={500}
          placeholder='Search'
          style={{ ...commonStyles.input }}
        />
        <View style={{ position: "absolute", right: 5, top: 6 }}>
          <Ionicons name='search-sharp' size={24} color={color.gray} />
        </View>
      </View>
      <Pressable onPress={showDatepicker}>
        <MaterialIcons name='filter-list' size={24} color='black' />
      </Pressable>
    </View>
  );
};

export default SearchFilter;
