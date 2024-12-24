import {
  SAVE_DATA_ARTICLES,
  SAVE_DATA_COUNTARTICLES,
  SET_AUTH,
  LOGOUT,
  SAVE_EDIT_PROFILE,
  LIKE_ARTICLE,
  DELETE_LIKE_ARTICLE,
  SET_GET_USER,
} from '../actions/actions'

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
    case LOGOUT: {
      return {
        ...state,
        isAuthenticated: false,
        username: null,
        token: null,
      }
    }
    case SAVE_EDIT_PROFILE: {
      return {
        ...state,
        username: actions.payload.username,
        password: actions.payload.password,
        image: actions.payload.image,
      }
    }
    case LIKE_ARTICLE: {
      return {
        ...state,
        articles: state.articles.map(article => (article.slug === actions.payload.slug ? actions.payload : article)),
      }
    }
    case DELETE_LIKE_ARTICLE: {
      return {
        ...state,
        articles: state.articles.map(article => (article.slug === actions.payload.slug ? actions.payload : article)),
      }
    }
    case SET_GET_USER: {
      return {
        ...state,
        username: actions.payload.username,
        token: actions.payload.token,
      }
    }
    default:
      return state
  }
}

export default reducer
