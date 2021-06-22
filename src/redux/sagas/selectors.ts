import { RootState } from "../reducers";

export const getSubjects = (state: RootState) => state.subjectState.subjects;

export const getLevels = (state: RootState) => state.levelState.levels;