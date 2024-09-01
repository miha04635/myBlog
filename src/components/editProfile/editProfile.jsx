import styles from './editProfile.module.css'

const EditProfile = () => {
  return (
    <div className={styles.editProfile}>
      <div className={styles.edit}>Edit Profile</div>

      <div className={styles.editProfileDetails}>
        <div className={styles.emailAddress}>
          <div>Username</div>
          <input type="text" placeholder="Username" />
        </div>

        <div className={styles.emailAddress}>
          <div>Email address</div>
          <input type="text" placeholder="Email address" />
        </div>

        <div className={styles.password}>
          <div>New Password</div>
          <input type="password" placeholder="New Password" />
        </div>

        <div className={styles.avatarImg}>
          <div>Avatar image (url)</div>
          <input type="password" placeholder="Avatar image" />
        </div>
      </div>

      <button className={styles.save}>Save</button>
    </div>
  )
}

export default EditProfile
