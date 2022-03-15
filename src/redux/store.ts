import { configureStore } from '@reduxjs/toolkit';
import assignmentReducer from './reducers/assignmentReducer';
import levelReducer from './reducers/levelReducer';
import statisticsReducer from './reducers/statisticsReducer';
import subjectReducer from './reducers/subjectReducer';
import summaryReducer from './reducers/summaryReducer';
import userReducer from './reducers/userReducer';

const store = configureStore({
  reducer: {
    levelState: levelReducer,
    subjectState: subjectReducer,
    summaryState: summaryReducer,
    statisticsState: statisticsReducer,
    assignmentState: assignmentReducer,
    userState: userReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
