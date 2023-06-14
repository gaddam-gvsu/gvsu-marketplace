import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

const CategoryPickerItem = ({ item, onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <View
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MaterialCommunityIcons
            name={name}
            color={iconColor}
            size={size * 0.5}
          />
        </View>
        <Icon
          backgroundColor={item.backgroundColor}
          name={item.icon}
          size={80}
        />

        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 40 / 2,
            backgroundColor: "#000",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Feather name={name} color={"#fff"} size={40 * 0.5} />
        </View>
      </TouchableOpacity>
      <Text style={styles.text}>{item.label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    alignItems: "center",
    width: "33%",
  },
  label: {
    marginTop: 5,
    textAlign: "center",
  },
  text: {
    marginTop: 5,
    textAlign: "center",
    color: "black",
    fontSize: 18,
    fontFamily: "Roboto",
  },
});

export default CategoryPickerItem;
