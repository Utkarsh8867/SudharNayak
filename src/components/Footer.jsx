import { motion } from 'framer-motion'
import { Heart, Github, Twitter, Linkedin, Mail } from 'lucide-react'
import logoImage from '../assets/N.png'

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12 mt-auto font-sans">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* About Section */}
                    <div>
                        <div className="mb-4">
                            <img src={logoImage} alt="SudharNayak" className="h-16 w-auto" />
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Making cities better, one report at a time. Empowering citizens to create positive change in their communities.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold mb-4 text-base tracking-wide">Quick Links</h4>
                        <ul className="space-y-2.5 text-gray-400 text-sm">
                            <li><a href="/" className="hover:text-white transition-colors duration-200">Home</a></li>
                            <li><a href="/report" className="hover:text-white transition-colors duration-200">Report Issue</a></li>
                            <li><a href="/my-reports" className="hover:text-white transition-colors duration-200">My Reports</a></li>
                            <li><a href="/about" className="hover:text-white transition-colors duration-200">About Us</a></li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h4 className="font-semibold mb-4 text-base tracking-wide">Categories</h4>
                        <ul className="space-y-2.5 text-gray-400 text-sm">
                            <li className="flex items-center gap-2">🛣️ <span>Road Issues</span></li>
                            <li className="flex items-center gap-2">🗑️ <span>Garbage Management</span></li>
                            <li className="flex items-center gap-2">💧 <span>Water Supply</span></li>
                            <li className="flex items-center gap-2">⚡ <span>Electricity</span></li>
                            <li className="flex items-center gap-2">📋 <span>Other Issues</span></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-semibold mb-4 text-base tracking-wide">Connect With Us</h4>
                        <div className="flex gap-4 mb-4">
                            <motion.a
                                whileHover={{ scale: 1.2, rotate: 5 }}
                                href="#"
                                className="bg-gray-700 p-2 rounded-full hover:bg-purple-600 transition"
                            >
                                <Github size={20} />
                            </motion.a>
                            <motion.a
                                whileHover={{ scale: 1.2, rotate: 5 }}
                                href="#"
                                className="bg-gray-700 p-2 rounded-full hover:bg-blue-500 transition"
                            >
                                <Twitter size={20} />
                            </motion.a>
                            <motion.a
                                whileHover={{ scale: 1.2, rotate: 5 }}
                                href="#"
                                className="bg-gray-700 p-2 rounded-full hover:bg-blue-600 transition"
                            >
                                <Linkedin size={20} />
                            </motion.a>
                            <motion.a
                                whileHover={{ scale: 1.2, rotate: 5 }}
                                href="#"
                                className="bg-gray-700 p-2 rounded-full hover:bg-red-500 transition"
                            >
                                <Mail size={20} />
                            </motion.a>
                        </div>
                        <div className="text-gray-400 text-sm space-y-1.5">
                            <p className="flex items-center gap-2">
                                <Mail size={14} />
                                <span>support@sudharnayak.com</span>
                            </p>
                            <p>Phone: +91 1234567890</p>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-700 pt-6 text-center">
                    <p className="text-gray-400 text-sm flex items-center justify-center gap-2 font-light">
                        Made with <Heart size={16} className="text-red-500 animate-pulse" /> by SudharNayak Team
                    </p>
                    <p className="text-gray-500 text-xs mt-2 font-light">
                        &copy; {new Date().getFullYear()} SudharNayak. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
