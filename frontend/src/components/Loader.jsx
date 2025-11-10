import { motion } from 'framer-motion'

const Loader = () => {
    return (
        <div className="flex flex-col justify-center items-center py-20">
            <motion.div
                animate={{
                    rotate: 360,
                }}
                transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full"
            />
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-4 text-gray-600 font-medium"
            >
                Loading...
            </motion.p>
        </div>
    )
}

export const SkeletonCard = () => {
    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
            <div className="h-48 bg-gray-200"></div>
            <div className="p-5 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-20 bg-gray-200 rounded"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
            </div>
        </div>
    )
}

export default Loader
