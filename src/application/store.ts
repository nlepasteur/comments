import { configureStore } from '@reduxjs/toolkit';

import isLoggedReducer from './reducers/isLoggedReducer';

const store = configureStore({
  reducer: {
    isLogged: isLoggedReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
