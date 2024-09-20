import React from 'react'
import { useSelector } from 'react-redux'
import { Pagination } from 'antd'

import styles from './listArticles.module.css'

const ListArticles = () => {
  const articles = useSelector(state => state.articles)

  const renderArticles = article => {
    const { title, tagList, body, slug, author } = article
    const { username, image } = author

    const truncatedBody = body.length > 150 ? `${body.substring(0, 150)}...` : body
    return (
      <div key={slug} className={styles.container}>
        <div className={styles.containerText}>
          <div className={styles.title}>{title}</div>
          {tagList && tagList.length > 0 && (
            <div className={styles.tags}>
              {tagList.map((tag, index) =>
                tag.trim() ? (
                  <span key={index} className={styles.tag}>
                    {tag}
                  </span>
                ) : null
              )}
            </div>
          )}
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
  if (!Array.isArray(articles)) {
    return <div>Loading...</div>
  }
  return (
    <>
      {articles.map(article => renderArticles(article))}
      <Pagination defaultCurrent={1} total={50} className={styles.paginationArticles} align="center" />
    </>
  )
}

export default ListArticles
