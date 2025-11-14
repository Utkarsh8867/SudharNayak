/**
 * URL optimization utilities for shorter, more efficient URLs
 */

/**
 * Create a shorter Cloudinary URL with optimized parameters
 * @param {string} originalUrl - Original Cloudinary URL
 * @returns {string} - Optimized shorter URL
 */
export const optimizeCloudinaryUrl = (originalUrl) => {
    if (!originalUrl || !originalUrl.includes('cloudinary.com')) {
        return originalUrl;
    }

    try {
        // Extract public ID from URL
        const parts = originalUrl.split('/');
        const uploadIndex = parts.findIndex(part => part === 'upload');

        if (uploadIndex === -1) return originalUrl;

        const publicId = parts.slice(uploadIndex + 1).join('/').split('.')[0];
        const cloudName = parts[3]; // Extract cloud name

        // Create optimized URL with shorter transformations
        return `https://res.cloudinary.com/${cloudName}/image/upload/w_800,c_limit,q_auto,f_auto/${publicId}`;
    } catch (error) {
        console.error('Error optimizing URL:', error);
        return originalUrl;
    }
};

/**
 * Create thumbnail URL for previews
 * @param {string} originalUrl - Original image URL
 * @returns {string} - Thumbnail URL
 */
export const createThumbnailUrl = (originalUrl) => {
    if (!originalUrl || !originalUrl.includes('cloudinary.com')) {
        return originalUrl;
    }

    try {
        const parts = originalUrl.split('/');
        const uploadIndex = parts.findIndex(part => part === 'upload');

        if (uploadIndex === -1) return originalUrl;

        const publicId = parts.slice(uploadIndex + 1).join('/').split('.')[0];
        const cloudName = parts[3];

        // Create small thumbnail URL
        return `https://res.cloudinary.com/${cloudName}/image/upload/w_200,h_150,c_fill,q_auto,f_auto/${publicId}`;
    } catch (error) {
        console.error('Error creating thumbnail:', error);
        return originalUrl;
    }
};

/**
 * Compress base64 string by reducing quality and size
 * @param {string} base64String - Original base64 string
 * @param {number} maxWidth - Maximum width
 * @param {number} quality - JPEG quality (0-1)
 * @returns {Promise<string>} - Compressed base64 string
 */
export const compressBase64 = (base64String, maxWidth = 600, quality = 0.6) => {
    return new Promise((resolve) => {
        const img = new Image();
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        img.onload = () => {
            // Calculate new dimensions
            let { width, height } = img;
            if (width > maxWidth) {
                height = (height * maxWidth) / width;
                width = maxWidth;
            }

            canvas.width = width;
            canvas.height = height;

            // Draw and compress
            ctx.drawImage(img, 0, 0, width, height);
            const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
            resolve(compressedBase64);
        };

        img.src = base64String;
    });
};

/**
 * Get file size from base64 string
 * @param {string} base64String - Base64 string
 * @returns {number} - Size in bytes
 */
export const getBase64Size = (base64String) => {
    if (!base64String) return 0;

    // Remove data URL prefix if present
    const base64Data = base64String.split(',')[1] || base64String;

    // Calculate size (base64 is ~33% larger than original)
    return Math.round((base64Data.length * 3) / 4);
};

/**
 * Format file size for display
 * @param {number} bytes - Size in bytes
 * @returns {string} - Formatted size string
 */
export const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};