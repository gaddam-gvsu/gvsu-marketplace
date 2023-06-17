import React, { useState } from "react";
import {
  View,
  Modal,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import defaultStyles from "../utils/DefaultStyles";
import CText from "./Text";
import SafeView from "./SafeView";
import PickerItem from "./PickerItem";
import ButtonIcon from "./ButtonIcon";
import Colors from "../utils/Colors";

const Picker = ({
  icon,
  items,
  placeholder,
  onSelectItem,
  numberOfColumns = 1,
  selectedItem,
  width = "100%",
  PickerItemComponent = PickerItem,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={[styles.container, { width }]}>
          {icon && (
            <MaterialCommunityIcons
              name={icon}
              size={20}
              color={defaultStyles.colors.medium}
              style={styles.icon}
            />
          )}
          {selectedItem ? (
            <CText style={styles.text}>{selectedItem.label}</CText>
          ) : (
            <CText style={styles.placeholder}>{placeholder}</CText>
          )}

          <MaterialCommunityIcons
            name="chevron-down"
            size={20}
            color={defaultStyles.colors.medium}
          />
        </View>
      </TouchableWithoutFeedback>
      <Modal visible={modalVisible} animationType="slide">
        <SafeView>
          <ButtonIcon onPress={() => setModalVisible(false)} icon="close" />
          <FlatList
            style={{ paddingTop: 15 }}
            data={items}
            keyExtractor={(item) => item.value.toString()}
            numColumns={numberOfColumns}
            renderItem={({ item }) => (
              <PickerItemComponent
                item={item}
                label={item.label}
                onPress={() => {
                  setModalVisible(false);
                  onSelectItem(item);
                }}
              />
            )}
          />
        </SafeView>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 5,
    flexDirection: "row",
    padding: 10,
    margin: 15,
    borderWidth: 1,
    borderColor: Colors.primary,
    width: "100%",
  },
  icon: {
    marginRight: 10,
  },
  placeholder: {
    color: defaultStyles.colors.medium,
    flex: 1,
  },
  text: {
    flex: 1,
  },
});

export default Picker;
