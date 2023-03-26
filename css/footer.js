import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    backgroundColor: "#fff",
    width: "100%",
    paddingVertical: 5,
    paddingHorizontal: 7,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: 5,
    paddingHorizontal: 7,
  },
  plusIcon: {
    color: "#4b5563",
    fontSize: 35,
    marginTop: -15,
    zIndex: 1,
  },
  highlight: {
    backgroundColor: "#2fbd55",
  },
  modal: {
    position: "absolute",
    bottom: 32,
    left: -22,
    height: 200,
    backgroundColor: "#fff",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  closeIcon: {
    color: "#57534e",
  },
  closeIconWrapper: {
    position: "absolute",
    right: -110,
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
});
