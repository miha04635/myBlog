import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { SignUpForm } from '../signUpForm'
import { SignInForm } from '../signInForm'
import { EditProfile } from '../editProfile'
import { NewArticle } from '../newArticle'
import { Header } from '../header'
import { ListArticles } from '../listArticles'
import { EditArticle } from '../EditArticle'
import { ArticleDetails } from '../ArticleDetails'
import { NotFound } from '../NotFound'

import styles from './index.module.css'
import './reset.css'

function App() {
  return (
    <div className={styles.app}>
      <Router>
        <Header />
        <div className={styles.container}>
          <Routes>
            <Route path="/" element={<ListArticles />} />
            <Route path="/articleDetail/:slug" element={<ArticleDetails />} />
            <Route path="/signUp" element={<SignUpForm />} />
            <Route path="/SignIn" element={<SignInForm />} />
            <Route path="/EditProfile" element={<EditProfile />} />
            <Route path="/articles/:slug/edit" element={<EditArticle />} />
            <Route path="/NewArticle" element={<NewArticle />} />
            <Route path="/notFound" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </div>
  )
}

export default App
