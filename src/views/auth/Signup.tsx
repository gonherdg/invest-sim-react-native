import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';
import GS from 'src/style/style';
import {colors} from 'src/style/gonstyle';
import {NavigationProp} from '@react-navigation/core';
import {connect} from 'react-redux';
import api from 'src/api';
// import {whileStatement} from '@babel/types';

const Login: React.FC<{
  navigation: NavigationProp<any>;
  getUser: Function;
  login: Function;
}> = ({navigation}) => {
  const [secondTextInput, setSecondTextInput] = useState(<TextInput />);
  const [thirdTextInput, setThirdTextInput] = useState(<TextInput />);
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const [confirmPassword, onChangeConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEmail = (_email: string) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(_email).toLowerCase());
  };

  const onLogin = () => {
    navigation.navigate('Login');
  };

  const onRegister = async () => {
    setLoading(true);

    if (!validateEmail(email)) {
      setLoading(false);
      Alert.alert('Invalid email:', email);
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert(
        'Repeated password is not equal to the new one',
        'Please repeat the password correctly',
      );
      setLoading(false);
      return;
    }

    let res = await api.auth.signup(email, password, email, 'Client');
    if (res.error) {
      Alert.alert('An error occurred');
      setLoading(false);
      return;
    }

    if (!res.error) {
      Alert.alert('Successfully registered', 'Now you can login');
      navigation.navigate('AuthNavigator', {screen: 'Login'});
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={[GS.containerAuth, S.out]}>
      <View style={S.container}>
        <Text style={[S.title]}>Investor Simulator</Text>
        <Text style={[S.text]}>Signup</Text>
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
          ref={(inputPassword: any) => {
            setSecondTextInput(inputPassword);
          }}
          onSubmitEditing={() => {
            thirdTextInput.focus();
          }}
          blurOnSubmit={false}
        />
        <TextInput
          returnKeyType="send"
          textContentType="password"
          placeholderTextColor="#aaa"
          style={[S.input, S.control]}
          onChangeText={onChangeConfirmPassword}
          value={confirmPassword}
          placeholder="Repeat password"
          secureTextEntry={true}
          ref={(inputRepeatPassord: any) => {
            setThirdTextInput(inputRepeatPassord);
          }}
          onSubmitEditing={onRegister}
          blurOnSubmit={false}
        />
        <Pressable onPress={onRegister}>
          <Text style={[GS.pButton, S.button, S.control]}>Signup</Text>
        </Pressable>
        <Pressable onPress={onLogin}>
          <Text style={[S.register]}>Already have an account? Login!</Text>
        </Pressable>
      </View>
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
});

export default connect(() => ({}), {})(Login);
