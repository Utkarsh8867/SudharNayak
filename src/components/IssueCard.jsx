import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, Calendar, User, Eye, Heart, Share2 } from 'lucide-react'
import { useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import axiosInstance from '../api/axiosInstance'
import toast from 'react-hot-toast'
import ImageSlider from './ImageSlider'

const IssueCard = ({ issue, index }) => {
    const { user } = useContext(AuthContext)
    const [liked, setLiked] = useState(issue.likes?.includes(user?._id))
    const [likesCount, setLikesCount] = useState(issue.likesCount || 0)

    const statusColors = {
        Pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
        'In Progress': 'bg-blue-100 text-blue-800 border-blue-300',
        Resolved: 'bg-green-100 text-green-800 border-green-300',
    }

    const categoryIcons = {
        Road: '🛣️',
        Garbage: '🗑️',
        Water: '💧',
        Electricity: '⚡',
        Other: '📋',
    }

    const handleLike = async (e) => {
        e.preventDefault()
        if (!user) {
            toast.error('Please login to like issues')
            return
        }

        try {
            const { data } = await axiosInstance.post(`/issues/${issue._id}/like`)
            setLiked(data.liked)
            setLikesCount(data.likesCount)
            toast.success(data.liked ? 'Issue liked!' : 'Issue unliked')
        } catch (error) {
            toast.error('Failed to like issue')
        }
    }

    const handleShare = async (e) => {
        e.preventDefault()
        const shareUrl = `${window.location.origin}/issue/${issue._id}`
        const shareText = `Check out this civic issue: ${issue.title}`

        if (navigator.share) {
            try {
                await navigator.share({
                    title: issue.title,
                    text: shareText,
                    url: shareUrl,
                })
                toast.success('Shared successfully!')
            } catch (error) {
                if (error.name !== 'AbortError') {
                    copyToClipboard(shareUrl)
                }
            }
        } else {
            copyToClipboard(shareUrl)
        }
    }

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
        toast.success('Link copied to clipboard!')
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -8, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
            className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 group"
        >
            {/* Image Section with Slider */}
            <Link to={`/issue/${issue._id}`}>
                <div className="relative h-56 overflow-hidden bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100">
                    {issue.images && issue.images.length > 0 ? (
                        <ImageSlider images={issue.images} autoPlay={true} interval={4000} />
                    ) : issue.imageUrl ? (
                        <img
                            src={issue.imageUrl}
                            alt={issue.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <motion.div
                                animate={{
                                    scale: [1, 1.1, 1],
                                    rotate: [0, 5, -5, 0]
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="text-7xl"
                            >
                                {categoryIcons[issue.category]}
                            </motion.div>
                        </div>
                    )}
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Status Badge */}
                    <div className="absolute top-4 right-4 z-10">
                        <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className={`px-4 py-1.5 rounded-full text-xs font-bold border-2 backdrop-blur-md shadow-lg ${statusColors[issue.status]}`}
                        >
                            {issue.status}
                        </motion.span>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 z-10">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg"
                        >
                            <span className="text-xl">{categoryIcons[issue.category]}</span>
                            <span className="text-xs font-bold text-gray-800">{issue.category}</span>
                        </motion.div>
                    </div>
                </div>
            </Link>

            {/* Content Section */}
            <div className="p-6">
                <Link to={`/issue/${issue._id}`}>
                    <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 hover:text-purple-600 transition-colors duration-200 leading-tight">
                        {issue.title}
                    </h3>

                    <p className="text-gray-600 mb-4 line-clamp-2 text-sm leading-relaxed">
                        {issue.description}
                    </p>
                </Link>

                {/* Meta Information */}
                <div className="space-y-2.5 mb-5 bg-gray-50 rounded-xl p-3">
                    {issue.location?.address && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <div className="bg-purple-100 p-1.5 rounded-lg">
                                <MapPin size={14} className="text-purple-600" />
                            </div>
                            <span className="line-clamp-1 flex-1">{issue.location.address}</span>
                        </div>
                    )}

                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <div className="bg-blue-100 p-1.5 rounded-lg">
                                <Calendar size={14} className="text-blue-600" />
                            </div>
                            <span className="text-xs">{new Date(issue.createdAt).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                            })}</span>
                        </div>

                        {issue.createdBy?.name && (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <div className="bg-green-100 p-1.5 rounded-lg">
                                    <User size={14} className="text-green-600" />
                                </div>
                                <span className="text-xs font-medium">{issue.createdBy.name}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                    <motion.button
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.92 }}
                        onClick={handleLike}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold transition-all duration-200 ${liked
                            ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg shadow-red-200'
                            : 'bg-gray-100 text-gray-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 hover:text-red-600'
                            }`}
                    >
                        <Heart size={16} fill={liked ? 'currentColor' : 'none'} className="transition-all" />
                        <span className="text-sm font-bold">{likesCount}</span>
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.92 }}
                        onClick={handleShare}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-100 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-600 transition-all duration-200 font-semibold"
                    >
                        <Share2 size={16} />
                    </motion.button>

                    <Link to={`/issue/${issue._id}`} className="flex-1">
                        <motion.button
                            whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(147, 51, 234, 0.4)" }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white py-2.5 rounded-xl font-bold hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                        >
                            <Eye size={18} />
                            <span className="text-sm">View Details</span>
                        </motion.button>
                    </Link>
                </div>
            </div>
        </motion.div>
    )
}

export default IssueCard
