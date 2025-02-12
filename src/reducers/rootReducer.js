import { GET_USERNAME, LOGOUT_USER } from '../actions'

const initialState = {
  username: null,
}

const rootReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_USERNAME:
      return {
        ...state,
        username: action.payload,
      }
    case LOGOUT_USER:
      return { ...state, username: null }

    default:
      return state
  }
}

export default rootReducer
