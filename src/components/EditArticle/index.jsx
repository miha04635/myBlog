import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Cookies from 'js-cookie'

import { ArticleForm } from '../ArticleForm'
import { updateArticle } from '../../services/updateArticle'

export const EditArticle = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const article = useSelector(state => state.article)

  if (!article) {
    return <div>Article not found</div>
  }

  const handleSubmit = async data => {
    const token = Cookies.get('token')

    try {
      const update = await updateArticle(slug, data, token)
      console.log(update)

      navigate(`/articleDetail/${slug}`)
    } catch (error) {
      console.error('Ошибка при обновлении статьи:', error)
    }
  }

  return <ArticleForm onSubmit={handleSubmit} initialData={article} isEdit />
}
