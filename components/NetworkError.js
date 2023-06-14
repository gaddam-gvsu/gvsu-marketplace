import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../utils/Colors";
import Constants from "expo-constants";
import { useNetInfo } from "@react-native-community/netinfo";
import defaultStyles from "../utils/DefaultStyles";

const NetworkError = (props) => {
  const netInfo = useNetInfo();

  if (netInfo.type !== "unknown" && netInfo.isInternetReachable === false)
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No Internet Connection</Text>
      </View>
    );

  return null;
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    height: 50,
    position: "absolute",
    top: Constants.statusBarHeight,
    width: "100%",
    zIndex: 1,
  },
  text: {
    ...defaultStyles.text,
    color: colors.white,
  },
});

export default NetworkError;
