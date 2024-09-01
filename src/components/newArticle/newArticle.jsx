import styles from './newArticle.module.css'

const NewArticle = () => {
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
          <input type="text" placeholder="Title" />
        </div>

        <div className={styles.text}>
          <div>Text</div>
          <textarea type="text" placeholder="Text" />
        </div>
        <div className={styles.tags}>
          <div className={styles.containerTags}>Tag</div>
          <input type="text" placeholder="Tag" />
          <button className={styles.buttonDel}>Delete</button>
          <button className={styles.buttonAddTag}>Add tag</button>
        </div>
        <button className={styles.send}>Send</button>
      </div>
    </div>
  )
}

export default NewArticle
