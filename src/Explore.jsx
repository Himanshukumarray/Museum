import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Calendar, Users, Play, X, ExternalLink } from 'lucide-react';
import reactsvg from './assets/react.svg'; // Placeholder image, replace with actual image path

const MuseumBooking = () => {
    const [museums, setMuseums] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedMuseum, setSelectedMuseum] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchMuseums();
    }, []);

    const fetchMuseums = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:8080/api/museums');
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

    const formatTime = (time) => {
        return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };

    const formatDays = (days) => {
        if (days.length === 7) return 'All Days';
        if (days.length <= 3) return days.join(', ');
        return `${days.slice(0, 2).join(', ')} +${days.length - 2} more`;
    };

    const getImageUrl = (photo) => {
        if (!photo) return 'https://via.placeholder.com/400x300';
        return photo.startsWith('http') ? photo : `http://localhost:8080/${photo.replace(/^\//, '')}`;
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
            {/* Header */}
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
                            {/* Image */}
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={museum.photos[[0]]}
                                    alt={museum.name}
                                    className="w-full h-full object-cover"
                                    onError={() => console.error("Image failed to load")}
                                />

                                {console.log(museum.photos)}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                <div className="absolute bottom-4 left-4 text-white">
                                    <div className="flex items-center space-x-1 text-sm">
                                        <MapPin className="w-4 h-4" />
                                        <span>{museum.city}, {museum.state}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                                    {museum.name}
                                </h3>
                                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                    {museum.description}
                                </p>

                                {/* Details Grid */}
                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                                            <Clock className="w-4 h-4" />
                                            <span>{formatTime(museum.openingTime)} - {formatTime(museum.closingTime)}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                                        <Calendar className="w-4 h-4" />
                                        <span>{formatDays(museum.openingDays)}</span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                                            <Users className="w-4 h-4" />
                                            <span>Adult: ₹{museum.adultFare} | Child: ₹{museum.childFare}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex space-x-3">
                                    <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl font-semibold transition-colors duration-200 flex items-center justify-center space-x-2">
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
                <div className="fixed inset-0 backdrop-blur-sm bg-opacity-75 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
                        {/* Modal Header */}
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

                        {/* Modal Content */}
                        <div className="p-6 max-h-[calc(90vh-120px)] overflow-y-auto">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* 3D Tour */}
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


                                {/* YouTube Video */}
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

                            {/* Museum Info */}
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
                                        <span>{formatTime(selectedMuseum.openingTime)} - {formatTime(selectedMuseum.closingTime)}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <Users className="w-4 h-4" />
                                        <span>₹{selectedMuseum.adultFare} (Adult) | ₹{selectedMuseum.childFare} (Child)</span>
                                    </div>
                                </div>
                            </div>

                            {/* Action Button */}
                            <div className="mt-6 text-center">
                                <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-8 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2 mx-auto">
                                    <ExternalLink className="w-4 h-4" />
                                    <span>Book Your Visit Now</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MuseumBooking;
