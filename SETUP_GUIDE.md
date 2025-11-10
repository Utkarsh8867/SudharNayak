# NagarNayak Setup Guide 🏙️

## Current Status
✅ Backend server running on http://localhost:5000
✅ Frontend server running on http://localhost:3000
❌ MongoDB connection needed

## MongoDB Setup Options

### Option 1: MongoDB Atlas (Cloud - Recommended & Free)

1. **Create MongoDB Atlas Account**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for a free account
   - Create a new cluster (Free M0 tier)

2. **Get Connection String**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - It looks like: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/`

3. **Update Backend .env File**
   - Open `backend/.env`
   - Replace the MONGO_URI with your connection string
   - Add database name: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/nagarnayak?retryWrites=true&w=majority`
   - Replace `<username>` and `<password>` with your actual credentials

4. **Whitelist Your IP**
   - In Atlas, go to Network Access
   - Click "Add IP Address"
   - Choose "Allow Access from Anywhere" (0.0.0.0/0) for development

5. **Restart Backend Server**
   - The backend will automatically restart and connect to MongoDB

### Option 2: Local MongoDB Installation

1. **Download MongoDB**
   - Windows: https://www.mongodb.com/try/download/community
   - Install MongoDB Community Server

2. **Start MongoDB**
   - Open Command Prompt as Administrator
   - Run: `mongod`
   - Or start MongoDB as a Windows Service

3. **Update .env**
   - In `backend/.env`, use:
   ```
   MONGO_URI=mongodb://localhost:27017/nagarnayak
   ```

## Testing the Application

Once MongoDB is connected:

1. **Open Browser**: http://localhost:3000

2. **Register a New User**
   - Click "Register"
   - Create an account

3. **Report an Issue**
   - Click "Report Issue"
   - Fill in the form
   - Submit

4. **View Issues**
   - Go to Home page
   - See all reported issues
   - Filter by category/status

5. **Create Admin User** (Optional)
   - Connect to MongoDB
   - Run this command in MongoDB shell or Compass:
   ```javascript
   db.users.updateOne(
     { email: "your-email@example.com" },
     { $set: { role: "admin" } }
   )
   ```
   - Now you can access Admin Dashboard

## Troubleshooting

### Backend won't start
- Check if port 5000 is available
- Verify MongoDB connection string in .env

### Frontend won't start
- Check if port 3000 is available
- Run `npm install` in frontend folder

### Can't register/login
- Ensure MongoDB is connected
- Check backend console for errors

### Images not showing
- Use direct image URLs (e.g., from Imgur, Cloudinary)
- Or implement file upload with Cloudinary/Firebase

## Next Steps

1. Set up MongoDB (choose Option 1 or 2 above)
2. Test user registration and login
3. Report some test issues
4. Create an admin user to test admin features
5. (Optional) Add Cloudinary for image uploads
6. (Optional) Add Google Maps API for location features

## Need Help?

Check the backend console for error messages. Most issues are related to:
- MongoDB connection
- Missing environment variables
- Port conflicts
