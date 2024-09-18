import { SAVE_DATA_ARTICLES } from '../actions/actions'

const initialState = {
  articles: [],
}

const reducer = (state = initialState, actions = {}) => {
  switch (actions.type) {
    case SAVE_DATA_ARTICLES: {
      return {
        ...state,
        articles: actions.payload,
      }
    }
    default:
      return state
  }
}

export default reducer
