import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import postArticles from '../../services/postArticle'

import styles from './newArticle.module.css'

const NewArticle = () => {
  const navigate = useNavigate()

  const [tags, setTags] = useState([])
  const [tagInput, setTagInput] = useState('')

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm({
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

  const onSubmit = data => {
    const token = window.localStorage.getItem('token')
    console.log('tags>>>>', tags)

    const articleData = { ...data, token, tags }

    postArticles(articleData, token)
    navigate('/')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.createNewArticle}>
      <div className={styles.article}>Create new article</div>

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
          {errors.text && <span className={styles.error}>{errors.text.message}</span>}
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
          Send
        </button>
      </div>
    </form>
  )
}

export default NewArticle
