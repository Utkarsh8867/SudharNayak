# 🚀 Quick Deployment Guide - SudharNayak Frontend

## ⚡ Deploy in 5 Minutes

### Step 1: Choose Your Platform

#### Option A: Vercel (Easiest & Recommended)
1. Go to https://vercel.com
2. Sign in with GitHub
3. Click "New Project"
4. Import `Sfront` repository
5. Configure:
   - Framework Preset: **Vite**
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Add Environment Variables:
   ```
   VITE_API_URL = https://your-backend-url.com/api
   VITE_CLOUDINARY_CLOUD_NAME = your_cloud_name
   VITE_CLOUDINARY_UPLOAD_PRESET = your_upload_preset
   ```
7. Click **Deploy** 🎉

#### Option B: Netlify
1. Go to https://netlify.com
2. Sign in with GitHub
3. Click "Add new site" → "Import an existing project"
4. Choose `Sfront` repository
5. Build settings are auto-detected from `netlify.toml`
6. Add Environment Variables in Site Settings
7. Click **Deploy** 🎉

### Step 2: Update Backend CORS

After deployment, update your backend to allow your frontend domain:

```javascript
// In backend/server.js
const corsOptions = {
    origin: [
        'http://localhost:3000',
        'https://your-vercel-app.vercel.app',  // Add your Vercel URL
        'https://your-custom-domain.com'        // Add custom domain if any
    ],
    credentials: true
};
```

### Step 3: Test Your Deployment

1. Visit your deployed URL
2. Test user registration
3. Test login
4. Test issue reporting
5. Test image upload
6. Test all features

## 🔧 Environment Variables Required

```env
VITE_API_URL=https://your-backend-url.com/api
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

## 📝 Important Notes

1. **Backend URL**: Make sure your backend is deployed first
2. **CORS**: Update backend CORS to include your frontend domain
3. **HTTPS**: Both frontend and backend should use HTTPS in production
4. **Environment Variables**: Never commit `.env` files to GitHub

## 🐛 Common Issues

### Issue: API calls failing
**Solution**: Check VITE_API_URL is correct and backend CORS is configured

### Issue: Images not uploading
**Solution**: Verify Cloudinary credentials in environment variables

### Issue: 404 on page refresh
**Solution**: Already handled by `vercel.json` and `netlify.toml`

## ✅ Deployment Checklist

- [ ] Backend is deployed and accessible
- [ ] Environment variables are set
- [ ] CORS is configured in backend
- [ ] Build completes successfully
- [ ] All pages load correctly
- [ ] Authentication works
- [ ] Image upload works
- [ ] API calls work
- [ ] Mobile responsive
- [ ] No console errors

## 🎯 Next Steps

1. Set up custom domain (optional)
2. Configure SSL certificate (automatic on Vercel/Netlify)
3. Set up monitoring and analytics
4. Configure error tracking (Sentry)
5. Set up CI/CD pipeline

---

**Your app is ready to deploy!** 🚀

Need help? Check [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.
