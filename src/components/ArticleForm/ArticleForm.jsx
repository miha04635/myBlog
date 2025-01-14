import { useState } from 'react'
import { useForm } from 'react-hook-form'

import styles from './ArticleForm.module.css'

const ArticleForm = ({ onSubmit, initialData = {}, isEdit = false }) => {
  const [tags, setTags] = useState(initialData.tags || [])
  const [tagInput, setTagInput] = useState('')

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: initialData,
    mode: 'onChange',
  })

  const handleAddTag = e => {
    e.preventDefault()
    if (tagInput.trim()) {
      if (tags.includes(tagInput.trim())) {
        setError('tag', { type: 'duplicate', message: 'Tag already exists' })
      } else {
        setTags([...tags, tagInput.trim()])
        setTagInput('')
      }
    }
  }

  const handleDeleteTag = indexToDelete => {
    setTags(tags.filter((_, index) => index !== indexToDelete))
  }

  const handleFormSubmit = data => {
    onSubmit({ ...data, tags })
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.articleForm}>
      <div className={styles.article}>{isEdit ? 'Edit Article' : 'Create New Article'}</div>

      <div className={styles.container}>
        <div className={styles.title}>
          <div>Title</div>
          <input type="text" placeholder="Title" {...register('title', { required: 'Title is required' })} />
          {errors.title && <span className={styles.error}>{errors.title.message}</span>}
        </div>

        <div className={styles.shortDescription}>
          <div>Short description</div>
          <input
            type="text"
            placeholder="Short description"
            {...register('description', { required: 'Short description is required' })}
          />
          {errors.description && <span className={styles.error}>{errors.description.message}</span>}
        </div>

        <div className={styles.text}>
          <div>Text</div>
          <textarea placeholder="Text" {...register('body', { required: 'Text is required' })} />
          {errors.body && <span className={styles.error}>{errors.body.message}</span>}
        </div>

        <div className={styles.tags}>
          <div className={styles.containerTags}>Tags</div>
          {tags.map((tag, index) => (
            <div key={tag} className={styles.tagRow}>
              <input type="text" value={tag} readOnly className={styles.tagInput} />
              <button type="button" className={styles.buttonDel} onClick={() => handleDeleteTag(index)}>
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
            <button type="button" className={styles.buttonAddTag} onClick={handleAddTag}>
              Add tag
            </button>
          </div>
          {errors.tag && <span className={styles.error}>{errors.tag.message}</span>}
        </div>

        <button type="submit" className={styles.send}>
          {isEdit ? 'Save' : 'Send'}
        </button>
      </div>
    </form>
  )
}

export default ArticleForm
