import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import CreateMeet from './pages/CreateMeet'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-meet" element={<CreateMeet />} />
      </Routes>
      <Toaster position="top-right" />
    </BrowserRouter>
  )
}

export default App
