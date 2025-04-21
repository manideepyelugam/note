import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Notebooks from './pages/Notebooks'
import Login from './pages/Login'
import Register from './pages/Register'
import Protector from './pages/Protector'
import Logout from './pages/Logout'


const App = () => {
  return (
    <div className="flex-1 h-screen w-full overflow-hidden">
        <Routes>
          <Route path="/" element={<Protector><Home /></Protector>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout/>} /> 
          <Route path="/spaces/:spaceId" element={<Protector><Home /></Protector>} />
          <Route path="/notebooks/:notebookId" element={<Protector><Home /></Protector>} />


        </Routes>
      </div>
  )
}

export default App