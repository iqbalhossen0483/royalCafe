import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { color } from "./components/utilitise/colors";
import * as Notifications from "expo-notifications";
import { PermissionStatus } from "expo-modules-core";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";
import { Dimensions } from "react-native";
import useStore from "./context/useStore";
import {
  Home,
  Customers,
  AddProduct,
  AddShop,
  CompleteOrder,
  CreateNote,
  CreateOrder,
  CustomerDetails,
  ManageMan,
  NotificationsPage,
  OrderDetails,
  Orders,
  ManageProduct,
  AddUser,
  Profile,
  Transitions,
  AddSupplyer,
  ManageSupplyer,
  Supplyer,
  BalanceTransfer,
  Login,
  Message,
  StoreProvider,
  Loading,
  PurchaseProduct,
  ExpenseType,
  AddExpense,
  ExpenseReport,
} from "./screens";

//for routing;
const Stack = createNativeStackNavigator();
//for notification;
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});
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
}; //till;

//for socket;
export let socket = null;

export default function App() {
  const [notificationPermissions, setNotificationPermissions] = useState(
    PermissionStatus.UNDETERMINED
  );

  const requestNotificationPermissions = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    setNotificationPermissions(status);
    return status;
  };

  useEffect(() => {
    requestNotificationPermissions();
  }, []);

  useEffect(() => {
    if (notificationPermissions !== PermissionStatus.GRANTED) return;
    const listener = Notifications.addNotificationReceivedListener(() => {});
    return () => listener.remove();
  }, [notificationPermissions]);

  return (
    <StoreProvider>
      <Layout />
    </StoreProvider>
  );
}

function Layout() {
  const height = Dimensions.get("window").height;
  const store = useStore();

  const body = {
    marginTop: "6%",
    backgroundColor: "#edeef5",
    minHeight: height,
    position: "relative",
  };
  const initialRoute = store?.userLoading
    ? "loading"
    : store?.user?.designation === "Admin"
    ? "home"
    : "profile";

  useEffect(() => {
    if (!store.user) return;
    socket = new WebSocket("ws://server.switchcafebd.com");

    socket.addEventListener("open", () => {
      socket.send(JSON.stringify({ type: "init", user: store.user.id }));
    });

    socket.addEventListener("message", (item) => {
      const data = JSON.parse(item.data);
      console.log(data);
      if (data.type === "receivedOrder") {
        const user = data.user;
        if (store.user.id !== user.id) {
          pushNotification(
            "Order Received",
            "An Order has been created by " + user.name
          );
        }
        store.setUpdateOrder((prev) => !prev);
        store.setUpNotification((prev) => !prev);
      } else if (data.type === "completeOderNotify") {
        if (store.user.id !== data.id) {
          pushNotification(data.title, data.body);
        }
        store.setUpdateOrder((prev) => !prev);
        store.setUpdateReport((prev) => !prev);
        store.setUpdateUser((prev) => !prev);
        store.setUpNotification((prev) => !prev);
      } else if (data.type === "balance_request_received") {
        if (data.to === store.user.id) {
          pushNotification(data.title, data.body);
          store.setUpdateUser((prev) => !prev);
        }
      } else if (data.type === "balance_accepted_notify") {
        if (data.to === store.user.id) {
          pushNotification(data.title, data.body);
          store.setUpdateUser((prev) => !prev);
          store.setUpdateReport((prev) => !prev);
        }
      } else if (data.type === "balance_decline_notify") {
        if (data.to === store.user.id) {
          pushNotification(data.title, data.body);
          store.setUpdateUser((prev) => !prev);
          store.setUpdateReport((prev) => !prev);
        }
      } else if (data.type === "target_received_notify") {
        if (data.opt.to === store.user.id) {
          pushNotification(data.title, data.body);
          store.setUpdateUser((prev) => !prev);
        }
      }
    });

    socket.onerror = (e) => {
      console.log(e);
    };
  }, [store.user]);

  return (
    <SafeAreaView style={body}>
      <NavigationContainer>
        <StatusBar style='light' backgroundColor={color.green} />
        <Stack.Navigator
          initialRouteName={initialRoute}
          screenOptions={{ headerShown: false }}
        >
          {store.userLoading ? (
            <Stack.Screen name='home' component={Home} />
          ) : store.user ? (
            <>
              {store.user.designation === "Admin" ? (
                <>
                  <Stack.Screen name='home' component={Home} />
                  <Stack.Screen name='addProduct' component={AddProduct} />
                  <Stack.Screen name='manageUsers' component={ManageMan} />
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
                  <Stack.Screen name='transitions' component={Transitions} />
                  <Stack.Screen name='purchase' component={PurchaseProduct} />
                  <Stack.Screen name='expenseType' component={ExpenseType} />
                  <Stack.Screen
                    name='expenseReport'
                    component={ExpenseReport}
                  />
                </>
              ) : null}
              <Stack.Screen name='profile' component={Profile} />
              <Stack.Screen name='order' component={Orders} />
              <Stack.Screen name='createNote' component={CreateNote} />
              <Stack.Screen name='notification' component={NotificationsPage} />
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
              <Stack.Screen name='createOrder' component={CreateOrder} />
              <Stack.Screen name='addshop' component={AddShop} />
              <Stack.Screen name='addUser' component={AddUser} />
              <Stack.Screen name='customer' component={Customers} />
            </>
          ) : (
            <Stack.Screen name='login' component={Login} />
          )}
        </Stack.Navigator>
        <Message />
        <Loading />
      </NavigationContainer>
    </SafeAreaView>
  );
}

export function Common({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
