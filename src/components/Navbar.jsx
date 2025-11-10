import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { AuthContext } from '../context/AuthContext'
import { Menu, X, Home, FileText, User, LogOut, Shield } from 'lucide-react'
import toast from 'react-hot-toast'

const Navbar = () => {
    const { user, logout } = useContext(AuthContext)
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)

    const handleLogout = () => {
        logout()
        toast.success('Logged out successfully!')
        navigate('/login')
    }

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="bg-white shadow-lg sticky top-0 z-50"
        >
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-3">
                        <motion.img
                            src="/L.png"
                            alt="SudharNayak Logo"
                            className="h-12 w-auto"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.3 }}
                        />
                        <span className="text-2xl font-bold gradient-text">SudharNayak</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-6">
                        <Link to="/" className="flex items-center gap-2 text-gray-700 hover:text-purple-600 transition">
                            <Home size={18} />
                            <span>Home</span>
                        </Link>
                        <Link to="/about" className="text-gray-700 hover:text-purple-600 transition">
                            About
                        </Link>

                        {user ? (
                            <>
                                <Link to="/report" className="flex items-center gap-2 text-gray-700 hover:text-purple-600 transition">
                                    <FileText size={18} />
                                    <span>Report Issue</span>
                                </Link>
                                <Link to="/my-reports" className="flex items-center gap-2 text-gray-700 hover:text-purple-600 transition">
                                    <User size={18} />
                                    <span>My Reports</span>
                                </Link>
                                {user.role === 'admin' && (
                                    <Link to="/admin" className="flex items-center gap-2 text-gray-700 hover:text-purple-600 transition">
                                        <Shield size={18} />
                                        <span>Admin</span>
                                    </Link>
                                )}
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-2 bg-gradient-to-r from-purple-100 to-blue-100 px-4 py-2 rounded-full">
                                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                                            {user.name.charAt(0).toUpperCase()}
                                        </div>
                                        <span className="text-sm font-medium">{user.name}</span>
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handleLogout}
                                        className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                                    >
                                        <LogOut size={18} />
                                        <span>Logout</span>
                                    </motion.button>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-gray-700 hover:text-purple-600 transition">
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden text-gray-700"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="md:hidden pb-4 space-y-3"
                    >
                        <Link to="/" className="block py-2 text-gray-700 hover:text-purple-600">
                            Home
                        </Link>
                        <Link to="/about" className="block py-2 text-gray-700 hover:text-purple-600">
                            About
                        </Link>
                        {user ? (
                            <>
                                <Link to="/report" className="block py-2 text-gray-700 hover:text-purple-600">
                                    Report Issue
                                </Link>
                                <Link to="/my-reports" className="block py-2 text-gray-700 hover:text-purple-600">
                                    My Reports
                                </Link>
                                {user.role === 'admin' && (
                                    <Link to="/admin" className="block py-2 text-gray-700 hover:text-purple-600">
                                        Admin Dashboard
                                    </Link>
                                )}
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left py-2 text-red-600"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="block py-2 text-gray-700 hover:text-purple-600">
                                    Login
                                </Link>
                                <Link to="/register" className="block py-2 text-gray-700 hover:text-purple-600">
                                    Register
                                </Link>
                            </>
                        )}
                    </motion.div>
                )}
            </div>
        </motion.nav>
    )
}

export default Navbar
