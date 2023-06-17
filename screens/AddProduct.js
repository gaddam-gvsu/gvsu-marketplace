import * as Location from "expo-location";

import { Formik, useFormikContext } from "formik";
import React, { useContext, useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { AuthContext } from "../utils/Context";
import Button from "../components/Button";
import CategoryPickerItem from "../components/CategoryPickerItem";
import Colors from "../utils/Colors";
import FormField from "../components/forms/FormField";
import ImageInputList from "../components/ImageInputList";
import Picker from "../components/forms/FormPicker";
import UploadScreen from "./UploadScreen";
import defaultStyles from "../utils/DefaultStyles";
import { saveProduct } from "../shared/firebaseApi";
import CameraApp from "./Camera";

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
  const { user } = useContext(AuthContext);
  const [location, setLocation] = useState();
  const [uploadVisible, setUploadVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
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
      setLocation({ latitude, longitude, address: reverseGeo });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

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
        style={[styles.button, { backgroundColor: Colors.primary }]}
        onPress={handleSubmit}
      >
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    );
  };

  const handleSubmit = async (listing, { resetForm }) => {
    const { address, ...loc } = location;
    const data = {
      title: listing.title,
      price: listing.price,
      category: listing.category.label,
      description: listing.description,
      images: listing.images,
      location: loc,
      address,
      email: user.email,
    };
    await saveProduct(data);
    setUploaded([]);
    resetForm();
    navigation.navigate("Products", { refresh: true });
  };

  const handleAdd = (uri) => {
    setModalVisible(false);
    setUploaded([...uploaded, uri]);
  };

  const handleClose = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView style={styles.view}>
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
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ margin: 15, fontSize: 18 }}>{"Category"}</Text>
                <Picker
                  items={categories}
                  name="category"
                  numberOfColumns={3}
                  label="Category"
                  PickerItemComponent={CategoryPickerItem}
                  width="50%"
                />
              </View>
              <FormField maxLength={255} name="title" label="Title" />
              <FormField
                keyboardType="numeric"
                maxLength={8}
                name="price"
                label="Price"
              />
              <FormField
                maxLength={255}
                multiline
                name="description"
                numberOfLines={3}
                label="Description"
              />

              <Button
                style={styles.text}
                title="Add Image(s)"
                onPress={() => {
                  setModalVisible(true);
                }}
              />

              <CameraApp
                visible={modalVisible}
                onAddImage={handleAdd}
                close={handleClose}
              ></CameraApp>

              {uploaded && (
                <FormImagePicker name="images" imageUris={uploaded} />
              )}
              <SubmitButton title="Save" />
            </>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
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
    flexDirection: "row",
    backgroundColor: Colors.primary,
    borderRadius: 5,
    justifyContent: "center",
    alignSelf: "center",
    padding: 15,
    margin: 50,
    bottom: 0,
    width: "30%",
  },
  text: {
    color: Colors.white,
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});

export default AddProduct;
