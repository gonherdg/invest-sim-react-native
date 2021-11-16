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
import {connect} from 'react-redux';
import api from 'src/api';
import * as crypto from 'src/cryptoworld.json';
import BTC from 'src/components/icons/BTC';
import {TouchableOpacity} from 'react-native-gesture-handler';

const ChooseCurrency: React.FC<{onPress: Function; style: any}> = ({
  onPress,
  style,
}) => {
  const [data, setData]: Array<any> = useState([]);

  const renderItem = ({item}: any) => {
    const onCurrencySelect = () => {
      console.log('asdasd', item.title);
      onPress(item.title);
    };

    return (
      <>
        <TouchableOpacity style={[S.flex]} onPress={onCurrencySelect}>
          <Image style={S.tinyLogo} source={{uri: item.imgSrc}} />
          <Text style={[S.text]}>{item.title}</Text>
        </TouchableOpacity>
      </>
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
    <SafeAreaView style={[GS.containerAuth, style]}>
      <View style={S.container}>
        <Text style={[S.text]}>Trade</Text>
      </View>
      <FlatList
        style={[S.list, style]}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const S = StyleSheet.create({
  flex: {
    flexDirection: 'row',
    margin: 8,
    paddingVertical: 3,
  },
  container: {
    backgroundColor: colors.white,
    padding: 0,
  },
  text: {
    fontSize: 18,
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

export default connect(() => ({}), {})(ChooseCurrency);
