import {Dimensions, StyleSheet} from 'react-native';

export const colors = {
  comp1: '#533E80',
  comp2: '#C7A683',
  comp3: '#5BC76B',
  comp4: '#3E7A47',
  comp5: '#8B6FC7',
  comp6: '#2F264A',
  comp7: '#454B61',
  white: 'white',
  blue: '#233975',
  blueDark: '#03045e',
  yellow: '#fce111',
  green: 'green',
  red: 'red',
  background: 'white',
  black: 'black',
  grey: '#c4c4c4',
  lightGrey: 'rgba(118, 118, 128, 0.12)',
};

export const DEVICE_WIDTH = Dimensions.get('screen').width;

const fontFamily = 'Avenir-Medium';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    marginHorizontal: 32,
    marginTop: 12,
  },
  containerAuth: {
    flex: 1,
    backgroundColor: colors.background,
    marginHorizontal: 50,
  },
  containerCenter: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 50,
  },
  headerText: {
    fontFamily: fontFamily,
    fontSize: 24,
    fontWeight: 'bold',
    fontStyle: 'normal',
    lineHeight: 36,
    letterSpacing: 0,
    textAlign: 'left',
    color: colors.black,
  },
  pSmall: {
    fontSize: 12,
    fontWeight: '500',
    fontStyle: 'normal',
    lineHeight: 18,
    letterSpacing: 0,
    textAlign: 'left',
    color: colors.black,
  },
  p: {
    fontSize: 14,
    fontWeight: '500',
    fontStyle: 'normal',
    lineHeight: 18,
    letterSpacing: 0,
    textAlign: 'left',
    color: colors.black,
  },
  pWhite: {
    fontSize: 14,
    fontWeight: '500',
    fontStyle: 'normal',
    lineHeight: 18,
    letterSpacing: 0,
    textAlign: 'left',
    color: colors.white,
  },
  pButton: {
    fontSize: 12,
    fontWeight: 'bold',
    fontStyle: 'normal',
    lineHeight: 15,
    letterSpacing: 0.6,
    textAlign: 'left',
    color: '#ffffff',
  },
  h1: {
    fontSize: 40,
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'left',
    color: colors.blueDark,
  },
  h2: {
    fontSize: 30,
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'left',
    color: colors.blueDark,
  },
  h1White: {
    fontSize: 40,
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'left',
    color: colors.white,
  },
  row: {
    flexDirection: 'row',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowCenterBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
  },
});
