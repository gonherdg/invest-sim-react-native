import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View, Text, TextInput, Button} from 'react-native';
import GS from 'src/style/style';
import {NavigationProp} from '@react-navigation/core';
import {connect} from 'react-redux';

const Login: React.FC<{
  navigation: NavigationProp<any>;
  getUser: Function;
  login: Function;
}> = ({navigation}) => {
  const [username, onChangeUsername] = useState();
  const [password, onChangePassword] = useState();

  const onLogin = () => {
    console.log('Login');
    navigation.navigate('MainNavigator');
  };

  return (
    <SafeAreaView style={[GS.containerAuth, S.container]}>
      <View style={S.container}>
        <Text style={[S.text]}>Login</Text>
        <TextInput
          style={S.input}
          onChangeText={() => onChangeUsername}
          value={username}
          placeholder="username"
        />
        <TextInput
          style={S.input}
          onChangeText={() => onChangePassword}
          value={password}
          placeholder="username"
        />
        <Button onPress={onLogin} title="Login" />
      </View>
    </SafeAreaView>
  );
};

const S = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'rgb(0,255,130)',
    padding: 20,
  },
  text: {
    fontSize: 40,
    margin: 10,
  },
  input: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
  },
  top: {
    marginTop: 20,
  },
});

export default connect(() => ({}), {})(Login);
