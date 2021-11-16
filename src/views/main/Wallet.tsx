import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
} from 'react-native';
import GS from 'src/style/style';
import {colors} from 'src/style/gonstyle';
import {NavigationProp} from '@react-navigation/core';
import {connect} from 'react-redux';
import api from 'src/api';
import * as crypto from 'src/cryptoworld.json';

interface ItemInterface {
  title: string;
  subtitle: string;
  imgSrc: string;
  price: string;
  variation: string;
  amount: string;
}

const DATA = [
  {
    id: 'abd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'BNB',
    subtitle: 'BNB',
    price: '$423.48',
    amount: '10.200.899,1352',
    imgSrc: crypto.icons.BNB,
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'BTC',
    subtitle: 'Bitcoin',
    price: '$423.48',
    amount: '10.200.899,1352',
    imgSrc: crypto.icons.BTC,
  },
  {
    id: 's58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'ETH',
    subtitle: 'Ethereum',
    price: '$423.48',
    amount: '10.200.899,1352',
    imgSrc: crypto.icons.ETH,
  },
  {
    id: 'dbd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'BNB',
    subtitle: 'BNB',
    price: '$423.48',
    amount: '10.200.899,1352',
    imgSrc: crypto.icons.BNB,
  },
  {
    id: 'q3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'BTC',
    subtitle: 'Bitcoin',
    price: '$423.48',
    amount: '10.200.899,1352',
    imgSrc: crypto.icons.BTC,
  },
  {
    id: 'w58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'ETH',
    subtitle: 'Ethereum',
    price: '$423.48',
    amount: '10.200.899,1352',
    imgSrc: crypto.icons.ETH,
  },
  {
    id: 'ebd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'BNB',
    subtitle: 'BNB',
    price: '$423.48',
    amount: '10.200.899,1352',
    imgSrc: crypto.icons.BNB,
  },
  {
    id: 'z3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'BTC',
    subtitle: 'Bitcoin',
    price: '$423.48',
    amount: '10.200.899,1352',
    imgSrc: crypto.icons.BTC,
  },
  {
    id: 'x58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'ETH',
    subtitle: 'Ethereum',
    price: '$423.48',
    amount: '10.200.899,1352',
    imgSrc: crypto.icons.ETH,
  },
  {
    id: 'cbd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'BNB',
    subtitle: 'BNB',
    price: '$423.48',
    amount: '10.200.899,1352',
    imgSrc: crypto.icons.BNB,
  },
  {
    id: 'e3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'BTC',
    subtitle: 'Bitcoin',
    price: '$423.48',
    amount: '10.200.899,1352',
    imgSrc: crypto.icons.BTC,
  },
  {
    id: 'q58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'ETH',
    subtitle: 'Ethereum',
    price: '$423.48',
    amount: '10.200.899,1352',
    imgSrc: crypto.icons.ETH,
  },
];

const Item = (item: ItemInterface) => (
  <View style={S.item}>
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
  </View>
);

const Wallet: React.FC<{
  navigation: NavigationProp<any>;
}> = ({}) => {
  const [data, setData]: Array<any> = useState([]);
  const [marketData, setMarketData]: Array<any> = useState([]);
  const [totalBalance, setTotalBalance]: Number = useState(0.0);

  const renderItem = ({item}: ItemInterface) => (
    <Item
      title={item.title}
      subtitle={item.subtitle}
      imgSrc={item.imgSrc}
      price={item.price}
      amount={item.amount}
    />
  );

  const getMarketData = async () => {
    let res = await api.market.getCryptos();
    const data: any = {};
    res.data.forEach(item => {
      let newItem = {};
      newItem.id = item._id;
      newItem.title = item.shortName;
      newItem.subtitle = item.name;
      newItem.price = item.priceInUSD;
      newItem.variation = '+0.00%';
      newItem.imgSrc = crypto.icons[item.shortName];
      data[item.shortName] = newItem;
    });
    setMarketData(data);
    return data;
  };

  const getWallet = async (_marketData: undefined | Object): Promise<any> => {
    let res = await api.wallet.getMyWallet();
    //console.log('marketData:', _marketData);
    let subTotalBalance = 0.0;
    const dataArray: any = [];
    Object.entries(res).forEach((item, idx) => {
      //console.log(item, idx);
      const shortName = item[0];
      const amount = item[1];
      const marketCoin = _marketData[shortName];
      //console.log('price:', marketCoin);
      let price = 0.0;
      if (marketCoin) {
        price = marketCoin.price;
      }
      let valueInUSD = 0.0;
      if (price) {
        valueInUSD = _marketData[shortName].price * amount;
      }
      //console.log('marketData[shortName]', _marketData[shortName]);
      //console.log('price:', valueInUSD);
      subTotalBalance += valueInUSD;
      const newItem = {
        id: idx,
        title: shortName,
        subtitle: crypto.largeName[shortName],
        amount: item[1].toFixed(7),
        imgSrc: crypto.icons[shortName],
        price: '$' + valueInUSD.toFixed(8),
      };
      dataArray.push(newItem);
    });
    //console.log('marketData', _marketData);
    setTotalBalance(subTotalBalance);
    setData(dataArray);
  };

  useEffect(() => {
    const getAllData = async () => {
      const _marketData = await getMarketData();
      getWallet(_marketData);
    };
    getAllData();
    setInterval(getAllData, 20000);
  }, []);

  return (
    <SafeAreaView style={[GS.containerAuth, S.container]}>
      <View style={S.container}>
        <Text style={[S.text]}>Total Balance</Text>
        <Text style={[S.totalBalance]}>${totalBalance.toFixed(2)}</Text>
      </View>
      <View style={[S.listContainer]}>
        <FlatList
          style={[S.list]}
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

const S = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 0,
  },
  text: {
    fontSize: 16,
    marginHorizontal: 10,
    marginTop: 10,
    color: '#000',
  },
  totalBalance: {
    fontSize: 38,
    marginHorizontal: 10,
    color: '#000',
  },
  input: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
  },
  top: {
    marginTop: 20,
  },

  listContainer: {
    flex: 1,
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

  chart: {
    alignSelf: 'center',
    flex: 1,
    width: 35,
    height: 35,
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

export default connect(() => ({}), {})(Wallet);
