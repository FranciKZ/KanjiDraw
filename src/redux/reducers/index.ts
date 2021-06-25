import { combineReducers } from 'redux';

import subjectReducer from './subjectReducer';
import levelReducer from './levelReducer';
import sagaReducer from './sagaReducer';

const rootReducer = combineReducers({
    subjectState: subjectReducer,
    levelState: levelReducer,
    sagaState: sagaReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;