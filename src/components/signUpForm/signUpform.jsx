import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { setAuth } from '../../actions/actions'
import registerUsers from '../../services/registerUser'

import styles from './signUpForm.module.css'

const {
  signUpForm,
  newAccount,
  loginDetails,
  userName,
  emailAddress,
  password,
  passwordAgain,
  agreementContainer,
  agreementText,
  agreementCheckbox,
  create,
  alreadyHaveAccount,
  signInLink,
  errorAll,
} = styles

const SignUpForm = () => {
  const dispatch = useDispatch()
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
      const result = await registerUsers(data)

      if (result.success) {
        dispatch(setAuth(result.user.username, result.user.token))
        navigate('/')
      } else if (result.errors) {
        Object.entries(result.errors).forEach(([field, messages]) => {
          setError(field, {
            type: 'server',
            message: Array.isArray(messages) ? messages.join(', ') : String(messages),
          })
        })
      }
    } catch (error) {
      console.error('Ошибка сети:', error)
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
        <div className={userName}>
          <div>Username</div>
          <input
            className={userName}
            type="text"
            placeholder="Username"
            {...register('username', {
              required: 'Введите имя пользователя',
              pattern: {
                value: /^[a-zA-Z0-9]{0,20}$/,
                message: 'только латинские буквы, цифры. До 20 симвалов',
              },
            })}
          />

          {userNameError && <p className={errorAll}>{userNameError}</p>}
        </div>

        <div className={emailAddress}>
          <div>Email address</div>
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

        <div className={`${password} `}>
          <div>Password</div>
          <input
            className={password}
            type="password"
            placeholder="Password"
            {...register('password', {
              required: 'Filed password',
              minLength: {
                value: 6,
                message: 'Минимум 6 символов',
              },
              maxLength: {
                value: 48,
                message: 'Максимум 48 символов',
              },
            })}
          />

          {passwordError && <p className={errorAll}>{passwordError}</p>}
        </div>

        <div className={`${passwordAgain} `}>
          <div>Repeat Password</div>
          <input
            className={passwordAgain}
            type="password"
            placeholder="Repeat Password"
            {...register('passwordRepeat', {
              required: 'Please confirm your password',
              validate: value => value === getValues('password') || 'Пароли не совпадают',
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
                required: 'Нажми на чекбокс Черт.',
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

export default SignUpForm
