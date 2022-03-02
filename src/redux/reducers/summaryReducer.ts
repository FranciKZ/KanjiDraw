import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBulkResponse, ISubject, ISummary, ISummaryResponse } from '../../models';
import { getLevel } from '../api';
import { getUserSummary } from '../api/summaryApi';

export const fetchUserSummary = createAsyncThunk<ISummaryResponse, void>(
  'summary/getUserSummary',
  async () => {
    return await getUserSummary();
  }
)

type ISummaryState = {
  summary?: ISummaryResponse;
  loading: boolean;
};

const initialState: ISummaryState = {
  summary: undefined,
  loading: true,
}

export const summarySlice = createSlice({
  name: 'summary',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserSummary.pending, (state, action) => {
      state.loading = true;
    })
    builder.addCase(fetchUserSummary.fulfilled, (state, { payload }) => {
      state.summary = payload;
      state.loading = false;
    })
  }
})

export default summarySlice.reducer;
