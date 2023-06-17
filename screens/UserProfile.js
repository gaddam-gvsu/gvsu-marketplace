import { StyleSheet, View } from "react-native";

import { AuthContext } from "../utils/Context";
import Button from "../components/Button";
import { useContext } from "react";

const UserProfile = () => {
  const { user, signOut } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Button title="Sign out" onPress={signOut} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default UserProfile;
