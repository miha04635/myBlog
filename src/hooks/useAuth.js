import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import Cookies from 'js-cookie'

import { setAuth, logout } from '../actions/actions'

function useAuth() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.username)
  const token = useSelector(state => state.token)

  useEffect(() => {
    const storedToken = Cookies.get('token')
    if (!storedToken) {
      dispatch(logout())
    } else {
      dispatch(setAuth(storedToken))
    }
  }, [dispatch])

  const login = (tokenUser, username) => {
    dispatch(setAuth(tokenUser, username))
    Cookies.set('token', tokenUser, {
      expires: 7,
      secure: true,
      sameSite: 'strict',
    })
  }
  const clearAuth = () => {
    dispatch(logout())
    Cookies.remove('token')
  }
  return { user, login, clearAuth, token }
}

export default useAuth
