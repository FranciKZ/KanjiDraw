
import { ISubject } from '../../models';
import { IAction } from '../../models/IAction';
import { SubjectActions } from '../actions';

interface ISubjectState {
    subjects: {[key: string]: any};
};

const initialState: ISubjectState = {
    subjects: {},
}

export default(state = initialState, { type, payload }: IAction) => {
    switch(type) {
        case SubjectActions.GET_SUBJECT:
            break;
        case SubjectActions.GET_SUBJECT_NOTES:
            break;
        case SubjectActions.UPSERT_NOTE:
            break;
        case SubjectActions.SET_SUBJECTS:
            let subjects: {[key: string]: any} = {...state.subjects};
            subjects[payload.subject.id] = payload.subject;
            
            payload.amalgamations?.forEach((sub: ISubject) => subjects[sub.id] = sub);
            payload.components?.forEach((sub: ISubject) => subjects[sub.id] = sub);
            payload.visuallySimilar?.forEach((sub: ISubject) => subjects[sub.id] = sub);
            
            debugger;
            return {...state, subjects};
        default: 
            return state;
    }
}