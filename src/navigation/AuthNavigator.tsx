import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Login from '../../src/views/auth/Login';
//import Signup from 'src/views/auth/Signup';

const Stack = createStackNavigator();

const AuthNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      {/* <Stack.Screen name="Signup" component={Signup} /> */}
    </Stack.Navigator>
  );
};

export default AuthNavigator;
