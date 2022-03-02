
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISubject, ISubjectWithRelations } from '../../models';
import { IAction } from '../../models/IAction';
import { SubjectActions } from '../actions';
import { getAllSubjectData } from '../api';

export const fetchSubjectById = createAsyncThunk<ISubjectWithRelations, number>(
  'subjects/fetchSubjectById',
  async (subjectId) => {
    return await getAllSubjectData(subjectId);
  }
)

type ISubjectState = {
  subjects: Record<string, ISubject>;
  loading: Record<string, boolean>;
};

const initialState: ISubjectState = {
  subjects: {},
  loading: {},
}

const subjectSlicer = createSlice({
  name: 'subject',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSubjectById.pending, (state, actions) => {
      state.loading[actions.meta.arg] = true;
    }),
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
    })
  }
})

export default subjectSlicer.reducer;
