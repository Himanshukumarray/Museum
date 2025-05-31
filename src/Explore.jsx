import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Calendar, Users, Play, X, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import reactsvg from './assets/react.svg'; // Placeholder image, replace with actual image path

const MuseumBooking = () => {
    const [museums, setMuseums] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedMuseum, setSelectedMuseum] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [bookingForm, setBookingForm] = useState({
        userId: '',
        siteId: '',
        bookSiteVisit: false,
        numberOfAdults: 0,
        numberOfChildren: 0,
        bookShow: false,
        showSlotTime: '',
        showAdults: 0,
        showChildren: 0,
        bookingDate: '',
    });
    const [paymentStatus, setPaymentStatus] = useState(null);
    const [ticketId, setTicketId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Load Razorpay checkout.js
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
        fetchMuseums();
        const museumUser = localStorage.getItem('museumUser');
        if (museumUser) {
            const museumData = JSON.parse(museumUser);
            setBookingForm((prev) => ({ ...prev, userId: museumData.id }));
        }
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const fetchMuseums = async () => {
        try {
            setLoading(true);
            const response = await fetch('https://zfx79p4m-8080.inc1.devtunnels.ms/api/museums');
            if (!response.ok) {
                throw new Error('Failed to fetch museums');
            }
            const data = await response.json();
            setMuseums(Array.isArray(data[0]) ? data[0] : data);
        } catch (err) {
            setError(err.message);
            console.error('Error fetching museums:', err);
        } finally {
            setLoading(false);
        }
    };

    const openVirtualTour = (museum) => {
        setSelectedMuseum(museum);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedMuseum(null);
    };

    const openBookingModal = (museum) => {
        const museumUser = localStorage.getItem('museumUser');
        if (!museumUser) {
            navigate('/login');
            return;
        }
        const museumData = JSON.parse(museumUser);
        const userId = museumData.id;
        setSelectedMuseum(museum);
        setBookingForm((prev) => ({
            ...prev,
            siteId: museum.id,
            userId,
        }));
        setShowBookingModal(true);
    };

    const closeBookingModal = () => {
        setShowBookingModal(false);
        setSelectedMuseum(null);
        setPaymentStatus(null);
        setTicketId(null);
        setBookingForm({
            userId: JSON.parse(localStorage.getItem('museumUser'))?.id || '',
            siteId: '',
            bookSiteVisit: false,
            numberOfAdults: 0,
            numberOfChildren: 0,
            bookShow: false,
            showSlotTime: '',
            showAdults: 0,
            showChildren: 0,
            bookingDate: '',
        });
    };

    const handleBookingFormChange = (e) => {
        const { name, value, type, checked } = e.target;
        setBookingForm((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const calculateTotalFare = () => {
        const adultSiteFare = selectedMuseum?.adultFare || 0;
        const childSiteFare = selectedMuseum?.childFare || 0;
        const adultShowFare = selectedMuseum?.adultShowFare || adultSiteFare;
        const childShowFare = selectedMuseum?.childShowFare || childSiteFare;
        let total = 0;
        if (bookingForm.bookSiteVisit) {
            total += bookingForm.numberOfAdults * adultSiteFare + bookingForm.numberOfChildren * childSiteFare;
        }
        if (bookingForm.bookShow) {
            total += bookingForm.showAdults * adultShowFare + bookingForm.showChildren * childShowFare;
        }
        return total;
    };

    const isFormValid = () => {
        if (!bookingForm.bookingDate || (!bookingForm.bookSiteVisit && !bookingForm.bookShow)) {
            return false;
        }
        if (bookingForm.bookSiteVisit && (bookingForm.numberOfAdults <= 0 && bookingForm.numberOfChildren <= 0)) {
            return false;
        }
        if (bookingForm.bookShow && (!bookingForm.showSlotTime || (bookingForm.showAdults <= 0 && bookingForm.showChildren <= 0))) {
            return false;
        }
        return true;
    };

    const handleBookingSubmit = async (e) => {
        e.preventDefault();
        if (!isFormValid()) {
            alert('Please fill out all required fields correctly.');
            return;
        }
        try {
            setPaymentStatus('pending');
            // Create Razorpay order
            const orderRes = await fetch('https://zfx79p4m-8080.inc1.devtunnels.ms/api/payment/create-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bookingForm),
            });
            if (!orderRes.ok) {
                throw new Error('Failed to create Razorpay order');
            }
            const orderData = await orderRes.json();
            const options = {
                key: 'rzp_test_MmpZH7mBjnByxI', // Replace with production key in live
                amount: orderData.amount,
                currency: 'INR',
                name: 'Smart Museum',
                description: 'Museum Ticket Booking',
                order_id: orderData.id,
                handler: async function (response) {
                    try {
                        const confirmPayload = {
                            razorpayOrderId: response.razorpay_order_id,
                            razorpayPaymentId: response.razorpay_payment_id,
                            razorpaySignature: response.razorpay_signature,
                            bookingRequest: bookingForm,
                        };
                        const confirmRes = await fetch('https://zfx79p4m-8080.inc1.devtunnels.ms/api/tickets/confirm', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(confirmPayload),
                        });
                        if (!confirmRes.ok) {
                            throw new Error('Failed to confirm ticket');
                        }
                        const ticket = await confirmRes.json();
                        setTicketId(ticket.id);
                        setPaymentStatus('success');
                        alert(`🎫 Ticket booked successfully!\nTicket ID: ${ticket.id}`);
                        closeBookingModal();
                    } catch (err) {
                        setPaymentStatus('failed');
                        alert('❌ Ticket confirmation failed: ' + err.message);
                    }
                },
                theme: {
                    color: '#3399cc',
                },
            };
            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (err) {
            setPaymentStatus('failed');
            alert('❌ Booking failed: ' + err.message);
        }
    };

    const formatTime = (time) => {
        return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        });
    };

    const formatDays = (days) => {
        if (days.length === 7) return 'All Days';
        if (days.length <= 3) return days.join(', ');
        return `${days.slice(0, 2).join(', ')} +${days.length - 2} more`;
    };

    const getImageUrl = (photo) => {
        if (!photo) return 'https://via.placeholder.com/400x300';
        return photo.startsWith('http') ? photo : `https://zfx79p4m-8080.inc1.devtunnels.ms/${photo.replace(/^\//, '')}`;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-amber-50 via-indigo-50 to-red-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">Loading museums...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-amber-50 via-indigo-50 to-red-50 flex items-center justify-center">
                <div className="text-center bg-white p-8 rounded-xl shadow-lg">
                    <div className="text-red-500 text-6xl mb-4">⚠️</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h2>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <button
                        onClick={fetchMuseums}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-indigo-50 to-red-50 mt-20">
            Header
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">
                            Discover Amazing Museums
                        </h1>
                        <p className="text-xl text-gray-600">
                            Explore India's rich cultural heritage through immersive experiences
                        </p>
                    </div>
                </div>
            </div>

            {/* Museum Cards */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {museums.map((museum) => (
                        <div
                            key={museum.id}
                            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                        >
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={getImageUrl(museum.photos?.[0])}
                                    alt={museum.name}
                                    className="w-full h-full object-cover"
                                    onError={() => console.error("Image failed to load")}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                <div className="absolute bottom-4 left-4 text-white">
                                    <div className="flex items-center space-x-1 text-sm">
                                        <MapPin className="w-4 h-4" />
                                        <span>{museum.city}, {museum.state}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                                    {museum.name}
                                </h3>
                                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                    {museum.description}
                                </p>
                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                                            <Clock className="w-4 h-4" />
                                            <span>
                                                {formatTime(museum.openingTime)} -{' '}
                                                {formatTime(museum.closingTime)}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                                        <Calendar className="w-4 h-4" />
                                        <span>{formatDays(museum.openingDays)}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                                            <Users className="w-4 h-4" />
                                            <span>
                                                Adult: ₹{museum.adultFare} | Child: ₹{museum.childFare}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex space-x-3">
                                    <button
                                        onClick={() => openBookingModal(museum)}
                                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl font-semibold transition-colors duration-200 flex items-center justify-center space-x-2"
                                    >
                                        <span>Book Ticket</span>
                                    </button>
                                    <button
                                        onClick={() => openVirtualTour(museum)}
                                        className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-xl font-semibold transition-colors duration-200 flex items-center justify-center space-x-2"
                                    >
                                        <Play className="w-4 h-4" />
                                        <span>Virtual Tour</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {museums.length === 0 && !loading && (
                    <div className="text-center py-12">
                        <div className="text-gray-400 text-6xl mb-4">🏛️</div>
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">No Museums Found</h3>
                        <p className="text-gray-500">Please try again later or check your connection.</p>
                    </div>
                )}
            </div>

            {/* Virtual Tour Modal */}
            {showModal && selectedMuseum && (
                <div className="fixed inset-0 backdrop-blur-sm bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
                        <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                            <div>
                                <h2 className="text-2xl font-bold">{selectedMuseum.name}</h2>
                                <p className="text-purple-100">Virtual Tour Experience</p>
                            </div>
                            <button
                                onClick={closeModal}
                                className="p-2 hover:bg-white/20 rounded-full transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="p-6 max-h-[calc(90vh-120px)] overflow-y-auto">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-800 mb-3">360° Virtual Tour</h2>
                                    <div className="aspect-video bg-neutral-800 rounded-xl overflow-hidden shadow-md">
                                        <iframe
                                            src="https://www.google.com/maps/embed?pb=!4v1679694295253!6m8!1m7!1sCAoSLEFGMVFpcE1aS1VJd1R6REJ1dE5JZV9qZ0hFaWhGUk5adk9YREJlSFlNdkNu!2m2!1d27.1750151!2d78.0421552!3f0!4f0!5f0.7820865974627469"
                                            className="w-full h-full border-0"
                                            allowFullScreen
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                            title="Google Street View of Taj Mahal"
                                        ></iframe>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                        <h3 className="text-lg font-semibold text-gray-800">Video Tour</h3>
                                    </div>
                                    <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden">
                                        <iframe
                                            src={selectedMuseum?.youtubeLink || "https://www.youtube.com/embed/HyZuNWq_ybA?si=zK9hO3gSZkfFTPKY"}
                                            className="w-full h-full border-0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            allowFullScreen
                                            title="Video Tour"
                                        ></iframe>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8 p-6 bg-gray-50 rounded-xl">
                                <h4 className="text-lg font-semibold text-gray-800 mb-3">About This Museum</h4>
                                <p className="text-gray-600 mb-4">{selectedMuseum.description}</p>
                                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                                    <div className="flex items-center space-x-1">
                                        <MapPin className="w-4 h-4" />
                                        <span>{selectedMuseum.city}, {selectedMuseum.state}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <Clock className="w-4 h-4" />
                                        <span>
                                            {formatTime(selectedMuseum.openingTime)} -{' '}
                                            {formatTime(selectedMuseum.closingTime)}
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <Users className="w-4 h-4" />
                                        <span>
                                            ₹{selectedMuseum.adultFare} (Adult) | ₹{selectedMuseum.childFare} (Child)
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 text-center">
                                <button
                                    onClick={() => openBookingModal(selectedMuseum)}
                                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-8 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2 mx-auto"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                    <span>Book Your Visit Now</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Booking Modal */}
            {showBookingModal && selectedMuseum && (
                <div className="fixed inset-0 backdrop-blur-sm bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-scroll">
                    <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden">
                        <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                            <h2 className="text-2xl font-bold">Book Tickets for {selectedMuseum.name}</h2>
                            <button
                                onClick={closeBookingModal}
                                className="p-2 hover:bg-white/20 rounded-full transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <form onSubmit={handleBookingSubmit} className="p-6 space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Booking Date
                                </label>
                                <input
                                    type="date"
                                    name="bookingDate"
                                    value={bookingForm.bookingDate}
                                    onChange={handleBookingFormChange}
                                    min={new Date().toISOString().split('T')[0]}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                                    <input
                                        type="checkbox"
                                        name="bookSiteVisit"
                                        checked={bookingForm.bookSiteVisit}
                                        onChange={handleBookingFormChange}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <span>Book Site Visit (Adult: ₹{selectedMuseum.adultFare}, Child: ₹{selectedMuseum.childFare})</span>
                                </label>
                                {bookingForm.bookSiteVisit && (
                                    <div className="mt-4 space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Number of Adults
                                            </label>
                                            <input
                                                type="number"
                                                name="numberOfAdults"
                                                value={bookingForm.numberOfAdults}
                                                onChange={handleBookingFormChange}
                                                min="0"
                                                required
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Number of Children
                                            </label>
                                            <input
                                                type="number"
                                                name="numberOfChildren"
                                                value={bookingForm.numberOfChildren}
                                                onChange={handleBookingFormChange}
                                                min="0"
                                                required
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div>
                                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                                    <input
                                        type="checkbox"
                                        name="bookShow"
                                        checked={bookingForm.bookShow}
                                        onChange={handleBookingFormChange}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <span>Book Show (Adult: ₹{selectedMuseum.adultShowFare || selectedMuseum.adultFare}, Child: ₹{selectedMuseum.childShowFare || selectedMuseum.childFare})</span>
                                </label>
                                {bookingForm.bookShow && (
                                    <div className="mt-4 space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Show Slot Time
                                            </label>
                                            <select
                                                name="showSlotTime"
                                                value={bookingForm.showSlotTime}
                                                onChange={handleBookingFormChange}
                                                required
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                <option value="" disabled>Select a time slot</option>
                                                {['10:00', '12:00', '14:00', '16:00'].map((time) => (
                                                    <option key={time} value={time}>
                                                        {formatTime(time)}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Number of Adults (Show)
                                            </label>
                                            <input
                                                type="number"
                                                name="showAdults"
                                                value={bookingForm.showAdults}
                                                onChange={handleBookingFormChange}
                                                min="0"
                                                required
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Number of Children (Show)
                                            </label>
                                            <input
                                                type="number"
                                                name="showChildren"
                                                value={bookingForm.showChildren}
                                                onChange={handleBookingFormChange}
                                                min="0"
                                                required
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                            {isFormValid() && (
                                <div className="border-t pt-6">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Booking Summary</h3>
                                    <div className="mb-4">
                                        <p className="text-gray-600">
                                            Total Fare: ₹{calculateTotalFare()}
                                        </p>
                                        {ticketId && (
                                            <p className="text-gray-600">
                                                Ticket ID: {ticketId}
                                            </p>
                                        )}
                                        {paymentStatus === 'pending' && (
                                            <p className="text-yellow-600">Processing payment...</p>
                                        )}
                                        {paymentStatus === 'failed' && (
                                            <p className="text-red-600">Payment failed. Please try again.</p>
                                        )}
                                        {paymentStatus === 'success' && (
                                            <p className="text-green-600">Payment successful! Ticket confirmed.</p>
                                        )}
                                    </div>
                                </div>
                            )}
                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={closeBookingModal}
                                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={paymentStatus === 'pending' || paymentStatus === 'success'}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
                                >
                                    Pay Now
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MuseumBooking;