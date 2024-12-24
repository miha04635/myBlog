import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import useAuth from '../../hooks/useAuth'
import getUser from '../../services/getUser'
import { setGetUser } from '../../actions/actions'

import styles from './header.module.css'

const Header = () => {
  const { clearAuth } = useAuth()
  const isAuthenticated = useSelector(state => state.isAuthenticated)
  const name = useSelector(state => state.username)
  const token = useSelector(state => state.token)
  const avatarImg = useSelector(state => state.image)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  if (token) {
    const fetchUser = async () => {
      try {
        const user = await getUser(token)
        console.log(user)
        dispatch(setGetUser(user))
      } catch (error) {
        console.error('Error fetching user:', error)
      }
    }
    fetchUser()
  }

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
            <Link to="/EditProfile">
              <button className={styles.editProfile}>{name}</button>
              <img className={styles.avatarImg} src={avatarImg} alt="logo" />
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

export default Header
