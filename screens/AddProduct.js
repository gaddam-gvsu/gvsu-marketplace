import * as Location from "expo-location";

import { Formik, useFormikContext } from "formik";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import CategoryPickerItem from "../components/CategoryPickerItem";
import Colors from "../utils/Colors";
import Constants from "expo-constants";
import FormField from "../components/forms/FormField";
import ImageInputList from "../components/ImageInputList";
import Picker from "../components/forms/FormPicker";
import UploadScreen from "./UploadScreen";
import defaultStyles from "../utils/DefaultStyles";
import { saveProduct } from "../shared/firebaseApi";

const categories = [
  {
    backgroundColor: "#fc5c65",
    icon: "floor-lamp",
    label: "Furniture",
    value: 1,
  },
  {
    backgroundColor: "#fd9644",
    icon: "car",
    label: "Cars",
    value: 2,
  },
  {
    backgroundColor: "#fed330",
    icon: "camera",
    label: "Cameras",
    value: 3,
  },
  {
    backgroundColor: "#26de81",
    icon: "cards",
    label: "Games",
    value: 4,
  },
  {
    backgroundColor: "#2bcbba",
    icon: "shoe-heel",
    label: "Clothing",
    value: 5,
  },
  {
    backgroundColor: "#45aaf2",
    icon: "basketball",
    label: "Sports",
    value: 6,
  },
  {
    backgroundColor: "#4b7bec",
    icon: "headphones",
    label: "Movies & Music",
    value: 7,
  },
  {
    backgroundColor: "#a55eea",
    icon: "book-open-variant",
    label: "Books",
    value: 8,
  },
  {
    backgroundColor: "#778ca3",
    icon: "application",
    label: "Other",
    value: 9,
  },
];

// Form image picker field value should be set to formik field value in useEffect

const AddProduct = ({ route, navigation }) => {
  const [location, setLocation] = useState();
  const [uploadVisible, setUploadVisible] = useState(false);
  const [uploaded, setUploaded] = useState([]);
  const [progress, setProgress] = useState(0);

    const getLocation = async () => {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (!granted) return;
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();
      const reverseGeo = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      setLocation({latitude, longitude, address: reverseGeo});
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {getLocation()}, []);

  useEffect(() => {
    if (route.params?.imageRes) {
      setUploaded([...uploaded, route.params?.imageRes]);
    }
  }, [route.params?.imageRes]);

  const FormImagePicker = ({ name, imageUris }) => {
    const { setFieldValue } = useFormikContext();
    const [iUris, setIUris] = useState(imageUris);
    const handleRemove = (uri) => {
      const filteredUris = iUris.filter((imageUri) => imageUri !== uri);
      setFieldValue(name, filteredUris);
      setIUris(filteredUris);
    };

    return (
      <>
        <ImageInputList imageUris={iUris} onRemoveImage={handleRemove} />
      </>
    );
  };

  const SubmitButton = ({ title }) => {
    const { setFieldValue, handleSubmit } = useFormikContext();
    useEffect(() => {
      setFieldValue("images", uploaded);
    }, [uploaded]);
    return (
      <TouchableOpacity
        style={[styles.button, { backgroundColor: Colors["primary"] }]}
        onPress={handleSubmit}
      >
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    );
  };

  const handleSubmit = async (listing, { resetForm }) => {
    const {address, ...loc} = location;
    const data = { 
      title: listing.title,
      price: listing.price,
      category: listing.category.label,
      description: listing.description,
      images: listing.images,
      location: loc,
      address
    };
    await saveProduct(data);
    resetForm();
    navigation.navigate('Home', {refresh: true});
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.view}>
        <UploadScreen
          onDone={() => setUploadVisible(false)}
          progress={progress}
          visible={uploadVisible}
        />
        <Formik
          initialValues={{
            title: "",
            price: "",
            description: "",
            category: null,
            images: [],
          }}
          onSubmit={handleSubmit}
        >
          {() => (
            <>
              {uploaded && (
                <FormImagePicker name="images" imageUris={uploaded} />
              )}
              <TouchableOpacity
                onPress={() => navigation.navigate("Camera")}
                style={{
                  width: 130,
                  borderRadius: 4,
                  backgroundColor: "#14274e",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 40,
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Take picture
                </Text>
              </TouchableOpacity>
              <FormField maxLength={255} name="title" placeholder="Title" />
              <FormField
                keyboardType="numeric"
                maxLength={8}
                name="price"
                placeholder="Price"
              />
              <Picker
                items={categories}
                name="category"
                numberOfColumns={3}
                placeholder="Category"
                PickerItemComponent={CategoryPickerItem}
                width="50%"
              />
              <FormField
                maxLength={255}
                multiline
                name="description"
                numberOfLines={3}
                placeholder="Description"
              />
              <SubmitButton title="Post" />
            </>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
  },
  view: {
    flex: 1,
  },
  container: {
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 25,
    flexDirection: "row",
    padding: 15,
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: "100%",
    marginVertical: 10,
  },
  text: {
    color: Colors.white,
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});

export default AddProduct;
