import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadState } from './storage';
import { LoginResponse } from '../interfaces/auth.interface';
import { API_PREFIX } from '../helpers/constants';
import axios, { AxiosError } from 'axios';
import { UserProfileResponse } from '../interfaces/profile.interface';
import { RootState } from './store';

export const USER_PERSISTANCE_STATE_KEY = 'userData';

export interface UserPersistanceState {
  jwt: string | null;
}

export interface UserState {
  jwt: string | null;
  profile?: UserProfileResponse;
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

export const getProfile = createAsyncThunk<UserProfileResponse, void, { state: RootState }>(
  'user/profile',
  async (_, thunkApi) => {
    const jwt = thunkApi.getState().user.jwt;
    const { data } = await axios.get<UserProfileResponse>(`${API_PREFIX}/user/profile`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    return data;
  },
);

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
    builder.addCase(getProfile.fulfilled, (state, action: PayloadAction<UserProfileResponse | undefined>) => {
      state.profile = action.payload;
    });
  },
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
