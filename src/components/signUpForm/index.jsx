import { useNavigate } from 'react-router-dom'

import useAuth from '../../hooks/useAuth'
import { registerUsers } from '../../services/registerUser'
import { AuthForm } from '../authForm'
import { filedEmail, filedPassword, filedRepeatPassword, filedUsername } from '../../constants/fields'

export const SignUp = () => {
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSignUp = async (data, setError) => {
    try {
      const { success, user, errors: serverErrors } = await registerUsers(data)

      if (success) {
        login(user.token)
        navigate('/')
      } else if (serverErrors) {
        Object.entries(serverErrors).forEach(([field, messages]) =>
          setError(field, { type: 'server', message: Array.isArray(messages) ? messages.join(', ') : String(messages) })
        )
      }
    } catch {
      setError('server', { type: 'server', message: 'Не удалось зарегистрироваться. Попробуйте позже.' })
    }
  }

  return (
    <AuthForm
      title="Create new account"
      fields={[filedUsername, filedEmail, filedPassword, filedRepeatPassword]}
      buttonText="Create"
      onSubmit={handleSignUp}
      linkText="Already have an account?"
      linkPath="/signIn"
      linkLabel="Sign In"
    />
  )
}
