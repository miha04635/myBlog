import { Link } from 'react-router-dom'
import { useState } from 'react'

import registerUsers from '../../services/registerUser'

import styles from './signUpForm.module.css'

const SignUpForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordRepeat, setPasswordRepeat] = useState('')
  const [email, setEmail] = useState('')
  const [isCheckboxAgreement, setisCheckboxAgreement] = useState(false)
  const [errorPassword, setErrorPassword] = useState('')
  const [errorAgreement, setErrorAgreement] = useState('')
  const [passwordError, setpasswordError] = useState('')

  const handleSubmit = e => {
    e.preventDefault()

    if (password.length < 6 || password.length > 40) {
      setErrorPassword('Your password needs to be at least 6 characters.')
      setpasswordError(true)

      return
    }

    if (password !== passwordRepeat) {
      setpasswordError(true)
      setErrorPassword('Пароли не совпадают')

      return
    }

    if (!isCheckboxAgreement) {
      setErrorAgreement('Вы должны согласиться с обработкой личной информации')

      return
    }

    setErrorPassword('')
    setErrorAgreement('')
    setpasswordError(false)

    registerUsers(username, password, email)
  }

  return (
    <form className={styles.signUpForm} onSubmit={handleSubmit}>
      <div className={styles.newAccount}>Create new account</div>
      <div className={styles.loginDetails}>
        <div className={styles.userName}>
          <div>Username</div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>

        <div className={styles.emailAddress}>
          <div>Email address</div>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>

        <div className={`${styles.password} `}>
          <div>Password</div>
          <input
            className={`${passwordError ? styles.error : ''}`}
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          {errorPassword && <div className={styles.errorMessage}>{errorPassword}</div>}
        </div>

        <div className={`${styles.passwordAgain} `}>
          <div>Repeat Password</div>
          <input
            className={`${passwordError ? styles.error : ''}`}
            type="password"
            placeholder="Repeat Password"
            value={passwordRepeat}
            onChange={e => setPasswordRepeat(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.agreementContainer}>
        <p className={styles.agreementText}>I agree to the processing of my personal information</p>
        <input
          type="checkbox"
          className={styles.agreementCheckbox}
          checked={isCheckboxAgreement}
          onChange={e => setisCheckboxAgreement(e.target.checked)}
        />
        <div>{errorAgreement && <div className={`${styles.errorMessage} ${styles.test}`}>{errorAgreement}</div>}</div>
      </div>

      <button type="submit" className={styles.create}>
        Create
      </button>

      <p className={styles.alreadyHaveAccount}>
        Already have an account?{' '}
        <Link to="/signIn" className={styles.signInLink}>
          Sign In
        </Link>
        .
      </p>
    </form>
  )
}

export default SignUpForm
