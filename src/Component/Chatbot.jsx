import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, MapPin, Calendar, X, ExternalLink, Clock, Info } from 'lucide-react';

const MuseumChatbot = ({ 
  onBookingFormOpen, 
  onExploreRedirect,
  baseApiUrl = "https://zfx79p4m-8080.inc1.devtunnels.ms/api" 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentFlow, setCurrentFlow] = useState('welcome');
  const [flowData, setFlowData] = useState({});
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addBotMessage("🏛️ Welcome to Museum Ticket Assistant! I'm here to help you with:\n\n🎫 **Book Tickets** - Find and book museum visits\n🗂️ **Explore Museums** - Discover amazing sites\n❌ **Cancel Tickets** - Cancel existing bookings\n❓ **Get Information** - Learn about museums and history\n\nHow can I assist you today?");
    }
  }, [isOpen]);

  const addBotMessage = (text, type = 'text', data = null) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now(),
        text,
        sender: 'bot',
        type,
        data,
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }, 800);
  };

  const addUserMessage = (text) => {
    setMessages(prev => [...prev, {
      id: Date.now(),
      text,
      sender: 'user',
      timestamp: new Date()
    }]);
  };

  const fetchSitesByCity = async (city) => {
    try {
      const response = await fetch(`${baseApiUrl}/museums/by-city?city=${encodeURIComponent(city)}`);
      if (response.ok) {
        const sites = await response.json();
        return sites;
      } else if (response.status === 204) {
        return [];
      }
      throw new Error('Failed to fetch sites');
    } catch (error) {
      console.error('Error fetching sites:', error);
      return null;
    }
  };

  const cancelTicket = async (ticketId, reason) => {
    try {
      const response = await fetch(`${baseApiUrl}/payment/cancel/${ticketId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reason })
      });
      
      if (response.ok) {
        const result = await response.json();
        return { success: true, data: result };
      } else {
        const error = await response.text();
        return { success: false, error };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const getHistoricalInfo = async (query) => {
    try {
      // Clean the query to extract the main topic
      const cleanQuery = query.replace(/tell me about|what is|history of|about|information|do you know/gi, '').trim();
      const searchTerm = cleanQuery || query;
      
      // Method 1: Try API Ninjas Historical Events API (requires API key)
      // Method 2: Try CORS proxy with Wikipedia
      const corsProxy = 'https://api.allorigins.win/get?url=';
      const wikipediaUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(searchTerm)}`;
      
      const response = await fetch(`${corsProxy}${encodeURIComponent(wikipediaUrl)}`);
      
      if (response.ok) {
        const proxyData = await response.json();
        if (proxyData.contents) {
          const data = JSON.parse(proxyData.contents);
          if (data.extract && data.extract.length > 0) {
            return `${data.extract}\n\n${data.content_urls?.desktop?.page ? `🔗 Read more: ${data.content_urls.desktop.page}` : ''}`;
          }
        }
      }
      
      throw new Error('API failed');
      
    } catch (error) {
      console.error('Historical info API error:', error);
      
      // Enhanced fallback responses for common Indian historical topics
      const lowerQuery = query.toLowerCase();
      
      if (lowerQuery.includes('taj mahal')) {
        return `🏛️ **The Taj Mahal**\n\nThe Taj Mahal is an ivory-white marble mausoleum located in Agra, Uttar Pradesh, India. It was commissioned in 1631 by Mughal emperor Shah Jahan to house the tomb of his favorite wife, Mumtaz Mahal.\n\n**Key Facts:**\n• Built: 1632-1653 (21 years)\n• Architecture: Indo-Islamic, Mughal style\n• Material: White marble from Makrana\n• Height: 73 meters (240 ft)\n• UNESCO World Heritage Site since 1983\n• One of the New Seven Wonders of the World\n\n**Visiting Info:**\n• Location: Agra, Uttar Pradesh\n• Best time: October to March\n• Entry fee: ₹50 for Indians, ₹1100 for foreigners\n\n*This information is from my knowledge base as external APIs are currently unavailable.*`;
      } 
      
      else if (lowerQuery.includes('red fort') || lowerQuery.includes('lal qila')) {
        return `🏰 **Red Fort (Lal Qila)**\n\nThe Red Fort is a historic fortified palace in Delhi, India, that served as the main residence of the Mughal Emperors for nearly 200 years.\n\n**Key Facts:**\n• Built: 1638-1648 by Shah Jahan\n• Architecture: Mughal architecture\n• Material: Red sandstone\n• Area: 254.67 acres\n• UNESCO World Heritage Site since 2007\n• Independence Day celebrations held here annually\n\n**Visiting Info:**\n• Location: Chandni Chowk, Old Delhi\n• Entry fee: ₹35 for Indians, ₹500 for foreigners\n• Timing: 9:30 AM to 4:30 PM (closed on Mondays)\n\n*This information is from my knowledge base as external APIs are currently unavailable.*`;
      }
      
      else if (lowerQuery.includes('qutub minar') || lowerQuery.includes('qutb minar')) {
        return `🗼 **Qutub Minar**\n\nQutub Minar is a 73-meter tall minaret and victory tower in Delhi, India. It's the tallest brick minaret in the world.\n\n**Key Facts:**\n• Built: Started 1193 by Qutb ud-Din Aibak\n• Height: 72.5 meters (238 ft)\n• Floors: 5 stories with 379 steps\n• Material: Red sandstone and marble\n• UNESCO World Heritage Site since 1993\n• Part of Qutub Complex\n\n**Visiting Info:**\n• Location: Mehrauli, South Delhi\n• Entry fee: ₹30 for Indians, ₹500 for foreigners\n• Timing: Sunrise to sunset\n\n*This information is from my knowledge base as external APIs are currently unavailable.*`;
      }
      
      else if (lowerQuery.includes('india gate')) {
        return `🏛️ **India Gate**\n\nIndia Gate is a war memorial located in New Delhi, built to honor the soldiers who died in World War I and the Third Afghan War.\n\n**Key Facts:**\n• Built: 1921-1931\n• Architect: Sir Edwin Lutyens\n• Height: 42 meters (138 ft)\n• Style: Triumphal arch\n• Inscribed names: 13,300 soldiers\n• Amar Jawan Jyoti (eternal flame) added in 1972\n\n**Visiting Info:**\n• Location: Rajpath, New Delhi\n• Entry: Free\n• Best time: Evening (beautifully lit)\n• Open: 24 hours\n\n*This information is from my knowledge base as external APIs are currently unavailable.*`;
      }
      
      else if (lowerQuery.includes('hawa mahal')) {
        return `🏰 **Hawa Mahal (Palace of Winds)**\n\nHawa Mahal is a palace in Jaipur, Rajasthan, built with red and pink sandstone. It's famous for its unique honeycomb structure.\n\n**Key Facts:**\n• Built: 1799 by Maharaja Sawai Pratap Singh\n• Architecture: Rajputana architecture\n• Windows: 953 small windows (jharokhas)\n• Purpose: Royal women could observe street life\n• Floors: 5 stories, 50 feet high\n\n**Visiting Info:**\n• Location: Badi Chaupad, Jaipur\n• Entry fee: ₹50 for Indians, ₹200 for foreigners\n• Timing: 9:00 AM to 4:30 PM\n\n*This information is from my knowledge base as external APIs are currently unavailable.*`;
      }
      
      else if (lowerQuery.includes('golden temple') || lowerQuery.includes('harmandir sahib')) {
        return `🏛️ **Golden Temple (Harmandir Sahib)**\n\nThe Golden Temple is a gurdwara located in Amritsar, Punjab, and is the holiest shrine of Sikhism.\n\n**Key Facts:**\n• Built: 1589 (current structure from 1764)\n• Architecture: Sikh architecture with gold plating\n• Sacred pool: Amrit Sarovar\n• Free meals: Serves 100,000+ people daily\n• Open to all: Regardless of religion or background\n\n**Visiting Info:**\n• Location: Amritsar, Punjab\n• Entry: Free for all\n• Dress code: Cover head, remove shoes\n• Open: 24 hours\n• Langar (free meal): Available always\n\n*This information is from my knowledge base as external APIs are currently unavailable.*`;
      }
      
      else {
        return `🤔 I'd love to tell you about "${searchTerm}", but I'm currently unable to fetch live information from external sources due to technical limitations.\n\n**I can provide detailed information about these popular Indian monuments:**\n• Taj Mahal\n• Red Fort (Lal Qila)\n• Qutub Minar\n• India Gate\n• Hawa Mahal\n• Golden Temple\n\n**Try asking:** "Tell me about Taj Mahal" or "History of Red Fort"\n\n*For the most current information, I recommend checking official tourism websites or Wikipedia directly.*`;
      }
    }
  };

  const detectIntent = (message) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('book') || lowerMessage.includes('ticket') || lowerMessage.includes('visit') || lowerMessage.includes('reserve')) {
      return 'booking';
    }
    if (lowerMessage.includes('cancel') || lowerMessage.includes('refund')) {
      return 'cancellation';
    }
    if (lowerMessage.includes('explore') || lowerMessage.includes('discover') || lowerMessage.includes('browse')) {
      return 'explore';
    }
    if (lowerMessage.includes('history') || lowerMessage.includes('about') || lowerMessage.includes('tell me') || lowerMessage.includes('information')) {
      return 'information';
    }
    if (lowerMessage.includes('help') || lowerMessage.includes('what can you do')) {
      return 'help';
    }
    
    return 'general';
  };

  const handleSiteSelection = (site) => {
    setFlowData(prev => ({ ...prev, selectedSite: site }));
    addUserMessage(`Selected: ${site.name}`);
    addBotMessage(`Great choice! You've selected **${site.name}** in ${site.location}.\n\n${site.description ? `ℹ️ ${site.description}\n\n` : ''}I'll now open the booking form for you to complete your reservation.`);
    
    setTimeout(() => {
      if (onBookingFormOpen) {
        onBookingFormOpen(site);
      }
      setCurrentFlow('welcome');
      setFlowData({});
    }, 1500);
  };

  const handleCancellation = async () => {
    const { ticketId, reason } = flowData;
    addBotMessage("🔄 Processing your cancellation request...");
    
    const result = await cancelTicket(ticketId, reason);
    
    if (result.success) {
      addBotMessage(`✅ **Ticket Cancelled Successfully!**\n\nTicket ID: ${ticketId}\nReason: ${reason}\n\nYour refund will be processed within 3-5 business days. You'll receive a confirmation email shortly.`);
    } else {
      addBotMessage(`❌ **Cancellation Failed**\n\n${result.error}\n\nPlease check your ticket ID and try again, or contact our support team for assistance.`);
    }
    
    setCurrentFlow('welcome');
    setFlowData({});
  };

  const processMessage = async (message) => {
    addUserMessage(message);
    
    if (currentFlow === 'booking_city') {
      addBotMessage("🔍 Searching for museums in your city...");
      const sites = await fetchSitesByCity(message);
      
      if (sites === null) {
        addBotMessage("❌ Sorry, I encountered an error while searching. Please try again or contact support.");
        setCurrentFlow('welcome');
      } else if (sites.length === 0) {
        addBotMessage(`😕 I couldn't find any museums in "${message}". Please check the spelling or try a nearby city.`);
        setCurrentFlow('welcome');
      } else {
        addBotMessage(`🏛️ **Found ${sites.length} museum${sites.length > 1 ? 's' : ''} in ${message}:**\n\nSelect a museum to proceed with booking:`, 'sites', sites);
        setCurrentFlow('booking_site');
      }
      return;
    }
    
    if (currentFlow === 'cancel_ticket_id') {
      setFlowData(prev => ({ ...prev, ticketId: message }));
      addBotMessage("📝 Please provide a reason for cancellation (optional but recommended):");
      setCurrentFlow('cancel_reason');
      return;
    }
    
    if (currentFlow === 'cancel_reason') {
      setFlowData(prev => ({ ...prev, reason: message || 'No reason provided' }));
      await handleCancellation();
      return;
    }
    
    const intent = detectIntent(message);
    
    switch (intent) {
      case 'booking':
        addBotMessage("🎫 **Book Museum Tickets**\n\nTo find available museums, please tell me which city you'd like to visit:");
        setCurrentFlow('booking_city');
        break;
        
      case 'cancellation':
        addBotMessage("❌ **Cancel Ticket**\n\nI'll help you cancel your booking. Please provide your ticket ID:");
        setCurrentFlow('cancel_ticket_id');
        break;
        
      case 'explore':
        addBotMessage("🗺️ **Explore Museums**\n\nI'll redirect you to our explore page where you can browse all available museums and exhibitions!");
        setTimeout(() => {
          if (onExploreRedirect) {
            onExploreRedirect();
          }
        }, 1500);
        break;
        
      case 'information':
        const info = await getHistoricalInfo(message.replace(/tell me about|what is|history of|about/gi, '').trim());
        addBotMessage(`📚 **Historical Information:**\n\n${info}\n\n*Information sourced from Wikipedia*`);
        break;
        
      case 'help':
        addBotMessage("🤖 **I can help you with:**\n\n🎫 **Book Tickets** - Say 'book tickets' or 'I want to visit'\n❌ **Cancel Tickets** - Say 'cancel ticket' or 'refund'\n🗺️ **Explore Museums** - Say 'explore' or 'browse museums'\n📚 **Get Information** - Ask about any museum or historical topic\n\nJust tell me what you'd like to do!");
        break;
        
      default:
        if (message.toLowerCase().includes('hello') || message.toLowerCase().includes('hi')) {
          addBotMessage("👋 Hello! Welcome back to Museum Ticket Assistant. How can I help you today?");
        } else {
          addBotMessage("🤔 I'm not sure I understand. Could you please clarify what you'd like to do?\n\nI can help with booking tickets, cancelling reservations, exploring museums, or providing information about historical sites.");
        }
    }
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (input.trim()) {
      processMessage(input.trim());
      setInput('');
    }
  };

  const formatTimestamp = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 z-50"
      >
        {isOpen ? <X size={24} /> : <Bot size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col z-50">
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot size={20} />
              <div>
                <h3 className="font-semibold">Museum Assistant</h3>
                <p className="text-xs text-blue-100">Always here to help</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-blue-100 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex gap-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {message.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div className={`rounded-lg p-3 ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {message.type === 'sites' ? (
                      <div>
                        <div className="whitespace-pre-line mb-3">{message.text}</div>
                        <div className="space-y-2">
                          {message.data.map((site, index) => (
                            <button
                              key={index}
                              onClick={() => handleSiteSelection(site)}
                              className="w-full text-left p-3 bg-white rounded border hover:bg-blue-50 hover:border-blue-300 transition-colors"
                            >
                              <div className="flex items-start gap-2">
                                <MapPin size={16} className="text-blue-600 mt-1 flex-shrink-0" />
                                <div>
                                  <h4 className="font-semibold text-gray-800">{site.name}</h4>
                                  <p className="text-sm text-gray-600">{site.location}</p>
                                  {site.ticketPrice && (
                                    <p className="text-sm text-green-600 font-medium">₹{site.ticketPrice}</p>
                                  )}
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="whitespace-pre-line">{message.text}</div>
                    )}
                    <div className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {formatTimestamp(message.timestamp)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex gap-2 max-w-[80%]">
                  <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center">
                    <Bot size={16} />
                  </div>
                  <div className="bg-gray-100 rounded-lg p-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isTyping}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
              />
              <button
                onClick={handleSubmit}
                disabled={!input.trim() || isTyping}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MuseumChatbot;