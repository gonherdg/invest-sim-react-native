import {Document, Types} from 'mongoose';

export default interface User {
  _id?: Types.ObjectId;
  username: string;
  password?: string;
  email: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
  refreshToken?: string;
}

export interface UserModel extends Document, User {
  _id: Types.ObjectId;
}

export interface UserError {
  errors: User;
  hasError: boolean;
}
