import React, { useState, useEffect, useRef } from "react";
import { Star, Clock, Users, Calendar, MapPin, Camera, Award, Coffee, Wifi, Car, Book, Compass, Shield, Gift, Menu, X, Phone, Mail, Ticket, CreditCard, Globe, MessageCircle, Bot } from "lucide-react";
import Chatbot from "./Chatbot";
import { Link } from "react-router-dom";
const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [exhibitSlide, setExhibitSlide] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [ticketModal, setTicketModal] = useState(false);
  const [selectedMuseum, setSelectedMuseum] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const chatRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatRef.current && !chatRef.current.contains(event.target)) {
        setIsChatOpen(false);
      }
    };

    if (isChatOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isChatOpen]);


  const museums = [
    {
      name: 'National Art Museum',
      location: 'New Delhi, India',
      description: 'A rich collection of Indian art spanning centuries and styles.',
      features: ['Guided tours', 'Interactive exhibits', 'Audio guides'],
      highlighted: true
    },
    {
      name: 'Science Exploration Center',
      location: 'Bangalore, India',
      description: 'Hands-on science exhibits for all ages.',
      features: ['Planetarium', 'Live demonstrations', 'Kids zone'],
      highlighted: false
    },
    {
      name: 'Indian History Museum',
      location: 'Mumbai, India',
      description: 'Journey through India’s cultural and historical past.',
      features: ['Ancient artifacts', '3D exhibits', 'Cultural performances'],
      highlighted: false
    },
    {
      name: 'Natural History Gallery',
      location: 'Chennai, India',
      description: 'Explore nature and wildlife through immersive displays.',
      features: ['Dinosaur fossils', 'Eco exhibits', 'Wildlife documentaries'],
      highlighted: false
    }
  ];


  const heroImages = [
    "https://assets.architecturaldigest.in/photos/6008215f8f87dc05d00e2362/16:9/w_2560%2Cc_limit/6211-1366x768.jpg",
    "https://www.trawell.in/admin/images/upload/151648398Jaipur_Jantar_Mantar_Main.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/8/8c/Indian_Museum%2C_Courtyard%2C_Kolkata%2C_India.jpg",
    "https://media.istockphoto.com/id/466240080/photo/victoria-memorial-landmark-in-calcutta-india.jpg?s=612x612&w=0&k=20&c=908J0rxwTyUBivotass3lCizKrsE5gGYQ5UpHP3V6zY=",
    "https://delhitourism.travel/images/places-to-visit/headers/national-museum-of-india-delhi-tourism-entry-fee-timings-holidays-reviews-header.jpg",
    "https://archestudy.com/wp-content/uploads/2021/06/11-1-1.jpg"
  ];

  const exhibitImages = [
    "https://media.australian.museum/media/dd/images/Some_image.width-1200.7f5add5.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwgToZOGajThEqijzFqkXl6gcr7n0_g2Ljyw&s",
    "https://www.newsnownation.com/wp-content/uploads/2023/09/5yxriv58l0.jpeg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9mUz3BVbuX_JifFyZPh3PLElscWLSk5w5_w&s",
    "https://ucarecdn.com/2a7b74bc-96a8-426e-9e30-0f0d64ec46be/-/progressive/yes/-/quality/best/-/format/jpeg/",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRunu0uvXpNdUjkkbSBkCBbLrYSTCqP2xuokA&s"
  ];

  useEffect(() => {
    const timer1 = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    const timer2 = setInterval(() => {
      setExhibitSlide((prev) => (prev + 1) % exhibitImages.length);
    }, 4000);
    return () => {
      clearInterval(timer1);
      clearInterval(timer2);
    };
  }, []);

  const exhibitions = [
    {
      status: 'Special',
      title: 'Mughal Miniature Paintings',
      date: 'June 1 - June 30, 2025',
      desc: 'Explore rare and intricate paintings from the Mughal Empire, showcasing royal courts, battles, and daily life.',
      price: '150'
    },
    {
      status: 'Permanent',
      title: 'Tribal Art of India',
      date: 'Open Daily',
      desc: 'An immersive collection of Warli, Gond, and Madhubani artworks reflecting India’s folk heritage.',
      price: '100'
    },
    {
      status: 'Interactive',
      title: 'Ancient Civilisations Experience',
      date: 'June 15 - July 15, 2025',
      desc: 'Walk through recreated scenes from the Indus Valley and Vedic periods with touch-screen interaction.',
      price: '200'
    },
    {
      status: 'Special',
      title: 'Indian Classical Music & Dance',
      date: 'July 5 - July 20, 2025',
      desc: 'Discover India’s performing arts legacy with costumes, instruments, and digital performances.',
      price: '180'
    }
  ];


  const ticketTypes = [
    { type: "General Admission", price: "$25", desc: "Access to all permanent collections", features: ["All permanent galleries", "Audio guide included", "Map & guidebook", "Free WiFi"] },
    { type: "Premium Experience", price: "$45", desc: "Includes special exhibitions + guided tour", features: ["Everything in General", "Special exhibitions", "1-hour guided tour", "Museum café discount"] },
    { type: "Family Package", price: "$65", desc: "2 Adults + 2 Children (saves $35)", features: ["Family of 4 admission", "Kids activity booklet", "Treasure hunt game", "Family photo service"] },
    { type: "Annual Membership", price: "$120", desc: "Unlimited visits for 12 months", features: ["Unlimited admission", "Member-only events", "20% gift shop discount", "Priority booking"] }
  ];

  const collections = [
    {
      title: "Indus Valley Civilization",
      count: "500+ Artifacts",
      desc: "Pottery, seals, tools, and early urban relics from Harappa and Mohenjo-Daro",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQt1eHxuHrFQ3cyU5CoWSpC9A-nl6HJnD78RQ&s",
      available: "Daily 9AM-6PM"
    },
    {
      title: "Maurya & Gupta Empire",
      count: "300+ Pieces",
      desc: "shokan edicts, royal coins, intricate sculptures, and ancient illustrated manuscripts",
      image: "https://cdn.kastatic.org/ka-perseus-images/0e5a63fae4e924c7b5efa5b2c7c4179e1634645f.jpg",
      available: "Daily 9AM-6PM"
    },
    {
      title: "Medieval India",
      count: "400+ Exhibits",
      desc: "Mughal paintings, Rajput weaponry, and temple architecture",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLw83tJP9KB6WhxQhnuW9oleMtScJZgV-h9A&s",
      available: "Daily 9AM-6PM"
    },
    {
      title: "Freedom Struggle",
      count: "200+ Items",
      desc: "Documents, photographs, and memorabilia from India's independence movement",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStC99JyhmcT0o0trZ8B5cvRLauL-BxMmLLZA&s",
      available: "Daily 9AM-6PM"
    }
  ];


  const stats = [
    { number: "150K+", label: "Annual Visitors", icon: <Users className="w-8 h-8" /> },
    { number: "2,500+", label: "Artifacts", icon: <Award className="w-8 h-8" /> },
    { number: "25+", label: "Exhibitions", icon: <Book className="w-8 h-8" /> },
    { number: "4.9", label: "Average Rating", icon: <Star className="w-8 h-8" /> }
  ];

  const facilities = [
    { icon: <Users className="w-8 h-8" />, title: "Expert Guided Tours", desc: "Professional guides in 8 languages", color: "from-blue-500 to-blue-600" },
    { icon: <Camera className="w-8 h-8" />, title: "Photography Services", desc: "Professional photos & selfie spots", color: "from-purple-500 to-purple-600" },
    { icon: <Coffee className="w-8 h-8" />, title: "Heritage Café", desc: "Fine dining with historical ambiance", color: "from-orange-500 to-orange-600" },
    { icon: <Gift className="w-8 h-8" />, title: "Museum Store", desc: "Exclusive replicas & souvenirs", color: "from-pink-500 to-pink-600" },
    { icon: <Wifi className="w-8 h-8" />, title: "Digital Experience", desc: "AR tours & interactive displays", color: "from-green-500 to-green-600" },
    { icon: <Shield className="w-8 h-8" />, title: "Climate Control", desc: "Perfect preservation conditions", color: "from-red-500 to-red-600" },
    { icon: <Car className="w-8 h-8" />, title: "Premium Parking", desc: "Valet service & EV charging", color: "from-teal-500 to-teal-600" },
    { icon: <Compass className="w-8 h-8" />, title: "Mobile App", desc: "Interactive maps & audio guides", color: "from-indigo-500 to-indigo-600" }
  ];

  const reviews = [
    { name: "Dr. Emily Harrison", rating: 5, text: "Booking was seamless! The premium tour exceeded expectations. Our guide was incredibly knowledgeable about Egyptian artifacts.", avatar: "EH", time: "2 days ago", role: "Professor of Archaeology", verified: true },
    { name: "Michael Chen", rating: 5, text: "Easy online booking process. The family package was great value. Kids got special activity books and loved the treasure hunt!", avatar: "MC", time: "5 days ago", role: "Family Visitor", verified: true },
    { name: "Sarah Williams", rating: 5, text: "Annual membership pays for itself! Priority booking for special exhibitions is a game-changer. Highly recommend.", avatar: "SW", time: "1 week ago", role: "Art Historian", verified: true },
    { name: "David Rodriguez", rating: 4, text: "Smooth ticket booking experience. The digital confirmation made entry super quick. Great for school groups!", avatar: "DR", time: "2 weeks ago", role: "Teacher", verified: true },
    { name: "Maria Gonzalez", rating: 5, text: "Premium experience package was worth every penny. Private guide, skip-the-line access, and café discount!", avatar: "MG", time: "3 weeks ago", role: "Tourist", verified: true },
    { name: "James Thompson", rating: 5, text: "Been using this booking system for years. Always reliable, secure payment, and great customer service.", avatar: "JT", time: "1 month ago", role: "Regular Visitor", verified: true }
  ];


  const bookingFeatures = [
    { icon: <Ticket className="w-6 h-6" />, title: "Instant Confirmation", desc: "Receive tickets immediately via email" },
    { icon: <CreditCard className="w-6 h-6" />, title: "Secure Payment", desc: "SSL encrypted checkout process" },
    { icon: <Calendar className="w-6 h-6" />, title: "Flexible Dates", desc: "Choose your preferred visit date & time" },
    { icon: <Globe className="w-6 h-6" />, title: "Multi-language Support", desc: "Book in your preferred language" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-indigo-50 to-red-50">
      {/* Navigation Bar */}

      {/* <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-lg shadow-lg z-50 border-b border-amber-200"> */}
      {/* <div className="max-w-7xl mx-auto px-6 ">
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
              <a href="#collections" className="text-gray-700 hover:text-amber-600 font-medium transition-colors">Collections</a>
              <a href="#exhibitions" className="text-gray-700 hover:text-amber-600 font-medium transition-colors">Exhibitions</a>
              <a href="#tickets" className="text-gray-700 hover:text-amber-600 font-medium transition-colors">Book Tickets</a>
              <Link to="/Explore" className="text-gray-700 hover:text-amber-600 font-medium transition-colors">Plan Visit</Link>
              <a href="#contact" className="text-gray-700 hover:text-amber-600 font-medium transition-colors">Contact</a>
              <Link to="/login"
                onClick={() => setTicketModal(true)}
                className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-3 rounded-full font-semibold hover:from-amber-700 hover:to-orange-700 transition-all transform hover:scale-105">
                <Ticket className="w-5 h-5 inline mr-2" />
                Sign in
              </Link>
            </div>

            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div> */}

      {/* Mobile Menu */}
      {/* {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-amber-200 py-4">
            <div className="flex flex-col space-y-4 px-6">
              <a href="#collections" className="text-gray-700 hover:text-amber-600 font-medium">Collections</a>
              <a href="#exhibitions" className="text-gray-700 hover:text-amber-600 font-medium">Exhibitions</a>
              <a href="#tickets" className="text-gray-700 hover:text-amber-600 font-medium">Book Tickets</a>
              <a href="#visit" className="text-gray-700 hover:text-amber-600 font-medium">Plan Visit</a>
              <a href="#contact" className="text-gray-700 hover:text-amber-600 font-medium">Contact</a>
              <button
                onClick={() => setTicketModal(true)}
                className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-3 rounded-full font-semibold w-full"
              >
                Book Tickets Now
              </button>
            </div>
          </div>
        )} */}
      {/* </nav> */}

      {/* Hero Section with Carousel */}
      <div className="relative overflow-hidden mt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 z-10"></div>
        <div className="relative h-screen">
          <img
            src={heroImages[currentSlide]}
            alt="Museum Gallery"
            className="w-full h-full object-cover transition-all duration-1000"
          />
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <div className="text-center text-white px-4 max-w-6xl mt-60">
              {/* <h1 className="text-3xl md:text-7xl font-bold mb-8 opacity-45  ">
                BOOK YOUR MUSEUM EXPERIENCE
              </h1> */}
              <p className="text-xl md:text-3xl mb-4 text-amber-100 font-light">From Ancient to Modern - Tickets in Seconds</p>
              <p className="text-lg md:text-xl mb-12 text-gray-200 max-w-4xl mx-auto">Skip the lines, choose your preferred date and time, and enjoy instant confirmation for the world's finest museum experience</p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <a href="/Explore"
                  onClick={() => setTicketModal(true)}
                  className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-12 py-5 rounded-full text-xl font-semibold shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  <Ticket className="w-6 h-6 inline mr-3" />
                  Book Tickets Online
                </a>
                <button className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white px-12 py-5 rounded-full text-xl font-semibold border-2 border-white/40 transition-all duration-300">
                  <Calendar className="w-6 h-6 inline mr-3" />
                  Check Availability
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-3">
          {heroImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${idx === currentSlide ? 'bg-amber-400 scale-125' : 'bg-white/50 hover:bg-white/70'
                }`}
            />
          ))}
        </div>
      </div>

      {/* Booking Features */}
      <div className="relative -mt-32 z-30 mb-20">
        <div className="max-w-7xl mx-auto px-6 mt-25">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-amber-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {bookingFeatures.map((feature, idx) => (
                <div key={idx} className="text-center group">
                  <div className="text-amber-600 mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* more museum */}
      <div id="museums" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 -mt-28">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-amber-800 to-orange-800 bg-clip-text text-transparent">
              Discover Our Museums
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Explore a curated selection of museums, each offering unique collections, exhibitions, and immersive experiences.
            </p>
          </div>

          <div className=" grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {museums.map((museum, idx) => (
              <div
                key={idx}
                className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${museum.highlighted ? 'ring-4 ring-amber-300 relative' : ''
                  }`}
              >
                {museum.highlighted && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-amber-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Featured
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{museum.name}</h3>
                  <div className="text-lg font-medium text-amber-600 mb-4">{museum.location}</div>
                  <p className="text-gray-600 mb-6">{museum.description}</p>
                  <ul className="space-y-3 mb-6">
                    {museum.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-sm text-gray-700">
                        <div className="w-2 h-2 bg-amber-500 rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => setSelectedMuseum(museum)}
                    className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white py-3 rounded-full font-semibold transition-all transform hover:scale-105"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>



      {/* Stats Section */}
      <div className="py-20 bg-gradient-to-r from-amber-100 to-orange-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center group">
                <div className="text-amber-600 mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-gray-700 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Collections Preview with Carousel */}
      <div id="collections" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-amber-800 to-orange-800 bg-clip-text text-transparent">
              Explore Our Collections
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">Each ticket grants access to our world-renowned permanent collections</p>
          </div>

          <div className="relative mb-12">
            <div className="h-96 rounded-3xl overflow-hidden shadow-2xl mb-8">
              <img
                src={exhibitImages[exhibitSlide]}
                alt="Current Exhibition"
                className="w-full h-full object-cover transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-8 text-white">
                  <h3 className="text-3xl font-bold mb-2">Featured Collection Spotlight</h3>
                  <p className="text-lg text-gray-200">Included with every ticket purchase</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center space-x-2">
              {exhibitImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setExhibitSlide(idx)}
                  className={`w-3 h-3 rounded-full transition-all ${idx === exhibitSlide ? 'bg-amber-600' : 'bg-gray-300'
                    }`}
                />
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {collections.map((collection, idx) => (
              <div key={idx} className="group">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={collection.image}
                      alt={collection.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{collection.title}</h3>
                    <p className="text-amber-600 font-semibold mb-2">{collection.count}</p>
                    <p className="text-gray-600 mb-3">{collection.desc}</p>
                    <p className="text-sm text-green-600 font-medium">{collection.available}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Current Exhibitions */}
      <div id="exhibitions" className="py-20 bg-gradient-to-r from-orange-50 to-red-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-amber-800 to-orange-800 bg-clip-text text-transparent">
            Special Exhibitions
          </h2>
          <p className="text-xl text-center text-gray-700 mb-12">
            Experience India's rich heritage through curated exhibitions — from ancient traditions to modern expressions.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {exhibitions.map((exhibit, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className={`inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4 ${exhibit.status === 'Permanent' ? 'bg-green-100 text-green-800' :
                  exhibit.status === 'Special' ? 'bg-purple-100 text-purple-800' :
                    exhibit.status === 'Interactive' ? 'bg-blue-100 text-blue-800' :
                      'bg-orange-100 text-orange-800'
                  }`}>
                  {exhibit.status}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{exhibit.title}</h3>
                <p className="text-amber-600 font-semibold mb-3">{exhibit.date}</p>
                <p className="text-gray-600 mb-4">{exhibit.desc}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-green-600">₹{exhibit.price}</span>
                  <button
                    onClick={() => setTicketModal(true)}
                    className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-full text-sm font-semibold transition-colors"
                  >
                    Book Access
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Facilities Grid */}
      <div className="py-20 bg-gradient-to-r from-purple-200 to-indigo-100">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-amber-800 to-orange-800 bg-clip-text text-transparent">
            Premium Amenities Included
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {facilities.map((item, idx) => (
              <div key={idx} className="group">
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className={`bg-gradient-to-r ${item.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform duration-300`}>
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Visit Planning */}
      <div id="visit" className="py-20 bg-gradient-to-r from-amber-100 to-orange-100">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-amber-800 to-orange-800 bg-clip-text text-transparent">
            Plan Your Visit
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
              <Clock className="w-12 h-12 text-amber-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-3">Opening Hours</h3>
              <p className="text-lg font-semibold text-amber-700 mb-2">Mon-Sun: 9AM-6PM</p>
              <p className="text-gray-600">Extended hours on weekends</p>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
              <MapPin className="w-12 h-12 text-amber-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-3">Location</h3>
              <p className="text-lg font-semibold text-amber-700 mb-2">Heritage District</p>
              <p className="text-gray-600">Metro & bus access available</p>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
              <Users className="w-12 h-12 text-amber-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-3">Group Bookings</h3>
              <p className="text-lg font-semibold text-amber-700 mb-2">20+ people: 30% off</p>
              <p className="text-gray-600">School groups welcome</p>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
              <Phone className="w-12 h-12 text-amber-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-3">Support</h3>
              <p className="text-lg font-semibold text-amber-700 mb-2">24/7 Booking Help</p>
              <p className="text-gray-600">Live chat available</p>
            </div>
          </div>
        </div>
      </div>
      {/* Reviews Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-amber-800 to-orange-800 bg-clip-text text-transparent">
            Visitor Reviews
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center text-white font-bold mr-4">
                    {review.avatar}
                  </div>
                  <div>
                    <div className="flex items-center">
                      <h3 className="font-bold text-gray-800 mr-2">{review.name}</h3>
                      {review.verified && (
                        <div className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Verified</div>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{review.role}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">{review.text}</p>
                <p className="text-sm text-gray-500">{review.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div id="contact" className="py-20 bg-gradient-to-r from-amber-100 to-orange-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-amber-800 to-orange-800 bg-clip-text text-transparent">
                Get in Touch
              </h2>
              <p className="text-xl text-gray-700 mb-8">Have questions about tickets or need special arrangements? We're here to help!</p>
              <div className="space-y-6">
                <div className="flex items-center">
                  <Phone className="w-6 h-6 text-amber-600 mr-4" />
                  <div>
                    <p className="font-bold text-gray-800">Phone Support</p>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="w-6 h-6 text-amber-600 mr-4" />
                  <div>
                    <p className="font-bold text-gray-800">Email</p>
                    <p className="text-gray-600">tickets@heritagemuseum.com</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-6 h-6 text-amber-600 mr-4" />
                  <div>
                    <p className="font-bold text-gray-800">Location</p>
                    <p className="text-gray-600">123 Heritage Ave, History District</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <form className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Email</label>
                  <input type="email" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Message</label>
                  <textarea className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all" rows="4"></textarea>
                </div>
                <button className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white py-4 rounded-lg font-semibold transition-all transform hover:scale-105">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* Chatbot with open/close functionality */}
      <div className="fixed bottom-4 right-4 z-50">
        {!isMenuOpen && (
          <button
            onClick={() => setIsChatOpen(!isChatOpen)}
            className="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-4 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            {isChatOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <div className="relative">
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                <MessageCircle className="w-6 h-6" />
              </div>
            )}
          </button>
        )}

        {isChatOpen && (
          <div className="relative" ref={chatRef}>
            <div className="backdrop-blur-lg bg-white/95 rounded-2xl p-4 shadow-2xl transition-all duration-300 border border-amber-200 w-80">
              <div className="flex justify-between items-center mb-4 border-b border-amber-200 pb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-amber-600 to-orange-600 rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-semibold text-gray-800">Museum Assistant</span>
                </div>

              </div>
              <Chatbot />
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-amber-600 to-orange-600 rounded-xl flex items-center justify-center">
                  <Book className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Heritage Museum</h3>
                  <p className="text-gray-400">Ticket Portal</p>
                </div>
              </div>
              <p className="text-gray-400">Making history accessible to everyone through seamless online booking.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-3">
                <li><a href="#collections" className="text-gray-400 hover:text-white transition-colors">Collections</a></li>
                <li><a href="#exhibitions" className="text-gray-400 hover:text-white transition-colors">Exhibitions</a></li>
                <li><a href="#tickets" className="text-gray-400 hover:text-white transition-colors">Tickets</a></li>
                <li><a href="#visit" className="text-gray-400 hover:text-white transition-colors">Visit</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Support</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQs</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Newsletter</h3>
              <p className="text-gray-400 mb-4">Subscribe for updates on special exhibitions and events.</p>
              <form className="flex">
                <input type="email" placeholder="Your email" className="px-4 py-2 rounded-l-lg w-full outline-none text-gray-800" />
                <button className="bg-gradient-to-r from-amber-600 to-orange-600 px-6 rounded-r-lg hover:from-amber-700 hover:to-orange-700 transition-all">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Heritage Museum. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;