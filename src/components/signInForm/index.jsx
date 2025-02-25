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

  const handleSignIn = async (data, setError) => {
    const result = await loginUser(data)

    if (result.success) {
      dispatch(getUsername(result.user.username))

      login(result.user.token, result.user.username)
      navigate('/')
    } else {
      setError('password', { type: 'server', message: 'Invalid email or password' })
    }
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
