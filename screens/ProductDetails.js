import { KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";

import { AuthContext } from "../utils/Context";
import Button from "../components/Button";
import { Image } from "react-native-elements";
import ListItem from "../components/ListItem";
import colors from "../utils/Colors";
import defaultStyles from "../utils/DefaultStyles";
import { removeProduct } from "../shared/firebaseApi";

// import ContactSellerForm from "../components/ContactSellerForm";

const ProductDetails = ({ route, navigation }) => {
  const listing = route.params;
  const { user } = useContext(AuthContext);
  console.log("user data", user);

  const removeListing = async () => {
    await removeProduct(listing);
    navigation.navigate("Products", { refresh: true });
  };
  return (
    <KeyboardAvoidingView
      behavior="position"
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100}
    >
      <Image
        style={styles.image}
        preview={{ uri: listing.images[0].thumbnailUrl }}
        tint="light"
        source={{ uri: listing.images[0] }}
      />
      <View style={styles.detailsContainer}>
        <Text style={[defaultStyles.text, styles.title]}>{listing.title}</Text>
        <Text style={[defaultStyles.text, styles.price]}>{listing.price}</Text>
        <View style={styles.userContainer}>
          <ListItem
            image={require("../assets/icon.png")}
            title="Sharif Ahmed"
            subTitle="5 listings"
          />
        </View>
        {/* <ContactSellerForm listing={listing} /> */}
      </View>
      {user.email === listing.email && (
        <View style={styles.container}>
          <Button title="Remove" onPress={removeListing} />
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 300,
  },
  price: {
    color: colors.black,
    fontWeight: "bold",
    fontSize: 20,
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
  },
  userContainer: {
    marginVertical: 40,
  },
});

export default ProductDetails;
