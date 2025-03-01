import { baseUrl } from './baseUrl'

export const registerUsers = async ({ username, password, email }) => {
  try {
    const response = await fetch(`${baseUrl}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          username,
          email,
          password,
        },
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      return data
    }

    return data
  } catch (err) {
    return err
  }
}
