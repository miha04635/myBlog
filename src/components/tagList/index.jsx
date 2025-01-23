import React from 'react'

import styles from './index.module.css'

export const TagList = ({ tagList }) => (
  <div className={styles.tags}>
    {tagList?.map(tag =>
      tag.trim() ? (
        <span key={tag} className={styles.tag}>
          {tag}
        </span>
      ) : null
    )}
  </div>
)
