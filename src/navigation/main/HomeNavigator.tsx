// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Charts from 'src/views/main/Charts';
import Trade from 'src/views/main/Trade';

const Stack = createStackNavigator();

const HomeNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Charts" component={Charts} />
      <Stack.Screen name="Trade" component={Trade} />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
