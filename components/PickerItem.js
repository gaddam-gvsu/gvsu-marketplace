import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import CText from "./Text";

const PickerItem = ({ item, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <CText style={styles.text}>{item.label}</CText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    padding: 20,
  },
});

export default PickerItem;
