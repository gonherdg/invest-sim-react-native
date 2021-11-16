import Router from '../Router';

export default class Wallet extends Router {
  async getMyWallet() {
    return await this.connection.GET('/wallet/');
  }

  async trade(obj) {
    //console.log('OBJ:', obj);
    const finalObj = {
      dropping: {
        [obj.sellingCurrency]: obj.sellingAmount,
      },
      gaining: {
        [obj.buyingCurrency]: obj.buyingAmount,
      },
    };
    console.log('finalObj:', finalObj);
    return await this.connection.POST('/wallet/exchange', finalObj);
  }
}
