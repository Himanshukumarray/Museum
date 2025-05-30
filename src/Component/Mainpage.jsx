// import React, { useState, useEffect, useRef } from "react";
// import { Calendar, ShoppingBag, Users, Gift, Clock, MapPin, Ticket, Image, BookOpen } from "lucide-react";
// import { Link } from "react-router-dom";

// const HomePage = () => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [activeCategory, setActiveCategory] = useState("all");
//   const [email, setEmail] = useState("");
//   const [isChatOpen, setIsChatOpen] = useState(false);
//   const [step, setStep] = useState('greet');
//   const [payload, setPayload] = useState({});
//   const [messages, setMessages] = useState([{ sender: 'bot', text: 'Welcome to Museum Express! I can help you book exhibition tickets, find information about current exhibitions, or manage your existing bookings. How may I assist you today?' }]);
//   const [isThinking, setIsThinking] = useState(false);
//   const [userInput, setUserInput] = useState('');
//   const messagesEndRef = useRef(null);

//    const museumReviews = [
//     {
//       name: "Louvre Museum",
//       location: "Paris, France",
//       rating: 4.8,
//       image: "https://www.planetware.com/photos-large/F/france-paris-louvre.jpg",
//       reviews: [
//         {
//           user: "Sarah M.",
//           comment: "Absolutely stunning collection. The Mona Lisa was breathtaking!",
//           rating: 5
//         },
//         {
//           user: "John D.",
//           comment: "Incredible architecture and art pieces. A must-visit!",
//           rating: 4.5
//         }
//       ]
//     },
//     {
//       name: "British Museum",
//       location: "London, UK",
//       rating: 4.7,
//       image: "https://cdn.britannica.com/88/137188-050-8C779D64/British-Museum-London.jpg",
//       reviews: [
//         {
//           user: "Mike R.",
//           comment: "Amazing historical artifacts. Could spend days here!",
//           rating: 5
//         },
//         {
//           user: "Emma L.",
//           comment: "Excellent exhibits, very informative and well organized.",
//           rating: 4.5
//         }
//       ]
//     },
//     {
//       name: "Metropolitan Museum",
//       location: "New York, USA",
//       rating: 4.9,
//       image: "https://www.metmuseum.org/-/media/images/visit/met-fifth-avenue/met-fifth-avenue-1024x640.jpg",
//       reviews: [
//         {
//           user: "David K.",
//           comment: "World-class collection. The Egyptian wing is outstanding!",
//           rating: 5
//         },
//         {
//           user: "Lisa P.",
//           comment: "Such diverse collections. A true cultural treasure.",
//           rating: 5
//         }
//       ]
//     }
//   ];
//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   }, [messages]);

//   const addMessage = (sender, text) => {
//     setMessages((prevMessages) => [...prevMessages, { sender, text }]);
//   };

//   const handleInputChange = (key, value) => {
//     setPayload({ ...payload, [key]: value });
//   };

//   const handleConfirmBooking = () => {
//     // Generate a random ticket ID
//     const ticketId = 'MUS-' + Math.floor(100000 + Math.random() * 900000);

//     addMessage('bot', `Booking confirmed! Here's your summary:\n- Ticket ID: ${ticketId}\n- Museum: ${payload.city} Art Museum\n- Exhibition: ${payload.site}\n- Date: ${payload.date}\n- Adults: ${payload.adults}\n- Children: ${payload.children}${payload.slot ? '\n- Guided Tour: ' + payload.slot : ''}\n\nPlease save your Ticket ID for future reference.`);
//     console.log('Booking Payload:', { ...payload, ticketId });
//     setStep('greet');
//     setPayload({});
//   };

//   const handleConfirmCancel = () => {
//     addMessage('bot', `Ticket with ID ${payload.ticketId} has been cancelled! A confirmation email will be sent shortly.`);
//     console.log('Cancel Payload:', payload);
//     setStep('greet');
//     setPayload({});
//   };

//   const detectIntent = (input) => {
//     const text = input.toLowerCase();

//     // Book intent detection
//     if (text.includes('book') ||
//       text.includes('reserve') ||
//       text.includes('get ticket') ||
//       text.includes('buy ticket') ||
//       text.includes('purchase')) {
//       return 'book';
//     }

