import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import colors from "../utils/Colors";

const Button = ({ title, onPress, color = "primary", style }) => {
  return (
    <TouchableOpacity
      style={[styles.button, { ...style }]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: "50%",
    margin: 18,
  },
  text: {
    color: colors.white,
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});

export default Button;
