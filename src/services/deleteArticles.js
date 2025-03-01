import { baseUrl } from '../constants/baseUrl'

export const deleteArticles = async (slug, token) => {
  try {
    const response = await fetch(`${baseUrl}/articles/${slug}1`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', Authorization: `Token ${token}` },
    })

    if (!response.ok) {
      throw new Error('Network error. Please try again.')
    }
  } catch (err) {
    console.error(err)

    throw err
  }
}
