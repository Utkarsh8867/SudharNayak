import { useState, useEffect, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { AuthContext } from '../context/AuthContext'
import axiosInstance from '../api/axiosInstance'
import IssueCard from '../components/IssueCard'
import Loader, { SkeletonCard } from '../components/Loader'
import { FileText, TrendingUp, Clock, CheckCircle, PlusCircle } from 'lucide-react'

const MyReports = () => {
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()
    const [issues, setIssues] = useState([])
    const [loading, setLoading] = useState(true)
    const [stats, setStats] = useState({
        total: 0,
        pending: 0,
        inProgress: 0,
        resolved: 0
    })

    useEffect(() => {
        if (!user) {
            navigate('/login')
            return
        }
        fetchMyIssues()
    }, [user, navigate])

    const fetchMyIssues = async () => {
        try {
            const { data } = await axiosInstance.get('/issues/my-issues')
            setIssues(data)

            // Calculate stats
            setStats({
                total: data.length,
                pending: data.filter(i => i.status === 'Pending').length,
                inProgress: data.filter(i => i.status === 'In Progress').length,
                resolved: data.filter(i => i.status === 'Resolved').length
            })
        } catch (error) {
            console.error('Error fetching my issues:', error)
        } finally {
            setLoading(false)
        }
    }

    if (!user) return null

    return (
        <div className="min-h-screen py-12">
            <div className="container mx-auto px-4">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center gap-3">
                                <FileText className="text-purple-600" />
                                My Reports
                            </h1>
                            <p className="text-gray-600">Track and manage your reported issues</p>
                        </div>
                        <Link to="/report">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition flex items-center gap-2"
                            >
                                <PlusCircle size={20} />
                                Report New Issue
                            </motion.button>
                        </Link>
                    </div>
                </motion.div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg"
                    >
                        <TrendingUp size={28} className="mb-2" />
                        <div className="text-3xl font-bold">{stats.total}</div>
                        <div className="text-purple-100 text-sm">Total Reports</div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white p-6 rounded-2xl shadow-lg"
                    >
                        <Clock size={28} className="mb-2" />
                        <div className="text-3xl font-bold">{stats.pending}</div>
                        <div className="text-yellow-100 text-sm">Pending</div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg"
                    >
                        <TrendingUp size={28} className="mb-2" />
                        <div className="text-3xl font-bold">{stats.inProgress}</div>
                        <div className="text-blue-100 text-sm">In Progress</div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                        className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-2xl shadow-lg"
                    >
                        <CheckCircle size={28} className="mb-2" />
                        <div className="text-3xl font-bold">{stats.resolved}</div>
                        <div className="text-green-100 text-sm">Resolved</div>
                    </motion.div>
                </div>

                {/* Issues Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <SkeletonCard key={i} />
                        ))}
                    </div>
                ) : (
                    <>
                        {issues.length > 0 ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                            >
                                {issues.map((issue, index) => (
                                    <IssueCard key={issue._id} issue={issue} index={index} />
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-20 bg-white rounded-3xl shadow-lg"
                            >
                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="text-8xl mb-6"
                                >
                                    📝
                                </motion.div>
                                <h3 className="text-3xl font-bold text-gray-800 mb-3">No Reports Yet</h3>
                                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                                    You haven't reported any issues yet. Be the first to make a difference in your community!
                                </p>
                                <Link to="/report">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition inline-flex items-center gap-2"
                                    >
                                        <PlusCircle size={24} />
                                        Report Your First Issue
                                    </motion.button>
                                </Link>
                            </motion.div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}

export default MyReports
