import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  constainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailsContainer: {
    marginLeft: 50,
    marginTop: 10,
    backgroundColor: "#f1f5f9",
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderRadius: 6,
    width: 280,
  },
  detailsTableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 250,
    borderBottomWidth: 1,
    borderBottomColor: "#cbd5e1",
    paddingBottom: 3,
    marginBottom: 3,
  },
  detailsItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 2,
    width: 250,
  },
  bottomContainer: {
    marginTop: 4,
    alignItems: "flex-end",
  },
  bottomItem: {
    borderTopColor: "#cbd5e1",
    borderTopWidth: 1,
    paddingLeft: 10,
    paddingTop: 3,
    width: 100,
    marginTop: 5,
  },
  totalWrapper: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  totalText: {
    fontWeight: 500,
    marginRight: 4,
  },
});
