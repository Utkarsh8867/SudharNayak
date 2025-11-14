import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import axiosInstance from '../api/axiosInstance'
import IssueCard from '../components/IssueCard'
import Loader, { SkeletonCard } from '../components/Loader'
import { AlertCircle, CheckCircle, Clock, TrendingUp, Filter, Search } from 'lucide-react'
import heroImage from '../assets/H.png'

const Home = () => {
    const [issues, setIssues] = useState([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState({ category: '', status: '' })
    const [searchTerm, setSearchTerm] = useState('')
    const [slowLoading, setSlowLoading] = useState(false)
    const [stats, setStats] = useState({
        total: 0,
        pending: 0,
        inProgress: 0,
        resolved: 0
    })

    useEffect(() => {
        fetchIssues()
    }, [filter])

    const fetchIssues = async () => {
        try {
            setLoading(true)
            setSlowLoading(false)

            // Show message if loading takes more than 3 seconds
            const slowLoadTimer = setTimeout(() => {
                setSlowLoading(true)
            }, 3000)

            const params = new URLSearchParams()
            if (filter.category) params.append('category', filter.category)
            if (filter.status) params.append('status', filter.status)

            const { data } = await axiosInstance.get(`/issues?${params}`)
            clearTimeout(slowLoadTimer)
            setIssues(data)

            // Calculate stats
            setStats({
                total: data.length,
                pending: data.filter(i => i.status === 'Pending').length,
                inProgress: data.filter(i => i.status === 'In Progress').length,
                resolved: data.filter(i => i.status === 'Resolved').length
            })
        } catch (error) {
            console.error('Error fetching issues:', error)
        } finally {
            setLoading(false)
            setSlowLoading(false)
        }
    }

    const filteredIssues = issues.filter(issue =>
        issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.description.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 text-white py-12 sm:py-16 md:py-20"
            >
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                        <motion.div
                            initial={{ x: -100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
                                Make Your City
                                <span className="block text-yellow-300">Better Together</span>
                            </h1>
                            <p className="text-base sm:text-lg md:text-xl mb-6 md:mb-8 text-purple-100">
                                Report civic issues, track progress, and create positive change in your community.
                                Your voice matters! 🏙️
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                                <Link to="/report" className="w-full sm:w-auto">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="w-full bg-white text-purple-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:shadow-2xl transition flex items-center justify-center gap-2"
                                    >
                                        <AlertCircle size={20} className="sm:w-6 sm:h-6" />
                                        Report Issue
                                    </motion.button>
                                </Link>
                                <Link to="/register" className="w-full sm:w-auto">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="w-full border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:bg-white hover:text-purple-600 transition"
                                    >
                                        Join Now
                                    </motion.button>
                                </Link>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ x: 100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="relative hidden md:block"
                        >
                            <motion.div
                                animate={{ y: [0, -20, 0] }}
                                transition={{ duration: 3, repeat: Infinity }}
                                className="relative z-10"
                            >
                                <img
                                    src={heroImage}
                                    alt="SudharNayak - Making Cities Better"
                                    className="rounded-2xl shadow-2xl w-full h-auto"
                                />
                            </motion.div>
                            <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-yellow-300 rounded-full opacity-20 blur-3xl"></div>
                            <div className="absolute -top-4 -left-4 w-72 h-72 bg-pink-300 rounded-full opacity-20 blur-3xl"></div>
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* Stats Section */}
            <section className="py-8 sm:py-12 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg"
                        >
                            <TrendingUp size={24} className="sm:w-8 sm:h-8 mb-2" />
                            <div className="text-2xl sm:text-3xl font-bold">{stats.total}</div>
                            <div className="text-purple-100 text-xs sm:text-sm">Total Issues</div>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg"
                        >
                            <Clock size={24} className="sm:w-8 sm:h-8 mb-2" />
                            <div className="text-2xl sm:text-3xl font-bold">{stats.pending}</div>
                            <div className="text-yellow-100 text-xs sm:text-sm">Pending</div>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg"
                        >
                            <AlertCircle size={24} className="sm:w-8 sm:h-8 mb-2" />
                            <div className="text-2xl sm:text-3xl font-bold">{stats.inProgress}</div>
                            <div className="text-blue-100 text-xs sm:text-sm">In Progress</div>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            className="bg-gradient-to-br from-green-500 to-green-600 text-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg"
                        >
                            <CheckCircle size={24} className="sm:w-8 sm:h-8 mb-2" />
                            <div className="text-2xl sm:text-3xl font-bold">{stats.resolved}</div>
                            <div className="text-green-100 text-xs sm:text-sm">Resolved</div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Issues Section */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 md:mb-8"
                    >
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2 flex items-center gap-2 sm:gap-3">
                            <Filter className="text-purple-600 w-6 h-6 sm:w-8 sm:h-8" />
                            Recent Issues
                        </h2>
                        <p className="text-sm sm:text-base text-gray-600">Browse and track civic issues in your community</p>
                    </motion.div>

                    {/* Search and Filters */}
                    <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg mb-6 md:mb-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search issues..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                            </div>

                            <select
                                value={filter.category}
                                onChange={(e) => setFilter({ ...filter, category: e.target.value })}
                                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            >
                                <option value="">All Categories</option>
                                <option value="Road">🛣️ Road</option>
                                <option value="Garbage">🗑️ Garbage</option>
                                <option value="Water">💧 Water</option>
                                <option value="Electricity">⚡ Electricity</option>
                                <option value="Other">📋 Other</option>
                            </select>

                            <select
                                value={filter.status}
                                onChange={(e) => setFilter({ ...filter, status: e.target.value })}
                                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            >
                                <option value="">All Status</option>
                                <option value="Pending">⏳ Pending</option>
                                <option value="In Progress">🔄 In Progress</option>
                                <option value="Resolved">✅ Resolved</option>
                            </select>
                        </div>
                    </div>

                    {/* Slow Loading Message */}
                    {slowLoading && loading && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 flex items-center gap-3"
                        >
                            <Clock className="text-blue-600 animate-spin" size={24} />
                            <div>
                                <p className="text-blue-800 font-semibold">Waking up the server...</p>
                                <p className="text-blue-600 text-sm">This may take 30-50 seconds on first load. Thanks for your patience! ☕</p>
                            </div>
                        </motion.div>
                    )}

                    {/* Issues Grid */}
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <SkeletonCard key={i} />
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredIssues.map((issue, index) => (
                                <IssueCard key={issue._id} issue={issue} index={index} />
                            ))}
                        </div>
                    )}

                    {!loading && filteredIssues.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20"
                        >
                            <div className="text-6xl mb-4">🔍</div>
                            <h3 className="text-2xl font-bold text-gray-700 mb-2">No issues found</h3>
                            <p className="text-gray-500 mb-6">Try adjusting your filters or be the first to report!</p>
                            <Link to="/report">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-xl font-semibold"
                                >
                                    Report First Issue
                                </motion.button>
                            </Link>
                        </motion.div>
                    )}
                </div>
            </section>
        </div>
    )
}

export default Home
