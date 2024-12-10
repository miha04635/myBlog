import { useState } from 'react'

import styles from './newArticle.module.css'

const NewArticle = () => {
  const [tags, setTags] = useState([])
  const [tagInput, setTagInput] = useState('')

  const handleAddTag = () => {
    if (tagInput.trim()) {
      setTags([...tags, tagInput.trim()])
      setTagInput('')
    }
  }

  const handleDeleteTag = indexToDelete => {
    setTags(tags.filter((_, index) => index !== indexToDelete))
  }

  return (
    <div className={styles.createNewArticle}>
      <div className={styles.article}>Create new article</div>

      <div className={styles.container}>
        <div className={styles.title}>
          <div>Title</div>
          <input type="text" placeholder="Title" />
        </div>

        <div className={styles.shortDescription}>
          <div>Short description</div>
          <input type="text" placeholder="Short description" />
        </div>

        <div className={styles.text}>
          <div>Text</div>
          <textarea placeholder="Text" />
        </div>

        <div className={styles.tags}>
          <div className={styles.containerTags}>Tags</div>
          {tags.map((tag, index) => (
            <div key={index} className={styles.tagRow}>
              <input type="text" value={tag} readOnly className={styles.tagInput} />
              <button className={styles.buttonDel} onClick={() => handleDeleteTag(index)}>
                Delete
              </button>
            </div>
          ))}
          <div className={styles.addTagRow}>
            <input
              type="text"
              placeholder="Tag"
              value={tagInput}
              onChange={e => setTagInput(e.target.value)}
              className={styles.tagInput}
            />
            <button className={styles.buttonAddTag} onClick={handleAddTag}>
              Add tag
            </button>
          </div>
        </div>

        <button className={styles.send}>Send</button>
      </div>
    </div>
  )
}

export default NewArticle
