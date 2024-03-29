import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";

import { Common } from "../components/Common";
import SearchFilter from "../components/SearchFilter";
import BDT from "../components/utilitise/BDT";
import P from "../components/utilitise/P";
import { color } from "../components/utilitise/colors";
import useStore from "../context/useStore";
import { Fetch, dateFormatter } from "../services/common";

const Transitions = () => {
  const [transitions, setTransition] = useState(null);
  const store = useStore();

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

    return () => store.setLoading(false);
  }, []);

  return (
    <Common>
      <View style={{ marginBottom: 172 }}>
        <SearchFilter
          placeholder='To user Or From user'
          url='/admin/transitions'
          setData={(result) => {
            if (result.data) setTransition(result.data);
            else setTransition(result);
          }}
        />
        <FlatList
          data={transitions}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ margin: 15 }}
          ListEmptyComponent={() => <P align='center'>No Transitions found</P>}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                backgroundColor: "#fff",
                borderBottomColor: color.gray,
                borderBottomWidth: 1,
                padding: 8,
              }}
            >
              <View>
                <P>From: {item.fromUserName}</P>
                <P>To: {item.toUserName || item.toSuppilerName}</P>
                <P>Purpose: {item.purpose}</P>
              </View>
              <View>
                <P>
                  Amount: <BDT amount={item.amount} />
                </P>
                <P>Date: {dateFormatter(item.date)}</P>
              </View>
            </View>
          )}
        />
      </View>
    </Common>
  );
};

export default Transitions;
