import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import aboutImage from '../assets/A.png'

const About = () => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        setIsVisible(true)
    }, [])

    const features = [
        {
            icon: '📝',
            title: 'Report Issues',
            description: 'Easily report civic problems in your area with photos and location details'
        },
        {
            icon: '🔍',
            title: 'Track Progress',
            description: 'Monitor the status of reported issues from pending to resolved'
        },
        {
            icon: '💬',
            title: 'Community Engagement',
            description: 'Comment and discuss issues with fellow citizens and authorities'
        },
        {
            icon: '🛠️',
            title: 'Admin Dashboard',
            description: 'Efficient management system for authorities to handle and resolve issues'
        },
        {
            icon: '🔐',
            title: 'Secure Platform',
            description: 'JWT-based authentication ensures your data is safe and secure'
        },
        {
            icon: '📊',
            title: 'Real-time Updates',
            description: 'Get instant notifications when your reported issues are addressed'
        }
    ]

    const stats = [
        { number: '1000+', label: 'Issues Resolved' },
        { number: '5000+', label: 'Active Citizens' },
        { number: '50+', label: 'Cities Covered' },
        { number: '95%', label: 'Satisfaction Rate' }
    ]

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 text-white"
            >
                <div className="absolute inset-0 bg-black opacity-10"></div>
                <div className="container mx-auto px-4 py-20 relative z-10">
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <h1 className="text-5xl md:text-6xl font-light mb-6">
                            About SudharNayak 🏙️
                        </h1>
                        <p className="text-xl md:text-2xl font-light leading-relaxed opacity-90">
                            Empowering Indian citizens to build better cities through smart civic issue reporting
                        </p>
                    </motion.div>
                </div>
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white" />
                    </svg>
                </div>
            </motion.div>

            {/* Mission Section */}
            <div className="bg-white py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <motion.div
                                initial={{ x: -50, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                            >
                                <h2 className="text-4xl font-light mb-6 text-gray-800">Our Mission</h2>
                                <p className="text-lg font-light text-gray-600 leading-relaxed mb-4">
                                    SudharNayak is a revolutionary platform designed to bridge the gap between citizens and civic authorities across India.
                                    We believe that every voice matters in building better, more livable cities.
                                </p>
                                <p className="text-lg font-light text-gray-600 leading-relaxed mb-4">
                                    Our platform enables citizens to report civic issues like road damage, garbage accumulation,
                                    water supply problems, and electrical faults with just a few clicks. Authorities can then
                                    track, manage, and resolve these issues efficiently.
                                </p>
                                <p className="text-lg font-light text-gray-600 leading-relaxed">
                                    Together, we're creating transparent, accountable, and responsive urban governance for Smart Cities across India.
                                </p>
                            </motion.div>
                            <motion.div
                                initial={{ x: 50, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                                className="relative"
                            >
                                <motion.img
                                    animate={{ y: [0, -20, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    src={aboutImage}
                                    alt="SudharNayak - Smart Civic Reporting"
                                    className="rounded-2xl shadow-2xl w-full h-auto"
                                />
                                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full opacity-20 blur-2xl"></div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Grid */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 py-16">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl font-light mb-4 text-gray-800">Key Features</h2>
                        <p className="text-gray-600 font-light">Everything you need to make your city better</p>
                    </motion.div>
                    <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ y: 50, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -10, scale: 1.02 }}
                                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
                            >
                                <div className="text-5xl mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-light mb-3 text-gray-800">{feature.title}</h3>
                                <p className="text-gray-600 font-light leading-relaxed">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ scale: 0, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                transition={{ delay: index * 0.1, type: "spring" }}
                                viewport={{ once: true }}
                                className="text-center text-white"
                            >
                                <div className="text-4xl md:text-5xl font-light mb-2">{stat.number}</div>
                                <div className="text-sm md:text-base font-light opacity-90">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Indian Cities Showcase */}
            <div className="bg-white py-16">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl font-light mb-4 text-gray-800">Serving Cities Across India</h2>
                        <p className="text-lg font-light text-gray-600">From metros to tier-2 cities, we're making India cleaner and better</p>
                    </motion.div>
                    <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { name: 'Mumbai', image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=400&q=80' },
                            { name: 'Delhi', image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&q=80' },
                            { name: 'Bangalore', image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=400&q=80' },
                            { name: 'Hyderabad', image: 'https://images.unsplash.com/photo-1609920658906-8223bd289001?w=400&q=80' }
                        ].map((city, index) => (
                            <motion.div
                                key={index}
                                initial={{ scale: 0, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                transition={{ delay: index * 0.1, type: "spring" }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.05 }}
                                className="relative rounded-xl overflow-hidden shadow-lg group cursor-pointer"
                            >
                                <img
                                    src={city.image}
                                    alt={city.name}
                                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                                    <span className="text-white font-light text-lg">{city.name}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 py-16">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        className="max-w-3xl mx-auto text-center"
                    >
                        <h2 className="text-4xl font-light mb-6 text-gray-800">Join the Movement</h2>
                        <p className="text-lg font-light text-gray-600 mb-8 leading-relaxed">
                            Be part of the change. Start reporting issues in your area and help make your city better.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/register">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-full font-light text-lg shadow-lg hover:shadow-2xl transition-all"
                                >
                                    Get Started Free
                                </motion.button>
                            </Link>
                            <Link to="/">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-white text-gray-700 px-8 py-4 rounded-full font-light text-lg border-2 border-gray-300 hover:border-purple-600 hover:shadow-xl transition-all"
                                >
                                    Browse Issues
                                </motion.button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Contact Section */}
            <div className="bg-white py-16">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        className="max-w-2xl mx-auto text-center"
                    >
                        <h2 className="text-4xl font-light mb-6 text-gray-800">Get In Touch</h2>
                        <p className="text-lg font-light text-gray-600 mb-8 leading-relaxed">
                            Have questions or suggestions? We'd love to hear from you.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                            <motion.a
                                whileHover={{ scale: 1.05 }}
                                href="mailto:support@sudharnayak.com"
                                className="text-purple-600 hover:text-blue-600 font-light text-lg transition-colors"
                            >
                                📧 support@sudharnayak.com
                            </motion.a>
                            <span className="hidden sm:inline text-gray-400">|</span>
                            <motion.a
                                whileHover={{ scale: 1.05 }}
                                href="tel:+911234567890"
                                className="text-purple-600 hover:text-blue-600 font-light text-lg transition-colors"
                            >
                                📞 +91 123 456 7890
                            </motion.a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default About
