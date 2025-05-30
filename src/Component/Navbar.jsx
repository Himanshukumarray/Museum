import React, { useState } from 'react'
import { Book, Ticket, Menu, X } from 'lucide-react'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [ticketModal, setTicketModal] = useState(false)

  return (
    <div>
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-lg shadow-lg z-50 border-b border-amber-200">
        <div className="max-w-7xl mx-auto px-6 ">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-600 to-orange-600 rounded-xl flex items-center justify-center">
                <Book className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-700 to-orange-700 bg-clip-text text-transparent">Heritage Museum</h1>
                <p className="text-sm text-gray-600">Ticket Booking Portal</p>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="/HomePage" className="text-gray-700 hover:text-amber-600 font-medium transition-colors">Home</a>
              <a href="#exhibitions" className="text-gray-700 hover:text-amber-600 font-medium transition-colors">Exhibitions</a>
              <a href="#tickets" className="text-gray-700 hover:text-amber-600 font-medium transition-colors">Book Tickets</a>
              <a href="/Explore" className="text-gray-700 hover:text-amber-600 font-medium transition-colors">Plan Visit</a>
              <a href="#contact" className="text-gray-700 hover:text-amber-600 font-medium transition-colors">Contact</a>
              <a href="/login"
                className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-3 rounded-full font-semibold hover:from-amber-700 hover:to-orange-700 transition-all transform hover:scale-105">
                <Ticket className="w-5 h-5 inline mr-2" />
                Sign in
              </a>
            </div>

            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-amber-200 py-4">
            <div className="flex flex-col space-y-4 px-6">
              <a href="/Homepage" className="text-gray-700 hover:text-amber-600 font-medium">Home</a>
              <a href="#exhibitions" className="text-gray-700 hover:text-amber-600 font-medium">Exhibitions</a>
              <a href="#tickets" className="text-gray-700 hover:text-amber-600 font-medium">Book Tickets</a>
              <a href="/Explore" className="text-gray-700 hover:text-amber-600 font-medium">Plan Visit</a>
              <a href="#contact" className="text-gray-700 hover:text-amber-600 font-medium">Contact</a>
              <button
                onClick={() => setTicketModal(true)}
                className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-3 rounded-full font-semibold w-full"
              >
                Book Tickets Now
              </button>
            </div>
          </div>
        )}
      </nav>
    </div>
  )
}

export default Navbar