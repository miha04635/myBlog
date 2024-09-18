import { Link } from 'react-router-dom'

import styles from './signInForm.module.css'

const SignInForm = () => {
  return (
    <div className={styles.signInForm}>
      <div className={styles.loginAccount}>Sign In</div>
      <div className={styles.SignInDetails}>
        <div className={styles.emailAddress}>
          <div>Email address</div>
          <input type="text" placeholder="Email address" />
        </div>

        <div className={styles.password}>
          <div>Password</div>
          <input type="password" placeholder="Password" />
        </div>
      </div>

      <button className={styles.login}>Login</button>

      <p className={styles.alreadyHaveAccount}>
        Don’t have an account?
        <Link to="/signUp" className={styles.signInLink}>
          Sign Up.
        </Link>
      </p>
    </div>
  )
}

export default SignInForm
