import {StyleSheet} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Setting from '../screens/Setting';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function BottomTab() {
  const TabNav = createBottomTabNavigator();
  return (
    <TabNav.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#0163d2',
        tabBarInactiveTintColor: 'grey',
        tabBarLabelStyle: {
          fontWeight: '600',
          padding: 5,
          fontSize: 14,
        },
      }}>
      <TabNav.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <FontAwesome6
              name="house"
              size={28}
              color={focused ? '#0163d2' : 'grey'}
            />
          ),
        }}
      />
      <TabNav.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Ionicons
              name="home"
              size={28}
              color={focused ? '#0163d2' : 'grey'}
            />
          ),
        }}
      />
      <TabNav.Screen
        name="Setting"
        component={Setting}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <FontAwesome6
              name={focused ? 'cog' : 'cog'}
              size={28}
              color={focused ? '#0163d2' : 'grey'}
            />
          ),
        }}
      />
    </TabNav.Navigator>
  );
}

const styles = StyleSheet.create({});
