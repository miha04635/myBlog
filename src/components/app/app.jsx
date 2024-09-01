import SignUpForm from '../signUpForm/signUpform'
import SignInForm from '../signInForm/signInForm'
import Header from '../header/header'

import styles from './app.module.css'
import './reset.css'

function App() {
  return (
    <div className={styles.app}>
      <Header />
      {/* <SignUpForm /> */}
      <SignInForm />
    </div>
  )
}

export default App
