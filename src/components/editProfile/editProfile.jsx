import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { saveEditProfile } from '../../actions/actions'
import putUserEdit from '../../services/putUserEdit'

import styles from './editProfile.module.css'

const EditProfile = () => {
  const dispatch = useDispatch()
  const token = useSelector(state => state.token)
  const { handleSubmit, register, setError } = useForm({
    mode: 'onChange',
  })

  const navigate = useNavigate()
  const submit = async data => {
    try {
      const { errors, success, user } = await putUserEdit(data, token)
      console.log('>>>>>', user)

      if (success) {
        dispatch(saveEditProfile(user))
        localStorage.setItem('user', JSON.stringify(user.username))
        navigate('/')
      } else if (errors) {
        Object.entries(errors).forEach(([field, messages]) => {
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
    <form onSubmit={handleSubmit(submit)} className={styles.editProfile}>
      <div className={styles.edit}>Edit Profile</div>

      <div className={styles.editProfileDetails}>
        <div className={styles.emailAddress}>
          <div>Username</div>
          <input
            {...register('username', {
              pattern: {
                value: /^[a-zA-Z0-9]{0,20}$/,
                message: 'только латинские буквы, цифры. До 20 символов',
              },
            })}
            type="text"
            placeholder="Username"
          />
        </div>

        <div className={styles.emailAddress}>
          <div>Email address</div>
          <input
            {...register('email', {
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
            type="text"
            placeholder="Email address"
          />
        </div>

        <div className={styles.password}>
          <div>New Password</div>
          <input
            {...register('password', {
              minLength: {
                value: 6,
                message: 'Минимум 6 символов',
              },
              maxLength: {
                value: 48,
                message: 'Максимум 48 символов',
              },
            })}
            type="password"
            placeholder="New Password"
          />
        </div>

        <div className={styles.avatarImg}>
          <div>Avatar image (url)</div>
          <input
            {...register('avatarImg', {
              pattern: {
                value: /^(ftp|http|https):\/\/[^ "]+$/,
                message: 'Введите корректный URL',
              },
            })}
            type="text"
            placeholder="Avatar image"
          />
        </div>
      </div>

      <button type="submit" className={styles.save}>
        Save
      </button>
    </form>
  )
}

export default EditProfile
