import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  profileWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "500",
    color: "#333",
  },
  container: {
    backgroundColor: "#fff",
    paddingVertical: 5,
    paddingHorizontal: 7,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "#edeef5",
    borderBottomWidth: 1,
  },
  notificationNose: {
    width: 8,
    height: 8,
    backgroundColor: "green",
    borderRadius: 50,
    position: "absolute",
    right: 7,
    top: 4,
    zIndex: 1,
  },
});
