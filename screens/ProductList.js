import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";

import Constants from "expo-constants";
import { Image } from "react-native-elements";
import LottieView from "lottie-react-native";
import colors from "../utils/Colors";
import defaultStyles from "../utils/DefaultStyles";
import { getProducts } from "../shared/firebaseApi";

const ProductList = ({ navigation }) => {
  const loading = false;
  const [listings, setListings] = useState([]);

  useEffect(() => {
    getProducts().then((products) => setListings(products));
  }, []);

  return (
    <>
      {loading && (
        <View style={styles.overlay}>
          <LottieView
            autoPlay
            loop
            source={require("../assets/animations/loader.json")}
          />
        </View>
      )}

      <SafeAreaView style={styles.screen}>
        <View style={styles.view}>
          {/* {error && (
            <>
              <Text style={defaultStyles.text}>
                {"Couldn't retieve the listings"}
              </Text>

              <TouchableOpacity
                style={[styles.button, { backgroundColor: colors[color] }]}
                onPress={loadListings}
              >
                <Text style={styles.retryText}>{"Retry"}</Text>
              </TouchableOpacity>
            </>
          )} */}
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={listings}
            keyExtractor={(listing) => listing.id.toString()}
            renderItem={({ item }) => (
              <TouchableWithoutFeedback
                onPress={() => navigation.navigate("Product Details", item)}
              >
                <View style={styles.card}>
                  <Image
                    style={styles.image}
                    tint="light"
                    source={{uri: item.images[0]}}
                  />
                  <View style={styles.detailsContainer}>
                    <Text style={[defaultStyles.text, styles.title]}>
                      {item.title}
                    </Text>
                    <Text style={[defaultStyles.text, styles.subTitle]}>
                      {"$" + item.price}
                    </Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            )}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

const listStyle = {
  padding: 20,
  backgroundColor: colors.light,
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    ...listStyle,
  },
  view: {
    flex: 1,
    ...listStyle,
  },
  card: {
    borderRadius: 15,
    backgroundColor: colors.white,
    marginBottom: 20,
    overflow: "hidden",
  },
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 200,
  },
  subTitle: {
    color: colors.secondary,
    fontWeight: "bold",
  },
  title: {
    marginBottom: 20,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: "100%",
    marginVertical: 10,
  },
  retryText: {
    color: colors.white,
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  overlay: {
    height: "100%",
    width: "100%",
    backgroundColor: "white",
    opacity: 0.8,
    position: "absolute",
    zIndex: 1,
  },
});

export default ProductList;
