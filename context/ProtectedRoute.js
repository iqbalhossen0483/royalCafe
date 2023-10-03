import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import useStore from "./useStore";
import { LoadingOnComponent } from "../components/utilitise/Loading";

const ProtectedRoute = ({ children }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const routes = ["home"];
  const store = useStore();

  if (store?.userLoading) return <LoadingOnComponent />;
  return (
    <>
      {store?.user &&
      store.user.designation === "Admin" &&
      routes.includes(route.name)
        ? children
        : navigation.navigate("login")}
    </>
  );
};

export default ProtectedRoute;
