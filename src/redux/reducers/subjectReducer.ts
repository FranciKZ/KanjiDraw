
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISubject } from '../../models';
import { IAction } from '../../models/IAction';
import { SubjectActions } from '../actions';

interface ISubjectState {
    subjects: Record<string, ISubject>;
};

type SubjectAction = {
  subjects: Record<string, ISubject>;
}

const initialState: ISubjectState = {
    subjects: {},
}

const subjectSlicer = createSlice({
  name: 'subject',
  initialState,
  reducers: {
    setSubjects: (state, action: PayloadAction<SubjectAction>) => {
      state.subjects = { ...state.subjects, ...action.payload.subjects }
    }
  }
})

export const { setSubjects } = subjectSlicer.actions;

export default subjectSlicer.reducer;
