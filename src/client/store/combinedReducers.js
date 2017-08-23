/*
 *
 * Combine all reducers in the this file
 * and export them.
 *
 */

import { combineReducers } from 'redux'

import users from '../modules/RandomUser/reducer'

export default combineReducers({
  users
})
