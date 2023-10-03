import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { color } from "./components/utilitise/colors";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";
import { Dimensions } from "react-native";
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
  Notifications,
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
import useStore from "./context/useStore";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <StoreProvider>
      <Layout />
    </StoreProvider>
  );
}

function Layout() {
  const height = Dimensions.get("window").height;
  const body = {
    paddingTop: 32,
    backgroundColor: "#edeef5",
    minHeight: height + 30,
    position: "relative",
  };
  const store = useStore();
  const initialRoute = store?.userLoading
    ? "loading"
    : store?.user?.designation === "Admin"
    ? "home"
    : "profile";

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
              <Stack.Screen name='notification' component={Notifications} />
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
