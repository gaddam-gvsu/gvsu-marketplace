import React from "react";
import { View, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import defaultStyles from "../utils/DefaultStyles";

const PInputText = ({ icon, width = "100%", ...otherProps }) => {
  return (
    <View style={[styles.container, { width }]}>
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={defaultStyles.colors.medium}
          style={styles.icon}
        />
      )}
      <TextInput
        placeholderTextColor={defaultStyles.colors.medium}
        style={{ width: "100%" }}
        theme={styles.colors}
        {...otherProps}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 25,
    flexDirection: "row",
    padding: 15
  },
  icon: {
    marginRight: 10,
  },
  colors: {
    placeholder: "grey",
    background: "#f5f6f5",
    text: "grey",
    primary: "#5d5d5d",
  },
});

export default PInputText;
