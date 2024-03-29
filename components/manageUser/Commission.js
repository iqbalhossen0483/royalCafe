import React, { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";

import useStore from "../../context/useStore";
import { commonStyles } from "../../css/common";
import { Fetch } from "../../services/common";
import Drawar from "../Drawar";
import Button from "../utilitise/Button";
import P from "../utilitise/P";
import { color } from "../utilitise/colors";

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
        <P size={15} align='center'>
          Pending Commission: {commissions?.length || 0},{" "}
          <Text style={{ color: color.orange }}>Check this</Text>
        </P>
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
            <P bold={500}>User</P>
            <P bold={500}>Targeted Amount</P>
            <P bold={500}>Commission</P>
            <P bold={500}>Action</P>
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
                <P>{com.name.split(" ")[0]}</P>
                <P style={{ width: "25%" }}>{com.targetedAmount}</P>
                <P>{com.commission}</P>
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
            <P align='center'>No pending commission</P>
          )}
        </View>
      </Drawar>
    </>
  );
};

export default Commission;
