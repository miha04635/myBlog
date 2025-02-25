import { baseUrl } from '../constants/baseUrl'

export const setDeleteFavorited = async (slug, token) => {
  try {
    const response = await fetch(`${baseUrl}/articles/${slug}/favorite`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', Authorization: `Token ${token}` },
    })

    const data = await response.json()

    if (!response.ok) {
      return { success: false, errors: data.errors }
    }

    return { success: true, data }
  } catch {
    return { success: false, errors: { general: 'Network error. Please try again.' } }
  }
}
