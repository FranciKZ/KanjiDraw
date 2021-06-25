import { RootState } from "../reducers";

export const getSubjectState = (state: RootState) => state.subjectState.subjects;

export const getLevelState = (state: RootState) => state.levelState.levels;