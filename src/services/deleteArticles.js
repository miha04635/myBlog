import { baseUrl } from '../constants/baseUrl'

export const deleteArticles = async (slug, token) => {
  try {
    const response = await fetch(`${baseUrl}/articles/${slug}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', Authorization: `Token ${token}` },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response
  } catch (err) {
    console.error(err)
    throw err
  }
}
