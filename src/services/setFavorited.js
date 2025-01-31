import { baseUrl } from '../constants/BaseUrl'

export const setFavorited = async (action, slug, token) => {
  const method = action === 'like' ? 'POST' : 'DELETE'
  const url = `${baseUrl}articles/${slug}/favorite`

  const response = await fetch(url, {
    method,
    headers: {
      Authorization: `Token ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error('Ошибка при выполнении запроса')
  }

  return response.json()
}
