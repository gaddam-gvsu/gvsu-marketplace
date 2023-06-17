import { KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";

import { AuthContext } from "../utils/Context";
import Button from "../components/Button";
import { Image } from "react-native-elements";
import colors from "../utils/Colors";
import defaultStyles from "../utils/DefaultStyles";
import { removeProduct } from "../shared/firebaseApi";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";

// import ContactSellerForm from "../components/ContactSellerForm";

const ProductDetails = ({ route, navigation }) => {
  const listing = route.params;
  const { user } = useContext(AuthContext);
  console.log("user data", listing);

  const removeListing = async () => {
    await removeProduct(listing);
    navigation.navigate("Products", { refresh: true });
  };

  return (
    <KeyboardAvoidingView
      behavior="position"
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100}
      style={{flex: 1}}
    >
      <Image
        style={styles.image}
        preview={{ uri: listing.images[0].thumbnailUrl }}
        tint="light"
        source={{ uri: listing.images[0] }}
      />
      <View style={styles.detailsContainer}>
        <Text style={[defaultStyles.text, styles.title]}>{listing.title}</Text>
        <Text
          style={[defaultStyles.text, styles.price]}
        >{`$${listing.price}`}</Text>
        <Text
          style={[defaultStyles.text, styles.normalText]}
        >{`Listed in ${listing.address[0].city},${listing.address[0].region}`}</Text>

        {/* <ContactSellerForm listing={listing} /> */}
      </View>

      <View style={styles.flexRow}>
        <View style={styles.cell}>
          <Text style={styles.cellText}>{"Details"}</Text>
        </View>
        <View style={styles.cell}></View>
      </View>

      <View style={styles.flexRow}>
        <View style={styles.cell}>
          <Text style={styles.cellText}>{"Condition"}</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.cellText}>{listing.description}</Text>
        </View>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={[defaultStyles.text, styles.normalText]}>
          {listing.description}
        </Text>
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
    fontSize: 18,
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  normalText: {
    fontSize: 16,
  },
  userContainer: {
    marginVertical: 40,
  },
  flexRow: {
    flexDirection: "row",
  },
  cell: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
  },
  cellText: {
    fontWeight: "bold",
    fontSize: 15,
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
    width: "100%",
    height: "50%",
  },
});

export default ProductDetails;
