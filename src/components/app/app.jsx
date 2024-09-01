import SignUpForm from '../signUpForm/signUpform'
import SignInForm from '../signInForm/signInForm'
import EditProfile from '../editProfile/editProfile'
import NewArticle from '../newArticle/newArticle'
import Header from '../header/header'

import styles from './app.module.css'
import './reset.css'

function App() {
  return (
    <div className={styles.app}>
      <Header />
      {/* <SignUpForm /> */}
      {/* <SignInForm /> */}
      {/* <EditProfile /> */}
      <NewArticle />
    </div>
  )
}

export default App
