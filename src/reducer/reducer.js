import {
  SET_AUTH,
  LOGOUT,
  SAVE_EDIT_PROFILE,
  LIKE_ARTICLE,
  DELETE_LIKE_ARTICLE,
  SET_GET_USER,
  SAVE_AN_ARTICLES,
} from '../actions/actions'

const initialState = {
  username: null,
  token: null,
  isAuthenticated: false,
  image: null,
  email: null,
}

const reducer = (state = initialState, actions = {}) => {
  switch (actions.type) {
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
        email: actions.payload.email,
        image: actions.payload.image,
        token: actions.payload.token,
      }
    }
    case SAVE_AN_ARTICLES: {
      return {
        ...state,
        article: actions.payload.data.article,
      }
    }
    default:
      return state
  }
}

export default reducer
