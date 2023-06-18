import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

import {
  Button,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
} from "react-native";
import { useContext, useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../utils/Context";
import Colors from "../utils/Colors";

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  const { signIn } = useContext(AuthContext);

  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "749426793103-at37tgncj3o3phvd3biqa2kfuve7tklp.apps.googleusercontent.com",
    iosClientId: "GOOGLE_GUID.apps.googleusercontent.com",
    webClientId: "749426793103-rvn4d39nqgifqs1jgmv1mpb7kaq8fvpq.apps.googleusercontent.com",
    expoClientId: "749426793103-rvn4d39nqgifqs1jgmv1mpb7kaq8fvpq.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === "success") {
      setToken(response.authentication.accessToken);
      getUserInfo(response.authentication.accessToken);
    }
  }, [response, token]);

  const getUserInfo = async (tokenToUse) => {
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${tokenToUse || token}` },
        }
      );

      const user = await response.json();
      setUserInfo(user);
      signIn(user);
      AsyncStorage.setItem("@user", JSON.stringify(user));
    } catch (error) {
      // Add your own error handler here
    }
  };

  return userInfo === null ? (
    <ImageBackground
      source={require("../assets/background.png")}
      style={styles.background}
      blurRadius={10}
    >
      <View style={styles.container}>
        {/* <View style={styles.logoContainer}>
        <Image source={require("../assets/logo.png")} style={styles.logo} />
      </View> */}
        <View style={styles.buttonContainer}>
          <Button
            color={Colors.primary}
            title="Sign in with GVSU Account( Google )"
            disabled={!request}
            onPress={() => {
              promptAsync();
            }}
          />
        </View>
      </View>
    </ImageBackground>
  ) : (
    <Text style={styles.text}>{userInfo.name}</Text>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonContainer: {
    width: "100%",
    margin: 100,
  },
  logoContainer: {
    // position: "absolute",
    flex: 1,
    top: 70,
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
  },
  tagline: {
    fontSize: 25,
    fontWeight: "600",
    paddingVertical: 20,
  },
});
