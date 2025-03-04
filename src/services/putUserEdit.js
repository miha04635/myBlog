import { baseUrl } from './baseUrl'

export const putUserEdit = async ({ username, email, password, image }, token) => {
  try {
    const response = await fetch(`${baseUrl}/user`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Token ${token}` },
      body: JSON.stringify({
        user: {
          username,
          email,
          password,
          image,
        },
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      return data
    }

    return data
  } catch {
    return { errors: 'Network error. Please try again.' }
  }
}
