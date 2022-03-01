import { spawn } from 'redux-saga/effects'
import waniSaga from './waniSaga';

export default function* rootSaga() {
  yield spawn(waniSaga)
}
