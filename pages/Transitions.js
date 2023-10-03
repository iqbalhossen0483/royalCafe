import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, View } from "react-native";
import { Common } from "../App";
import { Text } from "react-native";
import BDT from "../components/utilitise/BDT";
import { Fetch, dateFormatter } from "../services/common";
import useStore from "../context/useStore";
import SearchFilter from "../components/SearchFilter";

const Transitions = () => {
  const [transitions, setTransition] = useState(null);
  const store = useStore();
  const height = Dimensions.get("window").height;

  useEffect(() => {
    (async () => {
      try {
        store.setLoading(true);
        const result = await Fetch("/admin/transitions", "GET");
        setTransition(result);
      } catch (error) {
        setMessage({ msg: error.message, type: "error" });
      } finally {
        store.setLoading(false);
      }
    })();
  }, []);

  return (
    <Common>
      <View style={{ marginBottom: height - height * 0.79 }}>
        <SearchFilter url='/admin/transitions' setData={setTransition} />
        <FlatList
          data={transitions}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ margin: 15 }}
          ListEmptyComponent={() => (
            <Text style={{ textAlign: "center" }}>No Transitions found</Text>
          )}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 10,
                borderRadius: 10,
                backgroundColor: "#fff",
                marginBottom: 10,
              }}
            >
              <View>
                <Text>From: {item.fromUserName}</Text>
                <Text>To: {item.toUserName || item.toSuppilerName}</Text>
                <Text>Purpose: {item.purpose}</Text>
              </View>
              <View>
                <Text>
                  Amount: <BDT amount={item.amount} />
                </Text>
                <Text>Date: {dateFormatter(item.date)}</Text>
              </View>
            </View>
          )}
        />
      </View>
    </Common>
  );
};

export default Transitions;
