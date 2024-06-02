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

// //for notification;
// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: true,
//     shouldSetBadge: true,
//   }),
// }); //till;

// //background notification;
// const BACKGROUND_NOTIFICATION_TASK = "BACKGROUND-NOTIFICATION-TASK";

// Notifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK);

// TaskManager.defineTask(BACKGROUND_NOTIFICATION_TASK, () => {

// });

// const [notificationPermissions, setNotificationPermissions] = useState(
//   PermissionStatus.UNDETERMINED
// );

// useEffect(() => {
//   (async () => {
//     const { status } = await Notifications.requestPermissionsAsync();
//     setNotificationPermissions(status);
//   })();
// }, []);

// useEffect(() => {
//   if (notificationPermissions !== PermissionStatus.GRANTED) return;
//   Notifications.addNotificationReceivedListener(() => {});
// }, [notificationPermissions]);
