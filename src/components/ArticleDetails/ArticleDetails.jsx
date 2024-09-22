import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ReactMarkdown from 'react-markdown'

import TagList from '../tagList/tagList'

import styles from './ArticleDetails.module.css'

const ArticleDetails = () => {
  const { slug } = useParams()
  const articles = useSelector(state => state.articles)
  const article = articles.find(el => el.slug === slug)
  console.log(article)
  const { username, image } = article.author

  if (!article) {
    return <div> Article not found</div>
  }
  return (
    <div className={styles.container}>
      <div className={styles.containerFlex}>
        <div className={styles.containerTitle}>
          <h1 className={styles.title}>{article.title}</h1>
          <TagList tagList={article.tagList} />
        </div>

        <div className={styles.containerАuthor}>
          <div className={styles.containerFlexAuthor}>
            <div className={styles.name}>{username}</div>
            <div className={styles.dateCreate}>March 5, 2020</div>
          </div>
          <img src={image} alt="avatar" className={styles.avatarImg} />
        </div>
      </div>

      <div className={styles.description}>{article.description}</div>
      <ReactMarkdown className={styles.body}>{article.body}</ReactMarkdown>
    </div>
  )
}

export default ArticleDetails
