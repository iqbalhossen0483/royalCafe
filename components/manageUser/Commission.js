import React, { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { color } from "../utilitise/colors";
import Drawar from "../Drawar";
import { commonStyles } from "../../css/common";
import { Fetch } from "../../services/common";
import Button from "../utilitise/Button";
import useStore from "../../context/useStore";

const Commission = () => {
  const [commissions, setCommissions] = useState(null);
  const [updateCommissions, setUpdateCommissions] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const store = useStore();

  useEffect(() => {
    (async () => {
      try {
        const commision = await Fetch("/admin/commission", "GET");
        setCommissions(commision);
      } catch (error) {}
    })();
  }, [updateCommissions]);

  async function achieveCommissions(data) {
    try {
      store.setLoading(true);
      data.fromUser = store.user.id;
      const result = await Fetch("/admin/commission", "POST", data);
      store.setMessage({ msg: result.message, type: "success" });
      store.setUpdateUser((prev) => !prev);
      store.setUpdateReport((prev) => !prev);
      setUpdateCommissions((prev) => !prev);
    } catch (error) {
      store.setMessage({ msg: error.message, type: "error" });
    } finally {
      store.setLoading(false);
    }
  }

  return (
    <>
      <Pressable
        onPress={() => setShowDrawer(true)}
        style={{ alignItems: "flex-end", marginBottom: 5 }}
      >
        <Text style={{ fontSize: 16, fontWeight: 500 }}>
          Pending Commission: {commissions?.length || 0},{" "}
          <Text style={{ color: color.orange }}>Check this</Text>
        </Text>
      </Pressable>

      <Drawar
        show={showDrawer}
        setShowModal={() => setShowDrawer(false)}
        coverScreen
        top={0}
        width='100%'
      >
        <View style={{ paddingHorizontal: 7, paddingTop: 10 }}>
          <View
            style={{
              ...commonStyles.tableRow,
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontWeight: 500 }}>User</Text>
            <Text style={{ fontWeight: 500 }}>Targeted Amount</Text>
            <Text style={{ fontWeight: 500 }}>Commission</Text>
            <Text style={{ fontWeight: 500 }}>Action</Text>
          </View>
          {commissions && commissions.length ? (
            commissions.map((com) => (
              <View
                key={com.id}
                style={{
                  ...commonStyles.tableRow,
                  justifyContent: "space-between",
                }}
              >
                <Text>{com.name.split(" ")[0]}</Text>
                <Text style={{ width: "25%" }}>{com.targetedAmount}</Text>
                <Text>{com.commission}</Text>
                <View>
                  <Button
                    onPress={() => achieveCommissions(com)}
                    title='Achieve'
                    style={{ paddingVertical: 3 }}
                  />
                </View>
              </View>
            ))
          ) : (
            <Text style={{ textAlign: "center" }}>No pending commission</Text>
          )}
        </View>
      </Drawar>
    </>
  );
};

export default Commission;
