import { useState } from 'react'
import axiosInstance from '../api/axiosInstance'
import toast from 'react-hot-toast'

const TestCloudinary = () => {
    const [image, setImage] = useState('')
    const [result, setResult] = useState('')
    const [loading, setLoading] = useState(false)

    const handleImageUpload = (e) => {
        const file = e.target.files[0]
        if (!file) return

        const reader = new FileReader()
        reader.onload = (e) => {
            setImage(e.target.result)
        }
        reader.readAsDataURL(file)
    }

    const testCloudinaryUpload = async () => {
        if (!image) {
            toast.error('Please select an image first')
            return
        }

        setLoading(true)
        try {
            const response = await axiosInstance.post('/upload/test-cloudinary', {
                base64Image: image
            })

            setResult(response.data.url)
            toast.success('Image uploaded to Cloudinary successfully!')
        } catch (error) {
            console.error('Test error:', error)
            toast.error(error.response?.data?.message || 'Failed to upload')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Test Cloudinary Integration</h1>

                <div className="bg-white p-6 rounded-lg shadow-lg space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Select Image to Test
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                        />
                    </div>

                    {image && (
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Preview:</h3>
                            <img src={image} alt="Preview" className="max-w-full h-64 object-cover rounded-lg" />
                        </div>
                    )}

                    <button
                        onClick={testCloudinaryUpload}
                        disabled={loading || !image}
                        className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 disabled:opacity-50"
                    >
                        {loading ? 'Uploading...' : 'Test Cloudinary Upload'}
                    </button>

                    {result && (
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Cloudinary Result:</h3>
                            <p className="text-sm text-gray-600 mb-2">URL: {result}</p>
                            <img src={result} alt="Cloudinary Result" className="max-w-full h-64 object-cover rounded-lg" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default TestCloudinary