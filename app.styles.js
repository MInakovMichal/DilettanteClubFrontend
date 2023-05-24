import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 30,
  },
  boldText: {
    marginTop: 5,
    fontSize: 20,
    fontWeight: "bold",
  },
  Middle: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 5,
  },
  signupText: {
    fontWeight: "bold",
  },
  buttonViewStyle: {
    marginTop: 10,
  },
  inputViewStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    marginVertical: 5,
    borderRadius: 10,
    padding: 10,
  },
  input: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#fff",
    color: "#424242",
  },
  buttonViewStyleX: {
    marginTop: 12,
  },
  logo: {
    width: "80%",
    marginTop: 50,
  },
  PRIMARY_ButtonContainer: (disabled) => ({
    elevation: 8,
    backgroundColor: disabled ? "gray" : "#007bff",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    opacity: disabled ? 0.5 : 1,
  }),
  TERTIARY_ButtonContainer: {
    elevation: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  PRIMARY_ButtonText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  TERTIARY_ButtonText: {
    fontSize: 14,
    color: "black",
    alignSelf: "center",
  },
  link: {
    color: "#FDB075",
  },
  errorText: {
    color: "red",
    fontSize: 16,
    marginTop: 5,
    marginBottom: 10,
  },
  indicatorView: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  logoutIcon: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ff6347",
    borderRadius: 8,
    padding: 8,
  },
  flatListItemContainer: {
    backgroundColor: "#F5F5F5",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  flatListMainText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  flatListSecondaryText: {
    fontSize: 14,
  },
  flatListLanguageText: {
    fontSize: 12,
    fontStyle: "italic",
    marginTop: 5,
  },
  flatListMain: {
    marginTop: 20,
    maxHeight: "35%",
  },
  selectLabel: {
    marginRight: 10,
  },
  selectDropdown: {
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 16,
    color: "black",
  },
  checkBoxContainer: {
    flexDirection: "row",
  },
});

export { styles };
