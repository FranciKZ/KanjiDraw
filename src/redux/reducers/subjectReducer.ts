
import { ISubject } from '../../models';
import { IAction } from '../../models/IAction';
import { SubjectActions } from '../actions';

interface ISubjectState {
    subjects: Record<string, ISubject>;
    fetchingSubjects: boolean;
    errorMessage?: string;
};

const initialState: ISubjectState = {
    subjects: {},
    fetchingSubjects: false,
}

export default(state = initialState, { type, payload }: IAction) => {
    switch(type) {
        case SubjectActions.UPSERT_NOTE:
            return state;
        case SubjectActions.SET_SUBJECTS: 
            debugger;
            return { ...state, subjects: { ...state.subjects, ...payload }, fetchingSubjects: false };
        case SubjectActions.FETCHING_SUBJECTS:
            return { ...state, fetchingSubjects: true };
        case SubjectActions.FETCHING_SUBJECTS_FAILURE:
            return { ...state, fetchingSubjects: false, errorMessage: payload };
        default: 
            return state;
    }
}