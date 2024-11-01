import { configureStore } from '@reduxjs/toolkit';
import clockReducer from './clockSlice';
import { thunk } from 'redux-thunk';

const store = configureStore({
  reducer: {
    clock: clockReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
