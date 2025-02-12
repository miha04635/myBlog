import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

import { ArticleForm } from '../articleForm'
import { postArticles } from '../../services/postArticle'
import { filedBody, filedDescription, filedTitle } from '../../constants/fields'

export const NewArticle = () => {
  const navigate = useNavigate()

  const handleSubmit = async data => {
    const token = Cookies.get('token')
    const response = await postArticles(data, token)

    if (response && response.user && response.user.article && response.user.article.slug) {
      navigate(`/articleDetail/${response.user.article.slug}`)
    }
  }
  return <ArticleForm onSubmit={handleSubmit} fields={[filedTitle, filedDescription, filedBody]} />
}
