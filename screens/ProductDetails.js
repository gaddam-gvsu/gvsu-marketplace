import * as Analytics from "expo-firebase-analytics";

import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import React, { useCallback, useContext, useEffect } from "react";

import { AuthContext } from "../utils/Context";
import { Image } from "react-native-elements";
import ShowMap from "./MapView";
import colors from "../utils/Colors";
import defaultStyles from "../utils/DefaultStyles";
import { removeProduct } from "../shared/firebaseApi";
import { useFocusEffect } from "@react-navigation/native";

export const SLIDER_WIDTH = Dimensions.get("window").width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

// import ContactSellerForm from "../components/ContactSellerForm";

const ProductDetails = ({ route, navigation }) => {
  const listing = route.params;
  const { user } = useContext(AuthContext);

  useFocusEffect(
    useCallback(() => {
      Analytics.logEvent("select_item", {
        item_list_name: listing.title,
        id: String(user?.id)
      });
    }, [])
  );

  useEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        user.email === listing.email && (
          <TouchableOpacity onPress={removeListing}>
            <Text style={{ color: colors.white }}>Remove</Text>
          </TouchableOpacity>
        ),
    });
  });

  const removeListing = async () => {
    await removeProduct(listing);
    navigation.navigate("Products", { refresh: true });
  };

  return (
    <KeyboardAvoidingView
      behavior="position"
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100}
      style={{ flex: 1 }}
    >
      <View>
        <Image
          style={styles.image}
          preview={{ uri: listing.images[0].thumbnailUrl }}
          tint="light"
          source={{ uri: listing.images[0] }}
        />
        <View style={styles.detailsContainer}>
          <Text style={[defaultStyles.text, styles.title]}>
            {listing.title}
          </Text>
          <Text
            style={[defaultStyles.text, styles.price]}
          >{`$${listing.price}`}</Text>
          <Text
            style={[defaultStyles.text, styles.normalText]}
          >{`Listed in ${listing.address[0].city},${listing.address[0].region}`}</Text>
          <Text
            style={[defaultStyles.text, styles.normalText]}
          >{`Contact: ${listing.email}`}</Text>

          {/* <ContactSellerForm listing={listing} /> */}
        </View>

        <View style={styles.flexRow}>
          <View style={styles.cell}>
            <Text style={styles.cellText}>{"Details"}</Text>
          </View>
          <View style={styles.cell}></View>
        </View>

        <View style={[styles.flexRow, { padding: 10 }]}>
          <Text style={[defaultStyles.text, styles.normalText]}>
            {listing.description}
          </Text>
        </View>

        <ShowMap
          location={listing.location}
          city={listing.address[0].city}
          region={listing.address[0].region}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 250,
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
