import React, { useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

export default function LandingScreen() {
  const navigation = useNavigation();
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const spinAnimation = () => {
      Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 13000, 
          useNativeDriver: true,
        })
      ).start();
    };

    spinAnimation();
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'], // Maps 0 to 360 degrees
  });

  return (
    <LinearGradient
      colors={['#FCF579', '#F98937']} // Gradient from yellow to orange
      style={styles.container}
    >
      <Image
        source={require('./assets/headerFTS.png')}
        style={styles.titleImage}
      />

      <View style={styles.cdContainer}>
        {/* Spinning CD */}
        <Animated.Image
          source={require('./assets/cdsvtFTS.png')}
          style={[styles.cd, { transform: [{ rotate: spin }] }]}
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('About')} // Navigate to "Tracks" screen
      >
        <Text style={styles.buttonText}>About</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Tracks')} // Navigate to "Tracks" screen
      >
        <Text style={styles.buttonText}>Tracks</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFD700',
  },
  titleImage: {
    width: 250,
    height: 125,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  cdContainer: {
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 80,
    position: 'relative', // Enable layering for child elements
  },
  cd: {
    position: 'absolute',
    width: '85%', // Slightly smaller to create a layered effect
    height: '85%',
    resizeMode: 'cover',
  },
  button: {
    borderWidth: 1,
    borderColor: '#FDF938',
    borderRadius: 25,
    paddingVertical: 13,
    paddingHorizontal: 70,
    marginBottom: 15,
  },
  buttonText: {
    color: '#FDF938',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
