import React, {useState} from 'react';
import {
  SafeAreaView, 
  StyleSheet,
  View,
  Text, 
  TextInput, 
  Pressable
} from 'react-native';
import GS from 'src/style/style';
import {NavigationProp} from '@react-navigation/core';
import {connect} from 'react-redux';
import { whileStatement } from '@babel/types';

const Login: React.FC<{
  navigation: NavigationProp<any>;
  getUser: Function;
  login: Function;
}> = ({navigation}) => {
  const [secondTextInput, setSecondTextInput] = useState(<TextInput/>);
  const [username, onChangeUsername] = useState();
  const [password, onChangePassword] = useState();

  const onLogin = () => {
    console.log('Login');
    navigation.navigate('MainNavigator');
  };

  return (
    <SafeAreaView style={[GS.containerAuth, S.out]}>
      <View style={S.container}>
        <Text style={[S.text]}>Login</Text>
        <TextInput
          returnKeyType="next"
          textContentType="username"
          placeholderTextColor='#aaa'
          style={[S.input, S.control]}
          onChangeText={() => onChangeUsername}
          value={username}
          placeholder="Username"
          onSubmitEditing={() => { secondTextInput.focus(); }}
        />
        <TextInput
          returnKeyType="send"
          textContentType="password"
          placeholderTextColor='#aaa'
          style={[S.input, S.control]}
          onChangeText={() => onChangePassword}
          value={password}
          placeholder="Password"
          secureTextEntry={true}
          ref={(input: any) => {setSecondTextInput(input);}}
          onSubmitEditing={onLogin}
        />
        <Pressable onPress={onLogin}>
          <Text style={[GS.pButton, S.button, S.control]}>Login</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const S = StyleSheet.create({
  control: {
    backgroundColor: '#333',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    margin: 10,
  },
  button: {
    color: '#fff',
  },
  out: {
    backgroundColor: '#333',
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgb(0,255,130)',
    padding: 20,
    borderRadius: 20,
    margin: 10,
    marginHorizontal: 10,
    
  },
  text: {
    fontSize: 40,
    margin: 10,
  },
  input: {
    maxHeight: 50,
    width: '100%',
    flex: 2,
    justifyContent: 'center',
    color: '#fff',
  },
  top: {
    marginTop: 20,
  },
});

export default connect(() => ({}), {})(Login);
