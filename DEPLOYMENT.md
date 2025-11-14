# SudharNayak Frontend - Deployment Guide

## 🚀 Quick Deployment Options

### Option 1: Vercel (Recommended)
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Configure environment variables:
   - `VITE_API_URL` = Your backend API URL
   - `VITE_CLOUDINARY_CLOUD_NAME` = Your Cloudinary cloud name
   - `VITE_CLOUDINARY_UPLOAD_PRESET` = Your Cloudinary upload preset
5. Deploy!

### Option 2: Netlify
1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Import your repository
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Add environment variables in Site settings
6. Deploy!

### Option 3: Manual Build & Deploy
```bash
# Install dependencies
npm install

# Build for production
npm run build

# The dist folder contains your production-ready files
# Upload the dist folder to your hosting provider
```

## 📋 Pre-Deployment Checklist

### 1. Environment Variables
Create a `.env.production` file with:
```env
VITE_API_URL=https://your-backend-url.com/api
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

### 2. Update Backend URL
Make sure your backend API is deployed and accessible.

### 3. CORS Configuration
Ensure your backend allows requests from your frontend domain:
```javascript
// In backend server.js
const corsOptions = {
    origin: ['https://your-frontend-domain.com'],
    credentials: true
};
```

### 4. Build the Project
```bash
npm run build
```

### 5. Test Production Build Locally
```bash
npm run preview
```

## 🔧 Configuration Files

### vite.config.js
- Optimized for production builds
- Code splitting configured
- Minification enabled

### netlify.toml
- Netlify-specific configuration
- Handles SPA routing

### vercel.json
- Vercel-specific configuration
- Security headers included
- SPA routing configured

### _redirects
- Fallback for Netlify SPA routing

## 🌐 Hosting Providers

### Vercel
- **Pros**: Fast, automatic deployments, great DX
- **Free Tier**: Yes
- **Custom Domain**: Yes
- **SSL**: Automatic

### Netlify
- **Pros**: Easy setup, continuous deployment
- **Free Tier**: Yes
- **Custom Domain**: Yes
- **SSL**: Automatic

### GitHub Pages
```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"

# Deploy
npm run deploy
```

### Traditional Hosting (cPanel, etc.)
1. Build: `npm run build`
2. Upload `dist` folder contents to public_html
3. Configure .htaccess for SPA routing:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

## 🔐 Security Considerations

1. **Environment Variables**: Never commit `.env` files
2. **API Keys**: Use environment variables for all sensitive data
3. **HTTPS**: Always use HTTPS in production
4. **CORS**: Configure backend CORS properly
5. **Content Security Policy**: Consider adding CSP headers

## 📊 Performance Optimization

The build is already optimized with:
- ✅ Code splitting
- ✅ Tree shaking
- ✅ Minification
- ✅ Lazy loading
- ✅ Asset optimization

## 🐛 Troubleshooting

### Build Fails
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### API Connection Issues
- Check VITE_API_URL is correct
- Verify backend CORS settings
- Check network tab in browser DevTools

### Routing Issues (404 on refresh)
- Ensure _redirects or vercel.json is in place
- Check hosting provider's SPA configuration

## 📝 Post-Deployment

1. Test all features on production
2. Check browser console for errors
3. Test on different devices/browsers
4. Monitor performance with Lighthouse
5. Set up error tracking (Sentry, etc.)

## 🔄 Continuous Deployment

### GitHub Actions Example
```yaml
name: Deploy to Vercel
on:
  push:
    branches: [UtkarshK]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 📞 Support

For deployment issues, check:
- Vercel Documentation: https://vercel.com/docs
- Netlify Documentation: https://docs.netlify.com
- Vite Documentation: https://vitejs.dev/guide/

---

**Ready to Deploy!** 🎉
