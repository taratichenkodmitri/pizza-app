import { configureStore } from '@reduxjs/toolkit';
import userSlice, { USER_PERSISTANCE_STATE_KEY, UserPersistanceState } from './user.slice';
import { saveState } from './storage';

export const store = configureStore({
  reducer: {
    user: userSlice,
  },
});

store.subscribe(() => {
  saveState<UserPersistanceState>(USER_PERSISTANCE_STATE_KEY, {
    jwt: store.getState().user.jwt,
  });
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
