import { StyleSheet } from "react-native";
import { color } from "../components/utilitise/colors";

export const styles = StyleSheet.create({
  addBtn: {
    position: "absolute",
    bottom: 90,
    right: 15,
    zIndex: 1,
  },
  contentContainer: {
    backgroundColor: "#fff",
    marginVertical: 7,
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 5,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 7,
    backgroundColor: color.lightGray,
    borderRadius: 5,
    paddingHorizontal: 7,
    justifyContent: "space-between",
  },
});
