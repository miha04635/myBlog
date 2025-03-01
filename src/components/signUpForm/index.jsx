import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { message } from 'antd'

import useAuth from '../../hooks/useAuth'
import { registerUsers } from '../../services/registerUser'
import { AuthForm } from '../authForm'
import { filedEmail, filedPassword, filedRepeatPassword, filedUsername } from '../../constants/fields'
import { getUsername } from '../../actions'

export const SignUp = () => {
  const { login } = useAuth()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSignUp = async data => {
    try {
      const { user, errors } = await registerUsers(data)

      if (errors) {
        message.error('Не удалось зарегистрироваться. Попробуйте позже.')
        return null
      }

      dispatch(getUsername(user.username))
      login(user.token)
      navigate('/')
    } catch (err) {
      message.error('Не удалось зарегистрироваться. Попробуйте позже.')
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
