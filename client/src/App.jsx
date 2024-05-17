import { LogIn } from 'lucide-react';
import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './assets/Pages/Login.jsx'
import Signup from './assets/Pages/Signup.jsx'
import Home from './assets/Pages/Home.jsx'
import Addfood from './assets/Pages/Addfood.jsx'

function App() {
 

  return (
<Router>
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/Signup" element={<Signup />} />
    <Route path="/home" element={<Home />} />
    <Route path="/addfood" element={<Addfood />} />
  </Routes>
</Router>
  )
}

export default App
