import { combineReducers } from 'redux';

import subjectReducer from './subjectReducer';
import levelReducer from './levelReducer';

const rootReducer = combineReducers({
    subjectState: subjectReducer,
    levelState: levelReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;