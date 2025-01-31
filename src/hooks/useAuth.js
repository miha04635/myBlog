import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'

import { getUser } from '../services/getUser'

export default function useAuth() {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(Cookies.get('token') || null)

  const logOut = () => {
    Cookies.remove('token')
    setUser(null)
    setToken(null)
  }

  useEffect(() => {
    if (token) {
      const fetchUser = async () => {
        const userData = await getUser(token)
        if (userData.success) {
          setUser(userData.data.user)
        } else {
          logOut()
        }
      }
      fetchUser()
    }
  }, [token])

  const login = tokenUser => {
    Cookies.set('token', tokenUser, { expires: 7, secure: true, sameSite: 'strict' })
    setToken(tokenUser)
  }

  return { user, login, logOut, token }
}
