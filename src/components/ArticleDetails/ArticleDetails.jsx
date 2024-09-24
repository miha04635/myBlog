import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ReactMarkdown from 'react-markdown'

import formatDate from '../../services/formatDate'
import TagList from '../tagList/tagList'

import styles from './ArticleDetails.module.css'

const ArticleDetails = () => {
  const { slug } = useParams()
  const articles = useSelector(state => state.articles)
  const article = articles.find(el => el.slug === slug)

  if (!article) {
    return <div>Статья не найдена</div>
  }

  const { title, description, body, favoritesCount, createdAt } = article
  const { username, image } = article.author

  return (
    <div className={styles.container}>
      <div className={styles.containerFlex}>
        <div className={styles.containerText}>
          <div className={styles.containerTitle}>
            <div className={styles.title}>{title}</div>
            <div className={styles.heartContainer}>
              <div className={styles.heartImg}></div>
              <span className={styles.heartCount}>{favoritesCount}</span>
            </div>
          </div>

          <TagList tagList={article.tagList} />
        </div>

        <div className={styles.containerАuthor}>
          <div className={styles.containerFlexAuthor}>
            <div className={styles.name}>{username}</div>
            <div className={styles.dateCreate}>{formatDate(createdAt)}</div>
          </div>
          <img src={image} alt="аватар" className={styles.avatarImg} />
        </div>
      </div>

      <div className={styles.description}>{description}</div>
      <ReactMarkdown className={styles.body}>{body}</ReactMarkdown>
    </div>
  )
}

export default ArticleDetails
