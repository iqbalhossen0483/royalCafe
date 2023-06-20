import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native";
import Header from "./components/header/Header";
import { Dimensions } from "react-native";
import Footer from "./components/footer/Footer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Home,
  Customers,
  AddProduct,
  AddShop,
  CompleteOrder,
  CreateNote,
  CreateOrder,
  CustomerDetails,
  EditOrder,
  ManageMan,
  Notifications,
  OrderDetails,
  Orders,
} from "./screens";
import ManageProduct from "./pages/ManageProduct";
import AddUser from "./pages/AddUser";
import Profile from "./pages/Profile";
import { color } from "./components/utilitise/colors";
import Transitions from "./pages/Transitions";
import AddSupplyer from "./pages/AddSupplyer";
import ManageSupplyer from "./pages/ManageSupplyer";
import Supplyer from "./pages/Supplyer";
import BalanceTransfer from "./pages/BalanceTransfer";
import Login from "./pages/Login";
import Message from "./components/utilitise/Message";
import StoreProvider from "./context/StoreProvider";
import Loading from "./components/utilitise/Loading";
import ProtectApp from "./context/ProtectApp";
import PurchaseProduct from "./pages/PurchaseProduct";

const Stack = createNativeStackNavigator();

export default function App() {
  const height = Dimensions.get("window").height;
  const body = {
    paddingTop: 32,
    backgroundColor: "#edeef5",
    minHeight: height + 30,
    position: "relative",
  };

  return (
    <StoreProvider>
      <SafeAreaView style={body}>
        <NavigationContainer>
          <StatusBar style='light' backgroundColor={color.green} />
          <Stack.Navigator
            initialRouteName='home'
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name='home' component={Home} />
            <Stack.Screen name='customer' component={Customers} />
            <Stack.Screen name='order' component={Orders} />
            <Stack.Screen name='addshop' component={AddShop} />
            <Stack.Screen name='createOrder' component={CreateOrder} />
            <Stack.Screen name='createNote' component={CreateNote} />
            <Stack.Screen name='addProduct' component={AddProduct} />
            <Stack.Screen name='manageUsers' component={ManageMan} />
            <Stack.Screen name='notification' component={Notifications} />
            <Stack.Screen name='orderDetails' component={OrderDetails} />
            <Stack.Screen name='completeOrder' component={CompleteOrder} />
            <Stack.Screen name='editOrder' component={EditOrder} />
            <Stack.Screen name='customerDetails' component={CustomerDetails} />
            <Stack.Screen name='manageProduct' component={ManageProduct} />
            <Stack.Screen name='addUser' component={AddUser} />
            <Stack.Screen name='profile' component={Profile} />
            <Stack.Screen name='transitions' component={Transitions} />
            <Stack.Screen name='addSupplyer' component={AddSupplyer} />
            <Stack.Screen name='manageSupplyer' component={ManageSupplyer} />
            <Stack.Screen name='supplyer' component={Supplyer} />
            <Stack.Screen name='balanceTransfer' component={BalanceTransfer} />
            <Stack.Screen name='purchase' component={PurchaseProduct} />
            <Stack.Screen name='login' component={Login} />
          </Stack.Navigator>
          <Message />
          <Loading />
        </NavigationContainer>
      </SafeAreaView>
    </StoreProvider>
  );
}

export function Common({ children }) {
  return (
    <ProtectApp>
      <Header />
      {children}
      <Footer />
    </ProtectApp>
  );
}
