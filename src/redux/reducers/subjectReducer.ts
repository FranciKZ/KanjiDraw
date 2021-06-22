
import { ISubject } from '../../models';
import { IAction } from '../../models/IAction';
import { SubjectActions } from '../actions';

interface ISubjectState {
    subjects: Record<string, ISubject>;
};

const initialState: ISubjectState = {
    subjects: {},
}

export default(state = initialState, { type, payload }: IAction) => {
    switch(type) {
        case SubjectActions.UPSERT_NOTE:
            return state;
        case SubjectActions.SET_SUBJECTS:
            debugger;
            return { ...state, subjects: payload};
        default: 
            return state;
    }
}