//     // Cancel intent detection
//     if (text.includes('cancel') ||
//       text.includes('refund') ||
//       text.includes('delete booking') ||
//       text.includes('return ticket')) {
//       return 'cancel';
//     }

//     // Show sites intent detection
//     if (text.includes('show') ||
//       text.includes('list') ||
//       text.includes('display') ||
//       text.includes('what exhibition') ||
//       text.includes('current exhibition') ||
//       text.includes('available exhibition') ||
//       text.includes('see exhibition')) {
//       return 'show';
//     }

//     // Greeting detection
//     if (text.includes('hello') ||
//       text.includes('hi') ||
//       text.includes('hey') ||
//       text.includes('greetings') ||
//       text.match(/^(hi|hello|hey)[\s!]*$/)) {
//       return 'greeting';
//     }

//     return null;
//   };

//   const extractCity = (input) => {
//     // Museum cities
//     const museumCities = ['new york', 'london', 'paris', 'tokyo', 'rome', 'berlin', 'madrid', 'amsterdam', 'florence', 'vienna'];
//     const text = input.toLowerCase();

//     for (const city of museumCities) {
//       if (text.includes(city)) {
//         return city;
//       }
//     }

//     return null;
//   };

//   const simulateThinking = async (callback, delay = 1000) => {
//       setIsThinking(true);
//       await new Promise(resolve => setTimeout(resolve, delay));
//       setIsThinking(false);
//       callback();
//     };
  
//     const processUserInput = (input) => {
//       const intent = detectIntent(input);
//       const city = extractCity(input);
  
//       if (intent === 'greeting') {
//         addMessage('bot', 'Hello! How can I help you today?');
//         return;
//       }
  
//       if (intent === 'book') {
//         setStep('city');
//         addMessage('bot', 'Which city would you like to book tickets for? We have museums in New York, London, Paris, Tokyo, Rome, Berlin, Madrid, Amsterdam, Florence, and Vienna.');
//         return;
//       }
  
//       if (intent === 'cancel') {
//         setStep('cancel');
//         addMessage('bot', 'Please provide your ticket ID to cancel your booking.');
//         return;
//       }
  
//       if (intent === 'show') {
//         addMessage('bot', 'Here are our current exhibitions:\n- Modern Masters (New York)\n- Renaissance Art (London)\n- Impressionist Collection (Paris)\n- Ancient Artifacts (Tokyo)');
//         return;
//       }
  
//       addMessage('bot', "I'm not sure I understand. Would you like to:\n- Book tickets\n- Cancel a booking\n- See current exhibitions\n- Get general information");
//     };
  
//     const handleSendMessage = () => {
//     if (!userInput.trim()) return;

//     addMessage('user', userInput);
//     const currentInput = userInput;
//     setUserInput('');

//     simulateThinking(() => processUserInput(currentInput));
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter') {
//       handleSendMessage();
//     }
//   };




//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const images = [
//     {
//       src: "https://www.christies.com/-/media/images/features/articles/2023/11/01-10/christian-levett-property-from-the-mougins-museum-of-classical-art/christian-levett-mougins-museum-3520.jpg?h=2200&iar=0&w=3520&rev=5f12f1c4a54842698d13c28ea4ca7fec&hash=315432ee60273350eb5d346e4042bcae2ca83de8",
//       caption: "Experience Art Through the Ages",
//       subcaption: "Our main gallery reopens this weekend"
//     },
//     {
//       src: "https://imageio.forbes.com/specials-images/imageserve/665a63078da098d705fc9f2d/IMG-9684--1-/0x0.jpg?format=jpg&crop=2574,1448,x0,y0,safe&width=1440",
//       caption: "Architectural Wonders",
//       subcaption: "Explore our award-winning building design"
//     },
//     {
//       src: "https://idsb.tmgrup.com.tr/ly/uploads/images/2022/12/11/245918.jpg",
//       caption: "Interactive Exhibits",
//       subcaption: "Perfect for visitors of all ages"
//     }
//   ];

//   const categories = [
//     { id: "all", label: "All" },
//     { id: "visit", label: "Planning Your Visit" },
//     { id: "explore", label: "Explore" },
//     { id: "support", label: "Support" }
//   ];

