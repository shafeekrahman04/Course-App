import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Swiper from 'react-native-swiper';

const {width, height} = Dimensions.get('window');

const OnBoardingScreen = ({navigation}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex === 2) {
      navigation.replace('Login');
    } else {
      swiperRef.scrollBy(1);
    }
  };

  const handleSkip = () => {
    navigation.replace('Login');
  };

  let swiperRef;

  return (
    <View style={{flex: 1}}>
      <Swiper
        loop={false}
        onIndexChanged={index => setCurrentIndex(index)}
        showsPagination={true}
        activeDotColor="#4CAF50"
        dotColor="#C0C0C0"
        ref={ref => (swiperRef = ref)} // Get Swiper reference
      >
        {/* Page 1 */}
        <View style={styles.slide}>
          <Image
            source={{
              uri: 'https://firebasestorage.googleapis.com/v0/b/fir-3b89d.appspot.com/o/onboarding%2Fonboard1.jpg?alt=media&token=754e90e9-d2a1-4e86-bfa8-098b51afb0fb',
            }}
            style={styles.image}
          />
          <Text style={styles.title}>Welcome to the App</Text>
          <Text style={styles.text}>
            Discover new ways to manage your tasks efficiently!
          </Text>
        </View>

        {/* Page 2 */}
        <View style={styles.slide}>
          <Image
            source={{
              uri: 'https://firebasestorage.googleapis.com/v0/b/fir-3b89d.appspot.com/o/onboarding%2Fonboard2.jpg?alt=media&token=12345abcd',
            }}
            style={styles.image}
          />
          <Text style={styles.title}>Stay Organized</Text>
          <Text style={styles.text}>Keep all your work in one place.</Text>
        </View>

        {/* Page 3 */}
        <View style={styles.slide}>
          <Image
            source={{
              uri: 'https://firebasestorage.googleapis.com/v0/b/fir-3b89d.appspot.com/o/onboarding%2Fonboard3.jpg?alt=media&token=67890fghi',
            }}
            style={styles.image}
          />
          <Text style={styles.title}>Get Started!</Text>
          <Text style={styles.text}>Start your journey now!</Text>
        </View>
      </Swiper>

      {/* Bottom Buttons */}
      <View style={styles.bottomNavigation}>
        {currentIndex < 2 ? (
          <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        ) : (
          <View style={{width: 100}} /> // Placeholder to keep layout consistent
        )}

        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextText}>
            {currentIndex === 2 ? 'Get Started' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: width * 0.8,
    height: width * 0.8,
    marginBottom: 20,
    borderRadius: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#fff',
  },
  skipButton: {
    paddingVertical: 10,
  },
  skipText: {
    fontSize: 18,
    color: '#999',
  },
  nextButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
  },
  nextText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default OnBoardingScreen;
