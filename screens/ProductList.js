import React from "react";
import LottieView from "lottie-react-native";
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableWithoutFeedback } from "react-native";
import { Image } from "react-native-elements";
import Constants from "expo-constants";
import colors from "../utils/Colors";
import defaultStyles from "../utils/DefaultStyles";

const ProductList = ({ navigation }) => {
  const loading = false;
  //   const {
  //     data: listings,
  //     error,
  //     loading,
  //     request: loadListings,
  //   } = useApi(listingApi.getListings);

  const listings = [
    {
      id: 201,
      title: "Red jacket",
      images: [
        {
          url: "http://localhost:9000/assets/jacket1_full.jpg",
          thumbnailUrl: "http://localhost:9000/assets/jacket1_thumb.jpg",
        },
      ],
      price: 100,
      categoryId: 5,
      userId: 1,
      location: {
        latitude: 37.78825,
        longitude: -122.4324,
      },
    },
    {
      id: 3,
      title: "Gray couch in a great condition",
      images: [
        {
          url: "http://localhost:9000/assets/couch2_full.jpg",
          thumbnailUrl: "http://localhost:9000/assets/couch2_thumb.jpg",
        },
      ],
      categoryId: 1,
      price: 1200,
      userId: 2,
      location: {
        latitude: 37.78825,
        longitude: -122.4324,
      },
    },
    {
      id: 1,
      title: "Room & Board couch (great condition) - delivery included",
      description:
        "I'm selling my furniture at a discount price. Pick up at Venice. DM me asap.",
      images: [
        {
          url: "http://localhost:9000/assets/couch1_full.jpg",
          thumbnailUrl: "http://localhost:9000/assets/couch1_thumb.jpg",
        },
        {
          url: "http://localhost:9000/assets/couch2_full.jpg",
          thumbnailUrl: "http://localhost:9000/assets/couch2_thumb.jpg",
        },
        {
          url: "http://localhost:9000/assets/couch3_full.jpg",
          thumbnailUrl: "http://localhost:9000/assets/couch3_thumb.jpg",
        },
      ],
      price: 1000,
      categoryId: 1,
      userId: 1,
      location: {
        latitude: 37.78825,
        longitude: -122.4324,
      },
    },
    {
      id: 2,
      title: "Designer wear shoes",
      images: [
        {
          url: "http://localhost:9000/assets/shoes1_full.jpg",
          thumbnailUrl: "http://localhost:9000/assets/shoes1_thumb.jpg",
        },
      ],
      categoryId: 5,
      price: 100,
      userId: 2,
      location: {
        latitude: 37.78825,
        longitude: -122.4324,
      },
    },
    {
      id: 102,
      title: "Canon 400D (Great Condition)",
      images: [
        {
          url: "http://localhost:9000/assets/camera1_full.jpg",
          thumbnailUrl: "http://localhost:9000/assets/camera1_thumb.jpg",
        },
      ],
      price: 300,
      categoryId: 3,
      userId: 1,
      location: {
        latitude: 37.78825,
        longitude: -122.4324,
      },
    },
    {
      id: 101,
      title: "Nikon D850 for sale",
      images: [
        {
          url: "http://localhost:9000/assets/camera2_full.jpg",
          thumbnailUrl: "http://localhost:9000/assets/camera2_thumb.jpg",
        },
      ],
      price: 350,
      categoryId: 3,
      userId: 1,
      location: {
        latitude: 37.78825,
        longitude: -122.4324,
      },
    },
    {
      id: 4,
      title: "Sectional couch - Delivery available",
      description: "No rips no stains no odors",
      images: [
        {
          url: "http://localhost:9000/assets/couch3_full.jpg",
          thumbnailUrl: "http://localhost:9000/assets/couch3_thumb.jpg",
        },
      ],
      categoryId: 1,
      price: 950,
      userId: 2,
      location: {
        latitude: 37.78825,
        longitude: -122.4324,
      },
    },
    {
      id: 6,
      title: "Brown leather shoes",
      images: [
        {
          url: "http://localhost:9000/assets/shoes2_full.jpg",
          thumbnailUrl: "http://localhost:9000/assets/shoes2_thumb.jpg",
        },
      ],
      categoryId: 5,
      price: 50,
      userId: 2,
      location: {
        latitude: 37.78825,
        longitude: -122.4324,
      },
    },
  ];

  //   useEffect(() => {
  //     loadListings();
  //   }, []);

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
                    preview={{ uri: item.images[0].thumbnailUrl }}
                    uri={item.images[0].url}
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
