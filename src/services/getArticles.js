import { baseUrl } from './baseUrl'

export const apiGet = async offset => {
  try {
    const response = await fetch(`${baseUrl}/articles?limit=20&offset=${offset}`)
    if (!response.ok) {
      throw new Error('Failed to fetch articles')
    }
    const data = await response.json()
    return data
  } catch (error) {
    return null
  }
}
