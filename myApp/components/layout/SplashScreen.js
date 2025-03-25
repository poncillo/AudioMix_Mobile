import { View, Text, Image, StyleSheet, Animated } from 'react-native';
import { useEffect, useRef } from 'react';
import Fonts from '../../constants/Fonts';
import Colors from '../../constants/Colors';

export function SplashScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Image
        source={require('../../assets/AudioMixlogo-01.jpg')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Audio Mix</Text>
      <Text style={styles.subtitle}>
        Find your equipment, microphones, speakers, mixers & more
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 30,
  },
  title: {
    fontFamily: Fonts.family.montserratBold,
    fontSize: 38,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 15,
    letterSpacing: 1,
  },
  subtitle: {
    fontFamily: Fonts.family.montserratRegular,
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    maxWidth: '85%',
    lineHeight: 28,
    letterSpacing: 0.5,
    opacity: 0.9,
  }
});