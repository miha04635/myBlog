import { getApi } from './apiBaseUrl'

const putUserEdit = async ({ username, email, password, image }, token) => {
  try {
    const response = await fetch(`${getApi}user`, {
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
      return { success: false, err: data.errors }
    }

    return { success: true, user: data.user }
  } catch (err) {
    return { success: false, errors: { general: 'Network error. Please try again.' } }
  }
}

export default putUserEdit
