import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import useAuth from '../../hooks/useAuth'
import { loginUser } from '../../services/loginUser'

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
    buttonLogin,
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
    }

    if (result.errors) {
      setError('password', {
        type: 'server',
        message: 'Invalid email or password',
      })
    }
  }

  const registerEmail = {
    required: 'The email field is required',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Incorrect email address',
    },
  }

  const registerPassword = {
    required: 'Filed password',

    minLength: {
      value: 6,
      message: 'Minimum of 6 characters',
    },
    maxLength: {
      value: 40,
      message: 'Maximum of 40 characters',
    },
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={signInForm}>
      <p className={loginAccount}>Sign In</p>
      <div className={SignInDetails}>
        <div className={emailAddress}>
          <p>Email address</p>
          <input type="email" placeholder="Email address" {...register('email', registerEmail)} />
          {errors.general && <p className={errorAll}>{errors.general.message}</p>}
          {errors.email && <p className={errorAll}>{errors.email.message}</p>}
        </div>

        <div className={password}>
          <p>Password</p>
          <input type="password" placeholder="Password" {...register('password', registerPassword)} />
          {errors.password && <p className={errorAll}>{errors.password.message}</p>}
        </div>
      </div>

      <button type="submit" className={BthLogin}>
        <p className={buttonLogin}>Login</p>
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
