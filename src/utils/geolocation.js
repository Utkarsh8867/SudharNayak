// Geolocation utility for getting user's current location and address

export const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Geolocation is not supported by your browser'))
            return
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                })
            },
            (error) => {
                reject(error)
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            }
        )
    })
}

// Get address from coordinates using Nominatim (OpenStreetMap) - Free API
export const getAddressFromCoords = async (lat, lng) => {
    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`,
            {
                headers: {
                    'Accept-Language': 'en'
                }
            }
        )

        if (!response.ok) {
            throw new Error('Failed to fetch address')
        }

        const data = await response.json()

        // Format the address
        const address = data.address
        const formattedAddress = [
            address.road || address.neighbourhood,
            address.suburb || address.city_district,
            address.city || address.town || address.village,
            address.state,
            address.postcode
        ].filter(Boolean).join(', ')

        return {
            fullAddress: formattedAddress || data.display_name,
            city: address.city || address.town || address.village || '',
            state: address.state || '',
            country: address.country || '',
            postcode: address.postcode || '',
            lat,
            lng
        }
    } catch (error) {
        console.error('Error fetching address:', error)
        throw error
    }
}

// Combined function to get current location and address
export const getCurrentLocationWithAddress = async () => {
    try {
        const coords = await getCurrentLocation()
        const addressData = await getAddressFromCoords(coords.lat, coords.lng)
        return addressData
    } catch (error) {
        throw error
    }
}

// Alternative: Get address using Google Geocoding API (if you have API key)
export const getAddressFromCoordsGoogle = async (lat, lng, apiKey) => {
    try {
        const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
        )

        const data = await response.json()

        if (data.status === 'OK' && data.results.length > 0) {
            return {
                fullAddress: data.results[0].formatted_address,
                lat,
                lng
            }
        } else {
            throw new Error('No address found')
        }
    } catch (error) {
        console.error('Error fetching address from Google:', error)
        throw error
    }
}
