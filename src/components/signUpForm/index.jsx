import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

import useAuth from '../../hooks/useAuth'
import registerUsers from '../../services/registerUser'

import styles from './index.module.css'

const {
  signUpForm,
  newAccount,
  loginDetails,
  userName,
  emailAddress,
  password,
  passwordAgain,
  agreementContainer,
  agreementCheckbox,
  create,
  alreadyHaveAccount,
  signInLink,
  errorAll,
  containerUsername,
  containerEmailAddress,
  containerPassword,
  containerPasswordAgain,
} = styles

export const SignUpForm = () => {
  const { login } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  })
  const emailError = errors.email?.message
  const userNameError = errors.username?.message
  const passwordError = errors.password?.message

  const onSubmit = async data => {
    try {
      const { success, user, errors: serverErrors } = await registerUsers(data)

      if (success) {
        login(user.token)
        navigate('/')
        return
      }

      if (serverErrors) {
        Object.entries(serverErrors).forEach(([field, messages]) =>
          setError(field, {
            type: 'server',
            message: Array.isArray(messages) ? messages.join(', ') : String(messages),
          })
        )
      }
    } catch {
      setError('server', {
        type: 'server',
        message: 'Не удалось зарегистрироваться. Попробуйте позже.',
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={signUpForm}>
      <div className={newAccount}>Create new account</div>
      <div className={loginDetails}>
        <div className={containerUsername}>
          <p>Username</p>
          <input
            className={userName}
            type="text"
            placeholder="Username"
            {...register('username', {
              required: 'Write username',
              pattern: {
                value: /^[a-zA-Z0-9]{0,20}$/,
                message: 'Only Latin letters and numbers. Up to 20 characters',
              },
            })}
          />

          {userNameError && <p className={errorAll}>{userNameError}</p>}
        </div>

        <div className={containerEmailAddress}>
          <p>Email address</p>
          <input
            className={emailAddress}
            type="email"
            placeholder="Email address"
            {...register('email', {
              required: 'Filed email',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
          />
          {emailError && <p className={errorAll}>{emailError}</p>}
        </div>

        <div className={containerPassword}>
          <p>Password</p>
          <input
            className={password}
            type="password"
            placeholder="Password"
            {...register('password', {
              required: 'Filed password',
              minLength: {
                value: 6,
                message: 'Your password needs to be at least 6 characters.',
              },
              maxLength: {
                value: 48,
                message: 'Maximum of 48 characters',
              },
            })}
          />

          {passwordError && <p className={errorAll}>{passwordError}</p>}
        </div>

        <div className={containerPasswordAgain}>
          <p>Repeat Password</p>
          <input
            className={passwordAgain}
            type="password"
            placeholder="Repeat Password"
            {...register('passwordRepeat', {
              required: 'Please confirm your password',
              validate: value => value === getValues('password') || 'Passwords must match',
            })}
          />
          {errors.passwordRepeat && <p className={errorAll}>{errors.passwordRepeat.message}</p>}
        </div>
        <div className={agreementContainer}>
          <label>
            <input
              type="checkbox"
              className={agreementCheckbox}
              {...register('agreement', {
                required: 'Click on the checkbox',
              })}
            />
            I agree to the processing of my personal information
          </label>
        </div>
        {errors.agreement && <p className={errorAll}>{errors.agreement.message}</p>}
        <button type="submit" className={create}>
          Create
        </button>

        <p className={alreadyHaveAccount}>
          Already have an account?{' '}
          <Link to="/signIn" className={signInLink}>
            Sign In
          </Link>
          .
        </p>
      </div>
    </form>
  )
}
