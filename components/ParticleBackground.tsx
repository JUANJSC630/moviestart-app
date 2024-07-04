import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

const ParticleBackground = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('@/assets/lottiflies/background.json')} // Asegúrate de tener un archivo Lottie JSON
        autoPlay
        loop
        style={styles.lottie}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
  lottie: {
    width: '100%',
    height: '100%',
  },
});

export default ParticleBackground;
