import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

import { Button, StyleSheet, Text, View } from "react-native";
import { useContext, useEffect, useState } from "react";

import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from "../App";

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  const { signIn } = useContext(AuthContext);

  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "749426793103-at37tgncj3o3phvd3biqa2kfuve7tklp.apps.googleusercontent.com",
    iosClientId: "GOOGLE_GUID.apps.googleusercontent.com",
    webClientId: "749426793103-rvn4d39nqgifqs1jgmv1mpb7kaq8fvpq.apps.googleusercontent.com"

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
      AsyncStorage.setItem("@user", JSON.stringify(user))
    } catch (error) {
      // Add your own error handler here
    }
  };

  return (
    <View style={styles.container}>
      {userInfo === null ? (
        <Button
          title="Sign in with GVSU Account( Google )"
          disabled={!request}
          onPress={() => {
            promptAsync();
          }}
        />
      ) : (
        <Text style={styles.text}>{userInfo.name}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
