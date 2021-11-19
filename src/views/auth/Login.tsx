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
import {colors} from 'src/style/gonstyle';
import {NavigationProp} from '@react-navigation/core';
import {connect} from 'react-redux';
// import {whileStatement} from '@babel/types';
import {login as actionLogin} from 'src/features/UserSlice';

const Login: React.FC<{
  navigation: NavigationProp<any>;
  getUser: Function;
  login: Function;
  actionLogin: Function;
}> = ({navigation, actionLogin}) => {
  const [secondTextInput, setSecondTextInput] = useState(<TextInput />);
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const [loading, setLoading] = useState(false);
  // const [userToken, setUserToken] = useState(null);
  const [errors, setErrors] = useState(false);

  const validateEmail = (_email: string) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(_email).toLowerCase());
  };

  const onLogin = async () => {
    //setUserToken('asdf');
    console.log('LOGIN...');
    setLoading(true);

    if (!validateEmail(email)) {
      setErrors(true);
      console.log('INVALID EMAIL:', email);
    } else {
      try {
        const result = await actionLogin({email, password});
        console.log(result);
        if (result.payload && result.payload.email) {
          navigation.navigate('MainNavigator', {screen: 'Home'});
        } else {
          setErrors(true);
          console.error('Wrong login info.');
        }
      } catch (error) {
        setErrors(true);
        console.error(error);
      }
    }

    setLoading(false);
  };

  const onRegister = () => {
    navigation.navigate('Signup');
  };

  useEffect(() => {
    onChangeEmail('test2@test.com');
    onChangePassword('test');
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
    <SafeAreaView style={[GS.containerAuth]}>
      <View style={S.container}>
        <Text style={[S.title]}>Investor Simulator</Text>
        <Text style={[S.text]}>Login</Text>
        <TextInput
          returnKeyType="next"
          textContentType="emailAddress"
          placeholderTextColor="#aaa"
          style={[S.input, S.control]}
          onChangeText={onChangeEmail}
          value={email}
          placeholder="Email"
          onSubmitEditing={() => {
            secondTextInput.focus();
          }}
          blurOnSubmit={false}
        />
        <TextInput
          returnKeyType="send"
          textContentType="password"
          placeholderTextColor="#aaa"
          style={[S.input, S.control]}
          onChangeText={onChangePassword}
          value={password}
          placeholder="Password"
          secureTextEntry={true}
          ref={(input: any) => {
            setSecondTextInput(input);
          }}
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

      {loading && (
        <View style={[S.absoluteScreen, {backgroundColor: '#111c'}]}>
          <ActivityIndicator size="large" />
        </View>
      )}
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
    borderColor: colors.comp7,
    borderWidth: 1,
  },
  out: {
    backgroundColor: colors.comp7,
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 4,
    margin: 10,
    marginHorizontal: 10,
  },
  title: {
    textAlign: 'center',
    fontSize: 40,
    margin: 10,
    color: colors.comp7,
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

export default connect(() => ({}), {actionLogin})(Login);
