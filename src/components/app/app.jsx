import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import SignUpForm from '../signUpForm/signUpform'
import SignInForm from '../signInForm/signInForm'
import EditProfile from '../editProfile/editProfile'
import NewArticle from '../newArticle/newArticle'
import Header from '../header/header'
import ListArticles from '../listArticles/listArticles'

import styles from './app.module.css'
import './reset.css'

function App() {
  return (
    <div className={styles.app}>
      <Router>
        <Header />
        <ListArticles />
        <Routes>
          <Route path="/signUp" element={<SignUpForm />} />
          <Route path="/SignIn" element={<SignInForm />} />
          <Route path="/EditProfile" element={<EditProfile />} />
          <Route path="/NewArticle" element={<NewArticle />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
