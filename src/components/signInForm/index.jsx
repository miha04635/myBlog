import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import useAuth from '../../hooks/useAuth'
import { loginUser } from '../../services/loginUser'
import { AuthForm } from '../authForm'
import { filedEmail, filedPassword } from '../../constants/fields'
import { getUsername } from '../../actions'

export const SignIn = () => {
  const dispatch = useDispatch()
  const { login } = useAuth()

  const navigate = useNavigate()

  const handleSignIn = (data, setError) => {
    loginUser(data)
      .then(result => {
        dispatch(getUsername(result.username))
        login(result.token, result.username)
        navigate('/')
      })
      .catch(() => {
        setError('password', { type: 'server', message: 'Invalid email or password' })
      })
  }

  return (
    <AuthForm
      title="Sign In"
      fields={[filedEmail, filedPassword]}
      buttonText="Login"
      onSubmit={handleSignIn}
      linkText="Don’t have an account?"
      linkPath="/signUp"
      linkLabel="Sign Up."
    />
  )
}
