import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

import { Fetch } from "../services/common";

const Store = () => {
  const [updateProduct, setUpdateProduct] = useState(false);
  const [updateCustomer, setUpdateCustomer] = useState(false);
  const [updateSupplier, setUpdateSupplier] = useState(false);
  const [updateOrder, setUpdateOrder] = useState(false);
  const [updateUser, setUpdateUser] = useState(false);
  const [updateNote, setUpdateNotes] = useState(false);
  const [updateExpense, setUpdateExpense] = useState(false);
  const [userLoading, setUserLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [updateReport, setUpdateReport] = useState(false);
  const [upNotification, setUpNotification] = useState(false);
  const [updatePurchase, setUpdatePurchase] = useState(false);
  const [siteInfo, SetSiteInfo] = useState(null);
  const [appIsReady, setAppIsReady] = useState(false);
  const [message, setMessage] = useState({
    msg: "",
    type: "",
  });

  useEffect(() => {
    (async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          setUserLoading(false);
          return;
        }
        const user = await Fetch(`/login?token=${token}`, "GET");
        setUser(user);
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
    (async () => {
      try {
        const siteInfo = await Fetch(`/siteinfo`, "GET");
        SetSiteInfo(siteInfo);
      } catch (error) {
        setMessage({ msg: error.message, type: "error" });
      }
    })();
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
    siteInfo,
  };
};

export default Store;
