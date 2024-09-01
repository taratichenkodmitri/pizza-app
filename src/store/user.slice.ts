import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadState } from './storage';
import { LoginResponse } from '../interfaces/auth.intetfacer';
import { API_PREFIX } from '../helpers/constants';
import axios, { AxiosError } from 'axios';

export const USER_PERSISTANCE_STATE_KEY = 'userData';

export interface UserPersistanceState {
  jwt: string | null;
}

export interface UserState {
  jwt: string | null;
  loginErrorMessage?: string;
}

const initialState: UserState = {
  jwt: loadState<UserPersistanceState>(USER_PERSISTANCE_STATE_KEY)?.jwt ?? null,
};

export const login = createAsyncThunk('user/login', async (params: { email: string; password: string }) => {
  try {
    const { data } = await axios.post<LoginResponse>(`${API_PREFIX}/auth/login`, {
      email: params.email,
      password: params.password,
    });
    return data;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw new Error(e.response?.data.message);
    }
  }
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.jwt = null;
    },
    clearError: (state) => {
      state.loginErrorMessage = undefined;
    },
  },
  extraReducers(builder) {
    builder.addCase(login.fulfilled, (state, action: PayloadAction<LoginResponse | undefined>) => {
      if (!action.payload) return;
      state.jwt = action.payload.access_token;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loginErrorMessage = action.error.message;
    });
  },
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
