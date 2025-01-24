import React from 'react'

import styles from './index.module.css'

export const TagList = ({ tagList }) => {
  return (
    <div className={styles.tags}>
      {tagList?.map((tag, index) =>
        tag.trim() ? (
          <span key={index} className={styles.tag}>
            {tag}
          </span>
        ) : null
      )}
    </div>
  )
}
