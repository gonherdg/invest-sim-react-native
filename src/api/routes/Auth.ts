import AsyncStorage from '@react-native-async-storage/async-storage';
import Router from '../Router';

export default class Auth extends Router {
  async verify() {
    return await this.connection.GET('/auth/verify');
  }

  async login(email: string, password: string) {
    const data = await this.connection.POST('/auth/login', {email, password});
    if (data.data) {
      await AsyncStorage.setItem('token', data.data.token);
      await AsyncStorage.setItem('refreshToken', data.data.token);
    }
    return data;
  }

  async signup(code: string, email: string) {
    return await this.connection.POST('/auth/signup', {email, code});
  }

  async logout() {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('refreshToken');
    return await this.connection.POST('/auth/logout');
  }

  async getCodeForPassword(email: string) {
    return await this.connection.POST('/auth/getcode', {email});
  }

  async setNewPassword(code: string, newPassword: string) {
    return await this.connection.POST('/auth/setnewpassword', {
      code,
      newPassword,
    });
  }
}
