import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useRef, useState } from "react";
import { AppState } from "react-native";

import { Fetch } from "../services/common";

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
  const [socket, setSocket] = useState(null);
  const [user, setUser] = useState(null);
  const appState = useRef(AppState.currentState);
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
        setUser(res.user);
        setDatabase(res.database);
      } catch (error) {
        setUser(null);
        await AsyncStorage.removeItem("token");
        setMessage({ msg: error.message, type: "error" });
      } finally {
        setUserLoading(false);
      }
    })();
  }, [updateUser]);

  // useEffect(() => {
  //   (async () => {
  //     if (!user) return;
  //     let wss = new WebSocket("wss://7dc0-113-11-98-229.ngrok-free.app");
  //     setSocket(wss);
  //     BackgroundTask.schedule();
  //   })();
  // }, [user]);
  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      // setInterval(() => {
      //   console.log(nextAppState);
      // }, 1000);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  // useEffect(() => {
  //   if (socket) {
  //     socket.addEventListener("open", () => {
  //       try {
  //         setInterval(() => {
  //           socket.send(JSON.stringify({ Message: "Hello" }));
  //         }, 1000);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     });
  //   }
  // }, [socket]);

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
  };
};

export default Store;