//   const options = [
//     {
//       title: "Visit Info",
//       url: "/visit",
//       icon: <Clock size={24} />,
//       category: "visit",
//       description: "Hours, directions, and accessibility"
//     },
//     {
//       title: "Exhibitions",
//       url: "/exhibitions",
//       icon: <Image size={24} />,
//       category: "explore",
//       description: "Current and upcoming exhibitions"
//     },
//     {
//       title: "Book Tickets",
//       url: "/book",
//       icon: <Ticket size={24} />,
//       category: "visit",
//       description: "Reserve your spot today"
//     },
//     {
//       title: "Virtual Tour",
//       url: "/virtual-tour",
//       icon: <MapPin size={24} />,
//       category: "explore",
//       description: "Experience the museum from anywhere"
//     },
//     {
//       title: "Museum Shop",
//       url: "/shop",
//       icon: <ShoppingBag size={24} />,
//       category: "explore",
//       description: "Unique gifts and souvenirs"
//     },
//     {
//       title: "Events",
//       url: "/events",
//       icon: <Calendar size={24} />,
//       category: "explore",
//       description: "Workshops, talks, and performances"
//     },
//     {
//       title: "Membership",
//       url: "/membership",
//       icon: <Users size={24} />,
//       category: "support",
//       description: "Join our community of art lovers"
//     },
//     {
//       title: "Donate",
//       url: "/donate",
//       icon: <Gift size={24} />,
//       category: "support",
//       description: "Support our mission and programs"
//     },
//     {
//       title: "Blog",
//       url: "/blog",
//       icon: <BookOpen size={24} />,
//       category: "explore",
//       description: "Stories behind the art"
//     }
//   ];

//   const highlights = [
//     {
//       title: "New Exhibition",
//       description: "Modern Masters: A Century of Innovation",
//       date: "May 25 - September 10",
//       image: "/api/placeholder/400/300"
//     },
//     {
//       title: "Family Day",
//       description: "Interactive workshops for all ages",
//       date: "Every Sunday, 10am-4pm",
//       image: "/api/placeholder/400/300"
//     },
//     {
//       title: "Guided Tours",
//       description: "Expert-led tours of our permanent collection",
//       date: "Daily at 11am and 2pm",
//       image: "/api/placeholder/400/300"
//     }
//   ];

//   const filteredOptions = activeCategory === "all"
//     ? options
//     : options.filter(opt => opt.category === activeCategory);

//   const handleEmailChange = (e) => {
//     setEmail(e.target.value);
//   };

//   const handleSubscribe = (e) => {
//     e.preventDefault();
//     alert(`Thank you for subscribing with: ${email}`);
//     setEmail("");
//   };

//   // Custom carousel component since we can't import react-responsive-carousel
//   const Carousel = () => {
//     const [currentSlide, setCurrentSlide] = useState(0);

//     const nextSlide = () => {
//       setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
//     };

//     const prevSlide = () => {
//       setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
//     };

//     useEffect(() => {
//       const interval = setInterval(() => {
//         nextSlide();
//       }, 3000);

//       return () => clearInterval(interval);
//     }, []);

//     return (
//       <div className="relative h-96 md:h-screen max-h-[600px] overflow-hidden bg-stone-900">
//       {images.map((img, i) => (
//         <div
//         key={i}
//         className={`absolute inset-0 transition-opacity duration-1000 ${currentSlide === i ? 'opacity-100' : 'opacity-0'}`}
//         >
//         <img src={img.src} alt={`Slide ${i + 1}`} className="object-cover h-full w-full opacity-90" />
//         <div className="absolute inset-0 bg-gradient-to-b from-stone-900/30 via-stone-900/60 to-stone-900/80 flex flex-col justify-end text-left p-6 md:p-12">
//           <h2 className="text-3xl md:text-5xl font-bold text-stone-100 mb-2 font-serif">{img.caption}</h2>
//           <p className="text-lg md:text-xl text-stone-200 mb-8 font-light">{img.subcaption}</p>
//           <div className="flex flex-wrap gap-4">
//           <a href="/book" 
//              className="bg-amber-700 hover:bg-amber-800 text-stone-100 font-medium py-3 px-6 rounded-none transition duration-300 border border-amber-600 hover:border-amber-700"
//           >
//             Book Tickets
//           </a>
//           <a href="/exhibitions" 
//              className="bg-stone-800 hover:bg-stone-700 text-stone-100 font-medium py-3 px-6 rounded-none transition duration-300 border border-stone-600"
//           >
//             Explore Exhibitions
//           </a>
//           </div>
//         </div>
//         </div>
//       ))}

