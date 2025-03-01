import { baseUrl } from './baseUrl'

export const getAnArticles = async slug => {
  try {
    const response = await fetch(`${baseUrl}/articles/${slug}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (err) {
    console.error(err)
    throw err
  }
}
