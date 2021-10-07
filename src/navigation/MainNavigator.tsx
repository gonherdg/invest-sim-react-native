import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TabBar from 'src/components/navigation/TabBar';
import Profile from 'src/views/main/Profile';
import Charts from 'src/views/main/Charts';
import Wallet from 'src/views/main/Wallet';
import HomeNavigator from './main/HomeNavigator';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: true}}>
      <Stack.Screen name="HomeNavigator" component={HomeNavigator} />
      {/*
      <Stack.Screen name="Charts" component={Charts} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Wallet" component={Wallet} />
      */}
    </Stack.Navigator>
  );
};

export default MainNavigator;
