import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  FlatList,
  Image,
} from 'react-native';
import GS from 'src/style/style';
import {colors} from 'src/style/gonstyle';
import {NavigationProp} from '@react-navigation/core';
import {connect} from 'react-redux';

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
    imgSrc:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqj34cOFqUbqCNwhVYMn5O2BbUD8Mq8NXmDAxfCDSifeGmiXKjdapKPm8SCo6mmgbjj9g&usqp=CAU',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'BTC',
    subtitle: 'Bitcoin',
    price: '$423.48',
    amount: '10.200.899,1352',
    imgSrc:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAgVBMVEX/////lBb/kAD/kQD/jgD/iwD/igD/kw7/kgr//Pn/xpf/59X/9e3/+fT/8OX/0q//487/nTf/6dj/z6n/uXz/wIv/sWv/2bz/u4H/1rb/tnf/w5H/xZb/7d//yqD/rF//pU7/oUL/p1T/mCb/38b/mzH/lyH/s3D/q13/2Lv/o0gNdHcrAAALwklEQVR4nO1d6XqqMBDVrIDWfW+1rl18/we8oiChTsgkaAnenl/381owQzKZOXMyNBp/+MMf/pDhZdmbdlfR63g8fo2G3X2rE1b9k3zEcvo26TPO2Qnkgvifpw82i9W+XfXP8wbh/nV9MgqhsgkhoCebsa+oV/XvrB6DaCMYCUAz5UxGGN+ullX/3ArRm1GOMNTVYIw3x4Oqf3QlWI4po2hDJZCEN986Vf/038Z8w4mtpVJ7ieO06p//iwgjwvCr7xYBo9F/ElO8zFwnlQLGZ/9BPPEyE+VNFYOI0UvVg3kwXu8wq67m4uOqh/NIzCm7m6nO5mLdqof0KHQ29zVVDNZ/zsDrVZTZAXWQYlb1wO6P5e7+0+oCIltVD+7OiAScJt8DTza5wuOjptUF7PA8QVeLWCeBlgj4s2RAQ8sl6LRgxXPEXAtuOe6NYBoisAhsW/VA74C1pbuik8bLdLbj1gaju7qnP+HB1l0lQXn7e9S0NHNA6s10tZvWgSjPRjywtJbkdQ7n29Q+aJfZn08TY0kMS38Gr29Zo03s/TRdZH8/uixhuevEZQ3UehZ1tVbbYU9rsu/sAvLy93R0+nc4XRCO4FdFPXOf0N5fncCzWLyTxBxsnnywXB3N04vXsl52cLGV3GUXGLIb+zUmxotKVsPUZ+2U4hAlJ35PXJbi8huI/VHK2hUzFm6pM9tnl0iuoLp8VDBB+78/3FIYGnMcCs48kc2KVmKYq8s6YYV6BGRSwYjd0RJGWy0+Gb8JB4JNdo0oKW0oUWpji/ODfPX7Q3ZGaA6wYq+9HL6zfDhAXrOLHJP/oMqFsTl5nQIIs3OXzeSrg9U7Z1eDMSWmTAxDP7OPelhHKEltnDzCs1CVCR6stieDxQbm2Yf71GUp1a5XdNGR1oWwWRod1skEP5nNwXBCOF9nH4wBl7XBh25s+BtDLY8DIssREPfUme9vr0Kyj0LEU7iC1yI2fcMEjsZQqJ26LCUM2NvEburG6i06mMev7nowpoKduVJ1Oc2sdBJ1WIhHjF9hCCZl0B31BRNKXryzYzG49zTzFBUKcfOFLmi9Zf9uW1Y+qPeBvMQ8/eDd5dLftumm8JxlxiVvwcSFdFrY8hie+/gQ+fADxr5Wts8dQ5Tm4Xedeozfr0724l8rm+LVS/co7Fh9+fGwkZZHaOmCAyZGVjdoR9Jqeqn0jm/A527ZcBbmy+awP3K8uXyeWi7sqLAuI7e2HL0Yb3JQbzB0MRZzIOp6fTRX4y3F7CQWonZeK8EQuxa5pzSgVZ57BXETVrWR0mdfw/h3JzWyWs+xwgi39YJkUOV4sWGbDINBDXCFspaLT3w8cJnOT8gDdC32MZuaDYaylp/RQ99JC0ogWXabS8rEYWwickaY5+Oji+/YSkcvAAOh+dkIkjA2KY6TMA8IfBwVw20Vwgzd6MovUMZmBVErpjaSKzx6go3TKlRVMxk+1GtR8aUndD4RtI1/69BxL6Swy8p/KRCfwLfOWCIWv5nw/23MHVUzkE+a3lyLEB35hfBa8IZbJTDrAQBY3ZvdXksKTewaIYgO70qIbraCgyCwiqPRemByLN9YLcfAAcyi4SqOhDc1zI2pLWf2YLi6LOiZ37qsy3fBvAVDzl4lO54AcDMYYF3Wechw3oKZ0p45LQt9izp+8JHrCs/gkFG0vzOz8Rg4uizImbzorsWg8AFVpibRo8dvA9fE0MJlaYzVQumXvWIA3UjSnFDtCq1WBlyGqJ3FL5rGMYsGowGtFo5A38aVdcVjh2+HkdNmSKGUT5tkwlQLLn/36kAPUp/+A2AnGe2KFtAqRObvXm2HljKzBFYui70BX250cevfqwY/bpsh6IQ+OXhulcMsDZJFI6Clq4GtIOQC3Ybeitac5Q7fB0wjEG0hb+xWyX0MbAWMFxStjcFw0b/0wz1BHIeaAxPYxMFNavgYYPjKWxi3qPZg/z3/3uu/hhZXBOu7jrcUUGH0DVjZ2w7QVLZP+hD0ASQVpXOQDv6uPoXwTtlOWVF/j1nEK8F9BnoPOBmrZFQ9tiongVFKNXCbWWXuOKR2isyaG8t9N293J9z2hh4Zy8XBl5ACfUvr+0nzVX8LLqEDSOXx91UPc2DXtt+iT7vh0sFY0FmnJY+PEvTHe6M2a/lhRQr5FGc5pDvBF3CdYSo1Ev1Xk5pja3VSc/2AUTvCIZEGXdbkOl1ibdaoWMv2bmEtr0h4B2NBMycfDlAWREXr0aLbjU+sQ15QhQLksm5qRJKIRUF9NEDf1ata2NqWVg6gvgsQ7UkLGpD20BPaK6bU+twk+Khh2RKT2oOJaOofcyb714BRSZl/vWZVSaGbF1iiFGb7q4K2iqz99cBF9GVtoSMosL7Sq7qhLVUKxj0FxWVd1yLkyVlY5lsZLOW3oMsqqNTqFFbIGe1VmIXTwbKstxjYfLVoTWmUjsg8y6vIAVO/l7tO3MjobDACpWqFOZOG0NHKk36Y2qeCNKYyfAl1lt2TwcQEYhaKlxRMSCHzLM8arZgFWhkxqvnlxUpLeD/DzSyfCJozTDPLfGC1WC8Bd6/B0R2+qZUVwgAGqIFRUTxJNKckcKyjbzp4k9Myb97FPL6GNsApyj0TKxsXhLmtfXF8qWn0jgpKfaJJExR2+kP0GyqM1HRnlVCnZ33SGyUozKXNjTuKJXyadAen+/PwZQ1F6aE0V6IGH5xpWxjpEmmcVNmzwyhnFGz9qBrhy37cB98pTfi35k9QnST8O5vZKJR3oyv1YS/6YrHsL2GMZfyy7Zku/sb1LfVKqZyirf/pUo4QbRquF+oNZ+99yoVgH9txQVqHUt96uBfGKCJ5KRObt3sf7Ma02vW1XalBHnJu09C9I7+Lq1egu3z+MsxtNynjH7P9ndqP9zHu3auKoQrUCZ5zcX72XX6G4dqWCh/dewx0FV+eZhgt2WAuRNHvYH3SD1h03izdx+MLVar0+OVhNm1DSjpeTCN1z3vg4puQ5yRH9n7F/KqayxPxd2KhCwjNfAbUEuIwmtu4/Ah3H68nVqPxii1Nq1TAipxdfvCJtRdWmuX7G2WwxlLTxVSDY6SeL5jCL4O6BfXoeBMI5GnJ3DiSNYXrRjTto09WII1fIXCt/9SMLRWG5wpAwx4w0nA/Y/hDKMxHbiYPVGe5HG+Stq9W68ZtwTg/vM+i7rTXGgxavX03+jwg3zV6gZek30+gwge1wJzORbWOel7NMqCEXUEs31rqddhwBeI1FmplLI1kg6NyDVMZ0gyibX3nFXrmhahqPFNmJyd1cWuqoUDTbss/zIxDVWWLqcZBFXu7HY1VUZ93JBvfXauelUxlWWqyaK1R/QnmYSdXDUx6DVWpkX43lyy6tePKEPhJvMOYFrst9c3aae1PTRYdm54qN/BLkGXAuNDpqBFVKqFXIy9r8fMP1MdhXbAt3PsZ+/xOHn76PTVZdGuadEWt3l97xq7Y7cS1saiVSQZzmqRyHsv67TTV48X48qW4NrZIJ5Eaebk1IElB/KXd9UD1AbyyLargzLHPW3LFOm2EGfDdT5rxBplVE91al10Q7GrzUuQ8EHmPYi2x7Sazq8QqDD5qaitLa8WvWdvEr6Vz6mxTe1vFZ9zsaJWA8cPK+vDiFbSua/CCpU13nTMkcbYV8buYY0ZblmamsGB1jBnyCNFvjCsJ7qtexgqTUjEmFtrTrjXDyrJzjAMCsE9ELdHClkVdwTa14mSKEX49cilK4X+F0Apdi9fOWoI0/TtCURLt9WN2RWn5duWaYM7KliEAsN3TePY8woW481qk9SNF8VgeLZPFQgTi84k2QQC9/r3MFfCCV/k9C/b9e2yMlG+fbg8E0VvzkkEqEZPnn1UpliPOnKdXwNjYe03fXRF2N9xY/wEgmVjrzmo+MzrRznJ+nYnU/2tSKeis1kJ/NDo/pchpTg196rBWAcLz0WhWpIGUlDHRH9/r6F3NEbaS93sQSoOrylIGNNaUct5fDFEdl/8ntHvzaDZZ95tn1S1pHtaTWTTv/ecr7w9/+EMO/wAeZ505yoAwSAAAAABJRU5ErkJggg==',
  },
  {
    id: 's58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'ETH',
    subtitle: 'Ethereum',
    price: '$423.48',
    amount: '10.200.899,1352',
    imgSrc: 'https://s2.coinmarketcap.com/static/img/coins/200x200/1027.png',
  },
  {
    id: 'dbd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'BNB',
    subtitle: 'BNB',
    price: '$423.48',
    amount: '10.200.899,1352',
    imgSrc:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqj34cOFqUbqCNwhVYMn5O2BbUD8Mq8NXmDAxfCDSifeGmiXKjdapKPm8SCo6mmgbjj9g&usqp=CAU',
  },
  {
    id: 'q3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'BTC',
    subtitle: 'Bitcoin',
    price: '$423.48',
    amount: '10.200.899,1352',
    imgSrc:
      'data:image/png;base64,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',
  },
  {
    id: 'w58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'ETH',
    subtitle: 'Ethereum',
    price: '$423.48',
    amount: '10.200.899,1352',
    imgSrc: 'https://s2.coinmarketcap.com/static/img/coins/200x200/1027.png',
  },
  {
    id: 'ebd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'BNB',
    subtitle: 'BNB',
    price: '$423.48',
    amount: '10.200.899,1352',
    imgSrc:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqj34cOFqUbqCNwhVYMn5O2BbUD8Mq8NXmDAxfCDSifeGmiXKjdapKPm8SCo6mmgbjj9g&usqp=CAU',
  },
  {
    id: 'z3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'BTC',
    subtitle: 'Bitcoin',
    price: '$423.48',
    amount: '10.200.899,1352',
    imgSrc:
      'data:image/png;base64,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',
  },
  {
    id: 'x58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'ETH',
    subtitle: 'Ethereum',
    price: '$423.48',
    amount: '10.200.899,1352',
    imgSrc: 'https://s2.coinmarketcap.com/static/img/coins/200x200/1027.png',
  },
  {
    id: 'cbd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'BNB',
    subtitle: 'BNB',
    price: '$423.48',
    amount: '10.200.899,1352',
    imgSrc:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqj34cOFqUbqCNwhVYMn5O2BbUD8Mq8NXmDAxfCDSifeGmiXKjdapKPm8SCo6mmgbjj9g&usqp=CAU',
  },
  {
    id: 'e3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'BTC',
    subtitle: 'Bitcoin',
    price: '$423.48',
    amount: '10.200.899,1352',
    imgSrc:
      'data:image/png;base64,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',
  },
  {
    id: 'q58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'ETH',
    subtitle: 'Ethereum',
    price: '$423.48',
    amount: '10.200.899,1352',
    imgSrc: 'https://s2.coinmarketcap.com/static/img/coins/200x200/1027.png',
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
  const renderItem = ({item}: ItemInterface) => (
    <Item
      title={item.title}
      subtitle={item.subtitle}
      imgSrc={item.imgSrc}
      price={item.price}
      amount={item.amount}
    />
  );

  return (
    <SafeAreaView style={[GS.containerAuth, S.container]}>
      <View style={S.container}>
        <Text style={[S.text]}>Total Balance</Text>
        <Text style={[S.totalBalance]}>$535.49</Text>
      </View>
      <View style={[S.listContainer]}>
        <FlatList
          style={[S.list]}
          data={DATA}
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
