import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Spin, message } from 'antd'
import { useState } from 'react'

import styles from './index.module.css'

export const AuthForm = ({ title, fields, buttonText, onSubmit, linkText, linkPath, linkLabel }) => {
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  })

  const [loading, setLoading] = useState(false)

  const handleFormSubmit = async data => {
    setLoading(true)

    try {
      await onSubmit(data, setError)
    } catch (error) {
      message.error('Ошибка входа')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.authForm}>
      <p className={styles.title}>{title}</p>

      {fields.map(({ name, label, type, validation, isPasswordRepeat }) => (
        <div key={name} className={styles.inputContainer}>
          <p>{label}</p>
          <input
            className={styles.inputForm}
            type={type}
            placeholder={label}
            {...register(
              name,
              isPasswordRepeat
                ? { ...validation, validate: value => value === getValues('password') || 'Passwords must match' }
                : validation
            )}
          />
          {errors[name] && <p className={styles.error}>{errors[name].message}</p>}
        </div>
      ))}

      <button type="submit" className={styles.submitButton}>
        {loading ? (
          <div className={styles.spinnerContainer}>
            <Spin size="large" />
          </div>
        ) : (
          buttonText
        )}
      </button>

      <p className={styles.linkText}>
        {linkText}{' '}
        <Link to={linkPath} className={styles.link}>
          {linkLabel}
        </Link>
      </p>
    </form>
  )
}
