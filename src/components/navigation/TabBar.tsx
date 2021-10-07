import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import GS, {colors} from 'src/style/style';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';

const TabBar: React.FC<BottomTabBarProps> = ({state, navigation}) => {
  return (
    <View style={[GS.rowCenterBetween, S.container]}>
      <TouchableOpacity
        style={S.center}
        onPress={() => navigation.navigate('Home')}>
        {state.index !== 0 && (
          <Image
            resizeMode="contain"
            source={require('src/assets/images/Home_deactive.png')}
            style={S.icon}
          />
        )}
        {state.index === 0 && (
          <Image
            resizeMode="contain"
            source={require('src/assets/images/Home_activate.png')}
            style={S.icon}
          />
        )}
        <Text style={[GS.pLink, state.index === 0 && S.active]}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={S.center}
        onPress={() => navigation.navigate('Monitoring')}>
        {state.index !== 1 && (
          <Image
            resizeMode="contain"
            source={require('src/assets/images/Monitoraggio_deactive.png')}
            style={S.icon}
          />
        )}
        {state.index === 1 && (
          <Image
            resizeMode="contain"
            source={require('src/assets/images/Monitoraggio_active.png')}
            style={S.icon}
          />
        )}
        <Text style={[GS.pLink, state.index === 1 && S.active]}>
          Monitoraggio
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={S.center}
        onPress={() => navigation.navigate('Profile')}>
        {state.index !== 2 && (
          <Image
            resizeMode="contain"
            source={require('src/assets/images/Profilo_deactive.png')}
            style={S.icon}
          />
        )}
        {state.index === 2 && (
          <Image
            resizeMode="contain"
            source={require('src/assets/images/Profilo_active.png')}
            style={S.icon}
          />
        )}
        <Text style={[GS.pLink, state.index === 2 && S.active]}>Profilo</Text>
      </TouchableOpacity>
    </View>
  );
};

const S = StyleSheet.create({
  container: {
    height: 70,
    paddingHorizontal: 32,
    paddingTop: 12,
    alignItems: 'flex-start',
    borderTopWidth: 1,
    borderTopColor: colors.greyLight,
  },
  icon: {
    width: 24,
    height: 24,
  },
  center: {
    alignItems: 'center',
  },
  active: {
    color: colors.pink,
  },
  hide: {
    display: 'none',
  },
});

export default TabBar;
