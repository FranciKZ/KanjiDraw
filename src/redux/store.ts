import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';
import levelReducer from './reducers/levelReducer';
import subjectReducer from './reducers/subjectReducer';
import { api } from './api';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    levelState: levelReducer,
    subjectState: subjectReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;