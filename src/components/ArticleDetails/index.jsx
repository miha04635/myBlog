import React, { useState, useRef, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { Modal } from 'antd'
import Cookies from 'js-cookie'

import { deleteArticles } from '../../services/deleteArticles'
import { TagList } from '../tagList'
import { formatDate } from '../../utility/FormatDate'
import { apiGetAnArticles } from '../../services/useGetAnArticle'
import { setFavorited } from '../../services/setFavorited'
import useAuth from '../../hooks/useAuth'

import styles from './index.module.css'

export const ArticleDetails = () => {
  const { user } = useAuth()

  const [article, setArticle] = useState()

  const navigate = useNavigate()

  const [isModalVisible, setModalVisible] = useState(false)
  const [modalStyle, setModalStyle] = useState({})
  const buttonRef = useRef(null)

  const { slug } = useParams()

  const [error, setError] = useState(null)

  useEffect(() => {
    const handleArticlesFetch = async () => {
      try {
        const articlesData = await apiGetAnArticles(slug)
        if (!articlesData.success) {
          navigate('/notFound')
        } else {
          setArticle(articlesData.data.article)
        }
      } catch (err) {
        setError('Failed to load the article. Please try again later.')
      }
    }

    handleArticlesFetch()
  }, [slug])

  const token = Cookies.get('token')

  if (error) {
    return <div>{error}</div>
  }
  if (!article) {
    return null
  }
  const date = formatDate(article.updatedAt)

  const { username, image } = article.author

  const handleClickFavorited = async e => {
    e.stopPropagation()

    const action = article.favorited ? 'unlike' : 'like'
    const updatedArticle = await setFavorited(action, slug, token)

    if (updatedArticle) {
      setArticle(updatedArticle.article)
    }
  }

  const showModal = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      setModalStyle({
        position: 'absolute',
        top: rect.bottom + window.scrollY - 35,
        left: rect.left + window.scrollX + 90,
        width: 246,
        hight: 108,
      })
    }
    setModalVisible(true)
  }

  const handleOk = () => {
    deleteArticles(article.slug, token)
    navigate('/')
  }

  const handleCancel = () => {
    setModalVisible(false)
  }

  const handleEdit = () => {
    navigate(`/articles/${article.slug}/edit`)
  }

  const isAuthor = user && username === user.username

  return (
    <div className={styles.container}>
      <div className={styles.containerFlex}>
        <div className={styles.containerTitle}>
          <div className={styles.titleLiked}>
            <h1 className={styles.title}>{article.title}</h1>
            <button onClick={e => handleClickFavorited(e, slug)} className={styles.heartContainer}>
              <div className={!article.favorited ? styles.heartImg : styles.HeartImgRed}></div>
              <span className={styles.heartCount}>{article.favoritesCount}</span>
            </button>
          </div>

          <TagList tagList={article.tagList} />
          <div className={styles.description}>{article.description}</div>
        </div>
        <div className={styles.authorButton}>
          <div className={styles.containerАuthor}>
            <div className={styles.containerFlexAuthor}>
              <div className={styles.name}>{username}</div>
              <div className={styles.dateCreate}>{date}</div>
            </div>
            <img src={image} alt="avatar" className={styles.avatarImg} />
          </div>
          {isAuthor && (
            <div className={styles.buttons}>
              <button className={styles.deleteButton} onClick={showModal} ref={buttonRef}>
                Delete
              </button>
              <button className={styles.editButton} onClick={handleEdit}>
                Edit
              </button>
            </div>
          )}
        </div>
      </div>
      {isModalVisible && (
        <Modal
          open={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="Yes"
          cancelText="No"
          mask={false}
          closeIcon={null}
          style={modalStyle}
          className={styles.modalContainer}
        >
          <div className={styles.triangle}></div>
          <p>Are you sure to delete this article?</p>
        </Modal>
      )}
      <ReactMarkdown className={styles.body}>{article.body}</ReactMarkdown>
    </div>
  )
}
