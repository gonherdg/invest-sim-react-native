import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import GS from 'src/style/style';
import {colors} from 'src/style/gonstyle';
import {NavigationProp} from '@react-navigation/core';
import {connect} from 'react-redux';
import api from 'src/api';
import * as crypto from 'src/cryptoworld.json';
import BTC from 'src/components/icons/BTC';
import CryptoRow from 'src/components/listItems/cryptoRow';
import CurrencyAndAmount from 'src/components/input/currencyAndAmount';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import ChooseCurrency from 'src/components/input/ChooseCurrency';
import Market from 'src/api/routes/Market';
import Wallet from 'src/api/routes/Wallet';
import { parse } from 'querystring';

interface ItemInterface {
  title: string;
  subtitle: string;
  imgSrc: string;
  price: string;
  variation: string;
  onPress: Function;
}

const Trade: React.FC<{
  navigation: NavigationProp<any>;
}> = ({navigation}) => {
  const [data, setData]: Array<any> = useState([]);
  const [chooseCurrency, setChooseCurrency] = useState(false);
  const [selectingInput, setSelectingInput] = useState('from');
  const [fromInput, setFromInput] = useState({currency: 'ETH', amount: '0'});
  const [toInput, setToInput] = useState({currency: 'BTC', amount: '0'});

  const onSelectedFrom = () => {
    console.log('onSelectedFrom');
    setSelectingInput('from');
    setChooseCurrency(true);
  };

  const onSelectedTo = () => {
    console.log('onSelectedTo');
    setSelectingInput('to');
    setChooseCurrency(true);
  };

  const onSelectedCurrency = (curr: any) => {
    console.log('onSelectedCurrency: ', curr);
    if (selectingInput === 'from') {
      setFromInput({currency: curr, amount: fromInput.amount});
    } else {
      setToInput({currency: curr, amount: toInput.amount});
    }
    setChooseCurrency(false);
  };

  const onFromAmountChanged = (_amount: any) => {
    console.log('amount:', _amount);
    setFromInput({currency: fromInput.currency, amount: _amount});
    //console.log('new from amount:', fromInput);
  };

  const onToAmountChanged = (_amount: any) => {
    console.log('amount:', _amount);
    setToInput({currency: toInput.currency, amount: _amount});
    //console.log('new to amount:', toInput);
  };

  const onTrade = async () => {
    const obj = {
      sellingCurrency: fromInput.currency,
      sellingAmount: parseFloat(fromInput.amount),
      buyingCurrency: toInput.currency,
      buyingAmount: parseFloat(toInput.amount),
    };
    console.log(obj);
    console.log('data:', data);

    let fromPriceUSD = 0.0;
    data.forEach((item: any) => {
      if (item.title === fromInput.currency) {
        fromPriceUSD = item.price;
        console.log('fromPriceUSD: ', fromPriceUSD);
        return;
      }
    });
    let toPriceUSD = 0.0;
    data.forEach((item: any) => {
      if (item.title === toInput.currency) {
        toPriceUSD = item.price;
        console.log('toPriceUSD: ', toPriceUSD);
        return;
      }
    });

    let fromUSD = 0.0;
    let toUSD = 0.0;
    let finalAmount = 0.0;
    if (parseFloat(fromInput.amount) > 0) {
      fromUSD = fromPriceUSD * parseFloat(fromInput.amount);
      finalAmount = fromUSD / toPriceUSD;
      console.log('el resultado seria:', finalAmount);
      obj.buyingAmount = finalAmount;
    } else if (parseFloat(toInput.amount) > 0) {
      toUSD = toPriceUSD * parseFloat(toInput.amount);
      finalAmount = toUSD / fromPriceUSD;
      console.log('el resultado seria:', finalAmount);
      obj.sellingAmount = finalAmount;
    }
    let res = await api.wallet.trade(obj);
    console.log('TRADE:', res);
  };

  const renderItem = ({item}: ItemInterface) => {
    const onPress = () => {
      console.log('asdasd', item.title);
    };

    return (
      <CryptoRow
        title={item.title}
        subtitle={item.subtitle}
        imgSrc={item.imgSrc}
        price={item.price}
        variation={item.variation}
        onPress={onPress}
      />
    );
  };

  const getChartData = async () => {
    let res = await api.market.getCryptos();
    //console.log('market data:', res);

    const _data: any = [];
    res.data.forEach(item => {
      const newItem = {
        id: item._id,
        title: item.shortName,
        subtitle: item.name,
        price: item.priceInUSD,
        variation: '+0.00%',
        imgSrc: crypto.icons[item.shortName],
      };
      _data.push(newItem);
    });
    setData(_data);
  };

  useEffect(() => {
    getChartData();
  }, []);

  return (
    <SafeAreaView style={[GS.containerAuth, S.container]}>
      <View style={{}}>
        <Text style={[S.title]}>Trade</Text>
      </View>
      <Text style={[S.text]}>From</Text>
      <CurrencyAndAmount
        selectedCurrency={fromInput.currency}
        maxValue={1000}
        style={undefined}
        onPress={onSelectedFrom}
        value={fromInput.amount}
        onAmountChanged={onFromAmountChanged}
      />

      <Text style={[S.text]}>To</Text>
      <CurrencyAndAmount
        selectedCurrency={toInput.currency}
        maxValue={undefined}
        style={undefined}
        onPress={onSelectedTo}
        value={toInput.amount}
        onAmountChanged={onToAmountChanged}
      />

      {chooseCurrency && (
        <ChooseCurrency style={[S.choose]} onPress={onSelectedCurrency} />
      )}

      <TouchableOpacity style={[S.tradeButton]} onPress={onTrade}>
        <Text style={S.tradeText}>Trade</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const S = StyleSheet.create({
  choose: {
    backgroundColor: colors.white,
    borderRadius: 4,
    margin: 20,
  },
  tradeButton: {
    padding: 10,
    backgroundColor: colors.comp3,
    textAlign: 'center',
    margin: 12,
    borderRadius: 4,
  },
  tradeText: {
    fontSize: 26,
    color: colors.white,
    textAlign: 'center',
  },
  flex: {
    flex: 1,
  },
  container: {
    backgroundColor: colors.comp6,
    padding: 0,
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 16,
    marginTop: 12,
    margin: 5,
    color: '#fff',
  },
  input: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
  },
  top: {
    marginTop: 20,
  },

  list: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    paddingVertical: 15,
    borderRadius: 14,
    margin: 5,
    marginHorizontal: 9,
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
    color: colors.white,
    fontSize: 30,
    textAlign: 'center',
    marginTop: 6,
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

export default connect(() => ({}), {})(Trade);
