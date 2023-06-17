import { StyleSheet, Text, View } from 'react-native';

import { AuthContext } from '../App';
import { Button } from 'react-native-elements';
import { useContext } from 'react';

const UserProfile = () => {
  const { user, signOut } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Button title="Sign out" onPress={signOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default UserProfile;
