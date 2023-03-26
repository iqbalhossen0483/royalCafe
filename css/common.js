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
  formContainer: {
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingHorizontal: 25,
    margin: 10,
    borderRadius: 7,
  },
  formHeader: {
    fontSize: 18,
    fontWeight: 500,
    textAlign: "center",
    marginBottom: 10,
  },
  selectView: {
    position: "absolute",
    top: "100%",
    left: 0,
    backgroundColor: "#fff",
    width: "100%",
    paddingVertical: 6,
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    borderRadius: 5,
  },
});
