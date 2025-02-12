import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import useAuth from '../../hooks/useAuth'
import { logOutUser } from '../../actions'

import styles from './index.module.css'

export const Header = () => {
  const { logOut, user } = useAuth()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const username = useSelector(state => state.username)
  const image = user?.image || 'https://static.productionready.io/images/smiley-cyrus.jpg'

  const handleLogOut = () => {
    dispatch(logOutUser())
    logOut()
    navigate('/')
  }

  return (
    <div className={styles.header}>
      <Link to={'/'} className={styles.blog}>
        Realworld Blog
      </Link>
      <div className={styles.userAuth}>
        {!username ? (
          <>
            <Link to="/SignIn">
              <button className={styles.signIn}>Sign in</button>
            </Link>
            <Link to="/SignUp">
              <button className={styles.signUp}>Sign up</button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/NewArticle">
              <button className={styles.createArticle}>Create Article</button>
            </Link>
            <Link to="/EditProfile" className={styles.author}>
              <button className={styles.editProfile}>{username}</button>
              <img
                className={styles.avatarImg}
                src={image}
                onError={e => {
                  e.target.src = 'https://static.productionready.io/images/smiley-cyrus.jpg'
                }}
              />
            </Link>
            <button className={styles.logOut} onClick={handleLogOut}>
              Log out
            </button>
          </>
        )}
      </div>
    </div>
  )
}
