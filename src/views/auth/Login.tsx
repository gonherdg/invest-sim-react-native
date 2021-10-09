import React, {useEffect, useState} from 'react';
import {
  SafeAreaView, 
  StyleSheet,
  View,
  Text, 
  TextInput, 
  Pressable,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import GS from 'src/style/style';
import { colors } from 'src/style/gonstyle'
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
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  const onLogin = () => {
    //setUserToken('asdf');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate('MainNavigator');
    }, 500);
  };

  const onRegister = () => {
    //setUserToken('asdf');
    //setIsLoading(false);
    navigation.navigate('Signup');
  }

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 700);
  }, []);

  /*
  if(isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    )
  }
*/
  return (
    <SafeAreaView style={[GS.containerAuth, S.out]}>
      <View style={S.container}>
        <Text style={[S.title]}>Investor Simulator</Text>
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
          blurOnSubmit={false}
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
          blurOnSubmit={false}
        />
        <Pressable onPress={onLogin}>
          <Text style={[GS.pButton, S.button, S.control]}>Login</Text>
        </Pressable>
        <Pressable onPress={onRegister}>
          <Text style={[S.register]}>Or register!</Text>
        </Pressable>
      </View>

      { isLoading &&
        <View style={[S.absoluteScreen, {backgroundColor: '#111c'}]}>
          <ActivityIndicator size="large" />
        </View>
      }
    </SafeAreaView>
  );
};

const S = StyleSheet.create({
  control: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    margin: 10,
  },
  button: {
    color: '#222',
    borderColor: colors.comp1,
    borderWidth: 1,
  },
  out: {
    backgroundColor: colors.comp7,
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.comp6,
    padding: 20,
    borderRadius: 20,
    margin: 10,
    marginHorizontal: 10,
    
  },
  title: {
    textAlign: 'center',
    fontSize: 40,
    margin: 10,
    color: colors.comp1,
  },
  text: {
    fontSize: 30,
    margin: 10,
    color: '#fff',
  },
  input: {
    maxHeight: 50,
    width: '100%',
    flex: 2,
    justifyContent: 'center',
    color: '#222',
    borderColor: colors.comp1,
    borderWidth: 1,
  },
  top: {
    marginTop: 20,
  },
  register: {
    margin: 10,
    fontSize: 16,
  },

  absoluteScreen: {
    position: 'absolute',
    justifyContent: 'center', 
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
});

export default connect(() => ({}), {})(Login);
