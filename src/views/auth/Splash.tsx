import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View, Text, TextInput} from 'react-native';
import GS from 'src/style/style';
import {NavigationContext, NavigationProp} from '@react-navigation/core';
import {connect} from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Splash: React.FC<{
  navigation: NavigationProp<any>;
}> = ({navigation}) => {
  useEffect(() => {
    const afterLoading = () => {
      navigation.navigate('Login');
    };
    setTimeout(afterLoading, 1000);
  });

  const onPress = () => {
    navigation.navigate('Login');
  }

  return (
    <SafeAreaView style={[GS.containerAuth, S.container]}>
      <TouchableOpacity onPress={onPress}>
        <View style={S.container}>
          <Text style={[S.text]}>Investor Simulator</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const S = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'rgb(44,44,130)',
    padding: 20,
    height: 970,
  },
  text: {
    fontSize: 40,
    margin: 10,
    color: '#ffffff',
    textAlign: 'center',
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
