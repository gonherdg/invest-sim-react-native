import React, {useEffect, useState} from 'react';
import {Alert, Image, StyleSheet, Text, View} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import api from 'src/api';
import {colors} from 'src/style/gonstyle';

interface ItemInterface {
  title: string;
  subtitle: string;
  imgSrc: string;
  price: string;
  variation: string;
  amount: string;
  onWithdraw: Function;
}

const WalletItem: React.FC<{item: ItemInterface}> = (item: ItemInterface) => {
  const [withdrawFrame, setWithdrawFrame] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');

  const toggleWithdrawFrame = () => {
    setWithdrawFrame(!withdrawFrame);
  };

  const onMax = () => {
    setWithdrawAmount(item.amount.toString());
  };

  const onWithdraw = () => {
    Alert.alert(
      'Are you sure to withdraw?',
      '' +
        withdrawAmount +
        ' ' +
        item.title +
        ' will be subtracted from your wallet',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: onOK},
        ,
      ],
    );
  };

  const onOK = async () => {
    const obj = {
      withdraw: {
        [item.title]: withdrawAmount,
      },
    };
    const res = await api.wallet.withdraw(obj);
    console.log(res);
    Alert.alert(res.state);
    setWithdrawFrame(false);
    item.onWithdraw();
  };

  return (
    <View style={[withdrawFrame ? S.withdrawFrame : '']}>
      <TouchableOpacity style={S.item} onPress={toggleWithdrawFrame}>
        <View style={S.firstBox}>
          <View style={S.imageWrapper}>
            <Image style={S.tinyLogo} source={{uri: item.imgSrc}} />
          </View>
          <View style={S.secondBox}>
            <Text style={S.title}>{item.title}</Text>
            <Text style={S.subtitle}>{item.subtitle}</Text>
          </View>
        </View>

        <View style={S.secondBox}>
          <Text style={S.amount}>{item.amount}</Text>
          <Text style={S.price}>{item.price}</Text>
        </View>
      </TouchableOpacity>

      {withdrawFrame && (
        <View style={[S.withdrawSecondFrame, S.flexRow]}>
          <View style={S.secondBox}>
            <Text style={[S.amount]}>Amount:</Text>
            <TextInput
              keyboardType={'numeric'}
              style={[S.amount]}
              placeholder={'0'}
              value={withdrawAmount}
              onChangeText={setWithdrawAmount}
            />
          </View>
          <TouchableOpacity style={[S.buttonMax]} onPress={onMax}>
            <Text style={[S.buttonMaxText]}>MAX</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[S.button]} onPress={onWithdraw}>
            <Text style={[S.buttonText]}>Withdraw</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const S = StyleSheet.create({
  button: {
    margin: 4,
    padding: 4,
    backgroundColor: colors.comp3,
    borderRadius: 3,
    height: 40,
    justifyContent: 'center',
  },
  buttonMax: {
    margin: 4,
    padding: 4,
    backgroundColor: colors.white,
    borderRadius: 3,
    height: 40,
    justifyContent: 'center',
  },
  buttonText: {
    paddingHorizontal: 8,
    color: colors.comp7,
    fontWeight: 'bold',
  },
  buttonMaxText: {
    paddingHorizontal: 8,
    color: colors.comp2,
    fontWeight: 'bold',
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  withdrawFrame: {
    marginTop: 4,
    marginBottom: 14,
    backgroundColor: '#eee',
    padding: 6,
    borderRadius: 6,
  },
  withdrawSecondFrame: {
    marginTop: 4,
    padding: 6,
    borderRadius: 6,
  },
  text: {
    fontSize: 16,
    marginHorizontal: 10,
    marginTop: 10,
    color: '#333',
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 1,
    marginVertical: 1,
    marginHorizontal: 1,
    borderRadius: 20,
  },
  title: {
    color: colors.comp7,
    fontSize: 15,
  },
  subtitle: {
    color: '#99b',
    fontSize: 13,
  },

  imageWrapper: {
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 20,
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

  price: {
    marginHorizontal: 3,
    textAlign: 'right',
    color: '#99b',
    fontSize: 13,
  },
  amount: {
    marginHorizontal: 3,
    textAlign: 'right',
    color: colors.comp7,
    fontSize: 14,
  },
});

export default connect(() => ({}), {})(WalletItem);
