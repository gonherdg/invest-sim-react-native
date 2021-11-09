import Connection from './Connection';

export default class Router {
  connection: Connection;

  /**
   *
   * @param {Connection} connection
   */
  constructor(connection: Connection) {
    this.connection = connection;
  }
}
