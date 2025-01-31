import React, { useEffect, useState } from 'react'
import { Pagination, ConfigProvider, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

import { TagList } from '../tagList'
import { apiGet } from '../../services/getArticles'
import { formatDate } from '../../utility/FormatDate'
import { setFavorited } from '../../services/setFavorited'

import styles from './index.module.css'

export const ListArticles = () => {
  const navigate = useNavigate()

  const [articles, setArticles] = useState([])
  const [countArticles, setCountArticles] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  const token = Cookies.get('token')

  useEffect(() => {
    const savedPage = localStorage.getItem('currentPage')
    if (savedPage) {
      setCurrentPage(Number(savedPage))
    }
  }, [])

  useEffect(() => {
    const handleArticlesFetch = async () => {
      const articlesData = await apiGet((currentPage - 1) * 20)
      if (articlesData) {
        setArticles(articlesData.articles)
        setCountArticles(articlesData.articlesCount)
      }
    }

    handleArticlesFetch()
  }, [currentPage])

  const handlePageChange = page => {
    setCurrentPage(page)
    localStorage.setItem('currentPage', page)
  }

  const handleClick = slug => {
    navigate(`articleDetail/${slug}`)
  }

  const handleClickFavorited = async (e, slug) => {
    e.stopPropagation()

    if (!token) {
      message.error('You must be logged in to like')
      return
    }

    const currentArticle = articles.find(article => article.slug === slug)
    const action = currentArticle.favorited ? 'unlike' : 'like'
    const updatedArticle = await setFavorited(action, slug, token)

    if (updatedArticle) {
      setArticles(prevArticles =>
        prevArticles.map(article => (article.slug === slug ? updatedArticle.article : article))
      )
    }
  }

  const renderArticles = article => {
    if (!article) {
      return null
    }
    const { title, tagList, body, slug, author, createdAt, favoritesCount, favorited } = article

    const { username, image } = author

    const createDate = formatDate(createdAt)
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
            <button onClick={e => handleClickFavorited(e, slug)} className={styles.heartContainer}>
              <div className={favorited ? styles.HeartImgRed : styles.heartImg}></div>
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
          <img
            src={image}
            alt="avatar"
            className={styles.avatarImg}
            onError={e => {
              e.target.src = 'https://static.productionready.io/images/smiley-cyrus.jpg'
            }}
          />
        </div>
      </a>
    )
  }
  if (!articles.length) {
    return null
  }
  return (
    <>
      {articles.map(article => renderArticles(article))}
      <ConfigProvider
        theme={{
          components: {
            Pagination: {
              itemActiveColor: '#fff',
              itemActiveBg: '#1890FF',
              itemBg: 'none',
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
