import { useNavigate } from 'react-router-dom'

import ArticleForm from '../ArticleForm/ArticleForm'
import postArticles from '../../services/postArticle'

const NewArticle = () => {
  const navigate = useNavigate()

  const handleSubmit = async data => {
    const token = window.localStorage.getItem('token')
    await postArticles(data, token)
    navigate('/')
  }

  return <ArticleForm onSubmit={handleSubmit} />
}

export default NewArticle
