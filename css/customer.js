import { StyleSheet } from "react-native";
import { color } from "../components/utilitise/colors";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 5,
    marginVertical: 5,
    paddingVertical: 6,
    paddingHorizontal: 7,
  },
  profile: {
    height: 40,
    width: 40,
    borderRadius: 100,
  },
  status: {
    fontSize: 13,
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderRadius: 5,
    marginTop: 3,
  },
  ammountWrapper: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 4,
  },
  ammountName: { fontWeight: 500, textAlign: "center", color: "#fff" },
  ammount: { textAlign: "center", color: "#fff", marginTop: 5 },
  detailsContentContainer: {
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  customerProfile: {
    alignItems: "center",
    borderBottomColor: color.gray,
    borderBottomWidth: 0.6,
    paddingBottom: 9,
  },
  nameWrapper: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 5,
  },
  shopName: {
    textAlign: "center",
    fontSize: 19,
    fontWeight: 500,
  },
  address: { textAlign: "center", color: color.darkGray },
  ammountContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    borderBottomColor: color.gray,
    borderBottomWidth: 0.6,
    paddingBottom: 13,
  },
  itemSeperator: {
    borderBottomColor: color.gray,
    borderBottomWidth: 0.9,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  date: {
    fontSize: 13,
    marginTop: 3,
    color: color.darkGray,
  },
  sign: {
    height: 8,
    width: 8,
    borderRadius: 50,
    marginRight: -5,
  },
});
