export const SAVE_DATA_ARTICLES = 'SAVE_DATA_ARTICLES'
export const saveDataArticles = articles => ({
  type: SAVE_DATA_ARTICLES,
  payload: articles,
})

export const SAVE_DATA_COUNTARTICLES = 'SAVE_DATA_COUNTARTICLES'
export const saveDataCountArticles = countArticles => ({
  type: SAVE_DATA_COUNTARTICLES,
  payload: countArticles,
})

export const SET_AUTH = 'SET_AUTH'
export const setAuth = (username, token) => ({
  type: SET_AUTH,
  payload: { username, token },
})
