import { Routes, Route } from 'react-router-dom'
import LandingPage from './components/LandingPage.tsx'
import RequestsPage from './components/RequestsPage.tsx'
import './App.css'


function App() {

  return (
    <>
      <div>dumbstarFiya</div>
      <Routes>
        <Route path="/view/:binName" element={<RequestsPage />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
      <h2>ya wanna burn one down?</h2>
      <div>burn burn yea you wanna burn</div>
    </>
  )
}

export default App
