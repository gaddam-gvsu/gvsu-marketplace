import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
} from "react-native";
import {
  Swipeable,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import colors from "../utils/Colors";
import defaultStyles from "../utils/DefaultStyles";

const ListItem = ({
  title,
  subTitle,
  image,
  IconComponent,
  onPress,
  renderRightActions,
}) => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Swipeable renderRightActions={renderRightActions}>
        <TouchableHighlight onPress={onPress} underlayColor={colors.light}>
          <View style={styles.container}>
            {IconComponent}
            {image && <Image style={styles.image} source={image} />}
            <View style={styles.detailsContainer}>
              <Text
                style={[defaultStyles.text, styles.title]}
                numberOfLines={1}
              >
                {title}
              </Text>
              {subTitle && (
                <Text
                  style={[defaultStyles.text, styles.subTitle]}
                  numberOfLines={2}
                >
                  {subTitle}
                </Text>
              )}
            </View>
            {onPress && (
              <Feather color={colors.medium} name="chevron-right" size={25} />
            )}
          </View>
        </TouchableHighlight>
      </Swipeable>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    padding: 15,
    backgroundColor: colors.white,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  subTitle: {
    color: colors.medium,
    fontWeight: "bold",
  },
  title: {
    fontWeight: "500",
  },
});

export default ListItem;
