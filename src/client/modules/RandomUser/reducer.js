
import fetch from 'isomorphic-fetch'

// constants
export const USERS_FETCH = 'Users/USERS_FETCH'
export const USERS_FETCH_SUCCESS = 'Users/USERS_FETCH_SUCCESS'
export const USERS_FETCH_ERROR = 'Users/USERS_FETCH_ERROR'
export const USERS_INIT_LOAD_DONE = 'Users/USERS_INIT_LOAD_DONE'

// initial state
const initialState = {
  data: [],
  initialLoad: true,
  loading: false,
  error: null
}

// reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case USERS_FETCH:
      return {...state, initialLoad: __SERVER__, loading: true, error: null}
    case USERS_FETCH_SUCCESS:
      return { ...state, data: action.data.results, initialLoad: __SERVER__, loading: false }
      case USERS_FETCH_ERROR:
        return { ...state, initialLoad: __SERVER__, loading: false, error: action.err.message }
    case USERS_INIT_LOAD_DONE:
      return { ...state, initialLoad: __SERVER__ }
    default:
      return state
  }
}

// actions
export const fetchUsers = (gender) => ({ type: USERS_FETCH, gender })
export const fetchUsersSuccess = (data) => ({ type: USERS_FETCH_SUCCESS, data })
export const fetchUsersError = (err) => ({ type: USERS_FETCH_ERROR, err })
export const initLoadDone = () => ({ type: USERS_INIT_LOAD_DONE })
