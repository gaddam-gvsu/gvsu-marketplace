import React, {useRef} from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import ImageInput from "./ImageInput";


const ImageInputList = ({ imageUris = [], onRemoveImage}) => {

    const scrollView = useRef();

    return (
        <View>
            <ScrollView ref={scrollView}
                        horizontal
                        onContentSizeChange={() => scrollView.current.scrollToEnd()}
            >
                <View style={styles.container}>
                    {imageUris.map((uri) => (
                        <View key={uri} style={styles.image}>
                            <ImageInput
                                imageUri={uri}
                                onChangeImage={() => onRemoveImage(uri)}
                            />
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
 );
};

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row'
    },
    image: {
        margin: 15,
    }
});

export default ImageInputList;