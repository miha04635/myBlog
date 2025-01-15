import { useNavigate } from 'react-router-dom'

import { ArticleForm } from '../ArticleForm'
import postArticles from '../../services/postArticle'

export const NewArticle = () => {
  const navigate = useNavigate()

  const handleSubmit = async data => {
    const token = window.localStorage.getItem('token')
    await postArticles(data, token)
    navigate('/')
  }

  return <ArticleForm onSubmit={handleSubmit} />
}
