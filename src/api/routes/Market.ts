import Router from '../Router';

export default class Market extends Router {
  async getCryptos() {
    return await this.connection.GET('/market/');
  }
}
