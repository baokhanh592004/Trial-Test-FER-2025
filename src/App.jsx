
import 'bootstrap/dist/css/bootstrap.min.css'

import React from 'react'
import { BrowserRouter, Routes as Routers, Route } from 'react-router-dom'
import MyNavbars from './components/MyNavbars'
import Home from './pages/Home'
import AllCards from './pages/AllCards'
import UnAvailableCards from './pages/UnAvailableCards'
import CardDetail from './pages/CardDetail'
import AddCard from './pages/AddCard'

function App() {  

  return (
    <BrowserRouter>
      <MyNavbars />
      <Routers>
        <Route path="/" element={<Home/>} />
        <Route path="/SE181542/AllCards" element={<AllCards/>} />
        <Route path="/SE181542/UnavailableCards" element={<UnAvailableCards/>} />
        <Route path="/card/:id" element={<CardDetail/>} />
        <Route path="/SE181542/AddCard" element={<AddCard/>} />
        
      </Routers>  
    </BrowserRouter>
  )
}

export default App
