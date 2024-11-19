import { SAVE_DATA_ARTICLES, SAVE_DATA_COUNTARTICLES, SET_AUTH } from '../actions/actions'

const initialState = {
  articles: [],
  countArticles: 0,
  username: null,
  token: null,
  isAuthenticated: false,
}

const reducer = (state = initialState, actions = {}) => {
  switch (actions.type) {
    case SAVE_DATA_ARTICLES: {
      return {
        ...state,
        articles: actions.payload,
      }
    }
    case SAVE_DATA_COUNTARTICLES: {
      return {
        ...state,
        countArticles: actions.payload,
      }
    }
    case SET_AUTH: {
      return {
        ...state,
        token: actions.payload.token,
        username: actions.payload.username,
        isAuthenticated: true,
      }
    }
    default:
      return state
  }
}

export default reducer
