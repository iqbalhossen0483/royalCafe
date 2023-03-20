import { StyleSheet } from "react-native";
import { color } from "../components/utilitise/colors";

export const commonStyles = StyleSheet.create({
  iconWrapper: {
    height: 33,
    width: 33,
    borderRadius: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  closeIconWrapper: {
    position: "absolute",
    right: 5,
    top: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
    height: 30,
    width: 30,
    borderRadius: 100,
  },
  closeIcon: {
    color: "#57534e",
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: color.gray,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 9,
  },
});
