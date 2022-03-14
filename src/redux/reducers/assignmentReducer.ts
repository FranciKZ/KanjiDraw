import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IAssignment, IAssignmentData, IBulkResponse } from '../../models';
import { getAssignmentsForLevel } from '../api';

export const fetchAssignmentsByLevel = createAsyncThunk<IBulkResponse<IAssignment>, number>(
  'assignments/fetchByLevel',
  async (levelNumber) => await getAssignmentsForLevel(levelNumber),
);

type AssignmentState = {
  assignments: Record<string, IAssignmentData>;
  loading: Record<string, boolean>;
};

const initialState: AssignmentState = {
  assignments: {},
  loading: {},
};

export const assignmentSlice = createSlice({
  name: 'assignments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAssignmentsByLevel.pending, (state, action) => {
      state.loading[action.meta.arg] = true;
    });
    builder.addCase(fetchAssignmentsByLevel.fulfilled, (state, action) => {
      action.payload.data.forEach((value: IAssignment) => {
        state.assignments[value.data.subject_id] = value.data;
      });
      state.loading[action.meta.arg] = false;
    });
  },
});

export default assignmentSlice.reducer;
