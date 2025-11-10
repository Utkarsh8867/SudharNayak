import { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Mail, Lock, LogIn, Eye, EyeOff } from 'lucide-react'

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' })
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const { login } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const { data } = await axios.post('/api/auth/login', formData)
            login(data)
            toast.success(`Welcome back, ${data.name}! 👋`)
            navigate('/')
        } catch (err) {
            toast.error(err.response?.data?.message || 'Login failed')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4">
            <div className="container mx-auto">
                <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto items-center">
                    {/* Left Side - Illustration */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="hidden md:block"
                    >
                        <div className="relative">
                            <motion.div
                                animate={{ y: [0, -20, 0] }}
                                transition={{ duration: 3, repeat: Infinity }}
                            >
                                <img
                                    src="/A.png"
                                    alt="SudharNayak - Smart Civic Reporting"
                                    className="rounded-3xl shadow-2xl w-full h-auto"
                                />
                            </motion.div>
                            <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-purple-300 rounded-full opacity-20 blur-3xl"></div>
                            <div className="absolute -top-6 -left-6 w-64 h-64 bg-blue-300 rounded-full opacity-20 blur-3xl"></div>
                        </div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="mt-8 text-center"
                        >
                            <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back!</h2>
                            <p className="text-gray-600">Continue making your city better</p>
                        </motion.div>
                    </motion.div>

                    {/* Right Side - Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white rounded-3xl shadow-2xl p-8 md:p-12"
                    >
                        <div className="text-center mb-8">
                            <motion.img
                                src="/L.png"
                                alt="SudharNayak Logo"
                                className="h-16 w-auto mx-auto mb-4"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 200 }}
                            />
                            <h2 className="text-3xl font-bold text-gray-800 mb-2">Login</h2>
                            <p className="text-gray-600">Sign in to your account</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Email */}
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
                                    <Mail size={18} className="text-purple-600" />
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
                                    <Lock size={18} className="text-purple-600" />
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 pr-12 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                                        placeholder="••••••••"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <motion.button
                                type="submit"
                                disabled={loading}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                            className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                                        />
                                        Logging in...
                                    </>
                                ) : (
                                    <>
                                        <LogIn size={20} />
                                        Login
                                    </>
                                )}
                            </motion.button>
                        </form>

                        {/* Register Link */}
                        <div className="mt-6 text-center">
                            <p className="text-gray-600">
                                Don't have an account?{' '}
                                <Link to="/register" className="text-purple-600 font-semibold hover:underline">
                                    Register here
                                </Link>
                            </p>
                        </div>

                        {/* Demo Credentials */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="mt-6 bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-xl border border-purple-200"
                        >
                            <p className="text-sm text-gray-700 text-center">
                                <strong>Demo:</strong> Create an account to get started!
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default Login
