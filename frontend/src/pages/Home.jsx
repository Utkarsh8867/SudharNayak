import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import axiosInstance from '../api/axiosInstance'
import IssueCard from '../components/IssueCard'
import Loader, { SkeletonCard } from '../components/Loader'
import { AlertCircle, CheckCircle, Clock, TrendingUp, Filter, Search } from 'lucide-react'

const Home = () => {
    const [issues, setIssues] = useState([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState({ category: '', status: '' })
    const [searchTerm, setSearchTerm] = useState('')
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
            const params = new URLSearchParams()
            if (filter.category) params.append('category', filter.category)
            if (filter.status) params.append('status', filter.status)

            const { data } = await axiosInstance.get(`/issues?${params}`)
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
                className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 text-white py-20"
            >
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ x: -100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                                Make Your City
                                <span className="block text-yellow-300">Better Together</span>
                            </h1>
                            <p className="text-xl mb-8 text-purple-100">
                                Report civic issues, track progress, and create positive change in your community.
                                Your voice matters! 🏙️
                            </p>
                            <div className="flex gap-4">
                                <Link to="/report">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="bg-white text-purple-600 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition flex items-center gap-2"
                                    >
                                        <AlertCircle size={24} />
                                        Report Issue
                                    </motion.button>
                                </Link>
                                <Link to="/register">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-purple-600 transition"
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
                            className="relative"
                        >
                            <motion.div
                                animate={{ y: [0, -20, 0] }}
                                transition={{ duration: 3, repeat: Infinity }}
                                className="relative z-10"
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop"
                                    alt="City"
                                    className="rounded-2xl shadow-2xl"
                                />
                            </motion.div>
                            <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-yellow-300 rounded-full opacity-20 blur-3xl"></div>
                            <div className="absolute -top-4 -left-4 w-72 h-72 bg-pink-300 rounded-full opacity-20 blur-3xl"></div>
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* Stats Section */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg"
                        >
                            <TrendingUp size={32} className="mb-2" />
                            <div className="text-3xl font-bold">{stats.total}</div>
                            <div className="text-purple-100">Total Issues</div>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white p-6 rounded-2xl shadow-lg"
                        >
                            <Clock size={32} className="mb-2" />
                            <div className="text-3xl font-bold">{stats.pending}</div>
                            <div className="text-yellow-100">Pending</div>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg"
                        >
                            <AlertCircle size={32} className="mb-2" />
                            <div className="text-3xl font-bold">{stats.inProgress}</div>
                            <div className="text-blue-100">In Progress</div>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-2xl shadow-lg"
                        >
                            <CheckCircle size={32} className="mb-2" />
                            <div className="text-3xl font-bold">{stats.resolved}</div>
                            <div className="text-green-100">Resolved</div>
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
                        className="mb-8"
                    >
                        <h2 className="text-4xl font-bold text-gray-800 mb-2 flex items-center gap-3">
                            <Filter className="text-purple-600" />
                            Recent Issues
                        </h2>
                        <p className="text-gray-600">Browse and track civic issues in your community</p>
                    </motion.div>

                    {/* Search and Filters */}
                    <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
                        <div className="grid md:grid-cols-3 gap-4">
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
