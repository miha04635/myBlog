import { useState, useEffect, useCallback } from 'react'
import Cookies from 'js-cookie'

import { getUser } from '../services/getUser'

export default function useAuth() {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(Cookies.get('token') || null)

  const logOut = useCallback(() => {
    Cookies.remove('token')
    setUser(null)
    setToken(null)
  }, [])

  const login = useCallback((tokenUser, username) => {
    Cookies.set('token', tokenUser, { expires: 7, secure: true, sameSite: 'strict' })
    setToken(tokenUser)
    setUser(username)
  }, [])

  useEffect(() => {
    if (token) {
      let isMounted = true

      const fetchUser = async () => {
        try {
          const userData = await getUser(token)

          if (isMounted && userData.success) {
            setUser(userData.data.user)
          } else {
            logOut()
          }
        } catch (error) {
          if (isMounted) logOut()
        }
      }

      fetchUser()

      return () => {
        isMounted = false
      }
    }
  }, [token, logOut])

  return { user, login, logOut, token }
}
