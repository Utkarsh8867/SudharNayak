import { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { AuthContext } from '../context/AuthContext'
import axiosInstance from '../api/axiosInstance'
import Loader from '../components/Loader'
import toast from 'react-hot-toast'
import { MapPin, Calendar, User, MessageCircle, Send, ArrowLeft, Tag } from 'lucide-react'

const IssueDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { user } = useContext(AuthContext)
    const [issue, setIssue] = useState(null)
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState('')
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)

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
        <div className="min-h-screen py-8">
            <div className="container mx-auto px-4">
                {/* Back Button */}
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-600 hover:text-purple-600 mb-6 transition"
                >
                    <ArrowLeft size={20} />
                    <span>Back</span>
                </motion.button>

                <div className="max-w-5xl mx-auto">
                    {/* Issue Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-8"
                    >
                        {/* Image */}
                        {issue.imageUrl ? (
                            <div className="relative h-96 overflow-hidden">
                                <img
                                    src={issue.imageUrl}
                                    alt={issue.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                <div className="absolute bottom-6 left-6 right-6">
                                    <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold border-2 ${statusColors[issue.status]}`}>
                                        {issue.status}
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <div className="h-64 bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                                <div className="text-9xl">{categoryIcons[issue.category]}</div>
                            </div>
                        )}

                        {/* Content */}
                        <div className="p-8">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-4xl">{categoryIcons[issue.category]}</span>
                                <span className="bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                                    <Tag size={16} />
                                    {issue.category}
                                </span>
                            </div>

                            <h1 className="text-4xl font-bold text-gray-800 mb-4">{issue.title}</h1>

                            <p className="text-gray-700 text-lg mb-6 leading-relaxed">{issue.description}</p>

                            {/* Meta Information */}
                            <div className="grid md:grid-cols-3 gap-4 mb-6">
                                {issue.location?.address && (
                                    <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
                                        <MapPin size={20} className="text-purple-600" />
                                        <div>
                                            <div className="text-xs text-gray-500">Location</div>
                                            <div className="font-medium text-gray-800">{issue.location.address}</div>
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
                                    <Calendar size={20} className="text-blue-600" />
                                    <div>
                                        <div className="text-xs text-gray-500">Reported On</div>
                                        <div className="font-medium text-gray-800">
                                            {new Date(issue.createdAt).toLocaleDateString('en-US', {
                                                month: 'long',
                                                day: 'numeric',
                                                year: 'numeric'
                                            })}
                                        </div>
                                    </div>
                                </div>

                                {issue.createdBy?.name && (
                                    <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
                                        <User size={20} className="text-green-600" />
                                        <div>
                                            <div className="text-xs text-gray-500">Reported By</div>
                                            <div className="font-medium text-gray-800">{issue.createdBy.name}</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>

                    {/* Comments Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-3xl shadow-2xl p-8"
                    >
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                            <MessageCircle className="text-purple-600" />
                            Comments ({comments.length})
                        </h2>

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
