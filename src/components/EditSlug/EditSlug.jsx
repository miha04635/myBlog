import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import ArticleForm from '../ArticleForm/ArticleForm'
import updateArticles from '../../services/updateArticle'

const EditArticle = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const articles = useSelector(state => state.articles)
  console.log('Slug >>>', slug)

  const article = articles.find(el => el.slug === slug)

  if (!article) {
    return <div>Article not found</div>
  }

  const handleSubmit = async data => {
    const token = window.localStorage.getItem('token')
    await updateArticles(slug, data, token)
    console.log(123123123123)

    navigate('/')
  }

  return <ArticleForm onSubmit={handleSubmit} initialData={article} isEdit />
}

export default EditArticle
