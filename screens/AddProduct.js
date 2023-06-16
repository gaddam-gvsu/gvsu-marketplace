import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Formik, useFormikContext } from "formik";
import defaultStyles from "../utils/DefaultStyles";
import Colors from "../utils/Colors";
import Constants from "expo-constants";
import ImageInputList from "../components/ImageInputList";
import UploadScreen from "./UploadScreen";

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

const FormImagePicker = ({ name, imageUris }) => {
  const { errors, setFieldValue, touched, values } = useFormikContext();
  const handleRemove = (uri) => {
    setFieldValue(
      name,
      imageUris.filter((imageUri) => imageUri !== uri)
    );
  };

  return (
    <>
      <ImageInputList imageUris={imageUris} onRemoveImage={handleRemove} />
      {/* <ErrorMessage error={errors[name]} visible={touched[name]} /> */}
    </>
  );
};

// Form image picker field value should be set to formik field value in useEffect

const AddProduct = ({ route, navigation }) => {
  // const location = useLocation();
  const [uploadVisible, setUploadVisible] = useState(false);
  const [uploaded, setUploaded] = useState([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (route.params?.imageRes) {
      setUploaded([...uploaded, route.params?.imageRes[0]["uri"]]);
    }
  }, [route.params?.imageRes]);

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

  const FormField = ({ name, width, ...otherProps }) => {
    const { setFieldTouched, setFieldValue, values, errors, touched } =
      useFormikContext();

    return (
      <>
        <View style={[styles.container, { width }]}>
          <TextInput
            onBlur={() => setFieldTouched(name)}
            onChangeText={(text) => setFieldValue(name, text)}
            value={values[name]}
            width={width}
            placeholderTextColor={defaultStyles.colors.medium}
            style={defaultStyles.text}
            {...otherProps}
          />
        </View>
        {/* <ErrorMessage error={errors[name]} visible={touched[name]} /> */}
      </>
    );
  };

  const handleSubmit = async (listing, { resetForm }) => {
    console.log("images added to form", listing);
    // setProgress(0);
    // setUploadVisible(true);
    // const result = await listingsApi.addListings(
    //   { ...listing, location },
    //   (progress) => setProgress(progress)
    // );

    // if (!result.ok) {
    //   setUploadVisible(false);
    //   return alert("Could not save the listing");
    // }
    resetForm();
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
          // validationSchema={validationSchema}
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
