# 🚀 Quick Start - NagarNayak

## ✅ What's Already Running

Your application is already running!
- **Frontend**: http://localhost:3000 ← Open this in your browser!
- **Backend**: http://localhost:5000

## ⚠️ One More Step: Connect MongoDB

You need to set up MongoDB to store data. Here's the fastest way:

### 5-Minute MongoDB Atlas Setup (Free Forever)

1. **Go to MongoDB Atlas**
   - Visit: https://www.mongodb.com/cloud/atlas/register
   - Sign up with Google/GitHub (fastest)

2. **Create Free Cluster**
   - Choose "M0 Free" tier
   - Select a region close to you
   - Click "Create Cluster" (takes 3-5 minutes)

3. **Create Database User**
   - Click "Database Access" in left sidebar
   - Click "Add New Database User"
   - Username: `nagarnayak`
   - Password: Generate a secure password (save it!)
   - Click "Add User"

4. **Allow Network Access**
   - Click "Network Access" in left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Click "Confirm"

5. **Get Connection String**
   - Click "Database" in left sidebar
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - It looks like: `mongodb+srv://nagarnayak:<password>@cluster0.xxxxx.mongodb.net/`

6. **Update Your .env File**
   - Open `backend/.env` in your editor
   - Find the line with `MONGO_URI=`
   - Replace it with your connection string
   - Replace `<password>` with your actual password
   - Add `/nagarnayak` before the `?`
   
   Example:
   ```
   MONGO_URI=mongodb+srv://nagarnayak:MyPassword123@cluster0.abc123.mongodb.net/nagarnayak?retryWrites=true&w=majority
   ```

7. **Save and Wait**
   - Save the `.env` file
   - The backend will automatically restart
   - Wait 5 seconds for connection

## 🎉 Test Your App

1. Open http://localhost:3000
2. Click "Register" and create an account
3. Click "Report Issue" and submit your first civic issue
4. View it on the home page!

## 🛠️ Create Admin Account (Optional)

After registering, you can make yourself an admin:

1. Go to MongoDB Atlas
2. Click "Browse Collections"
3. Find the `users` collection
4. Click on your user document
5. Change `"role": "citizen"` to `"role": "admin"`
6. Save
7. Logout and login again
8. You'll now see "Admin" in the navbar!

## 📱 Features to Try

- **Report Issues**: Add civic problems with photos
- **Comment**: Discuss issues with other citizens
- **Filter**: Sort by category or status
- **My Reports**: Track your submissions
- **Admin Dashboard**: Manage and resolve issues (admin only)

## 🐛 Troubleshooting

**Backend shows "ECONNREFUSED"?**
- MongoDB isn't connected yet. Follow steps above.

**Can't register?**
- Check backend console for errors
- Ensure MongoDB is connected

**Frontend won't load?**
- Clear browser cache
- Check if http://localhost:3000 is accessible

---

Need help? Check SETUP_GUIDE.md for detailed instructions!
