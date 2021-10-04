import {configureStore} from '@reduxjs/toolkit';
import { State } from 'react-native-gesture-handler';
//import favouriteReducer from './features/FavouriteSlice';
//import userReducer from './features/UserSlice';

const blankReducer = (state, action) => {return state};

const store = configureStore({
  reducer: {
    blankReducer,
    //favourite: favouriteReducer,
    //user: userReducer,
  },
});

export default store;
