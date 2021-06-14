import { takeEvery, call, put } from 'redux-saga/effects';
import { SubjectActions } from '../actions';
import { getAllSubjectData } from '../api';

interface test { subjectId: number, type: string };

function* getSubjectData({ subjectId }: test){
    const subjectData: ReturnType<typeof getAllSubjectData> = yield call(getAllSubjectData, subjectId);

    yield put({ type: SubjectActions.SET_SUBJECTS, payload: subjectData });
}

export default function* waniSaga() {
    yield takeEvery(SubjectActions.GET_SUBJECT_REQUESTED, getSubjectData);
}