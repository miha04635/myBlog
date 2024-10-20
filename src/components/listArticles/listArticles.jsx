import React, { useState } from 'react'
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
  const pageSize = 20

  const handleClick = slug => {
    navigate(`/${slug}`)
  }

  // Вызов хука для загрузки статей с текущими параметрами
  useGetArticles(pageSize, (currentPage - 1) * pageSize)

  const handlePageChange = page => {
    setCurrentPage(page)
  }

  const renderArticles = article => {
    if (!article || !article.title || !article.body || !article.author) {
      return null // Или вернуть сообщение об ошибке
    }
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
        current={currentPage} // Указываем текущую страницу
        total={countArticles}
        pageSize={pageSize} // Указываем размер страницы
        className={styles.paginationArticles}
        onChange={handlePageChange}
        align="center"
        showSizeChanger={false}
      />
    </>
  )
}

export default ListArticles
