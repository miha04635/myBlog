import React, { useState, useRef, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { Modal, message, Spin } from 'antd'
import Cookies from 'js-cookie'

import { deleteArticles } from '../../services/deleteArticles'
import { TagList } from '../tagList'
import { formatDate } from '../../utility/FormatDate'
import { getAnArticles } from '../../services/getAnArticles'
import { setFavorited } from '../../services/setFavorited'
import useAuth from '../../hooks/useAuth'

import styles from './index.module.css'

export const ArticleDetails = () => {
  const { user } = useAuth()
  const buttonRef = useRef(null)
  const { slug } = useParams()
  const navigate = useNavigate()
  const token = Cookies.get('token')

  const [article, setArticle] = useState()
  const [isModalVisible, setModalVisible] = useState(false)
  const [modalStyle, setModalStyle] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAnArticles(slug)
      .then(result => {
        setLoading(false)
        setArticle(result.article)
      })
      .catch(() => {
        navigate('/notFound')
      })
  }, [slug, navigate])

  if (loading)
    return (
      <div className={styles.spinnerContainer}>
        <Spin size="large" />
      </div>
    )

  if (!article) return null

  const { username, image } = article.author
  const date = formatDate(article.updatedAt)

  const handleClickFavorited = async e => {
    e.stopPropagation()
    if (!token) {
      message.error('You must be logged in to like')
      return
    }
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
        height: 108,
      })
    }
    setModalVisible(true)
  }

  const handleOk = () => {
    deleteArticles(article.slug, token)
      .then(() => {
        message.success('Post deleted successfully')
        navigate('/')
      })
      .catch(() => {
        message.error('Ошибка удаления')
      })
  }

  const handleCancel = () => {
    setModalVisible(false)
  }

  const handleEdit = () => {
    navigate(`/articles/${article.slug}/edit`)
  }

  const isAuthor = user?.username === username
  return (
    <div className={styles.container}>
      <div className={styles.containerFlex}>
        <div className={styles.containerTitle}>
          <div className={styles.titleLiked}>
            <h1 className={styles.title}>{article.title}</h1>
            <button onClick={e => handleClickFavorited(e, slug)} className={styles.heartContainer}>
              <div className={article.favorited ? styles.HeartImgRed : styles.heartImg}></div>
              <span className={styles.heartCount}>{article.favoritesCount}</span>
            </button>
          </div>

          <TagList tagList={article.tagList} />
          <p className={styles.description}>{article.description}</p>
        </div>
        <div className={styles.authorButton}>
          <div className={styles.containerАuthor}>
            <div className={styles.containerFlexAuthor}>
              <p className={styles.name}>{username}</p>
              <p className={styles.dateCreate}>{date}</p>
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
