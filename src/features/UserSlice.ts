import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import api from 'src/api';
import {Response} from 'src/types/api';
import {UserReducerType} from 'src/types/redux/user';
import UserType from 'src/types/user';

export const getUser = createAsyncThunk('user/getUser', async () => {
  const response: Response<UserType> = await api.auth.verify();
  return response.data;
});

export const login = createAsyncThunk(
  'user/login',
  async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<any> => {
    const response: Response<UserType> = await api.auth.login(email, password);
    console.log('userSlice:', response);
    return response;
  },
);

export const logout = createAsyncThunk('user/logout', async () => {
  const response: Response<UserType> = await api.auth.logout();
  return response.data;
});

const initialState: UserReducerType = {
  loading: true,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(
      getUser.fulfilled,
      (state: UserReducerType, action: any) => {
        state.user = action.payload;
        state.loading = false;
      },
    );
    builder.addCase(login.fulfilled, (state: UserReducerType, action: any) => {
      state.user = action.payload.user;
      state.loading = false;
    });
    builder.addCase(logout.fulfilled, (state: any) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      state = initialState;
    });
  },
});

export const selectName = (state: UserReducerType) => state.user?.name;

export default userSlice.reducer;
