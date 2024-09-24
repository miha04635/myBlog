import React from 'react'
import { useSelector } from 'react-redux'
import { Pagination } from 'antd'
import { useNavigate } from 'react-router-dom'

import formatDate from '../../services/formatDate'
import TagList from '../tagList/tagList'

import styles from './listArticles.module.css'

const ListArticles = () => {
  const articles = useSelector(state => state.articles)
  const navigate = useNavigate()
  const handleClick = slug => {
    navigate(`/${slug}`)
  }

  const renderArticles = article => {
    const { title, tagList, body, slug, author, createdAt, favoritesCount } = article
    const { username, image } = author

    const truncatedBody = body.length > 150 ? `${body.substring(0, 150)}...` : body
    return (
      <div key={slug} className={styles.container} onClick={() => handleClick(slug)}>
        <div className={styles.containerText}>
          <div className={styles.containerTitle}>
            <div className={styles.title}>{title}</div>
            <div className={styles.heartContainer}>
              <div className={styles.heartImg}></div>
              <span className={styles.heartCount}>{favoritesCount}</span>
            </div>
          </div>

          <TagList tagList={tagList} />
          <div className={styles.text}>{truncatedBody}</div>
        </div>
        <div className={styles.containerАuthor}>
          <div className={styles.containerFlex}>
            <div className={styles.name}>{username}</div>
            <div className={styles.dateCreate}>{formatDate(createdAt)}</div>
          </div>
          <img src={image} alt="avatar" className={styles.avatarImg} />
        </div>
      </div>
    )
  }

  return (
    <>
      {articles.map(article => renderArticles(article))}
      <Pagination defaultCurrent={1} total={50} className={styles.paginationArticles} align="center" />
    </>
  )
}

export default ListArticles
