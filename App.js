import * as Analytics from "expo-firebase-analytics";
import * as React from "react";

import {
  SignInStackNavigator,
  SplashStackNavigator,
} from "./screens/navigation/StackNavigation";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "./utils/Context";
import BottomTabNavigator from "./screens/navigation/TabNavigation";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App({ navigation }) {
  const navRef = React.useRef();
  const routeNameRef = React.useRef();
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            user: action.user,
            isLoading: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            user: action.user,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            user: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      dp: true,
      user: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userCache;

      try {
        // Restore token stored in `SecureStore` or any other encrypted storage
        userCache = await AsyncStorage.getItem("@user");
        userCache = JSON.parse(userCache);
      } catch (e) {
        // Restoring token failed
        console.log("userCache-error", e);
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: "RESTORE_TOKEN", user: userCache });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(() => ({
    signIn: async (user) => {
      dispatch({ type: "SIGN_IN", user });
    },
    signOut: () => dispatch({ type: "SIGN_OUT" }),
    user: state.user,
  }));

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer
      ref={navRef}
      onReady={() =>
        (routeNameRef.current = navRef.current.getCurrentRoute().name)}
        onStateChange={ async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navRef.current.getCurrentRoute().name;
        if (previousRouteName !== currentRouteName) {
          await Analytics.logEvent("screen_view", {
            screen_name: currentRouteName,
            screen_class: currentRouteName,
            id: state.user?.id ? String(state.user?.id) : "unknown"
          });
        }
       routeNameRef.current = currentRouteName;
    }}>
        {state.isLoading ? (
          // We haven't finished checking for the token yet
          <SplashStackNavigator />
        ) : !state.user ? (
          // No token found, user isn't signed in
          <SignInStackNavigator
            options={{
              title: "Sign In",
              // When logging out, a pop animation feels intuitive
              animationTypeForReplace: state.isSignout ? "pop" : "push",
            }}
          />
        ) : (
          // User is signed in
          // <Stack.Screen name="Home" component={Home} />
          <BottomTabNavigator />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
