import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, Calendar, User, Eye } from 'lucide-react'

const IssueCard = ({ issue, index }) => {
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
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -8 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
        >
            {/* Image Section */}
            <div className="relative h-48 overflow-hidden bg-gradient-to-br from-purple-100 to-blue-100">
                {issue.imageUrl ? (
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
                <div className="absolute top-3 right-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusColors[issue.status]}`}>
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

                {/* View Details Button */}
                <Link to={`/issue/${issue._id}`}>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                    >
                        <Eye size={18} />
                        <span>View Details</span>
                    </motion.button>
                </Link>
            </div>
        </motion.div>
    )
}

export default IssueCard
