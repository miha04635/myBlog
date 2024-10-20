import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { saveDataArticles, saveDataCountArticles } from '../actions/actions'

const useGetArticles = (limit, offset) => {
  const dispatch = useDispatch()
  const getApi = 'https://blog-platform.kata.academy/api/'

  const apiGet = async () => {
    try {
      const response = await fetch(`${getApi}/articles?limit=${limit}&offset=${offset}`)

      if (!response.ok) {
        throw new Error('Failed to fetch articles')
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching articles:', error)
      return null
    }
  }

  useEffect(() => {
    const handleArticlesFetch = async () => {
      const articlesData = await apiGet()
      if (articlesData) {
        dispatch(saveDataArticles(articlesData.articles))
        dispatch(saveDataCountArticles(articlesData.articlesCount))
      }
    }

    handleArticlesFetch()
  }, [dispatch, limit, offset])
}

export default useGetArticles
