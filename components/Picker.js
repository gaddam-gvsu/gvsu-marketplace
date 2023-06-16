import React, {useState} from 'react';
import {View, TextInput, Button, Modal, StyleSheet, FlatList, Platform, TouchableWithoutFeedback} from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons'
import defaultStyles from "../utils/DefaultStyles";
import CText from "./Text";
import SafeView from "./SafeView";
import PickerItem from "./PickerItem";

const Picker = ({ icon, items, placeholder, onSelectItem, numberOfColumns=1, selectedItem, width='100%', PickerItemComponent = PickerItem }) => {
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
                    <Button title="Close" onPress={() => setModalVisible(false)} />
                    <FlatList
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
        borderRadius: 25,
        flexDirection: 'row',
        padding: 15,
        marginVertical: 10
    },
    icon:{
        marginRight: 10,
    },
    placeholder:{
        color: defaultStyles.colors.medium,
        flex: 1
    },
    text: {
        flex: 1
    }
});

export default Picker;