//       <button
//         onClick={prevSlide}
//         className="absolute left-4 top-1/2 z-10 -translate-y-1/2 bg-stone-800/70 hover:bg-stone-700/80 text-stone-100 rounded-none p-3 focus:outline-none transition-all duration-300 border border-stone-600"
//         aria-label="Previous slide"
//       >
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//         </svg>
//       </button>
//       <button
//         onClick={nextSlide}
//         className="absolute right-4 top-1/2 z-10 -translate-y-1/2 bg-stone-800/70 hover:bg-stone-700/80 text-stone-100 rounded-none p-3 focus:outline-none transition-all duration-300 border border-stone-600"
//         aria-label="Next slide"
//       >
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//         </svg>
//       </button>

//       <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3">
//         {images.map((_, i) => (
//         <button
//           key={i}
//           onClick={() => setCurrentSlide(i)}
//           className={`w-12 h-1 transition-all duration-300 ${
//           currentSlide === i 
//             ? 'bg-amber-600' 
//             : 'bg-stone-400 hover:bg-amber-400'
//           }`}
//           aria-label={`Go to slide ${i + 1}`}
//         />
//         ))}
//       </div>
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 font-sans">
//       {/* Header with scroll effect */}
//       <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"}`}>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
//           <div className="flex items-center">

//             <h2 className="ml-2 text-xl font-bold text-gray-800">Museum guide</h2>
//           </div>
//           <nav className="hidden md:flex space-x-8">
//             <Link to="/visit" className="text-gray-600 hover:text-blue-600 font-medium">Visit</Link>
//             <Link to="/events" className="text-gray-600 hover:text-blue-600 font-medium">Events</Link>
//             <Link to="/about" className="text-gray-600 hover:text-blue-600 font-medium">About</Link>
//             <Link to="/exhibitions" className="text-gray-600 hover:text-blue-600 font-medium">Exhibitions</Link>
//           </nav>
//           <div className="flex items-center space-x-4">
//             <a href="/book" className="hidden sm:block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300">
//               Book Tickets
//             </a>
//             <button className="md:hidden text-gray-600">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Hero carousel with improved design */}
//       <div className="relative">
//         <Carousel />
//       </div>

     
//         <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
//           {/* Current highlights section with hover effects and animations */}
//           <section className="mb-16">
//             <h2 className="text-3xl font-bold text-gray-800 mb-8 relative inline-block">
//           Current Highlights
//           <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {highlights.map((highlight, i) => (
//             <div 
//               key={i} 
//               className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
//               style={{ animationDelay: `${i * 100}ms` }}
//             >
//               <div className="relative overflow-hidden">
//             <img 
//               src={highlight.image} 
//               alt={highlight.title} 
//               className="w-full h-48 object-cover transform hover:scale-110 transition duration-500" 
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
//               <p className="text-white p-4">{highlight.description}</p>
//             </div>
//               </div>
//             <div className="p-6">
//               <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full mb-2">
//                 {highlight.title}
//               </span>
//             <h3 className="text-xl font-bold text-gray-800 mb-2 hover:text-blue-600 transition-colors duration-200">
//               {highlight.description}
//             </h3>
//             <p className="text-gray-600 mb-4 flex items-center">
//               <Clock className="w-4 h-4 mr-2" />
//               {highlight.date}
//             </p>
//             <a href="/details" className="group inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
//               Learn more
//               <svg 
//                 xmlns="http://www.w3.org/2000/svg" 
//                 className="h-4 w-4 ml-1 transform transition-transform duration-200 group-hover:translate-x-1" 
//                 fill="none" 
//                 viewBox="0 0 24 24" 
//                 stroke="currentColor"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//               </svg>
//             </a>
//               </div>
//             </div>
//           ))}
//             </div>
//           </section>

//           {/* Quick links section with enhanced tabs and hover effects */}
//           <section className="bg-white rounded-xl shadow-lg p-8 mb-16 transform hover:shadow-xl transition duration-300">
//             <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
//           <span className="mr-3">Plan Your Experience</span>
//           <div className="h-1 flex-grow bg-gradient-to-r from-blue-500 to-purple-500 rounded"></div>
//             </h2>

