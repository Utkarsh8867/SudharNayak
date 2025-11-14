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
            whileHover={{ y: -8 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
        >
            {/* Image Section with Slider */}
            <div className="relative h-48 overflow-hidden bg-gradient-to-br from-purple-100 to-blue-100">
                {issue.images && issue.images.length > 0 ? (
                    <ImageSlider images={issue.images} autoPlay={true} interval={4000} />
                ) : issue.imageUrl ? (
                    <img
                        src={issue.imageUrl}
                        alt={issue.title}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-6xl">
                        {categoryIcons[issue.category]}
                    </div>
                )}
                <div className="absolute top-3 right-3 z-10">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-sm ${statusColors[issue.status]}`}>
                        {issue.status}
                    </span>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">{categoryIcons[issue.category]}</span>
                    <span className="bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold">
                        {issue.category}
                    </span>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
                    {issue.title}
                </h3>

                <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
                    {issue.description}
                </p>

                {/* Meta Information */}
                <div className="space-y-2 mb-4">
                    {issue.location?.address && (
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <MapPin size={16} className="text-purple-500" />
                            <span className="line-clamp-1">{issue.location.address}</span>
                        </div>
                    )}

                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar size={16} className="text-blue-500" />
                        <span>{new Date(issue.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                        })}</span>
                    </div>

                    {issue.createdBy?.name && (
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <User size={16} className="text-green-500" />
                            <span>{issue.createdBy.name}</span>
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 mb-4">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleLike}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-lg transition ${liked
                            ? 'bg-red-100 text-red-600'
                            : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600'
                            }`}
                    >
                        <Heart size={16} fill={liked ? 'currentColor' : 'none'} />
                        <span className="text-sm font-medium">{likesCount}</span>
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleShare}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition"
                    >
                        <Share2 size={16} />
                        <span className="text-sm font-medium">Share</span>
                    </motion.button>

                    <Link to={`/issue/${issue._id}`} className="flex-1">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                        >
                            <Eye size={16} />
                            <span className="text-sm">View</span>
                        </motion.button>
                    </Link>
                </div>
            </div>
        </motion.div>
    )
}

export default IssueCard
