import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View, Text, TextInput, Image} from 'react-native';
import GS from 'src/style/style';
import { colors } from 'src/style/gonstyle';
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
  };

  return (
    <SafeAreaView style={[GS.containerAuth, S.container]}>
      <TouchableOpacity onPress={onPress}>
        <View style={S.container}>
          <Image
            resizeMode="contain"
            source={require('src/assets/images/investor_sim_logo.png')}
            style={S.text}
          />
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const S = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 20,
    height: 970,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 40,
    margin: 10,
    color: colors.comp6,
    textAlign: 'center',
    alignSelf: 'center',
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
