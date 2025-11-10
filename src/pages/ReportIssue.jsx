import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { AuthContext } from '../context/AuthContext'
import axiosInstance from '../api/axiosInstance'
import toast from 'react-hot-toast'
import { Upload, MapPin, Image as ImageIcon, Send, AlertCircle, Navigation } from 'lucide-react'
import { getCurrentLocationWithAddress } from '../utils/geolocation'

const ReportIssue = () => {
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [locationLoading, setLocationLoading] = useState(false)
    const [imagePreview, setImagePreview] = useState('')
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'Other',
        imageUrl: '',
        location: { address: '', lat: '', lng: '' }
    })

    const handleGetLocation = async () => {
        setLocationLoading(true)
        try {
            const locationData = await getCurrentLocationWithAddress()
            setFormData({
                ...formData,
                location: {
                    address: locationData.fullAddress,
                    lat: locationData.lat,
                    lng: locationData.lng
                }
            })
            toast.success('Location detected successfully! 📍')
        } catch (error) {
            toast.error('Failed to get location. Please enter manually.')
            console.error('Location error:', error)
        } finally {
            setLocationLoading(false)
        }
    }

    if (!user) {
        navigate('/login')
        return null
    }

    const handleImageUrlChange = (url) => {
        setFormData({ ...formData, imageUrl: url })
        setImagePreview(url)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            await axiosInstance.post('/issues', formData)
            toast.success('Issue reported successfully! 🎉')
            navigate('/')
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to report issue')
        } finally {
            setLoading(false)
        }
    }

    const categoryOptions = [
        { value: 'Road', icon: '🛣️', label: 'Road Issues' },
        { value: 'Garbage', icon: '🗑️', label: 'Garbage Management' },
        { value: 'Water', icon: '💧', label: 'Water Supply' },
        { value: 'Electricity', icon: '⚡', label: 'Electricity' },
        { value: 'Other', icon: '📋', label: 'Other' },
    ]

    return (
        <div className="min-h-screen py-12">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl mx-auto"
                >
                    {/* Header */}
                    <div className="text-center mb-8">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200 }}
                            className="inline-block text-6xl mb-4"
                        >
                            📢
                        </motion.div>
                        <h1 className="text-4xl font-bold text-gray-800 mb-2">Report an Issue</h1>
                        <p className="text-gray-600">Help make your city better by reporting civic problems</p>
                    </div>

                    {/* Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-3xl shadow-2xl p-8 md:p-12"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Title */}
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
                                    <AlertCircle size={20} className="text-purple-600" />
                                    Issue Title *
                                </label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                                    placeholder="e.g., Broken streetlight on Main Street"
                                    required
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">
                                    Description *
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 h-32 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition resize-none"
                                    placeholder="Provide detailed information about the issue..."
                                    required
                                />
                            </div>

                            {/* Category Selection */}
                            <div>
                                <label className="block text-gray-700 font-semibold mb-3">
                                    Category *
                                </label>
                                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                                    {categoryOptions.map((cat) => (
                                        <motion.button
                                            key={cat.value}
                                            type="button"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setFormData({ ...formData, category: cat.value })}
                                            className={`p-4 rounded-xl border-2 transition ${formData.category === cat.value
                                                ? 'border-purple-600 bg-purple-50'
                                                : 'border-gray-200 hover:border-purple-300'
                                                }`}
                                        >
                                            <div className="text-3xl mb-1">{cat.icon}</div>
                                            <div className="text-xs font-medium text-gray-700">{cat.label}</div>
                                        </motion.button>
                                    ))}
                                </div>
                            </div>

                            {/* Image Upload */}
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
                                    <ImageIcon size={20} className="text-purple-600" />
                                    Image URL (Optional)
                                </label>
                                <div className="space-y-3">
                                    <input
                                        type="url"
                                        value={formData.imageUrl}
                                        onChange={(e) => handleImageUrlChange(e.target.value)}
                                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                                        placeholder="https://example.com/image.jpg"
                                    />

                                    {imagePreview && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="relative rounded-xl overflow-hidden border-2 border-gray-200"
                                        >
                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                className="w-full h-64 object-cover"
                                                onError={() => {
                                                    setImagePreview('')
                                                    toast.error('Invalid image URL')
                                                }}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setImagePreview('')
                                                    setFormData({ ...formData, imageUrl: '' })
                                                }}
                                                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                                            >
                                                ✕
                                            </button>
                                        </motion.div>
                                    )}

                                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                                        <p className="text-sm text-blue-800">
                                            💡 <strong>Tip:</strong> Upload your image to{' '}
                                            <a href="https://imgur.com" target="_blank" rel="noopener noreferrer" className="underline">
                                                Imgur
                                            </a>{' '}
                                            or{' '}
                                            <a href="https://imgbb.com" target="_blank" rel="noopener noreferrer" className="underline">
                                                ImgBB
                                            </a>{' '}
                                            and paste the direct link here.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Location */}
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
                                    <MapPin size={20} className="text-purple-600" />
                                    Location Address
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={formData.location.address}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            location: { ...formData.location, address: e.target.value }
                                        })}
                                        className="flex-1 border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                                        placeholder="Street, City, State"
                                    />
                                    <motion.button
                                        type="button"
                                        onClick={handleGetLocation}
                                        disabled={locationLoading}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition disabled:opacity-50 flex items-center gap-2"
                                    >
                                        {locationLoading ? (
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                            />
                                        ) : (
                                            <Navigation size={20} />
                                        )}
                                        {locationLoading ? 'Getting...' : 'Auto-Detect'}
                                    </motion.button>
                                </div>
                                <p className="text-sm text-gray-500 mt-2">
                                    💡 Click "Auto-Detect" to automatically get your current location using GPS
                                </p>
                            </div>

                            {/* Submit Button */}
                            <motion.button
                                type="submit"
                                disabled={loading}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                            className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                                        />
                                        Submitting...
                                    </>
                                ) : (
                                    <>
                                        <Send size={20} />
                                        Submit Issue Report
                                    </>
                                )}
                            </motion.button>
                        </form>
                    </motion.div>

                    {/* Info Cards */}
                    <div className="grid md:grid-cols-3 gap-6 mt-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white p-6 rounded-2xl shadow-lg text-center"
                        >
                            <div className="text-4xl mb-3">⚡</div>
                            <h3 className="font-bold text-gray-800 mb-2">Quick Response</h3>
                            <p className="text-sm text-gray-600">Issues are reviewed within 24 hours</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="bg-white p-6 rounded-2xl shadow-lg text-center"
                        >
                            <div className="text-4xl mb-3">🔔</div>
                            <h3 className="font-bold text-gray-800 mb-2">Stay Updated</h3>
                            <p className="text-sm text-gray-600">Get notifications on issue progress</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="bg-white p-6 rounded-2xl shadow-lg text-center"
                        >
                            <div className="text-4xl mb-3">🤝</div>
                            <h3 className="font-bold text-gray-800 mb-2">Community Driven</h3>
                            <p className="text-sm text-gray-600">Your voice makes a difference</p>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default ReportIssue
