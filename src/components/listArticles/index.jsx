import React, { useEffect, useState } from 'react'
import { Pagination, ConfigProvider, message, Spin } from 'antd'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Cookies from 'js-cookie'

import { TagList } from '../tagList'
import { apiGet } from '../../services/getArticles'
import { formatDate } from '../../utility/FormatDate'
import { setFavorited } from '../../services/setFavorited'

import styles from './index.module.css'

export const ListArticles = () => {
  const navigate = useNavigate()
  const token = Cookies.get('token')
  const [searchParams, setSearchParams] = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1

  const [articles, setArticles] = useState([])
  const [countArticles, setCountArticles] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true)
      const articlesData = await apiGet((currentPage - 1) * 20)
      if (articlesData) {
        setArticles(articlesData.articles)
        setCountArticles(articlesData.articlesCount)
      }
      setLoading(false)
    }

    fetchArticles()
  }, [currentPage])

  const handlePageChange = page => {
    setSearchParams({ page })
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
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return `${text.substring(0, maxLength)}...`
    }
    return text
  }

  const renderArticles = article => {
    if (!article) return null
    const { title, tagList, body, slug, author, createdAt, favoritesCount, favorited } = article
    const { username, image } = author
    const titleTrim = truncateText(title, 50)
    return (
      <a key={slug} className={styles.container} onClick={() => handleClick(slug)}>
        <div className={styles.containerText}>
          <div className={styles.containerTitle}>
            <div className={styles.title}>{titleTrim}</div>
            <button onClick={e => handleClickFavorited(e, slug)} className={styles.heartContainer}>
              <div className={favorited ? styles.HeartImgRed : styles.heartImg}></div>
              <span className={styles.heartCount}>{favoritesCount}</span>
            </button>
          </div>

          <TagList tagList={tagList} />
          <div className={styles.text}>{body}</div>
        </div>
        <div className={styles.containerAuthor}>
          <div className={styles.containerFlex}>
            <div className={styles.name}>{username}</div>
            <div className={styles.dateCreate}>{formatDate(createdAt)}</div>
          </div>
          <img src={image} alt="avatar" className={styles.avatarImg} />
        </div>
      </a>
    )
  }

  return (
    <>
      {loading ? (
        <Spin size="large" fullscreen="true" />
      ) : (
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
      )}
    </>
  )
}
