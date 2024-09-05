import { configureStore } from '@reduxjs/toolkit';
import userSlice, { USER_PERSISTANCE_STATE_KEY, UserPersistanceState } from './user.slice';
import { saveState } from './storage';
import cartSlice, { CART_PERSISTANCE_STATE_KEY, CartItem } from './cart.slice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    cart: cartSlice,
  },
});

store.subscribe(() => {
  saveState<UserPersistanceState>(USER_PERSISTANCE_STATE_KEY, {
    jwt: store.getState().user.jwt,
  });
  saveState<CartItem[]>(CART_PERSISTANCE_STATE_KEY, store.getState().cart.items);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
