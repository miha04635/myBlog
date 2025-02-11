import { baseUrl } from '../constants/baseUrl'

export const getUser = async token => {
  try {
    const response = await fetch(`${baseUrl}/user`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: `Token ${token}` },
    })

    const data = await response.json()

    if (!response.ok) {
      return { success: false, errors: data.errors }
    }

    return { success: true, data }
  } catch (err) {
    return { success: false, errors: { general: 'Network error. Please try again.' } }
  }
}
