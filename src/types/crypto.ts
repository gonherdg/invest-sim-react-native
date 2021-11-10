import {Document, Types} from 'mongoose';

export default interface Crypto {
  _id?: Types.ObjectId;
  username: string;
  password?: string;
  email: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
  refreshToken?: string;
}

export interface UserModel extends Document, Crypto {
  _id: Types.ObjectId;
}

export interface UserError {
  errors: Crypto;
  hasError: boolean;
}
