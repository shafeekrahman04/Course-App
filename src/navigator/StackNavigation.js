import {StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from '../screens/LoginScreen';
import BottomTab from './BottomTab';
import VideoScreen from '../screens/VideoScreen';
import OnboardingScreen from '../screens/OnBoarding';
import SplashScreen from '../screens/SplashScreen';
import QuizModal from '../modal/QuizModal';

const Stack = createStackNavigator();

export default function StackNavigation() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isFresh, setIsFresh] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAsyncStorage = async () => {
      try {
        const authStatus = await AsyncStorage.getItem('isAuthenticated');
        setIsAuthenticated(authStatus === 'true' ? true: false);
        const freshStatus = await AsyncStorage.getItem('isFresh');
        setIsFresh(freshStatus === 'false' ? false: true);
      } catch (error) {
        console.error('Error checking status:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAsyncStorage();
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  let initialRouteName;

  if (isFresh === true) {
    initialRouteName = 'Onboarding';
  } else if (isFresh === false) {
    initialRouteName = isAuthenticated ? 'HomeTab' : 'Login';
  } else {
    // If isFresh is null (not yet determined), assume Onboarding
    initialRouteName = 'Onboarding';
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRouteName}>
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="HomeTab"
          component={BottomTab}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="VideoScreen"
          component={VideoScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Onboarding"
          component={OnboardingScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="QuizModal"
          component={QuizModal}
          options={{
            headerShown: false,
          }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
