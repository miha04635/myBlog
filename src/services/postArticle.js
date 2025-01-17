import { getApi } from './apiBaseUrl'

const postArticles = async ({ description, body, title, tags }, token) => {
  try {
    const response = await fetch(`${getApi}articles`, {
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
      return { success: false, errors: data.errors }
    }

    return { success: true, user: data }
  } catch (err) {
    return { success: false, errors: { general: 'Network error. Please try again.' } }
  }
}

export default postArticles
