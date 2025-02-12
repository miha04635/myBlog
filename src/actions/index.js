export const GET_USERNAME = 'GET_USERNAME'
export const getUsername = username => ({
  type: GET_USERNAME,
  payload: username,
})

export const LOGOUT_USER = 'LOGOUT_USER'
export const logOutUser = () => ({
  type: LOGOUT_USER,
})
