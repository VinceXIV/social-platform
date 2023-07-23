import './App.css'
import Header from './sections/header/header'
import Login from './pages/login/login'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/home/home'
import Profile from './pages/profile/profile'
import { useEffect } from 'react'
import { mobileThreshold } from './utilities/variables'
import { useDispatch } from 'react-redux'
import { updateView } from './redux/view'
import PostPage from './pages/post/postPage'
import SubscriptionCancelled from './pages/cancel-subscription/subscriptionCancelled'
import SuccessfulSubscription from './pages/successful-subscription/successfulSubscription'

function App() {
  const dispatch = useDispatch()

  useEffect(()=>{
    window.addEventListener('resize', updateViewMode)

    return ()=>{
      window.removeEventListener('resize', updateViewMode)
    }
  }, [updateViewMode])

  function updateViewMode(){
    if(window.innerWidth > mobileThreshold){
      dispatch(updateView('desktop'))
    }else {
      dispatch(updateView('mobile'))
    }
  }

  return (
    <>
      <Header />
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/home/:action" element={<Home />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/users/:id/profile" element={<Profile />} />
        <Route exact path="/posts/:id" element={<PostPage />} />
        <Route exact path="/subscriptions/cancelled" element={<SubscriptionCancelled />} />
        <Route exact path="/subscriptions/success" element={<SuccessfulSubscription />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  )
}

export default App
