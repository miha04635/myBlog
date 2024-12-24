import React from 'react'

import styles from './tagList.module.css'

const TagList = ({ tagList }) => {
  const renderTags = () => {
    return (
      <div className={styles.tags}>
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
      </div>
    )
  }
  return <>{renderTags()}</>
}

export default TagList
