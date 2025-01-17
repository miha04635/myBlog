import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Cookies from 'js-cookie'

import useAuth from '../../hooks/useAuth'
import loginUser from '../../services/loginUser'

import styles from './index.module.css'

export const SignInForm = () => {
  const { login } = useAuth()
  const {
    signInForm,
    loginAccount,
    SignInDetails,
    emailAddress,
    BthLogin,
    alreadyHaveAccount,
    signInLink,
    password,
    errorAll,
  } = styles

  const {
    register,
    handleSubmit,
    setError,

    formState: { errors },
  } = useForm({
    mode: 'onChange',
  })

  const navigate = useNavigate()

  const onSubmit = async data => {
    const result = await loginUser(data)

    if (result.success) {
      login(result.user.token, result.user.username)
      navigate('/')
    } else {
      const error = result.errors

      if (error) {
        setError('password', {
          type: 'server',
          message: 'Invalid email or password',
        })
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={signInForm}>
      <div className={loginAccount}>Sign In</div>
      <div className={SignInDetails}>
        <div className={emailAddress}>
          <div>Email address</div>
          <input
            type="email"
            placeholder="Email address"
            {...register('email', {
              required: 'The email field is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Incorrect email address',
              },
            })}
          />

          {errors.general && <p className={errorAll}>{errors.general.message}</p>}
          {errors.email && <p className={errorAll}>{errors.email.message}</p>}
        </div>

        <div className={password}>
          <div>Password</div>
          <input
            type="password"
            placeholder="Password"
            {...register('password', {
              required: 'Filed password',

              minLength: {
                value: 6,
                message: 'Minimum of 6 characters',
              },
              maxLength: {
                value: 40,
                message: 'Maximum of 40 characters',
              },
            })}
          />
          {errors.password && <p className={errorAll}>{errors.password.message}</p>}
        </div>
      </div>

      <button type="submit" className={BthLogin}>
        Login
      </button>

      <p className={alreadyHaveAccount}>
        Don’t have an account?
        <Link to="/signUp" className={signInLink}>
          Sign Up.
        </Link>
      </p>
    </form>
  )
}
