import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

import { putUserEdit } from '../../services/putUserEdit'
import { REGISTER_OPTIONS } from '../../constants/registerOptions'

import styles from './index.module.css'

export const EditProfile = () => {
  const token = Cookies.get('token')

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
      const { err, success } = await putUserEdit(data, token)
      if (success) {
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
          <input {...register('username', REGISTER_OPTIONS.username)} type="text" placeholder="Username" />
          {errors.username && <span className={styles.error}>{errors.username.message}</span>}
        </div>

        <div className={styles.emailAddress}>
          <div>Email address</div>
          <input {...register('email', REGISTER_OPTIONS.email)} type="text" placeholder="Email address" />
          {errors.email && <span className={styles.error}>{errors.email.message}</span>}
        </div>

        <div className={styles.password}>
          <div>New Password</div>
          <input {...register('password', REGISTER_OPTIONS.password)} type="password" placeholder="New Password" />
          {errors.password && <span className={styles.error}>{errors.password.message}</span>}
        </div>

        <div className={styles.avatarImg}>
          <div>Avatar image (url)</div>
          <input {...register('image', REGISTER_OPTIONS.image)} type="text" placeholder="Avatar image" />
          {errors.image && <span className={styles.error}>{errors.image.message}</span>}
        </div>
      </div>

      <button type="submit" className={styles.save}>
        Save
      </button>
    </form>
  )
}
