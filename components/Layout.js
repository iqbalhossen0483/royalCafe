import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Notifications from "expo-notifications";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import React, { Suspense, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { color } from "../components/utilitise/colors";
import useStore from "../context/useStore";
import { commonStyles } from "../css/common";
import BranchInfo from "../pages/admin/BranchInfo";
import Commission from "../pages/admin/Commission";
import EditProduct from "../pages/admin/EditProduct";
import EditShop from "../pages/admin/EditShop";
import Production from "../pages/admin/Production";
import ProductionHistory from "../pages/admin/ProductionHistory";
import PurchasedDetails from "../pages/admin/PurchasedDetails";
import Error from "../pages/Error";
import { role } from "../services/common";
import Splash from "./utilitise/Splash";

const Home = React.lazy(() => import("../pages/admin/Home"));
const Login = React.lazy(() => import("../pages/Login"));
const Customers = React.lazy(() => import("../pages/Customers"));
const AddProduct = React.lazy(() => import("../pages/admin/AddProduct"));
const AddShop = React.lazy(() => import("../pages/admin/AddShop"));
const CompleteOrder = React.lazy(() => import("../pages/CompleteOrder"));
const CreateNote = React.lazy(() => import("../pages/CreateNote"));
const CreateOrder = React.lazy(() => import("../pages/CreateOrder"));
const CustomerDetails = React.lazy(() => import("../pages/CustomerDetails"));
const ManageMan = React.lazy(() => import("../pages/admin/ManageUsers"));
const NotificationsPage = React.lazy(() => import("../pages/Notifications"));
const OrderDetails = React.lazy(() => import("../pages/OrderDetails"));
const Orders = React.lazy(() => import("../pages/Orders"));
const ManageProduct = React.lazy(() => import("../pages/admin/ManageProduct"));
const AddUser = React.lazy(() => import("../pages/admin/AddUser"));
const Profile = React.lazy(() => import("../pages/Profile"));
const Transitions = React.lazy(() => import("../pages/Transitions"));
const AddSupplyer = React.lazy(() => import("../pages/admin/AddSupplyer"));
const ManageSupplyer = React.lazy(() =>
  import("../pages/admin/ManageSupplyer")
);
const Supplyer = React.lazy(() => import("../pages/admin/Supplyer"));
const BalanceTransfer = React.lazy(() => import("../pages/BalanceTransfer"));
const Message = React.lazy(() => import("../components/utilitise/Message"));
const Loading = React.lazy(() => import("../components/utilitise/Loading"));
const PurchaseProduct = React.lazy(() =>
  import("../pages/admin/PurchaseProduct")
);
const ExpenseType = React.lazy(() => import("../pages/admin/ExpenseType"));
const AddExpense = React.lazy(() => import("../pages/admin/AddExpense"));
const ExpenseReport = React.lazy(() => import("../pages/ExpenseReport"));

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

//for routing;
const Stack = createNativeStackNavigator();
//for socket;
export let socket = null;
//notifications;
export const pushNotification = (title, body) => {
  const schedulingOptions = {
    content: {
      title,
      body,
      color: "#16a34a",
    },
    trigger: null,
  };
  Notifications.scheduleNotificationAsync(schedulingOptions);
};

export function Layout() {
  const store = useStore();
  const initialRoute = !store?.user
    ? "login"
    : store?.user?.designation === "Admin"
    ? "home"
    : "profile";

  useEffect(() => {
    (async () => {
      if (store.userLoading) await SplashScreen.hideAsync();
    })();
  }, [store.userLoading]);

  // useEffect(() => {
  //   (async () => {
  //     if (!store.user) return;
  //     socket = new WebSocket("wss://7dc0-113-11-98-229.ngrok-free.app");

  //     socket.addEventListener("open", () => {
  //       try {
  //         setInterval(() => {
  //           socket.send(JSON.stringify({ Message: "Hello" }));
  //         }, 1000);

  //         socket.send(
  //           JSON.stringify({
  //             type: "init",
  //             user: store.user.id,
  //             designation: store.user.designation,
  //           })
  //         );
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     });

  //     socket.addEventListener("message", (item) => {
  //       const data = JSON.parse(item.data);

  //       if (data.type === "receivedOrder") {
  //         pushNotification(data.title, data.body);
  //         store.setUpdateOrder((prev) => !prev);
  //         store.setUpNotification((prev) => !prev);
  //       } else if (data.type === "completeOderNotify") {
  //         pushNotification(data.title, data.body);
  //         store.setUpdateOrder((prev) => !prev);
  //         store.setUpdateReport((prev) => !prev);
  //         store.setUpNotification((prev) => !prev);
  //       } else if (data.type === "balance_request_received") {
  //         pushNotification(data.title, data.body);
  //         store.setUpdateUser((prev) => !prev);
  //       } else if (data.type === "balance_accepted_notify") {
  //         pushNotification(data.title, data.body);
  //         store.setUpdateUser((prev) => !prev);
  //         store.setUpdateReport((prev) => !prev);
  //       } else if (data.type === "balance_decline_notify") {
  //         pushNotification(data.title, data.body);
  //         store.setUpdateUser((prev) => !prev);
  //       } else if (data.type === "target_received_notify") {
  //         pushNotification(data.title, data.body);
  //         store.setUpdateUser((prev) => !prev);
  //       } else if (data.type === "expense_req_got") {
  //         pushNotification(data.title, data.body);
  //       } else if (data.type === "expense_req_accepted") {
  //         pushNotification(data.title, data.body);
  //         store.setUpdateUser((prev) => !prev);
  //       } else if (data.type === "added_custoemer_notify") {
  //         pushNotification(data.title, data.body);
  //         store.setUpdateCustomer((prev) => !prev);
  //       } else if (data.type === "expense_req_decline_notify") {
  //         pushNotification(data.title, data.body);
  //       }
  //     });

  //     socket.onerror = (e) => {
  //       console.log(e);
  //     };
  //   })();
  // }, [store?.user]);

  return (
    <SafeAreaView style={commonStyles.body}>
      <Suspense>
        <NavigationContainer>
          <StatusBar style='light' backgroundColor={color.green} />
          <Stack.Navigator
            initialRouteName={initialRoute}
            screenOptions={{ headerShown: false }}
          >
            {store.userLoading ? (
              <Stack.Screen name='loading' component={Splash} />
            ) : store.user ? (
              <>
                {store.user.designation === role.admin ? (
                  <>
                    <Stack.Screen name='home' component={Home} />
                    <Stack.Screen name='addProduct' component={AddProduct} />
                    <Stack.Screen name='editProduct' component={EditProduct} />

                    <Stack.Screen
                      name='manageProduct'
                      component={ManageProduct}
                    />
                    <Stack.Screen name='supplyer' component={Supplyer} />
                    <Stack.Screen name='addSupplyer' component={AddSupplyer} />
                    <Stack.Screen
                      name='manageSupplyer'
                      component={ManageSupplyer}
                    />

                    <Stack.Screen name='purchase' component={PurchaseProduct} />
                    <Stack.Screen name='expenseType' component={ExpenseType} />
                    <Stack.Screen name='info' component={BranchInfo} />
                    <Stack.Screen name='commission' component={Commission} />
                    <Stack.Screen
                      name='purchasedDetails'
                      component={PurchasedDetails}
                    />
                  </>
                ) : null}
                {store.user.designation === role.admin ||
                store.user.designation === role.store_manager ? (
                  <>
                    <Stack.Screen name='stock' component={Home} />
                    <Stack.Screen name='manageUsers' component={ManageMan} />
                    <Stack.Screen name='production' component={Production} />
                    <Stack.Screen
                      name='production-history'
                      component={ProductionHistory}
                    />
                  </>
                ) : null}
                <Stack.Screen name='profile' component={Profile} />
                <Stack.Screen name='order' component={Orders} />
                <Stack.Screen name='createNote' component={CreateNote} />
                <Stack.Screen
                  name='notification'
                  component={NotificationsPage}
                />
                <Stack.Screen name='orderDetails' component={OrderDetails} />
                <Stack.Screen name='completeOrder' component={CompleteOrder} />
                <Stack.Screen
                  name='customerDetails'
                  component={CustomerDetails}
                />
                <Stack.Screen name='addExpense' component={AddExpense} />
                <Stack.Screen
                  name='balanceTransfer'
                  component={BalanceTransfer}
                />
                <Stack.Screen name='expenseReport' component={ExpenseReport} />
                <Stack.Screen name='createOrder' component={CreateOrder} />
                <Stack.Screen name='addshop' component={AddShop} />
                <Stack.Screen name='editshop' component={EditShop} />
                <Stack.Screen name='addUser' component={AddUser} />
                <Stack.Screen name='customer' component={Customers} />
                <Stack.Screen name='transitions' component={Transitions} />
                <Stack.Screen name='error' component={Error} />
              </>
            ) : (
              <Stack.Screen name='login' component={Login} />
            )}
          </Stack.Navigator>

          <Message />
          <Loading />
        </NavigationContainer>
      </Suspense>
    </SafeAreaView>
  );
}
