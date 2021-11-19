import React from 'react';
import {
  GestureResponderEvent,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {colors} from 'src/style/gonstyle';
import BTC from '../icons/BTC';

interface ItemInterface {
  title: string;
  subtitle: string;
  imgSrc: string;
  price: string;
  variation: string;
  onPress?: (event: GestureResponderEvent) => void;
}

const CryptoRow = (item: ItemInterface) => {
  return (
    <>
      <TouchableOpacity style={S.item} onPress={item.onPress}>
        <View style={S.firstBox}>
          <View style={S.imageWrapper}>
            <Image style={S.tinyLogo} source={{uri: item.imgSrc}} />
            {/*<BTC style={S.tinyLogo} />*/}
            {/*<BTC style={S.tinyLogo} />*/}
          </View>
          <View style={S.secondBox}>
            <Text style={S.title}>{item.title}</Text>
            <Text style={S.subtitle}>{item.subtitle}</Text>
          </View>
        </View>

        {/*
        <Image
          style={[S.chart, S.firstBox]}
          source={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNmoLz5weQDnEqFVP70jaG3wDf-1MkmK0yrA&usqp=CAU',
          }}
        />
        */}

        <View style={S.secondBox}>
          <Text style={S.price}>{item.price.toFixed(4)}</Text>
          <Text style={S.variation}>{item.variation}</Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

const S = StyleSheet.create({
  container: {
    backgroundColor: colors.comp6,
    padding: 0,
  },
  text: {
    fontSize: 40,
    margin: 10,
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
    resizeMode: 'contain',
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

export default CryptoRow;
