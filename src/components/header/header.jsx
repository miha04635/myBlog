import { Link } from 'react-router-dom'

import styles from './header.module.css'

const Header = () => {
  return (
    <div className={styles.header}>
      <Link to={'/'} className={styles.blog}>
        Realworld Blog
      </Link>
      <div className={styles.userAuth}>
        <Link to="/SignIn">
          <button className={styles.signIn}>Sign in</button>
        </Link>
        <Link to="/signUp">
          <button className={styles.signUp}>Sign up</button>
        </Link>
      </div>
    </div>
  )
}

export default Header
