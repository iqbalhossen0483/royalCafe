import React from "react";
import { styles } from "../../css/orderDetails";
import { commonStyles } from "../../css/common";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import { Text } from "react-native";
import { dateFormatter } from "../../services/common";
import { FlatList } from "react-native";

const SeeCollectionList = ({ setShow, data }) => {
  const tablerowStyle = { width: "30%", textAlign: "center" };
  return (
    <View style={styles.collectionContainer}>
      <View
        onTouchStart={() => setShow(false)}
        style={commonStyles.closeIconWrapper}
      >
        <Ionicons
          style={commonStyles.closeIcon}
          name='close-sharp'
          size={24}
          color='black'
        />
      </View>

      <View style={commonStyles.tableRow}>
        <Text style={tablerowStyle}>Receiver</Text>
        <Text style={tablerowStyle}>Amount</Text>
        <Text style={tablerowStyle}>Date</Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{ ...commonStyles.tableRow, paddingVertical: 7 }}
            key={item.id}
          >
            <Text style={tablerowStyle}>{item.name}</Text>
            <Text style={tablerowStyle}>{item.amount}</Text>
            <Text style={tablerowStyle}>{dateFormatter(item.date)}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default SeeCollectionList;
