import React from 'react';
// import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import TabBar from 'src/components/navigation/TabBar';
import Profile from 'src/views/main/Profile';
import Wallet from 'src/views/main/Wallet';
import HomeNavigator from './main/HomeNavigator';

const Tab = createBottomTabNavigator();

const MainNavigator: React.FC = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="Market" component={HomeNavigator} />
      <Tab.Screen name="Wallet" component={Wallet} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default MainNavigator;
