import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IBulkResponse, ISubject, ISubjectWithRelations } from '../../models';
import { getAllSubjectData, getSubjectsByLevels } from '../api';

export const fetchSubjectById = createAsyncThunk<ISubjectWithRelations, number>(
  'subjects/fetchSubjectById',
  async (subjectId) => await getAllSubjectData(subjectId),
);

export const fetchSubjectsByLevel = createAsyncThunk<IBulkResponse<ISubject>, number>(
  'subjects/fetchSubjectsByLevel',
  async (levelId) => await getSubjectsByLevels(levelId),
);

type ISubjectState = {
  subjects: Record<string, ISubject>;
  loading: Record<string, boolean>;
};

const initialState: ISubjectState = {
  subjects: {},
  loading: {},
};

const subjectSlicer = createSlice({
  name: 'subject',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSubjectsByLevel.pending, (state, action) => {
      state.loading[action.meta.arg] = true;
    });
    builder.addCase(fetchSubjectsByLevel.fulfilled, (state, action) => {
      action.payload.data.forEach((val: ISubject) => {
        state.subjects[val.id] = val;
      });
      state.loading[action.meta.arg] = false;
    });
    builder.addCase(fetchSubjectById.pending, (state, actions) => {
      state.loading[actions.meta.arg] = true;
    });
    builder.addCase(fetchSubjectById.fulfilled, (state, actions) => {
      const result: Record<string, ISubject> = {};
      result[actions.payload.subject.id] = actions.payload.subject;
      actions.payload.components?.forEach((subject: ISubject) => {
        result[subject.id] = subject;
      });
      actions.payload.visuallySimilar?.forEach((subject: ISubject) => {
        result[subject.id] = subject;
      });
      actions.payload.amalgamations?.forEach((subject: ISubject) => {
        result[subject.id] = subject;
      });
      state.subjects = { ...state.subjects, ...result };
      state.loading[actions.payload.subject.id] = false;
    });
  },
});

export default subjectSlicer.reducer;
