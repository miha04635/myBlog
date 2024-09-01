import styles from './signUpForm.module.css'

const SignUpForm = () => {
  return (
    <div className={styles.signUpForm}>
      <div className={styles.newAccount}>Create new account</div>
      <div className={styles.loginDetails}>
        <div className={styles.userName}>
          <div>Username</div>
          <input type="text" placeholder="Username" />
        </div>

        <div className={styles.emailAddress}>
          <div>Email address</div>
          <input type="text" placeholder="Email address" />
        </div>

        <div className={styles.password}>
          <div>Password</div>
          <input type="password" placeholder="Password" />
        </div>

        <div className={styles.passwordAgain}>
          <div>Repeat Password</div>
          <input type="password" placeholder="Password" />
        </div>
      </div>

      <div>
        <p className={styles.agreementText}>I agree to the processing of my personal information</p>
      </div>

      <button className={styles.create}>Create</button>

      <p className={styles.alreadyHaveAccount}>
        Already have an account?{' '}
        <a href="/login" className={styles.signInLink}>
          Sign In
        </a>
        .
      </p>
    </div>
  )
}

export default SignUpForm
