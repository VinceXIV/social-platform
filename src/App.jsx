import './App.css'
import Header from './sections/header/header'
import Login from './pages/login/login'
import { Routes, Route } from 'react-router-dom'


function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/" element={<Login />} />
      </Routes>
    </>
  )
}

export default App
