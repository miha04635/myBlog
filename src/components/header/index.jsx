import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import Cookies from 'js-cookie'

import useAuth from '../../hooks/useAuth'
import getUser from '../../services/getUser'
import { setGetUser } from '../../actions/actions'

import styles from './index.module.css'

export const Header = () => {
  const { clearAuth } = useAuth()
  const isAuthenticated = useSelector(state => state.isAuthenticated)
  const name = useSelector(state => state.username)
  const avatarImg = useSelector(state => state.image)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const tok = Cookies.get('token')

    if (tok) {
      const fetchUser = async () => {
        try {
          const user = await getUser(tok)

          dispatch(setGetUser(user.data.user))
        } catch (error) {
          console.error('Error fetching user:', error)
        }
      }
      fetchUser()
    }
  }, [dispatch])

  const handleLogOut = () => {
    clearAuth()
    navigate('/')
  }

  return (
    <div className={styles.header}>
      <Link to={'/'} className={styles.blog}>
        Realworld Blog
      </Link>
      <div className={styles.userAuth}>
        {isAuthenticated ? (
          <>
            <Link to="/NewArticle">
              <button className={styles.createArticle}>Create Article</button>
            </Link>
            <Link to="/EditProfile" className={styles.author}>
              <button className={styles.editProfile}>{name}</button>
              <img
                className={styles.avatarImg}
                src={avatarImg || 'https://static.productionready.io/images/smiley-cyrus.jpg'}
                onError={e => {
                  e.target.src = 'https://static.productionready.io/images/smiley-cyrus.jpg'
                }}
              />
            </Link>
            <button className={styles.logOut} onClick={handleLogOut}>
              Log out
            </button>
          </>
        ) : (
          <>
            <Link to="/SignIn">
              <button className={styles.signIn}>Sign in</button>
            </Link>
            <Link to="/SignUp">
              <button className={styles.signUp}>Sign up</button>
            </Link>
          </>
        )}
      </div>
    </div>
  )
}
