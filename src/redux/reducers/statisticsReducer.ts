import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IBulkResponse, IStatistics } from '../../models';
import getStatisticsForSubject from '../api/statisticsApi';

export const fetchStatisticsBySubjectId = createAsyncThunk<IBulkResponse<IStatistics>, number>(
  'statistics/fetchBySubjectId',
  async (subjectId) => await getStatisticsForSubject(subjectId),
);

type StatisticsState = {
  statistics: Record<string, IStatistics>;
  loading: Record<string, boolean>;
};

const initialState: StatisticsState = {
  statistics: {},
  loading: {},
};

const statistcsSlice = createSlice({
  name: 'statistics',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchStatisticsBySubjectId.pending, (state, action) => {
      state.loading[action.meta.arg] = true;
    });
    builder.addCase(fetchStatisticsBySubjectId.fulfilled, (state, action) => {
      const data: IStatistics = action.payload.data[0];
      state.statistics[action.meta.arg] = data;
      state.loading[action.meta.arg] = false;
    });
  },
});

export default statistcsSlice.reducer;
