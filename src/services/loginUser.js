import { baseUrl } from '../constants/baseUrl'

export const loginUser = async ({ email, password }) => {
  try {
    const response = await fetch(`${baseUrl}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          email,
          password,
        },
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      return { success: false, errors: data.errors }
    }

    return { success: true, user: data.user }
  } catch (err) {
    return { success: false, errors: { general: 'Network error. Please try again.' } }
  }
}
