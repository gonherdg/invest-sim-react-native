import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View, Text, TextInput, Image} from 'react-native';
import GS from '../../../src/style/style';
import {NavigationProp} from '@react-navigation/core';
import {connect} from 'react-redux';
import { colors } from 'src/style/gonstyle';

const Profile: React.FC<{
  navigation: NavigationProp<any>;
}> = ({}) => {
  return (
    <SafeAreaView style={[GS.containerAuth]}>
      <View style={S.container}>
        <Text style={[S.text]}>Nombre Apellido</Text>
        <Image style={S.foto} source={{uri: 'https://cdn-icons-png.flaticon.com/512/149/149071.png'}} />
      </View>

      <View style={[S.toolContainer]}>
        <Text style={[S.tool]}>Transactions history</Text>
        <Text style={[S.tool]}>Logout</Text>
        <Text style={[S.tool]}>About</Text>
        <Text style={[S.tool]}>Help</Text>
      </View>
    </SafeAreaView>
  );
};

const S = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  text: {
    fontSize: 20,
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

  foto: {
    margin: 10,
    width: 90,
    height: 90,
  },

  tool: {
    textAlign: 'left',
    fontSize: 17,
    margin: 2,
    padding: 2,
  },
  toolContainer: {
    alignItems: 'flex-start',
    marginHorizontal: 10,
  },
});

export default connect(() => ({}), {})(Profile);
