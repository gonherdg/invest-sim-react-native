import React from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import GS from '../../../src/style/style';
import {NavigationProp} from '@react-navigation/core';
import {connect} from 'react-redux';

const Login: React.FC<{
  navigation: NavigationProp<any>;
  getFavourites: Function;
  getUser: Function;
  login: Function;
}> = ({}) => {
  return (
    <SafeAreaView style={[GS.containerAuth, S.container]}>
      <View style={S.container}>
        <Text>GON GON GON GON</Text>
      </View>
    </SafeAreaView>
  );
};

const S = StyleSheet.create({
  container: {
    alignItems: 'center',
    bakgroundColor: 'yellow',
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
