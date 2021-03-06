import { takeEvery, call, put, select, SagaReturnType } from 'redux-saga/effects';
import { ISubject } from '../../models';
import { LevelActions, SagaActions, SubjectActions } from '../actions';
import { getAllSubjectData, getLevel, getSubjects } from '../api';
import { getLevelState, getSubjectState } from './selectors';
import { getNeededSubjectArray, mapSubjectDataToStoreStructure, mapSubjectRelationsDataToStoreStructure } from './util';

const sleep = (milliseconds: number) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
};

function* getSubjectData({ subjectId }: { subjectId: number, type: string }){
    const subjects: Record<string, ISubject> = yield select(getSubjectState);
    yield put({ type: SagaActions.FETCHING_DATA });
    try {
        if (!subjects[subjectId]) {
            const subjectData: SagaReturnType<typeof getAllSubjectData> = yield call(getAllSubjectData, subjectId);
            const newSubjects = mapSubjectRelationsDataToStoreStructure(subjectData);
    
            yield put({ type: SubjectActions.SET_SUBJECTS, payload: newSubjects });
        } else {    
            const neededSubjectArray = getNeededSubjectArray(subjects, subjectId);
            const subjectData: SagaReturnType<typeof getSubjects> = yield call(getSubjects, neededSubjectArray);
            const newSubjects = mapSubjectDataToStoreStructure(subjectData.data);

            yield put({ type: SubjectActions.SET_SUBJECTS, payload: newSubjects });
        }
    } catch (e) {
        yield put({ type: SagaActions.FETCH_FAILURE, message: 'Failed to fetch subject data.' });
    } finally {
        yield put({ type: SagaActions.FETCH_SUCCESSFUL });
    }
}

function* getLevelData({ levelNumber }: { levelNumber: number, type: string }) {
    const levels: Record<string, boolean> = yield select(getLevelState);
    yield put({ type: SagaActions.FETCHING_DATA });
    try {
        if (!levels[levelNumber]) {
            const levelData: SagaReturnType<typeof getLevel> = yield call(getLevel, levelNumber);
            yield put({ type: SubjectActions.SET_SUBJECTS, payload: mapSubjectDataToStoreStructure(levelData.data) });
            yield put({ type: LevelActions.SET_LEVEL, payload: { levelNumber, data: levelData.data.map((val: ISubject) => val.id) } });
        }
    } catch (e) {
        yield put({ type: SagaActions.FETCH_FAILURE, message: 'Failed to fetch subject data.' });
    } finally {
        yield put({ type: SagaActions.FETCH_SUCCESSFUL });
    }
}

export default function* waniSaga() {
    yield takeEvery(SubjectActions.GET_SUBJECT_REQUEST, getSubjectData);
    yield takeEvery(LevelActions.GET_LEVEL_REQUEST, getLevelData);
}