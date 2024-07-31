import { GestureHandlerRootView } from "react-native-gesture-handler";

import { Layout } from "./components/Layout";
import StoreProvider from "./context/StoreProvider";

export default function App() {
  return (
    <StoreProvider>
      <GestureHandlerRootView>
        <Layout />
      </GestureHandlerRootView>
    </StoreProvider>
  );
}
