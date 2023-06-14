import React from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView } from "react-native";
import { Image } from "react-native-elements";
import colors from "../utils/Colors";
import defaultStyles from "../utils/DefaultStyles";
import ListItem from "../components/ListItem";
// import ContactSellerForm from "../components/ContactSellerForm";

const ProductDetails = ({ route }) => {
  const listing = route.params;

  return (
    <KeyboardAvoidingView
      behavior="position"
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100}
    >
      <Image
        style={styles.image}
        preview={{ uri: listing.images[0].thumbnailUrl }}
        tint="light"
        uri={listing.images[0].url}
      />
      <View style={styles.detailsContainer}>
        <Text style={[defaultStyles.text, styles.title]}>
          {listing.title}
        </Text>
        <Text style={[defaultStyles.text, styles.price]}>
          {listing.price}
        </Text>
        <View style={styles.userContainer}>
          <ListItem
            image={require("../assets/icon.png")}
            title="Sharif Ahmed"
            subTitle="5 listings"
          />
        </View>
        {/* <ContactSellerForm listing={listing} /> */}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 300,
  },
  price: {
    color: colors.secondary,
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
