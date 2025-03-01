import { baseUrl } from './baseUrl'

export const postArticles = async ({ description, body, title, tags }, token) => {
  try {
    const response = await fetch(`${baseUrl}/articles`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Token ${token}` },
      body: JSON.stringify({
        article: {
          title,
          description,
          body,
          tagList: tags,
        },
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error('Ошибка сети')
    }

    return data
  } catch (err) {
    console.error(err)
    throw err
  }
}
