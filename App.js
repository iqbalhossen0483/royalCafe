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
  Profile,
} from "./screens";

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
    <SafeAreaView style={body}>
      <NavigationContainer>
        <StatusBar style='auto' backgroundColor='#fff' />
        <Header />
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
          <Stack.Screen name='manageMan' component={ManageMan} />
          <Stack.Screen name='notification' component={Notifications} />
          <Stack.Screen name='profile' component={Profile} />
          <Stack.Screen name='orderDetails' component={OrderDetails} />
          <Stack.Screen name='completeOrder' component={CompleteOrder} />
          <Stack.Screen name='editOrder' component={EditOrder} />
          <Stack.Screen name='customerDetails' component={CustomerDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

export function Common({ children }) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
