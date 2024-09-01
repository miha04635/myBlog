import styles from './header.module.css'

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.blog}>Realworld Blog</div>
      <div className={styles.userAuth}>
        <button className={styles.signIn}>Sign in</button>
        <button className={styles.signUp}>Sign up</button>
      </div>
    </div>
  )
}

export default Header
