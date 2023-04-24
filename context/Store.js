import { useEffect, useState } from "react";
import { Fetch } from "../services/common";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Store = () => {
  const [updateUser, setUpdateUser] = useState(false);
  const [userLoading, setUserLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState({
    msg: "",
    type: "",
  });

  useEffect(() => {
    (async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const user = await Fetch(
          `/login?token=${token}&updateUser=${updateUser}`,
          "GET"
        );
        setUser(user);
      } catch (error) {
        setUser(null);
        setMessage({ msg: error.message, type: "error" });
      } finally {
        setUserLoading(false);
        setUpdateUser(false);
      }
    })();
  }, [updateUser]);

  return {
    message,
    setMessage,
    loading,
    setLoading,
    user,
    setUser,
    userLoading,
    setUpdateUser,
  };
};

export default Store;
