import * as React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "./Icon";

export default function ButtonIcon({
  title,
  onPress,
  style,
  icon,
  type = "materialCommunity",
  color,
}) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      {icon && (
        <Icon
          name={icon}
          size={50}
          color={color ? color : "#f1f1f1"}
          type={type}
        ></Icon>
      )}
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#f1f1f1",
    marginLeft: 10,
  },
});
