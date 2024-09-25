import { StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SpalshScreen from '../screens/SpalshScreen';
import LoginScreen from '../screens/LoginScreen';
import BottomTab from './BottomTab';


const Stack = createStackNavigator();

export default function StackNavigation() {

    useEffect(() => {
    }, [])

    return (
        <NavigationContainer>
            <Stack.Navigator>
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
            </Stack.Navigator>

        </NavigationContainer>
    )


}

const styles = StyleSheet.create({})