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
      throw new Error('Network error. Please try again.')
    }

    return data.user
  } catch (err) {
    console.error(err)
    throw err
  }
}
