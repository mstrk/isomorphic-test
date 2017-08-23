/*
 *
 * Random user Sagas
 *
 */

import request from '../../../util/request'
import { takeLatest, call, put } from 'redux-saga/effects'
import { USERS_FETCH, fetchUsersSuccess, fetchUsersError } from './reducer'

// random user
export const getRandomUserSaga = function * getRandomUserSaga (action) {
  const requestUrl = `https://randomuser.me/api/?gender=${action.gender}`

  const response = yield call(request, requestUrl)

  if (!response.err) {
    yield put(fetchUsersSuccess(response.data))
  } else {
    yield put(fetchUsersError(response.err))
  }
}

function * getRandomUser () {
  yield takeLatest(USERS_FETCH, getRandomUserSaga)
}

export default [getRandomUser]
