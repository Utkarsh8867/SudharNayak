import { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { AuthContext } from '../context/AuthContext'
import axiosInstance from '../api/axiosInstance'
import Loader from '../components/Loader'
import toast from 'react-hot-toast'
import { MapPin, Calendar, User, MessageCircle, Send, ArrowLeft, Tag, X, ZoomIn, Heart, Share2 } from 'lucide-react'

const IssueDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { user } = useContext(AuthContext)
    const [issue, setIssue] = useState(null)
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState('')
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const [showImageModal, setShowImageModal] = useState(false)
    const [liked, setLiked] = useState(false)

    useEffect(() => {
        fetchIssueDetails()
        fetchComments()
    }, [id])

    const fetchIssueDetails = async () => {
        try {
            const { data } = await axiosInstance.get(`/issues/${id}`)
            setIssue(data)
        } catch (error) {
            toast.error('Failed to load issue details')
            console.error('Error fetching issue:', error)
        } finally {
            setLoading(false)
        }
    }

    const fetchComments = async () => {
        try {
            const { data } = await axiosInstance.get(`/comments/${id}`)
            setComments(data)
        } catch (error) {
            console.error('Error fetching comments:', error)
        }
    }

    const handleAddComment = async (e) => {
        e.preventDefault()
        if (!newComment.trim()) return

        setSubmitting(true)
        try {
            const { data } = await axiosInstance.post(`/comments/${id}`, { text: newComment })
            setComments([data, ...comments])
            setNewComment('')
            toast.success('Comment added! 💬')
        } catch (error) {
            toast.error('Failed to add comment')
            console.error('Error adding comment:', error)
        } finally {
            setSubmitting(false)
        }
    }

    if (loading) return <Loader />
    if (!issue) return (
        <div className="container mx-auto px-4 py-20 text-center">
            <div className="text-6xl mb-4">😕</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Issue not found</h2>
            <button
                onClick={() => navigate('/')}
                className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700"
            >
                Go Back Home
            </button>
        </div>
    )

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

    return (
        <div className="min-h-screen py-6 sm:py-8 bg-gray-50">
            <div className="container mx-auto px-4">
                {/* Back Button */}
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => navigate(-1)}
                    whileHover={{ scale: 1.05, x: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 text-gray-600 hover:text-purple-600 mb-6 transition-all bg-white px-4 py-2 rounded-xl shadow-md hover:shadow-lg font-semibold"
                >
                    <ArrowLeft size={20} />
                    <span>Back to Issues</span>
                </motion.button>

                <div className="max-w-5xl mx-auto">
                    {/* Issue Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-6 sm:mb-8 border border-gray-100"
                    >
                        {/* Image */}
                        {issue.imageUrl ? (
                            <div className="relative h-96 overflow-hidden group cursor-pointer" onClick={() => setShowImageModal(true)}>
                                <img
                                    src={issue.imageUrl}
                                    alt={issue.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                                {/* Zoom Icon Overlay */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="bg-white/90 backdrop-blur-sm p-4 rounded-full">
                                        <ZoomIn size={32} className="text-purple-600" />
                                    </div>
                                </div>

                                {/* Status Badge */}
                                <div className="absolute top-6 right-6">
                                    <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className={`inline-block px-5 py-2.5 rounded-full text-sm font-bold border-2 shadow-lg backdrop-blur-sm ${statusColors[issue.status]}`}
                                    >
                                        {issue.status}
                                    </motion.span>
                                </div>

                                {/* Action Buttons */}
                                <div className="absolute bottom-6 right-6 flex gap-3">
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            setLiked(!liked)
                                            toast.success(liked ? 'Removed from favorites' : 'Added to favorites! ❤️')
                                        }}
                                        className={`p-3 rounded-full backdrop-blur-md transition-colors ${liked ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-700 hover:bg-red-500 hover:text-white'
                                            }`}
                                    >
                                        <Heart size={20} fill={liked ? 'currentColor' : 'none'} />
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            navigator.clipboard.writeText(window.location.href)
                                            toast.success('Link copied to clipboard! 🔗')
                                        }}
                                        className="bg-white/90 backdrop-blur-md p-3 rounded-full text-gray-700 hover:bg-purple-500 hover:text-white transition-colors"
                                    >
                                        <Share2 size={20} />
                                    </motion.button>
                                </div>
                            </div>
                        ) : (
                            <div className="h-64 bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100 flex items-center justify-center relative overflow-hidden">
                                <motion.div
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        rotate: [0, 5, -5, 0]
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                    className="text-9xl"
                                >
                                    {categoryIcons[issue.category]}
                                </motion.div>
                                <div className="absolute top-6 right-6">
                                    <span className={`inline-block px-5 py-2.5 rounded-full text-sm font-bold border-2 ${statusColors[issue.status]}`}>
                                        {issue.status}
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* Content */}
                        <div className="p-6 sm:p-8 md:p-10">
                            <div className="flex items-center gap-3 mb-6">
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", stiffness: 200 }}
                                    className="text-5xl"
                                >
                                    {categoryIcons[issue.category]}
                                </motion.span>
                                <motion.span
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 px-5 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 shadow-md"
                                >
                                    <Tag size={16} />
                                    {issue.category}
                                </motion.span>
                            </div>

                            <motion.h1
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4 leading-tight"
                            >
                                {issue.title}
                            </motion.h1>

                            <motion.p
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="text-gray-700 text-base sm:text-lg mb-8 leading-relaxed"
                            >
                                {issue.description}
                            </motion.p>

                            {/* Meta Information */}
                            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                                {issue.location?.address && (
                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.5 }}
                                        className="flex items-start gap-3 bg-gradient-to-br from-purple-50 to-purple-100 p-5 rounded-2xl border border-purple-200 hover:shadow-lg transition-shadow"
                                    >
                                        <div className="bg-purple-500 p-2.5 rounded-xl">
                                            <MapPin size={20} className="text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-xs font-semibold text-purple-600 mb-1">Location</div>
                                            <div className="font-semibold text-gray-800 text-sm leading-snug">{issue.location.address}</div>
                                        </div>
                                    </motion.div>
                                )}

                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                    className="flex items-start gap-3 bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-2xl border border-blue-200 hover:shadow-lg transition-shadow"
                                >
                                    <div className="bg-blue-500 p-2.5 rounded-xl">
                                        <Calendar size={20} className="text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-xs font-semibold text-blue-600 mb-1">Reported On</div>
                                        <div className="font-semibold text-gray-800 text-sm">
                                            {new Date(issue.createdAt).toLocaleDateString('en-US', {
                                                month: 'long',
                                                day: 'numeric',
                                                year: 'numeric'
                                            })}
                                        </div>
                                    </div>
                                </motion.div>

                                {issue.createdBy?.name && (
                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.7 }}
                                        className="flex items-start gap-3 bg-gradient-to-br from-green-50 to-green-100 p-5 rounded-2xl border border-green-200 hover:shadow-lg transition-shadow"
                                    >
                                        <div className="bg-green-500 p-2.5 rounded-xl">
                                            <User size={20} className="text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-xs font-semibold text-green-600 mb-1">Reported By</div>
                                            <div className="font-semibold text-gray-800 text-sm">{issue.createdBy.name}</div>
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </motion.div>

                    {/* Comments Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 border border-gray-100"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center gap-3">
                                <div className="bg-purple-100 p-2 rounded-xl">
                                    <MessageCircle className="text-purple-600" size={24} />
                                </div>
                                <span>Comments</span>
                                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-bold">
                                    {comments.length}
                                </span>
                            </h2>
                        </div>

                        {/* Add Comment Form */}
                        {user ? (
                            <form onSubmit={handleAddComment} className="mb-8">
                                <div className="flex gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="flex-1">
                                        <textarea
                                            value={newComment}
                                            onChange={(e) => setNewComment(e.target.value)}
                                            placeholder="Add your comment..."
                                            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition resize-none"
                                            rows="3"
                                        />
                                        <motion.button
                                            type="submit"
                                            disabled={submitting || !newComment.trim()}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="mt-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-xl font-semibold hover:shadow-lg transition disabled:opacity-50 flex items-center gap-2"
                                        >
                                            <Send size={18} />
                                            {submitting ? 'Posting...' : 'Post Comment'}
                                        </motion.button>
                                    </div>
                                </div>
                            </form>
                        ) : (
                            <div className="bg-gray-50 p-6 rounded-xl mb-8 text-center">
                                <p className="text-gray-600 mb-3">Please login to comment</p>
                                <button
                                    onClick={() => navigate('/login')}
                                    className="bg-purple-600 text-white px-6 py-2 rounded-xl hover:bg-purple-700"
                                >
                                    Login
                                </button>
                            </div>
                        )}

                        {/* Comments List */}
                        <div className="space-y-4">
                            {comments.map((comment, index) => (
                                <motion.div
                                    key={comment._id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
                                >
                                    <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                                        {comment.userId?.name?.charAt(0).toUpperCase() || '?'}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="font-semibold text-gray-800">{comment.userId?.name || 'Anonymous'}</span>
                                            <span className="text-sm text-gray-500">
                                                {new Date(comment.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <p className="text-gray-700">{comment.text}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {comments.length === 0 && (
                            <div className="text-center py-12">
                                <div className="text-5xl mb-3">💬</div>
                                <p className="text-gray-500">No comments yet. Be the first to comment!</p>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>

            {/* Image Modal */}
            <AnimatePresence>
                {showImageModal && issue.imageUrl && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowImageModal(false)}
                        className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 cursor-zoom-out"
                    >
                        <motion.button
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            onClick={() => setShowImageModal(false)}
                            className="absolute top-6 right-6 bg-white/10 backdrop-blur-md p-3 rounded-full text-white hover:bg-white/20 transition z-10"
                        >
                            <X size={24} />
                        </motion.button>

                        <motion.img
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: "spring", damping: 25 }}
                            src={issue.imageUrl}
                            alt={issue.title}
                            className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        />

                        <div className="absolute bottom-6 left-6 right-6 text-center">
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="bg-white/10 backdrop-blur-md rounded-2xl p-4 inline-block"
                            >
                                <p className="text-white font-semibold text-lg">{issue.title}</p>
                                <p className="text-gray-300 text-sm mt-1">{issue.category} • {issue.status}</p>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default IssueDetails
