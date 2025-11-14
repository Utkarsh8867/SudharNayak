# 🏛️ SudharNayak - Frontend

A modern, responsive web application for reporting and tracking civic issues in your community.

## 🌟 Features

- **User Authentication**: Secure login and registration
- **Issue Reporting**: Report civic issues with images and location
- **Real-time Updates**: Track issue status and updates
- **Like & Comment**: Engage with community issues
- **Admin Dashboard**: Manage and resolve reported issues
- **Responsive Design**: Works seamlessly on all devices
- **Image Upload**: Multiple image support with Cloudinary
- **Geolocation**: Automatic location detection

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Update .env with your configuration
# VITE_API_URL=http://localhost:5000/api
```

### Development

```bash
# Start development server
npm run dev

# Open http://localhost:3000
```

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
frontend/
├── public/              # Static assets
├── src/
│   ├── api/            # API configuration
│   ├── assets/         # Images and static files
│   ├── components/     # Reusable components
│   ├── context/        # React context (Auth)
│   ├── pages/          # Page components
│   ├── utils/          # Utility functions
│   ├── App.jsx         # Main app component
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles
├── .env.example        # Environment variables template
├── vite.config.js      # Vite configuration
└── package.json        # Dependencies
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Backend API URL
VITE_API_URL=http://localhost:5000/api

# Cloudinary Configuration
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

## 🎨 Tech Stack

- **React 18** - UI library
- **Vite** - Build tool
- **React Router** - Routing
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Hot Toast** - Notifications
- **Lucide React** - Icons

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run serve` - Serve production build

## 🌐 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/prasadkambale181-cmd/Sfront)

### Quick Deploy to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/prasadkambale181-cmd/Sfront)

## 🔐 Security

- Environment variables for sensitive data
- JWT token authentication
- Secure HTTP-only cookies support
- CORS configuration
- Input validation

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Authors

- **Prashant Ghodke** -
- **Smitesh Kumbhar** -
- **Om Ghule** -
- **Utkarsh Kadu** -
 

## 🙏 Acknowledgments

- React community
- Vite team
- Tailwind CSS
- All contributors

---

**Made with ❤️ for better communities**
