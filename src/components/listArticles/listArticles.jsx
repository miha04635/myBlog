import React from 'react'
import { useSelector } from 'react-redux'
import { Pagination } from 'antd'
import { useNavigate } from 'react-router-dom'

import TagList from '../tagList/tagList'

import styles from './listArticles.module.css'

const ListArticles = () => {
  const articles = useSelector(state => state.articles)
  const navigate = useNavigate()
  const handleClick = slug => {
    navigate(`/${slug}`)
  }

  const renderArticles = article => {
    const { title, tagList, body, slug, author } = article
    const { username, image } = author

    const truncatedBody = body.length > 150 ? `${body.substring(0, 150)}...` : body
    return (
      <div key={slug} className={styles.container} onClick={() => handleClick(slug)}>
        <div className={styles.containerText}>
          <div className={styles.title}>{title}</div>
          <TagList tagList={tagList} />
          <div className={styles.text}>{truncatedBody}</div>
        </div>
        <div className={styles.containerАuthor}>
          <div className={styles.containerFlex}>
            <div className={styles.name}>{username}</div>
            <div className={styles.dateCreate}>March 5, 2020</div>
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
