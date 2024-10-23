import { Image, StyleSheet, View } from 'react-native';
import React from 'react';
import { Colors } from '../utilities/styles/GlobalStyles';

export default function SplashScreen() {

  return (
    <View style={styles.body}>
      <View style={styles.image_container}>
        <Image
          source={require('../assets/logo/splash_logo.png')}
          style={styles.image}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '2%',
    backgroundColor: Colors.white,
  },
  image: {
    height: '100%',
    resizeMode: 'contain',
  },
});
