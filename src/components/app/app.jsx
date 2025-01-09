import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import GetArticles from '../../services/getArticles'
import SignUpForm from '../signUpForm/signUpform'
import SignInForm from '../signInForm/signInForm'
import EditProfile from '../editProfile/editProfile'
import NewArticle from '../newArticle/newArticle'
import Header from '../header/header'
import ListArticles from '../listArticles/listArticles'
import ArticleDetails from '../ArticleDetails/ArticleDetails'
import ArticleForm from '../ArticleForm/ArticleForm'
import EditSlug from '../EditSlug/EditSlug'

import styles from './app.module.css'
import './reset.css'

function App() {
  return (
    <div className={styles.app}>
      <Router>
        <Header />
        <div className={styles.container}>
          <Routes>
            <Route path="/" element={<ListArticles />} />
            <Route path="/:slug" element={<ArticleDetails />} />
            <Route path="/signUp" element={<SignUpForm />} />
            <Route path="/SignIn" element={<SignInForm />} />
            <Route path="/EditProfile" element={<EditProfile />} />
            <Route path="/articles/:slug/edit" element={<EditSlug />} />

            <Route path="/NewArticle" element={<NewArticle />} />
          </Routes>
        </div>
      </Router>
      <GetArticles />
    </div>
  )
}

export default App
