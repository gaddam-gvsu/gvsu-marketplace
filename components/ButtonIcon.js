import * as React from "react";

import { StyleSheet, Text, TouchableOpacity } from "react-native";

import Icon from "./Icon";

export default function ButtonIcon({
  title,
  onPress,
  style,
  icon,
  type = "materialCommunity",
  color,
  backgroundColor
}) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button]}>
      {icon && (
        <Icon
          name={icon}
          size={50}
          color={color ? color : "#f1f1f1"}
          type={type}
          backgroundColor= {backgroundColor}
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
