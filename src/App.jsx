// import HomePage from './Component/Mainpage'
// import HomePage from './Component/HomePage'

import HomePages from './Component/Home'
import MuseumBooking from './Explore'
import Login from './Component/Auth/Login'
import Navbar from './Component/Navbar'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePages />} />
          <Route path="/explore" element={<MuseumBooking />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/home2" element={<HomePage2 />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
