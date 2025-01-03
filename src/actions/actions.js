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
export const setAuth = (token, username) => ({
  type: SET_AUTH,
  payload: { token, username },
})

export const LOGOUT = 'LOGOUT'
export const logout = () => ({
  type: LOGOUT,
})

export const SAVE_EDIT_PROFILE = 'SAVE_EDIT_PROFILE'
export const saveEditProfile = ({ username, email, password, image }) => ({
  type: SAVE_EDIT_PROFILE,
  payload: { username, email, password, image },
})

export const LIKE_ARTICLE = 'LIKE_ARTICLE'
export const likeArticle = updateArticle => ({
  type: LIKE_ARTICLE,
  payload: updateArticle,
})

export const DELETE_LIKE_ARTICLE = 'DELETE_LIKE_ARTICLE'
export const deleteLikeArticle = updateArticle => ({
  type: DELETE_LIKE_ARTICLE,
  payload: updateArticle,
})

export const SET_GET_USER = 'SET_GET_USER'
export const setGetUser = ({ username, image, email, token }) => ({
  type: SET_GET_USER,
  payload: { username, image, email, token },
})
