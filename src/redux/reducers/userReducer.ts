import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IUser } from '../../models';
import getUserInfo from '../api/userApi';

export const fetchUserData = createAsyncThunk<IUser, void>(
  'user/getUserData',
  async () => await getUserInfo(),
);

type UserState = {
  user: IUser;
  loading: boolean;
};

const initialState: UserState = {
  user: {} as IUser,
  loading: true,
};

export const userSlice = createSlice({
  name: 'summary',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUserData.fulfilled, (state, { payload }) => {
      state.user = payload;
      state.loading = false;
    });
  },
});

export default userSlice.reducer;
