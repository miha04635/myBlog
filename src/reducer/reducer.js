import { SAVE_DATA_ARTICLES, SAVE_DATA_COUNTARTICLES } from '../actions/actions'

const initialState = {
  articles: [],
  countArticles: 0,
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
    default:
      return state
  }
}

export default reducer
