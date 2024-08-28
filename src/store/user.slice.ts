import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadState } from './storage';

export const USER_PERSISTANCE_STATE_KEY = 'userData';

export interface UserPersistanceState {
  jwt: string | null;
}

export interface UserState {
  jwt: string | null;
}

const initialState: UserState = {
  jwt: loadState<UserPersistanceState>(USER_PERSISTANCE_STATE_KEY)?.jwt ?? null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setJwt: (state, action: PayloadAction<string | null>) => {
      state.jwt = action.payload;
    },
  },
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
