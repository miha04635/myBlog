import React, { useState, useRef, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import ReactMarkdown from 'react-markdown'
import { Modal } from 'antd'
import Cookies from 'js-cookie'

import { setLiked } from '../../services/setLiked'
import { deleteArticles } from '../../services/deleteArticles'
import { TagList } from '../tagList'
import { formatDate } from '../../utility/FormatDate'
import { apiGetAnArticles } from '../../services/useGetAnArticle'
import { saveAnArticles } from '../../actions/actions'

import styles from './index.module.css'

export const ArticleDetails = () => {
  const [isModalVisible, setModalVisible] = useState(false)
  const [modalStyle, setModalStyle] = useState({})
  const buttonRef = useRef(null)

  const { slug } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const handleArticlesFetch = async () => {
      const articlesData = await apiGetAnArticles(slug)
      if (!articlesData.success) {
        navigate('/notFound')
      } else {
        dispatch(saveAnArticles(articlesData))
      }
    }

    handleArticlesFetch()
  }, [dispatch, slug])

  const article = useSelector(state => state.article)
  const articles = useSelector(state => state.articles)

  const user = useSelector(state => state.username)
  const token = Cookies.get('token')

  if (!article) {
    return null
  }

  const date = formatDate(article.updatedAt)

  const { username, image } = article.author

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

  if (!article) {
    return <div> Article not found</div>
  }

  const handleEdit = () => {
    navigate(`/articles/${article.slug}/edit`)
  }

  const isAuthor = username === user

  return (
    <div className={styles.container}>
      <div className={styles.containerFlex}>
        <div className={styles.containerTitle}>
          <div className={styles.titleLiked}>
            <h1 className={styles.title}>{article.title}</h1>
            <button
              onClick={e => setLiked(e, slug, articles.favorited, token, dispatch)}
              className={styles.heartContainer}
            >
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
