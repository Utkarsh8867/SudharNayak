// Cloudinary upload utility for direct browser uploads

const CLOUDINARY_UPLOAD_PRESET = 'ml_default' // Using default preset for now
const CLOUDINARY_CLOUD_NAME = 'dqmktpekh' // Your Cloudinary cloud name
const CLOUDINARY_API_KEY = '945117624673387'

/**
 * Upload single image to Cloudinary with optimization
 * @param {File} file - Image file to upload
 * @returns {Promise<string>} - Optimized URL of uploaded image
 */
export const uploadImageToCloudinary = async (file) => {
    // Validate file first
    validateImageFile(file);

    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)

    try {
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
            {
                method: 'POST',
                body: formData
            }
        )

        const responseData = await response.json()

        if (!response.ok) {
            console.error('Cloudinary error response:', responseData)
            throw new Error(responseData.error?.message || 'Upload failed')
        }

        // Return optimized URL with transformations for smaller file size
        const optimizedUrl = generateOptimizedUrl(responseData.public_id)
        return optimizedUrl
    } catch (error) {
        console.error('Cloudinary upload error:', error)
        if (error.message.includes('Invalid')) {
            throw new Error('Upload configuration error. Please contact support.')
        }
        throw new Error('Failed to upload image. Please try again.')
    }
}

/**
 * Generate optimized Cloudinary URL with transformations
 * @param {string} publicId - Cloudinary public ID
 * @returns {string} - Optimized URL
 */
const generateOptimizedUrl = (publicId) => {
    // Create optimized URL with transformations for smaller file size
    return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/w_800,h_600,c_limit,q_auto:good,f_auto/${publicId}`
}

/**
 * Upload multiple images to Cloudinary
 * @param {FileList|Array} files - Array of image files
 * @returns {Promise<Array<string>>} - Array of uploaded image URLs
 */
export const uploadMultipleImages = async (files) => {
    const uploadPromises = Array.from(files).map(file => uploadImageToCloudinary(file))

    try {
        const urls = await Promise.all(uploadPromises)
        return urls
    } catch (error) {
        console.error('Multiple upload error:', error)
        throw error
    }
}

/**
 * Validate image file
 * @param {File} file - File to validate
 * @returns {boolean} - True if valid
 */
export const validateImageFile = (file) => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
    const maxSize = 10 * 1024 * 1024 // 10MB

    if (!validTypes.includes(file.type)) {
        throw new Error('Invalid file type. Please upload JPG, PNG, GIF, or WebP images.')
    }

    if (file.size > maxSize) {
        throw new Error('File too large. Maximum size is 10MB.')
    }

    return true
}
