import { baseUrl } from '../constants/BaseUrl'

export const apiGetAnArticles = async slug => {
  try {
    const response = await fetch(`${baseUrl}articles/${slug}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
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
