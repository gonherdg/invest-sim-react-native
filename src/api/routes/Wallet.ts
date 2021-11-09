import Router from '../Router';

export default class Wallet extends Router {
  async getMyWallet() {
    return await this.connection.GET('/wallet/');
  }
}
