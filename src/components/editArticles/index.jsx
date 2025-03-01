import { useNavigate, useParams } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useState, useEffect } from 'react'
import { Spin, message } from 'antd'

import { ArticleForm } from '../articleForm'
import { updateArticle } from '../../services/updateArticle'
import { getAnArticles } from '../../services/getAnArticles'
import { filedBody, filedDescription, filedTitle } from '../../constants/fields'

export const EditArticle = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [article, setArticle] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAnArticles(slug)
      .then(result => {
        setLoading(false)
        return setArticle(result.article)
      })
      .catch(err => {
        if (err) {
          navigate('/notFound')
        }
      })
  }, [slug, navigate])

  if (loading) return <Spin size="large" fullscreen />

  if (!article) {
    return null
  }

  const handleSubmit = data => {
    const token = Cookies.get('token')
    updateArticle(slug, data, token)
      .then(() => {
        navigate(`/articleDetail/${slug}`)
      })
      .catch(() => {
        message.error('Ops 0_o, Попробуйте позже')
      })
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
