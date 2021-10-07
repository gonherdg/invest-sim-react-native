import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View, Text, TextInput} from 'react-native';
import GS from 'src/style/style';
import {NavigationProp} from '@react-navigation/core';
import {connect} from 'react-redux';

const Wallet: React.FC<{
  navigation: NavigationProp<any>;
}> = ({}) => {
  return (
    <SafeAreaView style={[GS.containerAuth, S.container]}>
      <View style={S.container}>
        <Text style={[S.text]}>Wallet</Text>
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

export default connect(() => ({}), {})(Wallet);
