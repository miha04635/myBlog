import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'

import { setAuth, logout } from '../actions/actions'

function useAuth() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.username)
  const token = useSelector(state => state.token)

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      try {
        dispatch(setAuth(storedToken))
      } catch (error) {
        dispatch(logout())
      }
    }
  }, [dispatch])

  const login = (tokenUser, username) => {
    dispatch(setAuth(tokenUser, username))
    localStorage.setItem('token', tokenUser)
  }
  const clearAuth = () => {
    dispatch(logout())
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }
  return { user, login, clearAuth, token }
}

export default useAuth
