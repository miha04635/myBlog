import { baseUrl } from './baseUrl'

export const deleteArticles = async (slug, token) => {
  try {
    const response = await fetch(`${baseUrl}/articles/${slug}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', Authorization: `Token ${token}` },
    })

    if (!response.ok) {
      throw new Error('Ошибка сети')
    }
  } catch (err) {
    console.error(err)
    throw err
  }
}
