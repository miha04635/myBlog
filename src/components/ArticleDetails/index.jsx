import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import ReactMarkdown from 'react-markdown'

import { setLiked } from '../../services/setLiked'
import deleteArticles from '../../services/deleteArticles'
import { TagList } from '../tagList'
import formatDate from '../../services/servisesDate'

import styles from './index.module.css'

export const ArticleDetails = () => {
  const { slug } = useParams()
  const articles = useSelector(state => state.articles)
  const user = useSelector(state => state.username)
  const token = useSelector(state => state.token)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const article = articles.find(el => el.slug === slug)

  const date = formatDate(article.updatedAt)

  const { username, image } = article.author

  if (!article) {
    return <div> Article not found</div>
  }

  const handleEdit = () => {
    navigate(`/articles/${article.slug}/edit`)
  }
  const handleDelete = () => {
    const isConfirmed = window.confirm('Вы уверены, что хотите удалить эту статью?')
    if (!isConfirmed) {
      return
    }
    deleteArticles(article.slug, token)
    navigate('/')
  }
  const isAuthor = username === user

  return (
    <div className={styles.container}>
      <div className={styles.containerFlex}>
        <div className={styles.containerTitle}>
          <div className={styles.titleLiked}>
            <h1 className={styles.title}>{article.title}</h1>
            <button
              onClick={e => setLiked(e, slug, article.favorited, token, dispatch)}
              className={styles.heartContainer}
            >
              <div className={!article.favorited ? styles.heartImg : styles.HeartImgRed}></div>
              <span className={styles.heartCount}>{article.favoritesCount}</span>
            </button>
          </div>

          <TagList tagList={article.tagList} />
        </div>

        <div className={styles.containerАuthor}>
          <div className={styles.containerFlexAuthor}>
            <div className={styles.name}>{username}</div>
            <div className={styles.dateCreate}>{date}</div>
          </div>
          <img src={image} alt="avatar" className={styles.avatarImg} />
        </div>
      </div>

      <div className={styles.description}>{article.description}</div>
      <ReactMarkdown className={styles.body}>{article.body}</ReactMarkdown>
      {isAuthor && (
        <div className={styles.buttons}>
          <button className={styles.editButton} onClick={handleEdit}>
            Edit
          </button>
          <button className={styles.deleteButton} onClick={handleDelete}>
            Delete
          </button>
        </div>
      )}
    </div>
  )
}
