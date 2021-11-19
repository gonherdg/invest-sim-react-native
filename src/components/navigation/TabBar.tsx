import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import GS, {colors} from 'src/style/style';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';

const TabBar: React.FC<BottomTabBarProps> = ({state, navigation}) => {
  return (
    <View style={[GS.rowCenterBetween, S.container]}>
      <TouchableOpacity
        style={S.center}
        onPress={() => navigation.navigate('Market')}>
        {state.index !== 0 && (
          <Image
            resizeMode="contain"
            source={require('src/assets/images/coins_grey.png')}
            style={S.icon}
          />
        )}
        {state.index === 0 && (
          <Image
            resizeMode="contain"
            source={require('src/assets/images/coins_violet.png')}
            style={S.icon}
          />
        )}
        <Text style={[GS.pLink, state.index === 0 && S.active]}>Market</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={S.center}
        onPress={() => navigation.navigate('Wallet')}>
        {state.index !== 1 && (
          <Image
            resizeMode="contain"
            source={require('src/assets/images/wallet_grey.png')}
            style={S.icon}
          />
        )}
        {state.index === 1 && (
          <Image
            resizeMode="contain"
            source={require('src/assets/images/wallet_violet.png')}
            style={S.icon}
          />
        )}
        <Text style={[GS.pLink, state.index === 1 && S.active]}>Wallet</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={S.center}
        onPress={() => navigation.navigate('Profile')}>
        {state.index !== 2 && (
          <Image
            resizeMode="contain"
            source={require('src/assets/images/account_small_grey.png')}
            style={S.icon}
          />
        )}
        {state.index === 2 && (
          <Image
            resizeMode="contain"
            source={require('src/assets/images/account_small_violet.png')}
            style={S.icon}
          />
        )}
        <Text style={[GS.pLink, state.index === 2 && S.active]}>Profile</Text>
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
