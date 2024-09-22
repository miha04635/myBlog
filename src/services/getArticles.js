import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { saveDataArticles } from '../actions/actions'

const GetArticles = () => {
  const dispatch = useDispatch()
  const getApi = 'https://blog.kata.academy/api'

  const apiGet = async () => {
    const response = await fetch(`${getApi}/articles/?limit=20`).then(results => results.json())

    const data = await response
    return data
  }

  useEffect(() => {
    const handleArticlesFetch = async () => {
      const articlesData = await apiGet()
      dispatch(saveDataArticles(articlesData.articles))
    }
    handleArticlesFetch()
  }, [dispatch])
}

export default GetArticles
