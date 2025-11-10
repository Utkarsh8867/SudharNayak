# SudharNayak 🏙️

A Smart Civic Issue Reporting Platform built with the MERN stack.

## Features

- 🔐 User Authentication (JWT)
- 📝 Report civic issues with images and location
- 💬 Comment on issues
- 🎯 Filter issues by category and status
- 👤 User dashboard to track personal reports
- 🛠️ Admin dashboard to manage and resolve issues

## Tech Stack

**Frontend:**
- React 18
- React Router v6
- TailwindCSS
- Axios
- Vite

**Backend:**
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs

## Installation

### Prerequisites
- Node.js (v16+)
- MongoDB (local or Atlas)

### Backend Setup

```bash
cd backend
npm install
```

Update `.env` file with your MongoDB URI and JWT secret:
```
MONGO_URI=mongodb://localhost:27017/nagarnayak
JWT_SECRET=your_secret_key_here
PORT=5000
```

Start the backend server:
```bash
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The app will run on `http://localhost:3000`

## API Endpoints

### Auth
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)

### Issues
- `POST /api/issues` - Create issue (protected)
- `GET /api/issues` - Get all issues
- `GET /api/issues/:id` - Get issue by ID
- `GET /api/issues/my-issues` - Get user's issues (protected)
- `PUT /api/issues/:id` - Update issue status (admin only)
- `DELETE /api/issues/:id` - Delete issue (admin only)

### Comments
- `POST /api/comments/:issueId` - Add comment (protected)
- `GET /api/comments/:issueId` - Get comments for issue

## Default Admin Account

To create an admin user, register normally and then update the user's role in MongoDB:

```javascript
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

## Future Enhancements

- Push notifications
- AI-based issue categorization
- Google Maps integration
- Public leaderboard
- Mobile app (React Native)
- Image upload to Cloudinary/Firebase

## License

MIT
