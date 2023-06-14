import React from "react";
import { View, SafeAreaView, StyleSheet } from "react-native";

const Screen = ({ children, style }) => {
  return (
    <SafeAreaView style={[styles.screen, style]}>
      <View style={[styles.view, style]}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    paddingTop: 20,
    flex: 1,
  },
  view: {
    flex: 1,
  },
});

export default Screen;
