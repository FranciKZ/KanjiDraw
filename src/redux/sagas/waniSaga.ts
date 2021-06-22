import { takeEvery, call, put, select, SagaReturnType } from 'redux-saga/effects';
import { ISubject } from '../../models';
import { LevelActions, SubjectActions } from '../actions';
import { getAllSubjectData } from '../api';
import { getLevel } from '../api/levelApi';
import { getLevels, getSubjects } from './selectors';

function* getSubjectData({ subjectId }: { subjectId: number, type: string }){
    const subjects: Record<string, ISubject> = yield select(getSubjects);
    debugger;
    if (!subjects || !subjects[subjectId]) {
        const subjectData: SagaReturnType<typeof getAllSubjectData> = yield call(getAllSubjectData, subjectId);
        const newSubjects = { ...subjects };
        newSubjects[subjectData.subject.id] = subjectData.subject;

        subjectData.amalgamations?.forEach((sub: ISubject) => newSubjects[sub.id] = sub);
        subjectData.components?.forEach((sub: ISubject) => newSubjects[sub.id] = sub);
        subjectData.visuallySimilar?.forEach((sub: ISubject) => newSubjects[sub.id] = sub);

        yield put({ type: SubjectActions.SET_SUBJECTS, payload: newSubjects });
    }
}

function* getLevelData({ levelNumber }: { levelNumber: number, type: string }) {
    const levels: Record<string, boolean> = yield select(getLevels);

    if (!levels[levelNumber]) {
        const levelData: ReturnType<typeof getLevel> = yield call(getLevel, levelNumber);
        yield put({ type: LevelActions.SET_LEVEL, payload: levelNumber });
        yield put({ type: SubjectActions.SET_SUBJECTS, payload: levelData });
    }
}

export default function* waniSaga() {
    yield takeEvery(SubjectActions.GET_SUBJECT, getSubjectData);
    yield takeEvery(LevelActions.GET_LEVEL, getLevelData);
}