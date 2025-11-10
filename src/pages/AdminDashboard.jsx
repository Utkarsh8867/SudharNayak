import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { AuthContext } from '../context/AuthContext'
import axiosInstance from '../api/axiosInstance'
import Loader from '../components/Loader'
import toast from 'react-hot-toast'
import { Shield, Eye, Trash2, TrendingUp, Clock, CheckCircle, AlertCircle } from 'lucide-react'

const AdminDashboard = () => {
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
        if (!user || user.role !== 'admin') {
            navigate('/')
            return
        }
        fetchAllIssues()
    }, [user, navigate])

    const fetchAllIssues = async () => {
        try {
            const { data } = await axiosInstance.get('/issues')
            setIssues(data)

            // Calculate stats
            setStats({
                total: data.length,
                pending: data.filter(i => i.status === 'Pending').length,
                inProgress: data.filter(i => i.status === 'In Progress').length,
                resolved: data.filter(i => i.status === 'Resolved').length
            })
        } catch (error) {
            toast.error('Failed to fetch issues')
            console.error('Error fetching issues:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleStatusUpdate = async (issueId, newStatus) => {
        try {
            await axiosInstance.put(`/issues/${issueId}`, { status: newStatus })
            setIssues(issues.map(issue =>
                issue._id === issueId ? { ...issue, status: newStatus } : issue
            ))
            toast.success(`Status updated to ${newStatus}! ✅`)

            // Update stats
            const updatedIssues = issues.map(issue =>
                issue._id === issueId ? { ...issue, status: newStatus } : issue
            )
            setStats({
                total: updatedIssues.length,
                pending: updatedIssues.filter(i => i.status === 'Pending').length,
                inProgress: updatedIssues.filter(i => i.status === 'In Progress').length,
                resolved: updatedIssues.filter(i => i.status === 'Resolved').length
            })
        } catch (error) {
            toast.error('Failed to update status')
            console.error('Error updating status:', error)
        }
    }

    const handleDelete = async (issueId) => {
        if (!window.confirm('Are you sure you want to delete this issue?')) return

        try {
            await axiosInstance.delete(`/issues/${issueId}`)
            setIssues(issues.filter(issue => issue._id !== issueId))
            toast.success('Issue deleted successfully! 🗑️')

            // Update stats
            const updatedIssues = issues.filter(issue => issue._id !== issueId)
            setStats({
                total: updatedIssues.length,
                pending: updatedIssues.filter(i => i.status === 'Pending').length,
                inProgress: updatedIssues.filter(i => i.status === 'In Progress').length,
                resolved: updatedIssues.filter(i => i.status === 'Resolved').length
            })
        } catch (error) {
            toast.error('Failed to delete issue')
            console.error('Error deleting issue:', error)
        }
    }

    if (!user || user.role !== 'admin') return null
    if (loading) return <Loader />

    return (
        <div className="min-h-screen py-12">
            <div className="container mx-auto px-4">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center gap-3">
                        <Shield className="text-purple-600" />
                        Admin Dashboard
                    </h1>
                    <p className="text-gray-600">Manage and resolve civic issues</p>
                </motion.div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg cursor-pointer"
                    >
                        <TrendingUp size={28} className="mb-2" />
                        <div className="text-3xl font-bold">{stats.total}</div>
                        <div className="text-purple-100 text-sm">Total Issues</div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        whileHover={{ scale: 1.05 }}
                        className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white p-6 rounded-2xl shadow-lg cursor-pointer"
                    >
                        <Clock size={28} className="mb-2" />
                        <div className="text-3xl font-bold">{stats.pending}</div>
                        <div className="text-yellow-100 text-sm">Pending</div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        whileHover={{ scale: 1.05 }}
                        className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg cursor-pointer"
                    >
                        <AlertCircle size={28} className="mb-2" />
                        <div className="text-3xl font-bold">{stats.inProgress}</div>
                        <div className="text-blue-100 text-sm">In Progress</div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                        whileHover={{ scale: 1.05 }}
                        className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-2xl shadow-lg cursor-pointer"
                    >
                        <CheckCircle size={28} className="mb-2" />
                        <div className="text-3xl font-bold">{stats.resolved}</div>
                        <div className="text-green-100 text-sm">Resolved</div>
                    </motion.div>
                </div>

                {/* Issues Table */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-white rounded-3xl shadow-2xl overflow-hidden"
                >
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                                <tr>
                                    <th className="px-6 py-4 text-left font-semibold">Title</th>
                                    <th className="px-6 py-4 text-left font-semibold">Category</th>
                                    <th className="px-6 py-4 text-left font-semibold">Status</th>
                                    <th className="px-6 py-4 text-left font-semibold">Reporter</th>
                                    <th className="px-6 py-4 text-left font-semibold">Date</th>
                                    <th className="px-6 py-4 text-left font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {issues.map((issue, index) => (
                                    <motion.tr
                                        key={issue._id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="border-b hover:bg-gray-50 transition"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-gray-800 max-w-xs truncate">
                                                {issue.title}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                                                {issue.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <select
                                                value={issue.status}
                                                onChange={(e) => handleStatusUpdate(issue._id, e.target.value)}
                                                className="border-2 border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                            >
                                                <option value="Pending">⏳ Pending</option>
                                                <option value="In Progress">🔄 In Progress</option>
                                                <option value="Resolved">✅ Resolved</option>
                                            </select>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">
                                            {issue.createdBy?.name || 'Unknown'}
                                        </td>
                                        <td className="px-6 py-4 text-gray-600 text-sm">
                                            {new Date(issue.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={() => navigate(`/issue/${issue._id}`)}
                                                    className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
                                                    title="View Details"
                                                >
                                                    <Eye size={18} />
                                                </motion.button>
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={() => handleDelete(issue._id)}
                                                    className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={18} />
                                                </motion.button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {issues.length === 0 && (
                        <div className="text-center py-20">
                            <div className="text-6xl mb-4">📊</div>
                            <h3 className="text-2xl font-bold text-gray-700 mb-2">No issues to manage</h3>
                            <p className="text-gray-500">All caught up! No issues reported yet.</p>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    )
}

export default AdminDashboard
