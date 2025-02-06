import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

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

  return (
    <form onSubmit={handleSubmit(data => onSubmit(data, setError))} className={styles.authForm}>
      <p className={styles.title}>{title}</p>

      {fields.map(({ name, label, type, validation, isPasswordRepeat }) => (
        <div key={name} className={styles.inputContainer}>
          <p>{label}</p>
          <input
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
        {buttonText}
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
