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

  const handleSubmit = e => {
    e.preventDefault()

    if (password.length < 7 || password.length > 40) {
      setErrorPassword('Пароль должен быть от 7 до 40 символов')

      return
    }

    if (password !== passwordRepeat) {
      setErrorPassword('Пароли не совпадают')

      return
    }

    if (!isCheckboxAgreement) {
      setErrorAgreement('Вы должны согласиться с обработкой личной информации')

      return
    }

    setErrorPassword('')
    setErrorAgreement('')

    registerUsers(username, password, email)
  }

  return (
    <form className={styles.signUpForm} onSubmit={handleSubmit}>
      <div className={styles.newAccount}>Create new account</div>
      <div className={styles.loginDetails}>
        <div className={styles.userName}>
          <div>Username</div>
          <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        </div>

        <div className={styles.emailAddress}>
          <div>Email address</div>
          <input type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} />
        </div>

        <div className={styles.password}>
          <div>Password</div>
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          {errorPassword && <div className={styles.errorMessage}>{errorPassword}</div>}
        </div>

        <div className={styles.passwordAgain}>
          <div>Repeat Password</div>
          <input
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
        <div>{errorAgreement && <div className={styles.errorMessage}>{errorAgreement}</div>}</div>
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
