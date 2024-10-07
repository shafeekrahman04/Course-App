import {StyleSheet} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Profile from '../screens/Profile';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Training from '../screens/Training';
import Library from '../screens/Library';
import Messages from '../screens/Messages';

export default function BottomTab() {
  const TabNav = createBottomTabNavigator();
  return (
    <TabNav.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#0163d2',
        tabBarInactiveTintColor: 'grey',
        tabBarLabelStyle: {
          fontWeight: '600',
          fontSize: 16, // Increased font size
        },
        tabBarStyle: {
          height: 70, // Increased height of the bottom tab bar
          paddingBottom: 10,
          paddingTop: 10,
        },
      }}>
      <TabNav.Screen
        name="Training"
        component={Training}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={21} // Increased icon size
              color={focused ? '#0163d2' : 'grey'}
            />
          ),
        }}
      />
      <TabNav.Screen
        name="Library"
        component={Library}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Ionicons
              name={focused ? 'search' : 'search-outline'}
              size={21} // Increased icon size
              color={focused ? '#0163d2' : 'grey'}
            />
          ),
        }}
      />
      <TabNav.Screen
        name="Messages"
        component={Messages}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Ionicons
              name={focused ? 'mail' : 'mail-outline'}
              size={21} // Increased icon size
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
              name={focused ? 'person' : 'person-outline'}
              size={21} // Increased icon size
              color={focused ? '#0163d2' : 'grey'}
            />
          ),
        }}
      />
    </TabNav.Navigator>
  );
}

const styles = StyleSheet.create({});
