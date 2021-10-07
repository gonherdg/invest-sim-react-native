import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View, Text, TextInput} from 'react-native';
import GS from 'src/style/style';
import {NavigationContext, NavigationProp} from '@react-navigation/core';
import {connect} from 'react-redux';

const Splash: React.FC<{
  navigation: NavigationProp<any>;
}> = ({navigation}) => {
  useEffect(() => {
    const afterLoading = () => {
      navigation.navigate('Login');
    };
    //navigation.navigate('Signup');
    //navigation.navigate('Splash');
    //navigation.navigate('MainNavigator');
    setTimeout(afterLoading, 1000);
  });

  return (
    <SafeAreaView style={[GS.containerAuth, S.container]}>
      <View style={S.container}>
        <Text style={[S.text]}>Splash</Text>
      </View>
    </SafeAreaView>
  );
};

const S = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'rgb(44,44,130)',
    padding: 20,
  },
  text: {
    fontSize: 40,
    margin: 10,
    color: '#ffffff',
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

export default connect(() => ({}), {})(Splash);
