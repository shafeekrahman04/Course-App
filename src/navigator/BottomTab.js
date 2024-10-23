import {StyleSheet} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Profile from '../screens/Profile';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from '../screens/Home';
import Library from '../screens/Library';
import Quiz from '../screens/Quiz';

export default function BottomTab() {
  const TabNav = createBottomTabNavigator();
  return (
    <TabNav.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#0163d2',
        tabBarInactiveTintColor: 'grey',
        tabBarLabelStyle: {
          fontWeight: '600',
          fontSize: 16,
        },
        tabBarStyle: {
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
        },
      }}>
      <TabNav.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={21}
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
              size={21}
              color={focused ? '#0163d2' : 'grey'}
            />
          ),
        }}
      />
      <TabNav.Screen
        name="Quiz"
        component={Quiz}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Ionicons
              name={focused ? 'school' : 'school-outline'}
              size={21}
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
              size={21}
              color={focused ? '#0163d2' : 'grey'}
            />
          ),
        }}
      />
    </TabNav.Navigator>
  );
}

const styles = StyleSheet.create({});
