import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Pagination } from 'antd'
import { useNavigate } from 'react-router-dom'

import formatDate from '../../services/formatDate'
import TagList from '../tagList/tagList'
import useGetArticles from '../../services/getArticles'

import styles from './listArticles.module.css'

const ListArticles = () => {
  const articles = useSelector(state => state.articles)
  const countArticles = useSelector(state => state.countArticles)

  const navigate = useNavigate()

  const [currentPage, setCurrentPage] = useState(1)

  const handleClick = slug => {
    navigate(`/${slug}`)
  }

  useGetArticles((currentPage - 1) * 20)

  const handlePageChange = page => {
    setCurrentPage(page)
  }

  const renderArticles = article => {
    if (!article || !article.title || !article.body || !article.author) {
      return null
    }
    const { title, tagList, body, slug, author, createdAt, favoritesCount } = article

    const { username, image } = author

    const truncatedText = text => {
      if (!text) {
        return null
      }
      return text.length > 150 ? `${text.substring(0, 150)}...` : text
    }

    return (
      <div key={slug} className={styles.container} onClick={() => handleClick(slug)}>
        <div className={styles.containerText}>
          <div className={styles.containerTitle}>
            <div className={styles.title}>{truncatedText(title)}</div>
            <div className={styles.heartContainer}>
              <div className={styles.heartImg}></div>
              <span className={styles.heartCount}>{favoritesCount}</span>
            </div>
          </div>

          <TagList tagList={truncatedText(tagList)} />
          <div className={styles.text}>{truncatedText(body)}</div>
        </div>
        <div className={styles.containerAuthor}>
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
      <Pagination
        current={currentPage}
        total={countArticles}
        pageSize={20}
        className={styles.paginationArticles}
        onChange={handlePageChange}
        align="center"
        showSizeChanger={false}
      />
    </>
  )
}

export default ListArticles
