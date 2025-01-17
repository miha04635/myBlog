import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Pagination, ConfigProvider } from 'antd'
import { useNavigate } from 'react-router-dom'

import { TagList } from '../tagList'
import useGetArticles from '../../services/getArticles'
import servicesDate from '../../services/servicesDate'
import { setLiked } from '../../services/setLiked'

import styles from './index.module.css'

export const ListArticles = () => {
  const articles = useSelector(state => state.articles)
  const countArticles = useSelector(state => state.countArticles)
  const token = useSelector(state => state.token)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const savedPage = localStorage.getItem('currentPage')
    if (savedPage) {
      setCurrentPage(Number(savedPage))
    }
  }, [])

  const handlePageChange = page => {
    setCurrentPage(page)
    localStorage.setItem('currentPage', page)
  }

  useGetArticles((currentPage - 1) * 20)

  const handleClick = slug => {
    navigate(`/${slug}`)
  }

  const renderArticles = article => {
    if (!article || !article.title || !article.body || !article.author) {
      return null
    }
    const { title, tagList, body, slug, author, createdAt, favoritesCount, favorited } = article

    const { username, image } = author

    const createDate = servicesDate(createdAt)
    const truncatedText = text => {
      if (!text) {
        return null
      }
      return text.length > 150 ? `${text.substring(0, 150)}...` : text
    }

    return (
      <a key={slug} className={styles.container} onClick={() => handleClick(slug)}>
        <div className={styles.containerText}>
          <div className={styles.containerTitle}>
            <div className={styles.title}>{truncatedText(title)}</div>
            <button onClick={e => setLiked(e, slug, favorited, token, dispatch)} className={styles.heartContainer}>
              <div className={!favorited ? styles.heartImg : styles.HeartImgRed}></div>
              <span className={styles.heartCount}>{favoritesCount}</span>
            </button>
          </div>

          <TagList tagList={truncatedText(tagList)} />
          <div className={styles.text}>{truncatedText(body)}</div>
        </div>
        <div className={styles.containerAuthor}>
          <div className={styles.containerFlex}>
            <div className={styles.name}>{username}</div>
            <div className={styles.dateCreate}>{createDate}</div>
          </div>
          <img src={image} alt="avatar" className={styles.avatarImg} />
        </div>
      </a>
    )
  }

  return (
    <>
      {articles.map(article => renderArticles(article))}
      <ConfigProvider
        theme={{
          components: {
            Pagination: {
              itemActiveColor: '#fff', // Цвет текста активного элемента
              itemActiveBg: '#1890FF', // Фон активного элемента
              itemBg: 'none', // Фон для неактивных элементов
            },
          },
        }}
      >
        <Pagination
          current={currentPage}
          total={countArticles}
          pageSize={20}
          className={styles.paginationArticles}
          onChange={handlePageChange}
          align="center"
          showSizeChanger={false}
        />
      </ConfigProvider>
    </>
  )
}
