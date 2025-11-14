import { useContext, useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { AuthContext } from '../context/AuthContext'
import { Menu, X, Home, FileText, User, LogOut, Shield, ChevronDown, Settings } from 'lucide-react'
import toast from 'react-hot-toast'

const Navbar = () => {
    const { user, logout } = useContext(AuthContext)
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)
    const [showUserMenu, setShowUserMenu] = useState(false)
    const dropdownRef = useRef(null)

    const handleLogout = () => {
        logout()
        toast.success('Logged out successfully!')
        setShowUserMenu(false)
        navigate('/login')
    }

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowUserMenu(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="bg-white shadow-md sticky top-0 z-50 border-b border-gray-100"
        >
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-1">
                    {/* Logo - Full Navbar Height */}
                    <Link to="/" className="flex items-center">
                        <motion.img
                            src="/N.png"
                            alt="SudharNayak Logo"
                            className="h-20 w-auto"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                        />
                    </Link>

                    {/* Desktop Menu - Professional */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link to="/">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="flex items-center gap-2 text-gray-700 hover:text-purple-600 transition-all px-4 py-2 relative group"
                            >
                                <Home size={20} />
                                <span className="text-base font-semibold tracking-wide">Home</span>
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-blue-600 group-hover:w-full transition-all duration-300"></span>
                            </motion.div>
                        </Link>
                        <Link to="/about">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="text-gray-700 hover:text-purple-600 transition-all px-4 py-2 relative group"
                            >
                                <span className="text-base font-semibold tracking-wide">About</span>
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-blue-600 group-hover:w-full transition-all duration-300"></span>
                            </motion.div>
                        </Link>

                        {user ? (
                            <>
                                <Link to="/report">
                                    <motion.div
                                        whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(147, 51, 234, 0.3)" }}
                                        whileTap={{ scale: 0.95 }}
                                        className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2.5 rounded-lg shadow-md hover:shadow-xl transition-all"
                                    >
                                        <FileText size={20} />
                                        <span className="text-base font-semibold tracking-wide">Report Issue</span>
                                    </motion.div>
                                </Link>

                                {/* User Dropdown */}
                                <div className="relative" ref={dropdownRef}>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setShowUserMenu(!showUserMenu)}
                                        className="flex items-center gap-2 bg-gradient-to-r from-purple-100 to-blue-100 px-3 py-2 rounded-lg hover:shadow-md transition"
                                    >
                                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                            {user.name.charAt(0).toUpperCase()}
                                        </div>
                                        <span className="text-sm font-medium text-gray-700 max-w-[100px] truncate">
                                            {user.name}
                                        </span>
                                        <ChevronDown
                                            size={16}
                                            className={`text-gray-600 transition-transform ${showUserMenu ? 'rotate-180' : ''}`}
                                        />
                                    </motion.button>

                                    {/* Dropdown Menu */}
                                    <AnimatePresence>
                                        {showUserMenu && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                transition={{ duration: 0.2 }}
                                                className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden"
                                            >
                                                {/* User Info Header */}
                                                <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-3">
                                                    <p className="text-white font-semibold text-sm">{user.name}</p>
                                                    <p className="text-purple-100 text-xs">{user.email}</p>
                                                </div>

                                                {/* Menu Items */}
                                                <div className="py-2">
                                                    <Link
                                                        to="/my-reports"
                                                        onClick={() => setShowUserMenu(false)}
                                                        className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition"
                                                    >
                                                        <FileText size={18} />
                                                        <span className="text-sm font-medium">My Reports</span>
                                                    </Link>

                                                    {user.role === 'admin' && (
                                                        <Link
                                                            to="/admin"
                                                            onClick={() => setShowUserMenu(false)}
                                                            className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition"
                                                        >
                                                            <Shield size={18} />
                                                            <span className="text-sm font-medium">Admin Dashboard</span>
                                                        </Link>
                                                    )}

                                                    <div className="border-t border-gray-100 my-2"></div>

                                                    <button
                                                        onClick={handleLogout}
                                                        className="flex items-center gap-3 px-4 py-2.5 text-red-600 hover:bg-red-50 transition w-full"
                                                    >
                                                        <LogOut size={18} />
                                                        <span className="text-sm font-medium">Logout</span>
                                                    </button>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link to="/login">
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        className="text-gray-700 hover:text-purple-600 transition-all px-5 py-2 relative group"
                                    >
                                        <span className="text-base font-semibold tracking-wide">Login</span>
                                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-blue-600 group-hover:w-full transition-all duration-300"></span>
                                    </motion.div>
                                </Link>
                                <Link to="/register">
                                    <motion.div
                                        whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(147, 51, 234, 0.3)" }}
                                        whileTap={{ scale: 0.95 }}
                                        className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2.5 rounded-lg shadow-md hover:shadow-xl transition-all"
                                    >
                                        <span className="text-base font-semibold tracking-wide">Get Started</span>
                                    </motion.div>
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden text-gray-700 p-2 hover:bg-gray-100 rounded-lg transition"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden pb-4 space-y-2 border-t border-gray-100 pt-4"
                        >
                            <Link
                                to="/"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-2 py-2.5 px-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition"
                            >
                                <Home size={18} />
                                <span>Home</span>
                            </Link>
                            <Link
                                to="/about"
                                onClick={() => setIsOpen(false)}
                                className="block py-2.5 px-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition"
                            >
                                About
                            </Link>
                            {user ? (
                                <>
                                    {/* User Info in Mobile */}
                                    <div className="bg-gradient-to-r from-purple-100 to-blue-100 px-3 py-3 rounded-lg mb-2">
                                        <div className="flex items-center gap-2">
                                            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                                                {user.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                                                <p className="text-xs text-gray-600">{user.email}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <Link
                                        to="/report"
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center gap-2 py-2.5 px-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition"
                                    >
                                        <FileText size={18} />
                                        <span>Report Issue</span>
                                    </Link>
                                    <Link
                                        to="/my-reports"
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center gap-2 py-2.5 px-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition"
                                    >
                                        <User size={18} />
                                        <span>My Reports</span>
                                    </Link>
                                    {user.role === 'admin' && (
                                        <Link
                                            to="/admin"
                                            onClick={() => setIsOpen(false)}
                                            className="flex items-center gap-2 py-2.5 px-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition"
                                        >
                                            <Shield size={18} />
                                            <span>Admin Dashboard</span>
                                        </Link>
                                    )}
                                    <button
                                        onClick={() => {
                                            handleLogout()
                                            setIsOpen(false)
                                        }}
                                        className="flex items-center gap-2 w-full py-2.5 px-3 text-red-600 hover:bg-red-50 rounded-lg transition"
                                    >
                                        <LogOut size={18} />
                                        <span>Logout</span>
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        onClick={() => setIsOpen(false)}
                                        className="block py-2.5 px-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/register"
                                        onClick={() => setIsOpen(false)}
                                        className="block py-2.5 px-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition text-center"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    )
}

export default Navbar
