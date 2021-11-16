import React, {useEffect, useState} from 'react';
import {
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {colors} from 'src/style/gonstyle';
// import BTC from '../icons/BTC';
import * as crypto from 'src/cryptoworld.json';
import {connect} from 'react-redux';

const CurrencyAndAmount: React.FC<{
  selectedCurrency: String;
  value: String;
  maxValue: Number | undefined;
  onPress: any;
  onAmountChanged: any;
  onFocus: any;
  onMax: any;
  noEnoughMoney: string;
  style: any;
}> = ({
  selectedCurrency = 'ETH',
  maxValue = undefined,
  onPress,
  onAmountChanged,
  onFocus,
  onMax,
  noEnoughMoney,
  style,
  value,
}) => {
  const [amount, setAmount] = useState('0');

  const DismissKeyboardHOC = Comp => {
    return ({children, ...props}) => (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <Comp {...props}>{children}</Comp>
      </TouchableWithoutFeedback>
    );
  };
  const DismissKeyboardView = DismissKeyboardHOC(View);

  useEffect(() => {
    //setAmount(value);
  }, []);

  return (
    <View style={style}>
      <View style={[S.container, S.item]}>
        <TouchableOpacity style={S.item} onPress={onPress}>
          <View style={S.imageWrapper}>
            <Image
              style={S.tinyLogo}
              source={{uri: crypto.icons[selectedCurrency]}}
            />
          </View>
          <Text style={[S.currency, S.input]}>{selectedCurrency}</Text>
          <Text style={[S.amountGrey, S.input]}>|</Text>
        </TouchableOpacity>

        <TextInput
          style={[
            S.centerBlock,
            S.amount,
            S.input,
            noEnoughMoney === 'notEnough'
              ? S.orange
              : noEnoughMoney === 'emptyOfCurrency'
              ? S.red
              : S.amountColor,
          ]}
          keyboardType={'numeric'}
          placeholder={'0'}
          onChangeText={(text: string) => onAmountChanged(text)}
          onFocus={onFocus}
          value={value}
        />

        <TouchableOpacity style={S.centerBlock} onPress={onMax}>
          {maxValue !== undefined && <Text style={[S.max, S.input]}>MAX</Text>}
          {maxValue === undefined && <Text style={[S.max, S.input]}> </Text>}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const S = StyleSheet.create({
  container: {
    backgroundColor: colors.comp6,
    padding: 0,
    height: 70,
  },
  text: {
    fontSize: 40,
    margin: 10,
    color: '#fff',
  },
  input: {
    margin: 12,
    paddingVertical: 7,
  },
  top: {
    marginTop: 20,
  },

  list: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    paddingVertical: 15,
    borderRadius: 4,
    margin: 5,
    marginHorizontal: 9,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 1,
    marginVertical: 1,
    marginHorizontal: 1,
    borderRadius: 4,
  },
  centerBlock: {
    padding: 1,
    marginVertical: 1,
    marginHorizontal: 1,
    borderRadius: 4,
  },

  currency: {
    color: colors.comp5,
    fontWeight: 'bold',
    fontSize: 17,
  },
  amount: {
    color: colors.comp6,
    fontSize: 17,
    flex: 4,
  },
  orange: {
    color: colors.orange,
  },
  red: {
    color: colors.red,
  },
  amountColor: {
    color: colors.comp6,
  },
  amountGrey: {
    color: colors.grey,
    fontSize: 17,
  },
  max: {
    color: colors.comp2,
    fontSize: 18,
  },
  subtitle: {
    color: '#99b',
    fontSize: 13,
  },

  imageWrapper: {
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 4,
  },
  tinyLogo: {
    margin: 3,
    marginRight: 6,
    width: 28,
    height: 28,
    borderRadius: 20,
  },
  firstBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    margin: 0,
    paddingVertical: 10,
  },
  secondBox: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },

  chart: {
    alignSelf: 'center',
    flex: 1,
    width: 35,
    height: 35,
  },
  price: {
    marginHorizontal: 3,
    textAlign: 'right',
    color: colors.comp7,
    fontSize: 15,
  },
  variation: {
    marginHorizontal: 3,
    textAlign: 'right',
    color: '#193',
    fontSize: 13,
  },
});

export default connect(() => ({}), {})(CurrencyAndAmount);
