import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Cookies from 'js-cookie'

import { SignUp } from '../signUpForm'
import { SignIn } from '../signInForm'
import { EditProfile } from '../editProfile'
import { NewArticle } from '../newArticle'
import { Header } from '../header'
import { ListArticles } from '../listArticles'
import { ArticleDetails } from '../articleDetails'
import { NotFound } from '../notFound'
import { EditArticle } from '../editArticles'
import { OfflinePage } from '../offlinePage'
import { getUser } from '../../services/getUser'
import { getUsername } from '../../actions'

import styles from './index.module.css'
import './reset.css'

function App() {
  const dispatch = useDispatch()
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  useEffect(() => {
    const token = Cookies.get('token')
    if (token) {
      getUser(token).then(userData => {
        dispatch(getUsername(userData.user.username))
      })
    }
  }, [])

  if (!isOnline) return <OfflinePage />

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
