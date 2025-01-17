import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { saveEditProfile } from '../../actions/actions'
import putUserEdit from '../../services/putUserEdit'

import styles from './index.module.css'

export const EditProfile = () => {
  const dispatch = useDispatch()
  const token = useSelector(state => state.token)
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  })

  const navigate = useNavigate()
  const submit = async data => {
    try {
      const { err, success, user } = await putUserEdit(data, token)

      if (success) {
        dispatch(saveEditProfile(user))

        navigate('/')
      } else if (err) {
        Object.entries(err).forEach(([field, messages]) => {
          setError(field, {
            type: 'server',
            message: Array.isArray(messages) ? messages.join(', ') : String(messages),
          })
        })
      }
    } catch (error) {
      setError('server', {
        type: 'server',
        message: 'Не удалось зарегистрироваться. Попробуйте позже.',
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(submit)} className={styles.editProfile}>
      <div className={styles.edit}>Edit Profile</div>

      <div className={styles.editProfileDetails}>
        <div className={styles.username}>
          <div>Username</div>
          <input
            {...register('username', {
              required: 'Username is required',
              pattern: {
                value: /^[a-zA-Z0-9]{0,20}$/,
                message: 'только латинские буквы, цифры. До 20 символов',
              },
            })}
            type="text"
            placeholder="Username"
          />
          {errors.username && <span className={styles.error}>{errors.username.message}</span>}
        </div>

        <div className={styles.emailAddress}>
          <div>Email address</div>
          <input
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
            type="text"
            placeholder="Email address"
          />
          {errors.email && <span className={styles.error}>{errors.email.message}</span>}
        </div>

        <div className={styles.password}>
          <div>New Password</div>
          <input
            {...register('password', {
              minLength: {
                value: 6,
                message: 'Minimum 6 characters',
              },
              maxLength: {
                value: 48,
                message: 'Maximum 48 characters',
              },
            })}
            type="password"
            placeholder="New Password"
          />
          {errors.password && <span className={styles.error}>{errors.password.message}</span>}
        </div>

        <div className={styles.avatarImg}>
          <div>Avatar image (url)</div>
          <input
            {...register('image', {
              pattern: {
                value: /^(ftp|http|https):\/\/[^ "]+$/,
                message: 'Please enter a valid URL',
              },
            })}
            type="text"
            placeholder="Avatar image"
          />
          {errors.image && <span className={styles.error}>{errors.image.message}</span>}
        </div>
      </div>

      <button type="submit" className={styles.save}>
        Save
      </button>
    </form>
  )
}
