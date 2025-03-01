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
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response
  } catch (err) {
    console.error(err)
    throw err
  }
}
