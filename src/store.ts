import {configureStore} from '@reduxjs/toolkit';
//import { State } from 'react-native-gesture-handler';
import someSlice from './features/someSlice';
//import favouriteReducer from './features/FavouriteSlice';
//import userReducer from './features/UserSlice';

const store = configureStore({
  reducer: {
    someSlice,
    //favourite: favouriteReducer,
    //user: userReducer,
  },
});

export default store;
