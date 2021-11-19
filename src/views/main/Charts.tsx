import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View, Text, FlatList} from 'react-native';
import GS from 'src/style/style';
import {colors} from 'src/style/gonstyle';
import {NavigationProp} from '@react-navigation/core';
import {connect} from 'react-redux';
import api from 'src/api';
import * as crypto from 'src/cryptoworld.json';
import BTC from 'src/components/icons/BTC';
import CryptoRow from 'src/components/listItems/CryptoRow';

interface ItemInterface {
  title: string;
  subtitle: string;
  imgSrc: string;
  price: string;
  variation: string;
  onPress: Function;
}
/*
const DATA = [
  {
    id: 'abd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'BNB',
    subtitle: 'BNB',
    price: '$423.48',
    variation: '+3.38%',
    imgSrc: crypto.icons.BNB,
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'BTC',
    subtitle: 'Bitcoin',
    price: '$423.48',
    variation: '+3.38%',
    imgSrc: crypto.icons.BTC,
  },
  {
    id: 's58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'ETH',
    subtitle: 'Ethereum',
    price: '$423.48',
    variation: '+3.38%',
    imgSrc: crypto.icons.ETH,
  },
  {
    id: 'dbd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'BNB',
    subtitle: 'BNB',
    price: '$423.48',
    variation: '+3.38%',
    imgSrc: crypto.icons.BNB,
  },
  {
    id: 'q3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'BTC',
    subtitle: 'Bitcoin',
    price: '$423.48',
    variation: '+3.38%',
    imgSrc: crypto.icons.BTC,
  },
  {
    id: 'w58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'ETH',
    subtitle: 'Ethereum',
    price: '$423.48',
    variation: '+3.38%',
    imgSrc: crypto.icons.ETH,
  },
  {
    id: 'ebd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'BNB',
    subtitle: 'BNB',
    price: '$423.48',
    variation: '+3.38%',
    imgSrc: crypto.icons.BNB,
  },
  {
    id: 'z3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'BTC',
    subtitle: 'Bitcoin',
    price: '$423.48',
    variation: '+3.38%',
    imgSrc: crypto.icons.BTC,
  },
  {
    id: 'x58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'ETH',
    subtitle: 'Ethereum',
    price: '$423.48',
    variation: '+3.38%',
    imgSrc: crypto.icons.ETH,
  },
  {
    id: 'cbd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'BNB',
    subtitle: 'BNB',
    price: '$423.48',
    variation: '+3.38%',
    imgSrc: crypto.icons.BNB,
  },
  {
    id: 'e3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'BTC',
    subtitle: 'Bitcoin',
    price: '$423.48',
    variation: '+3.38%',
    imgSrc: crypto.icons.BTC,
  },
  {
    id: 'q58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'ETH',
    subtitle: 'Ethereum',
    price: '$423.48',
    variation: '+3.38%',
    imgSrc: crypto.icons.ETH,
  },
];
*/

const Charts: React.FC<{
  navigation: NavigationProp<any>;
}> = ({navigation}) => {
  const [data, setData]: Array<any> = useState([]);

  const renderItem = ({item}: ItemInterface) => {
    const onPress = () => {
      navigation.navigate('Trade');
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
      <View style={S.container}>
        <Text style={[S.text]}>Markets</Text>
      </View>
      <FlatList
        style={[S.list]}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const S = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: 0,
  },
  text: {
    fontSize: 30,
    margin: 10,
    color: '#222',
    textAlign: 'center',
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
    paddingVertical: 1,
    borderRadius: 4,
    margin: 2,
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
    borderRadius: 6,
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

export default connect(() => ({}), {})(Charts);
