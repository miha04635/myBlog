import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { saveDataArticles, saveDataCountArticles } from '../actions/actions'

import { baseUrl } from './BaseUrl'

const apiGet = async offset => {
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

const useGetArticles = offset => {
  const dispatch = useDispatch()

  useEffect(() => {
    const handleArticlesFetch = async () => {
      const articlesData = await apiGet(offset)
      if (articlesData) {
        dispatch(saveDataArticles(articlesData.articles))
        dispatch(saveDataCountArticles(articlesData.articlesCount))
      }
    }

    handleArticlesFetch()
  }, [dispatch, offset])
}

export default useGetArticles
