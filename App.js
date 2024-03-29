import { PermissionStatus } from "expo-modules-core";
import * as Notifications from "expo-notifications";
import * as TaskManager from "expo-task-manager";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { Layout } from "./components/Layout";
import { StoreProvider } from "./screens";

//for notification;
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
}); //till;
//background notification;
const NOTIFICATION_TASK_NAME = "background-notification-task";
TaskManager.defineTask(NOTIFICATION_TASK_NAME, ({ _, error }) => {
  if (error) {
    console.log("error occurred" + error.message);
  }
});
Notifications.registerTaskAsync(NOTIFICATION_TASK_NAME);

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
      <GestureHandlerRootView>
        <Layout />
      </GestureHandlerRootView>
    </StoreProvider>
  );
}
