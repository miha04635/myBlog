import { baseUrl } from '../constants/baseUrl'

export const getUser = async token => {
  try {
    const response = await fetch(`${baseUrl}/user`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: `Token ${token}` },
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error('Network error. Please try again.')
    }

    return data
  } catch (err) {
    console.error(err)
    throw err
  }
}
