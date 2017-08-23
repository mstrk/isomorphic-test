/*
 *
 * Redux Store
 *
 */

import 'babel-polyfill'
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware, { END } from 'redux-saga'
import { createLogger } from 'redux-logger'

import combinedReducers from './combinedReducers'
import combinedSagas from './combinedSagas'

export const sagaMiddleware = createSagaMiddleware()

const configureStore = (initialState) => {
  const middleware = [sagaMiddleware]

  if (__DEV__ && __CLIENT__ ) {
    middleware.push(createLogger())
  }

  const composedStore = compose(
    applyMiddleware(...middleware),
    __DEV__ && __CLIENT__ && window.devToolsExtension ? window.devToolsExtension() : f => f
  )(createStore)

  const store = composedStore(combinedReducers, initialState)

  if (__CLIENT__) {
    combinedSagas.forEach((saga) => {
      sagaMiddleware.run(saga)
    })
  } else {
    store.runSaga = sagaMiddleware.run
    store.close = () => store.dispatch(END)
  }

  return store
}

export default configureStore
