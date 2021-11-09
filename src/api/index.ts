import {AxiosRequestConfig} from 'axios';
import Connection from './Connection';
import Auth from './routes/Auth';
import Wallet from 'src/api/routes/Wallet';

class Api {
  connection: Connection;
  auth: Auth;
  wallet: Wallet;

  constructor(options: AxiosRequestConfig) {
    this.connection = new Connection(options);
    this.auth = new Auth(this.connection);
    this.wallet = new Wallet(this.connection);
  }
}

export default new Api({baseURL: 'http://192.168.0.4:3000/api'});
