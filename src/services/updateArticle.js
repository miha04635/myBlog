import { baseUrl } from '../constants/baseUrl'

export const updateArticle = async (slug, data, token) => {
  try {
    const response = await fetch(`${baseUrl}/articles/${slug}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ article: data }),
    })

    if (!response.ok) {
      const errors = await response.json()
      return { success: false, errors }
    }

    return { success: true, data }
  } catch (error) {
    return { success: false, errors: { general: 'Network error. Please try again.' } }
  }
}
