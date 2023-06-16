import React from "react";
import { View } from "react-native";
import {
  Entypo,
  MaterialCommunityIcons,
  MaterialIcons,
  AntDesign,
  Feather,
} from "@expo/vector-icons";

const Icon = ({
  name,
  size = 40,
  backgroundColor = "#000",
  iconColor = "#fff",
  type = "materialCommunity",
}) => {
  let icon;
  if (type === "materialCommunity") {
    icon = (
      <MaterialCommunityIcons name={name} size={size * 0.5} color={iconColor} />
    );
  } else if (type === "antDesign") {
    icon = <AntDesign name={name} size={size * 0.5} color={iconColor} />;
  } else if (type === "feather") {
    icon = <Feather name={name} size={size * 0.5} color={iconColor} />;
  } else if (type === "entypo") {
    icon = <Entypo name={name} size={size * 0.5} color={iconColor} />;
  } else {
    icon = <MaterialIcons name={name} size={size * 0.5} color={iconColor} />;
  }

  return (
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
      {icon}
    </View>
  );
};

export default Icon;
