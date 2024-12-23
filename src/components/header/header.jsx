import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import useAuth from '../../hooks/useAuth'

import styles from './header.module.css'

const Header = () => {
  const { clearAuth } = useAuth()
  const isAuthenticated = useSelector(state => state.isAuthenticated)
  const username = useSelector(state => state.username)
  const avatarImg = useSelector(state => state.image)
  console.log(avatarImg)

  const navigate = useNavigate()

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
              <button className={styles.editProfile}>{username}</button>
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
