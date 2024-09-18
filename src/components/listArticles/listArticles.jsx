import React from 'react'

import styles from './listArticles.module.css'

const ListArticles = () => {
  return (
    <div className={styles.container}>
      <div className={styles.containerText}>
        <div className={styles.title}>Title</div>
        <div className={styles.tags}>Tags</div>
        <div className={styles.text}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi nulla quos alias voluptatum et ducimus,
          neque tempore, suscipit accusamus placeat perspiciatis dolorum, quidem quasi. Nesciunt veniam facilis
          laudantium et eligendi.
        </div>
      </div>
      <div className={styles.containerАuthor}>
        <div className={styles.name}>John Doe</div>
        <div className={styles.dateCreate}>March 5, 2020</div>
      </div>
    </div>
  )
}

export default ListArticles
