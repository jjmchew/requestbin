import { Routes, Route } from 'react-router-dom'
import LandingPage from './components/LandingPage.tsx'
import RequestsPage from './components/RequestsPage.tsx'
import './App.css'


function App() {

  return (
    <>
      <div>requestBin</div>
      <Routes>
        <Route path="/view/:binName" element={<RequestsPage />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </>
  )
}

export default App
