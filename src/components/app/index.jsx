import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { SignUp } from '../signUpForm'
import { SignIn } from '../signInForm'
import { EditProfile } from '../editProfile'
import { NewArticle } from '../newArticle'
import { Header } from '../header'
import { ListArticles } from '../listArticles'
import { ArticleDetails } from '../articleDetails'
import { NotFound } from '../notFound'
import { EditArticle } from '../editArticleTemp'

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
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/SignIn" element={<SignIn />} />
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
