import {StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SpalshScreen from '../screens/SpalshScreen';
import LoginScreen from '../screens/LoginScreen';
import BottomTab from './BottomTab';
import VideoScreen from '../screens/VideoScreen';
import OnboardingScreen from '../screens/OnBoarding';

const Stack = createStackNavigator();

export default function StackNavigation() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check AsyncStorage for authentication status
    const checkAuthentication = async () => {
      try {
        const authStatus = await AsyncStorage.getItem('isAuthenticated');
        setIsAuthenticated(authStatus === 'true');
      } catch (error) {
        console.log('Error checking auth status:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthentication();
  }, []);

  if (isLoading) {
    return <SpalshScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isAuthenticated ? 'HomeTab' : 'Onboarding'}>
        {!isAuthenticated && (
          <Stack.Screen
            name="Onboarding"
            component={OnboardingScreen}
            options={{headerShown: false}}
          />
        )}
        <Stack.Screen
          name="Splash"
          component={SpalshScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="HomeTab"
          component={BottomTab}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="VideoScreen"
          component={VideoScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
