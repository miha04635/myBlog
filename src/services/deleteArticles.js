import { baseUrl } from '../constants/baseUrl'

export const deleteArticles = async (slug, token) => {
  try {
    const response = await fetch(`${baseUrl}/articles/${slug}1`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', Authorization: `Token ${token}` },
    })

    if (!response.ok) {
      const data = await response.json()
      return { success: false, errors: data.errors }
    }
  } catch (err) {
    console.error(err)

    return { success: true }
  } catch {
    return { success: false, errors: { general: 'Network error. Please try again.' } }
  }
}
