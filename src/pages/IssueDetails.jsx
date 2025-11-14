import { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { AuthContext } from '../context/AuthContext'
import axiosInstance from '../api/axiosInstance'
import Loader from '../components/Loader'
import toast from 'react-hot-toast'
import { MapPin, Calendar, User, MessageCircle, Send, ArrowLeft, Tag, Heart, Share2 } from 'lucide-react'

const IssueDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { user } = useContext(AuthContext)
    const [issue, setIssue] = useState(null)
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState('')
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)
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
                            <div className="relative h-64 sm:h-80 overflow-hidden">
                                <img
                                    src={issue.imageUrl}
                                    alt={issue.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

                                {/* Status Badge */}
                                <div className="absolute top-4 right-4">
                                    <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className={`inline-block px-4 py-2 rounded-full text-xs sm:text-sm font-bold border-2 shadow-lg backdrop-blur-md ${statusColors[issue.status]}`}
                                    >
                                        {issue.status}
                                    </motion.span>
                                </div>

                                {/* Action Buttons */}
                                <div className="absolute bottom-4 right-4 flex gap-2">
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            setLiked(!liked)
                                            toast.success(liked ? 'Removed from favorites' : 'Added to favorites! ❤️')
                                        }}
                                        className={`p-2.5 rounded-full backdrop-blur-md transition-colors shadow-lg ${liked ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-700 hover:bg-red-500 hover:text-white'
                                            }`}
                                    >
                                        <Heart size={18} fill={liked ? 'currentColor' : 'none'} />
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            navigator.clipboard.writeText(window.location.href)
                                            toast.success('Link copied to clipboard! 🔗')
                                        }}
                                        className="bg-white/90 backdrop-blur-md p-2.5 rounded-full text-gray-700 hover:bg-purple-500 hover:text-white transition-colors shadow-lg"
                                    >
                                        <Share2 size={18} />
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
                        <div className="p-5 sm:p-6 md:p-8">
                            <div className="flex items-center gap-2 sm:gap-3 mb-4">
                                <span className="text-3xl sm:text-4xl">
                                    {categoryIcons[issue.category]}
                                </span>
                                <span className="bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-md">
                                    <Tag size={14} />
                                    {issue.category}
                                </span>
                            </div>

                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 leading-tight">
                                {issue.title}
                            </h1>

                            <p className="text-gray-700 text-sm sm:text-base mb-6 leading-relaxed">
                                {issue.description}
                            </p>

                            {/* Meta Information */}
                            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 mb-5">
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
        </div>
    )
}

export default IssueDetails
