import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import api from 'src/api';
import {Response} from 'src/types/api';
// import {UserReducerType} from 'src/types/redux/user';
import CryptoType from 'src/types/crypto';

export const getCryptos = createAsyncThunk('market/getCryptos', async () => {
  const response: Response<CryptoType> = await api.market.getCryptos();
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
    const response: Response<CryptoType> = await api.auth.login(email, password);
    console.log('userSlice:', response);
    return response;
  },
);

const initialState: UserReducerType = {
  loading: true,
};

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(
      getCryptos.fulfilled,
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

export default cryptoSlice.reducer;
