import { StyleSheet, Text, View } from 'react-native';

export default function AddProduct() {
  return (
    <View style={styles.container}>
      <Text>{"This is product screen"}</Text>
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
