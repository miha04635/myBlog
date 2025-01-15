import { getApi } from './apiBaseUrl'

const getUser = async token => {
  try {
    const response = await fetch(`${getApi}user`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: `Token ${token}` },
      token,
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

export default getUser
