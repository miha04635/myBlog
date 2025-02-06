import { useState } from 'react'
import { useForm } from 'react-hook-form'

import styles from './index.module.css'

export const ArticleForm = ({ onSubmit, initialData = {}, isEdit = false, fields }) => {
  const [tags, setTags] = useState(initialData.tagList || [])
  const [tagInput, setTagInput] = useState('')

  const {
    handleSubmit,
    register,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: initialData,
    mode: 'onChange',
  })

  const handleAddTag = e => {
    e.preventDefault()
    const trimmedTag = tagInput.trim()

    if (!trimmedTag) return

    if (tags.includes(trimmedTag)) {
      setError('tag', { type: 'duplicate', message: 'Tag already exists' })
    } else {
      setTags(prevTags => [...prevTags, trimmedTag])
      setTagInput('')
      clearErrors('tag')
    }
  }
  const handleDeleteTag = indexToDelete => {
    setTags(tags.filter((_, index) => index !== indexToDelete))
    clearErrors('tag')
  }

  const handleFormSubmit = data => {
    if (isEdit) {
      onSubmit({ ...data, tagList: tags })
    } else {
      onSubmit({ ...data, tags })
    }
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.articleForm}>
      <div className={styles.article}>{isEdit ? 'Edit Article' : 'Create New Article'}</div>

      <div className={styles.container}>
        {fields.map(({ name, label, type, validation, placeholder }) => (
          <div key={name} className={styles.inputContainer}>
            <div>{label}</div>
            {type === 'textarea' ? (
              <textarea placeholder={placeholder} {...register(name, validation)} className={styles.input} />
            ) : (
              <input type={type} placeholder={placeholder} {...register(name, validation)} className={styles.input} />
            )}
            {errors[name] && <span className={styles.error}>{errors[name].message}</span>}
          </div>
        ))}

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
