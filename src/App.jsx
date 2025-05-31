import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePages from './Component/Home';
import MuseumBooking from './Explore';
import Login from './Component/Auth/Login';
import Navbar from './Component/Navbar';
import TicketBookingManager from './pages/TicketBookingManager';
import MuseumChatbot from './Component/Chatbot';

import './App.css';

function App() {
  return (
    <Router>
      <div className='relative'>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePages />} />
          <Route path="/explore" element={<MuseumBooking />} />
          <Route path="/login" element={<Login />} />
          <Route path="/my-bookings" element={<TicketBookingManager />} />
        </Routes>
        <MuseumChatbot />
      </div>
    </Router>
  );
}

export default App;
