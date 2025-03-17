import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Cookies from 'js-cookie'
import { message } from 'antd'

import { ArticleForm } from '../articleForm'
import { postArticles } from '../../services/postArticle'
import { filedBody, filedDescription, filedTitle } from '../../constants/fields'

export const NewArticle = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async data => {
    setLoading(true)
    try {
      const token = Cookies.get('token')
      console.log('Article data:', data)
      const response = await postArticles(data, token)

      if (response && response.article && response.article.slug) {
        navigate(`/articleDetail/${response.article.slug}`)
      }
    } catch (error) {
      message.error('Could not submit article form later')
    } finally {
      setLoading(false)
    }
  }
  return <ArticleForm onSubmit={handleSubmit} fields={[filedTitle, filedDescription, filedBody]} loading={loading} />
}
