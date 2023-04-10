import { StyleSheet } from "react-native";
import { color } from "../components/utilitise/colors";

export const styles = StyleSheet.create({
  profile: { width: 60, height: 60, borderRadius: 200 },
  container: { margin: 10 },
  profileContainer: {
    backgroundColor: "#fff",
    paddingVertical: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5.62,
    elevation: 8,
  },
  profileWrapper: {
    flexDirection: "row",
    columnGap: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 500,
    color: color.green,
  },
  designation: {
    color: color.darkGray,
    fontWeight: 500,
    fontSize: 14,
  },
  phone: {
    color: color.darkGray,
  },
  workContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 10,
    padding: 15,
    paddingLeft: 20,
  },
  workText: {
    fontWeight: 500,
    color: color.darkGray,
  },
});
