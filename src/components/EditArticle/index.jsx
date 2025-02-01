import { useNavigate, useParams } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useState, useEffect } from 'react'

import { ArticleForm } from '../articleForm'
import { updateArticle } from '../../services/updateArticle'
import { getAnArticles } from '../../services/getAnArticles'
import { filedBody, filedDescription, filedTitle } from '../../constants/fields'

export const EditArticle = () => {
  const { slug } = useParams()

  const navigate = useNavigate()
  const [article, setArticle] = useState()

  useEffect(() => {
    const handleArticlesFetch = async () => {
      const articlesData = await getAnArticles(slug)
      if (!articlesData.success) {
        navigate('/notFound')
      } else {
        setArticle(articlesData.data.article)
      }
    }

    handleArticlesFetch()
  }, [slug, navigate])

  if (!article) {
    return null
  }

  const handleSubmit = async data => {
    const token = Cookies.get('token')

    try {
      const update = await updateArticle(slug, data, token)

      navigate(`/articleDetail/${slug}`)
      return update
    } catch (error) {
      console.error('Ошибка при обновлении статьи:', error)
    }
  }

  return (
    <ArticleForm
      onSubmit={handleSubmit}
      initialData={article}
      isEdit
      fields={[filedTitle, filedDescription, filedBody]}
    />
  )
}
