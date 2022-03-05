import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IBulkResponse, ISubject } from '../../models';
import getLevel from '../api/levelApi';

export const fetchLevelByNumber = createAsyncThunk<IBulkResponse<ISubject>, number>(
  'levels/fetchLevelByNumber',
  async (levelNumber) => await getLevel(levelNumber),
);

type ILevelState = {
  levels: Record<string, ISubject[]>;
  loading: Record<string, boolean>;
};

const initialState: ILevelState = {
  levels: {},
  loading: {},
};

export const levelSlice = createSlice({
  name: 'levels',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLevelByNumber.pending, (state, action) => {
      state.loading[action.meta.arg] = true;
    });
    builder.addCase(fetchLevelByNumber.fulfilled, (state, action) => {
      state.levels[action.meta.arg] = action.payload.data;
      state.loading[action.meta.arg] = false;
    });
  },
});

export default levelSlice.reducer;