//             <div className="border-b border-gray-200 mb-8">
//           <div className="flex overflow-x-auto space-x-6 pb-1 scrollbar-hide">
//             {categories.map(category => (
//               <button
//             key={category.id}
//             className={`py-2 px-4 font-medium whitespace-nowrap transition-all duration-200 relative
//               ${activeCategory === category.id
//                 ? "text-blue-600"
//                 : "text-gray-600 hover:text-blue-600"
//               }`}
//             onClick={() => setActiveCategory(category.id)}
//               >
//             {category.label}
//             {activeCategory === category.id && (
//               <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 animate-slide-in"></span>
//             )}
//               </button>
//             ))}
//           </div>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredOptions.map((opt, i) => (
//             <a
//               key={i}
//               href={opt.url}
//               className="group flex items-start p-5 rounded-lg border border-gray-200 hover:border-blue-300 bg-white hover:bg-blue-50 transition-all duration-300 transform hover:-translate-y-1"
//             >
//               <div className="bg-blue-100 text-blue-600 p-3 rounded-lg mr-4 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
//             {opt.icon}
//               </div>
//               <div>
//             <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-200">
//               {opt.title}
//             </h3>
//             <p className="text-sm text-gray-600 group-hover:text-gray-700">
//               {opt.description}
//             </p>
//               </div>
//             </a>
//           ))}
//             </div>
//           </section>

//           {/* Rest of the sections remain the same */}
//           {/* ... */}

//         </main>
//         {/* Chatbot Modal remains the same */}
//       {isChatOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex justify-end">
//           <div className="backdrop-blur-none h-60vh flex items-center justify-center p-4">
//             <div className="bg-white rounded-full shadow-lg w-full max-w-md flex flex-col h-96 border border-gray-200">
//               <div className="bg-indigo-800 text-white p-3 rounded-t-lg flex items-center">
//                 <div className="mr-2">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//                   </svg>
//                 </div>
//                 <div>
//                   <h2 className="text-lg font-semibold">Museum Guide</h2>
//                   <p className="text-xs text-indigo-100">Book tickets & explore exhibitions</p>
//                 </div>
//               </div>

//               <div className="flex-grow overflow-y-auto p-3 space-y-2 bg-gray-50">
//                 {messages.map((msg, index) => (
//                   <div key={index} className={`flex ${msg.sender === 'bot' ? 'justify-start' : 'justify-end'}`}>
//                     <div
//                       className={`p-2 rounded-lg max-w-xs text-xs ${msg.sender === 'bot'
//                           ? 'bg-indigo-50 text-gray-800 border border-indigo-100'
//                           : 'bg-indigo-600 text-white'
//                         }`}
//                     >
//                       {msg.text.split('\n').map((line, i) => (
//                         <React.Fragment key={i}>
//                           {line}
//                           {i < msg.text.split('\n').length - 1 && <br />}
//                         </React.Fragment>
//                       ))}
//                     </div>
//                   </div>
//                 ))}

//                 {isThinking && (
//                   <div className="flex justify-start">
//                     <div className="bg-indigo-50 p-2 rounded-lg flex items-center space-x-1 border border-indigo-100">
//                       <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
//                       <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
//                       <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '600ms' }}></div>
//                     </div>
//                   </div>
//                 )}
//                 <div ref={messagesEndRef} />
//               </div>

//               <div className="p-3 border-t border-gray-200 bg-slate-500">
//                 <div className="flex gap-4">
//                   <input
//                     type="text"
//                     className="border border-black rounded-full p-2 flex-grow text-xs"
//                     placeholder="Ask about exhibitions, tickets, or tours..."
//                     value={userInput}
//                     onChange={(e) => setUserInput(e.target.value)}
//                     onKeyDown={handleKeyDown}
//                   />
//                   <button
//                     onClick={handleSendMessage}
//                     className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 rounded-full flex items-center justify-center text-xs font-medium transition-colors duration-150"
//                   >
//                     <span>Send</span>
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" viewBox="0 0 20 20" fill="currentColor">
//                       <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
//                     </svg>
//                   </button>
//                 </div>
//                 <div className="flex  justify-center mt-2">
//                   <button
//                     onClick={() => setIsChatOpen(false)}
//                     className="text-xs text-black hover:text-red-700 border border-black hover:border-red-700 rounded-full px-3 py-1 transition duration-300"
//                   >
//                     Close
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//     </div>
//   );
// };

// export default HomePage;