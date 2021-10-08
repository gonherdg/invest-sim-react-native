import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Charts from 'src/views/main/Charts';
import Profile from 'src/views/main/Profile';
import Wallet from 'src/views/main/Wallet';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeNavigator: React.FC = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="Charts" component={Charts} />
      <Tab.Screen name="Wallet" component={Wallet} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default HomeNavigator;
