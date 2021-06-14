import { spawn } from 'redux-saga/effects'
import waniSaga from './waniSaga';

export default function* rootSaga() {
  console.log("Hello From Redux-Saga!")

  yield spawn(waniSaga)
}
