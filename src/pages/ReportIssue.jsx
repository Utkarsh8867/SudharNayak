import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { AuthContext } from '../context/AuthContext'
import axiosInstance from '../api/axiosInstance'
import toast from 'react-hot-toast'
import { Upload, MapPin, Image as ImageIcon, Send, AlertCircle, Navigation, X } from 'lucide-react'
import { getCurrentLocationWithAddress } from '../utils/geolocation'
import { compressBase64, getBase64Size, formatFileSize } from '../utils/urlOptimizer'

const ReportIssue = () => {
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [locationLoading, setLocationLoading] = useState(false)
    const [uploadingImage, setUploadingImage] = useState(false)
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
        if (url) {
            // Validate URL format
            try {
                new URL(url)
                setImagePreview(url)
            } catch {
                setImagePreview('')
                if (url.trim()) {
                    toast.error('Please enter a valid image URL')
                }
            }
        } else {
            setImagePreview('')
        }
    }

    const compressImage = (file, maxWidth = 800, quality = 0.7) => {
        return new Promise((resolve) => {
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')
            const img = new Image()

            img.onload = () => {
                // Calculate new dimensions
                let { width, height } = img
                if (width > maxWidth) {
                    height = (height * maxWidth) / width
                    width = maxWidth
                }

                canvas.width = width
                canvas.height = height

                // Draw and compress
                ctx.drawImage(img, 0, 0, width, height)
                const compressedDataUrl = canvas.toDataURL('image/jpeg', quality)
                resolve(compressedDataUrl)
            }

            img.src = URL.createObjectURL(file)
        })
    }

    const handleImageUpload = async (e) => {
        const file = e.target.files[0]
        if (!file) return

        // Validate file
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
        const maxSize = 5 * 1024 * 1024 // 5MB

        if (!validTypes.includes(file.type)) {
            toast.error('Invalid file type. Please upload JPG, PNG, GIF, or WebP images.')
            return
        }

        if (file.size > maxSize) {
            toast.error('File too large. Maximum size is 5MB.')
            return
        }

        setUploadingImage(true)
        toast.loading('Compressing and processing image...', { id: 'upload' })

        try {
            // Compress image to reduce base64 size
            const compressedBase64 = await compressImage(file, 800, 0.7)

            // Create preview
            setImagePreview(compressedBase64)
            setFormData({ ...formData, imageUrl: compressedBase64 })

            toast.success('Image compressed and ready! It will be uploaded to Cloudinary when you submit.', { id: 'upload' })
        } catch (error) {
            toast.error('Failed to process image. Please try again.', { id: 'upload' })
            console.error('Upload error:', error)
        } finally {
            setUploadingImage(false)
        }
    }

    const removeImage = () => {
        setImagePreview('')
        setFormData({ ...formData, imageUrl: '' })
        toast.success('Image removed')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            // Validate form data
            if (!formData.title || !formData.description) {
                toast.error('Please fill in all required fields')
                setLoading(false)
                return
            }

            await axiosInstance.post('/issues', formData)
            toast.success('Issue reported successfully! 🎉')
            navigate('/')
        } catch (err) {
            console.error('Submit error:', err)
            const errorMessage = err.response?.data?.message || 'Failed to report issue. Please try again.'
            toast.error(errorMessage)
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
        <div className="min-h-screen py-6 sm:py-8 md:py-12">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl mx-auto"
                >
                    {/* Header */}
                    <div className="text-center mb-6 sm:mb-8">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200 }}
                            className="inline-block text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4"
                        >
                            📢
                        </motion.div>
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2">Report an Issue</h1>
                        <p className="text-sm sm:text-base text-gray-600">Help make your city better by reporting civic problems</p>
                    </div>

                    {/* Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 md:p-12"
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
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3">
                                    {categoryOptions.map((cat) => (
                                        <motion.button
                                            key={cat.value}
                                            type="button"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setFormData({ ...formData, category: cat.value })}
                                            className={`p-3 sm:p-4 rounded-xl border-2 transition ${formData.category === cat.value
                                                ? 'border-purple-600 bg-purple-50'
                                                : 'border-gray-200 hover:border-purple-300'
                                                }`}
                                        >
                                            <div className="text-2xl sm:text-3xl mb-1">{cat.icon}</div>
                                            <div className="text-xs font-medium text-gray-700">{cat.label}</div>
                                        </motion.button>
                                    ))}
                                </div>
                            </div>

                            {/* Image Upload */}
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
                                    <ImageIcon size={20} className="text-purple-600" />
                                    Upload Image (Optional)
                                </label>

                                <div className="space-y-4">
                                    {/* File Upload */}
                                    <div>
                                        <label className="cursor-pointer">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                disabled={uploadingImage}
                                                className="hidden"
                                            />
                                            <motion.div
                                                whileHover={{ scale: 1.01 }}
                                                whileTap={{ scale: 0.99 }}
                                                className={`border-2 border-dashed border-gray-300 rounded-xl p-6 text-center transition ${uploadingImage ? 'opacity-50 cursor-not-allowed' : 'hover:border-purple-500 hover:bg-purple-50'
                                                    }`}
                                            >
                                                {uploadingImage ? (
                                                    <div className="flex flex-col items-center gap-2">
                                                        <motion.div
                                                            animate={{ rotate: 360 }}
                                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                            className="w-10 h-10 border-4 border-purple-600 border-t-transparent rounded-full"
                                                        />
                                                        <p className="text-gray-600 font-medium text-sm">Loading image...</p>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <Upload size={40} className="mx-auto text-gray-400 mb-2" />
                                                        <p className="text-gray-700 font-semibold mb-1">
                                                            Click to upload an image
                                                        </p>
                                                        <p className="text-xs text-gray-500">
                                                            JPG, PNG, GIF, WebP - Max 5MB
                                                        </p>
                                                    </>
                                                )}
                                            </motion.div>
                                        </label>
                                    </div>

                                    {/* OR Divider */}
                                    <div className="flex items-center gap-3">
                                        <div className="flex-1 border-t border-gray-300"></div>
                                        <span className="text-sm text-gray-500 font-medium">OR</span>
                                        <div className="flex-1 border-t border-gray-300"></div>
                                    </div>

                                    {/* URL Input */}
                                    <div>
                                        <input
                                            type="url"
                                            value={formData.imageUrl}
                                            onChange={(e) => handleImageUrlChange(e.target.value)}
                                            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                                            placeholder="Paste image URL here..."
                                        />
                                    </div>

                                    {/* Image Preview */}
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
                                                    setFormData({ ...formData, imageUrl: '' })
                                                    toast.error('Failed to load image. Please check the URL or try uploading again.')
                                                }}
                                                onLoad={() => {
                                                    // Image loaded successfully
                                                    console.log('Image loaded successfully')
                                                }}
                                            />
                                            <button
                                                type="button"
                                                onClick={removeImage}
                                                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition shadow-lg"
                                            >
                                                <X size={18} />
                                            </button>
                                            {/* Image info overlay */}
                                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-3">
                                                <p className="text-white text-xs">
                                                    {imagePreview.includes('cloudinary.com') ? '☁️ Cloudinary' : '🔗 External URL'}
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}

                                    <div className="bg-green-50 border border-green-200 rounded-xl p-3">
                                        <p className="text-xs text-green-800">
                                            ☁️ <strong>Cloudinary Integration:</strong> Images are automatically processed and uploaded to Cloudinary when you submit your report. You can also paste direct image URLs from other sources.
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
                                <div className="flex flex-col sm:flex-row gap-2">
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
                                        className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition disabled:opacity-50 flex items-center justify-center gap-2 w-full sm:w-auto"
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
                                        <span className="whitespace-nowrap">{locationLoading ? 'Getting...' : 'Auto-Detect'}</span>
                                    </motion.button>
                                </div>
                                <p className="text-xs sm:text-sm text-gray-500 mt-2">
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
