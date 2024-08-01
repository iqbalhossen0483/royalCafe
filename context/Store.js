import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import { useEffect, useRef, useState } from "react";

import { Fetch } from "../services/common";
import { registerForPushNotificationsAsync } from "./pushNotification";

const Store = () => {
  const [updatePurchase, setUpdatePurchase] = useState(false);
  const [updateCustomer, setUpdateCustomer] = useState(false);
  const [updateSupplier, setUpdateSupplier] = useState(false);
  const [upNotification, setUpNotification] = useState(false);
  const [updateExpense, setUpdateExpense] = useState(false);
  const [updateProduct, setUpdateProduct] = useState(false);
  const [updateReport, setUpdateReport] = useState(false);
  const [updateOrder, setUpdateOrder] = useState(false);
  const [updateNote, setUpdateNotes] = useState(false);
  const [updateUser, setUpdateUser] = useState(false);
  const [userLoading, setUserLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [database, setDatabase] = useState(null);
  const [showSplash, setShowSplash] = useState(false);
  const [user, setUser] = useState(null);
  const notificationListener = useRef();
  const [update, setUpdate] = useState(false);
  const [message, setMessage] = useState({
    msg: "",
    type: "",
  });

  useEffect(() => {
    (async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) throw { message: "Login faild" };
        const res = await Fetch("login", `/login?token=${token}`, "GET");
        setDatabase(res.database);
        setUpdate((prev) => !prev);
        setUser(res.user);
      } catch (error) {
        setUser(null);
        await AsyncStorage.removeItem("token");
        setMessage({ msg: error.message, type: "error" });
      } finally {
        setUserLoading(false);
      }
    })();
  }, [updateUser]);

  useEffect(() => {
    if (user && database) {
      (async () => {
        try {
          const token = await registerForPushNotificationsAsync();
          console.log(token);
          await Fetch(database.name, "/user", "PUT", {
            pushToken: token.data,
            id: user.id,
          });
          setUser((prev) => {
            return { ...prev, pushToken: token };
          });
        } catch (error) {
          setMessage({ msg: error.message, type: "error" });
        }
      })();
    }
  }, [update, database, user?.id]);

  useEffect(() => {
    (async () => {
      try {
        notificationListener.current =
          Notifications.addNotificationReceivedListener((payload) => {
            const data = payload.request.content.data;
            console.log(data);
            if (data.type === "receivedOrder") {
              setUpdateOrder((prev) => !prev);
              setUpNotification((prev) => !prev);
            } else if (data.type === "completeOrder") {
              setUpdateOrder((prev) => !prev);
              setUpdateReport((prev) => !prev);
              setUpNotification((prev) => !prev);
            } else if (data.type === "balance_transfer_request") {
              setUpdateUser((prev) => !prev);
            } else if (data.type === "balance_accepted") {
              setUpdateUser((prev) => !prev);
              setUpdateReport((prev) => !prev);
            } else if (data.type === "balance_decline") {
              setUpdateUser((prev) => !prev);
            } else if (data.type === "target_received") {
              setUpdateUser((prev) => !prev);
            } else if (data.type === "expense_req_sent") {
              setUpdateExpense((prev) => !prev);
            } else if (data.type === "expense_req_accepted") {
              setUpdateUser((prev) => !prev);
              setUpdateExpense((prev) => !prev);
            } else if (data.type === "expense_req_decline") {
              setUpdateExpense((prev) => !prev);
            } else if (data.type === "shop_added") {
              setUpdateCustomer((prev) => !prev);
            }
          });
      } catch (error) {
        console.log(error);
      }
    })();

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
    };
  }, []);

  return {
    message,
    setMessage,
    loading,
    setLoading,
    user,
    setUser,
    userLoading,
    updateUser,
    setUpdateUser,
    updateCustomer,
    setUpdateCustomer,
    updateNote,
    setUpdateNotes,
    updateProduct,
    setUpdateProduct,
    updateSupplier,
    setUpdateSupplier,
    updateOrder,
    setUpdateOrder,
    updateReport,
    setUpdateReport,
    upNotification,
    setUpNotification,
    updateExpense,
    setUpdateExpense,
    updatePurchase,
    setUpdatePurchase,
    showSplash,
    setDatabase,
    database,
    setShowSplash,
    setUpdate,
  };
};

export default Store;
