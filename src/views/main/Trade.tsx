import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Alert,
  Keyboard,
} from 'react-native';
import GS from 'src/style/style';
import {colors} from 'src/style/gonstyle';
import {NavigationProp} from '@react-navigation/core';
import {connect} from 'react-redux';
import api from 'src/api';
import * as crypto from 'src/cryptoworld.json';
import CurrencyAndAmount from 'src/components/input/currencyAndAmount';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ChooseCurrency from 'src/components/input/ChooseCurrency';

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
  const [walletData, setWalletData]: Array<any> = useState([]);
  const [marketData, setMarketData]: Array<any> = useState([]);
  const [chooseCurrency, setChooseCurrency] = useState(false);
  const [selectingInput, setSelectingInput] = useState('from');
  const [fromInput, setFromInput] = useState({currency: 'ETH', amount: ''});
  const [toInput, setToInput] = useState({currency: 'BTC', amount: ''});

  const onSelectedFrom = () => {
    console.log('onSelectedFrom');
    setSelectingInput('from');
    setChooseCurrency(true);
    Keyboard.dismiss();
  };

  const onSelectedTo = () => {
    console.log('onSelectedTo');
    setSelectingInput('to');
    setChooseCurrency(true);
    Keyboard.dismiss();
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
    setFromInput({currency: fromInput.currency, amount: _amount});
  };

  const onToAmountChanged = (_amount: any) => {
    setToInput({currency: toInput.currency, amount: _amount});
  };

  const onRowFromFocus = () => {
    setToInput({currency: toInput.currency, amount: ''});
  };

  const onRowToFocus = () => {
    setFromInput({currency: fromInput.currency, amount: ''});
  };

  const onMax = () => {
    if (
      !walletData[fromInput.currency] ||
      walletData[fromInput.currency].amount == 0.0
    ) {
      Alert.alert('Your account is empty of this currency');
      setFromInput({
        currency: fromInput.currency,
        amount: '',
      });
      return;
    }
    console.log('walletData:', walletData);
    setFromInput({
      currency: fromInput.currency,
      amount: walletData[fromInput.currency].amount,
    });
  };

  const onTrade = async () => {
    if (
      (isNaN(parseFloat(fromInput.amount)) &&
        isNaN(parseFloat(toInput.amount))) ||
      (parseFloat(fromInput.amount) === 0 &&
        isNaN(parseFloat(toInput.amount))) ||
      (isNaN(parseFloat(fromInput.amount)) && parseFloat(toInput.amount) === 0)
    ) {
      Alert.alert('Trade is not possible with the given values');
      return;
    }

    const obj = {
      sellingCurrency: fromInput.currency,
      sellingAmount: parseFloat(fromInput.amount),
      buyingCurrency: toInput.currency,
      buyingAmount: parseFloat(toInput.amount),
    };
    console.log(obj);
    console.log('marketData:', marketData);

    let fromPriceUSD = 0.0;
    marketData.forEach((item: any) => {
      if (item.title === fromInput.currency) {
        fromPriceUSD = item.price;
        console.log('fromPriceUSD: ', fromPriceUSD);
        return;
      }
    });
    let toPriceUSD = 0.0;
    marketData.forEach((item: any) => {
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
    const tradeMessageOK =
      'Dropped ' +
      obj.sellingAmount.toFixed(8) +
      obj.sellingCurrency +
      ' Gained ' +
      obj.buyingAmount.toFixed(8) +
      obj.buyingCurrency;

    if (res.state === 'Error') {
      Alert.alert(res.state, res.message);
    } else {
      Alert.alert(res.state, tradeMessageOK);
    }

    getWallet(marketData);
  };

  const getWallet = async (_marketData: any): Promise<any> => {
    let res = await api.wallet.getMyWallet();
    const dataArray: any = {};
    Object.entries(res).forEach((item, idx) => {
      const shortName = item[0];
      const amount = item[1];
      const marketCoin = _marketData[shortName];
      let price = 0.0;
      if (marketCoin) {
        price = marketCoin.price;
      }
      let valueInUSD = 0.0;
      if (price) {
        valueInUSD = _marketData[shortName].price * amount;
      }
      const newItem = {
        id: idx,
        title: shortName,
        subtitle: crypto.largeName[shortName],
        amount: item[1].toString(),
        imgSrc: crypto.icons[shortName],
        price: '$' + valueInUSD.toString(),
      };
      dataArray[shortName] = newItem;
    });
    setWalletData(dataArray);
  };

  const getMarketData = async () => {
    let res = await api.market.getCryptos();
    //console.log('market data:', res);

    const _data: any = [];
    res.data.forEach((item: any) => {
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
    setMarketData(_data);
    return _data;
  };

  useEffect(() => {
    const getAllData = async () => {
      const _marketData = await getMarketData();
      console.log('_marketData:', _marketData);
      getWallet(_marketData);
    };
    getAllData();
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
        onFocus={onRowFromFocus}
        onMax={onMax}
      />

      <Text style={[S.text]}>To</Text>
      <CurrencyAndAmount
        selectedCurrency={toInput.currency}
        maxValue={undefined}
        style={undefined}
        onPress={onSelectedTo}
        value={toInput.amount}
        onAmountChanged={onToAmountChanged}
        onFocus={onRowToFocus}
        onMax={undefined}
      />

      {chooseCurrency && (
        <ChooseCurrency
          style={[S.choose]}
          onPress={onSelectedCurrency}
          direction={selectingInput}
        />
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
