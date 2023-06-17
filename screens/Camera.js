import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";

import { Camera, CameraType } from "expo-camera";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";

import ButtonIcon from "../components/ButtonIcon";
import Constants from "expo-constants";
import { useFocusEffect } from "@react-navigation/native";
import { useWindowDimensions } from 'react-native';

const CameraApp = ({ navigation }) => {
  const { height, width } = useWindowDimensions();
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasLibraryPermission, setLibraryPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);

  useFocusEffect(
    useCallback(() => {
      navigation.getParent()?.setOptions({
        tabBarStyle: { display: "none" },
      });

      return () => {
        navigation.getParent()?.setOptions({
          tabBarStyle: { display: "flex" },
        });
      };
    }, [])
  );

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
      const libraryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setLibraryPermission(libraryStatus.granted);
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        console.log(data);
        setImage(data.uri);
        navigation.navigate("Add Product", { imageRes: data.uri });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const savePicture = async () => {
    if (image) {
      try {
        const asset = await MediaLibrary.createAssetAsync(image);
        alert("Picture saved! 🎉");
        setImage(null);
        console.log("saved successfully");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const switchCamera = () => {
    setType(type === CameraType.back ? CameraType.front : CameraType.back);
  };

  const photoLibrary = async () => {
    if (!hasLibraryPermission) {
      alert("You need to enable permission to access the library");
    } else {
      try {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          quality: 0.5,
        });
        if (!result.canceled) {
          navigation.navigate("Add Product", {
            imageRes: result.assets[0]["uri"],
          });
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  if (!hasCameraPermission) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {!image ? (
        <Camera
          style={styles.camera}
          type={type}
          ref={cameraRef}
          flashMode={flash}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 30,
            }}
          >
            <ButtonIcon
              title=""
              icon={!(type === "front") ? "camera-rear" : "camera-front"}
              onPress={switchCamera}
            />
            <ButtonIcon
              onPress={() =>
                setFlash(
                  flash === Camera.Constants.FlashMode.off
                    ? Camera.Constants.FlashMode.on
                    : Camera.Constants.FlashMode.off
                )
              }
              icon={
                !(flash === Camera.Constants.FlashMode.on) ? "flash-off" : "flash-on"
              }
              color={flash === Camera.Constants.FlashMode.off ? "gray" : "#fff"}
              type="material"
            />
          </View>
        </Camera>
      ) : (
        <Image source={{ uri: image }} style={styles.camera} />
      )}

      <View style={styles.controls}>
        {image ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 50,
            }}
          >
            <ButtonIcon
              title="Re-take"
              onPress={() => setImage(null)}
              icon="retweet"
              type="antDesign"
            />
            <ButtonIcon title="Save" onPress={savePicture} icon="check" />
          </View>
        ) : (
          <View
            style={{
              flexDirection: "row",
              justifyContent: 'flex-start',
            }}
          >
            <View 
            style={{
              width: width/2 - 45,
              height: 70,
              borderWidth: 2
            }}>
            <ButtonIcon
              style={{
                marginVertical: 15,
              }}
              onPress={photoLibrary}
              icon="photo-library"
              type="material"
            />
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "flex-start",
                borderWidth: 2
              }}
            >
              <TouchableOpacity
                onPress={takePicture}
                style={{
                  width: 70,
                  height: 70,
                  bottom: 0,
                  borderRadius: 50,
                  backgroundColor: "#fff",
                }}
              />
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#000",
    padding: 8,
  },
  controls: {
    flex: 0.5,
  },
  button: {
    height: 40,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#E9730F",
    marginLeft: 10,
  },
  camera: {
    flex: 5,
    borderRadius: 20,
  },
  topControls: {
    flex: 1,
  },
});

export default CameraApp;
