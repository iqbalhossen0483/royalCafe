import { GestureHandlerRootView } from "react-native-gesture-handler";

import { Layout } from "./components/Layout";
import StoreProvider from "./context/StoreProvider";
import { usePushNotifications } from "./context/usePushNotification";

export default function App() {
  usePushNotifications();

  return (
    <StoreProvider>
      <GestureHandlerRootView>
        <Layout />
      </GestureHandlerRootView>
    </StoreProvider>
  );
}
