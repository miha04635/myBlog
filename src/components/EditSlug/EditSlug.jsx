import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import ArticleForm from '../ArticleForm/ArticleForm'
import updateArticles from '../../services/updateArticle'

const EditArticle = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const articles = useSelector(state => state.articles)

  const article = articles.find(el => el.slug === slug)

  if (!article) {
    return <div>Article not found</div>
  }

  const handleSubmit = async data => {
    const token = window.localStorage.getItem('token')
    await updateArticles(slug, data, token)

    navigate('/')
  }

  return <ArticleForm onSubmit={handleSubmit} initialData={article} isEdit />
}

export default EditArticle
