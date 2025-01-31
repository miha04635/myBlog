import { useNavigate } from 'react-router-dom'

import useAuth from '../../hooks/useAuth'
import { loginUser } from '../../services/loginUser'
import { AuthForm } from '../AuthForm'
import { filedEmail, filedPassword } from '../../constants/fields'

export const SignIn = () => {
  console.log(filedEmail)

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSignIn = async (data, setError) => {
    const result = await loginUser(data)

    if (result.success) {
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
