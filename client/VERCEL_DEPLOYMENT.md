# Vercel Deployment Guide for AyurVidya Frontend

## Prerequisites
- GitHub repository with your code
- Vercel account (free tier works)
- Backend API deployed and accessible

## Deployment Steps

### 1. Import Project to Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New" → "Project"
3. Import your GitHub repository: `kalpeshasuryawanshi07-eng/AyurVidya`

### 2. Configure Build Settings
Set the following in Vercel project settings:

- **Framework Preset**: Create React App
- **Root Directory**: `client`
- **Build Command**: `npm run build`
- **Output Directory**: `build`
- **Install Command**: `npm install`

### 3. Environment Variables
Add the following environment variable in Vercel:

**Key**: `REACT_APP_API_URL`  
**Value**: Your backend API URL (e.g., `https://your-backend-api.com/api`)

To add environment variables:
1. Go to Project Settings → Environment Variables
2. Add `REACT_APP_API_URL` with your backend URL
3. Select all environments (Production, Preview, Development)
4. Click "Save"

### 4. Deploy
1. Click "Deploy"
2. Wait for the build to complete
3. Your app will be live at `https://your-project.vercel.app`

## Important Files

### vercel.json
This file configures Vercel to handle React Router properly:
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

This ensures all routes are handled by React Router on the client side.

## Backend Setup

Your frontend needs a backend API. You have two options:

### Option 1: Deploy Backend to Vercel (Recommended for Node.js)
1. Create a separate Vercel project for the `server` folder
2. Configure it as a Node.js project
3. Add MongoDB Atlas connection string as environment variable
4. Use the deployed backend URL in frontend's `REACT_APP_API_URL`

### Option 2: Deploy Backend Elsewhere
- Heroku
- Railway
- Render
- AWS/Azure/GCP

## Troubleshooting

### 404 Errors on Page Refresh
- Ensure `vercel.json` exists in the `client` folder
- Verify the rewrite rule is configured correctly

### API Connection Issues
- Check `REACT_APP_API_URL` environment variable is set correctly
- Ensure backend is deployed and accessible
- Check CORS settings on backend allow your Vercel domain

### Build Failures
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

## MongoDB Atlas Connection
Your backend uses MongoDB Atlas:
```
mongodb+srv://suryawanshikalpesh3_db_user:lH9kX7Ck5RV20kb2@cluster0.jnycn33.mongodb.net/ayurveda-learning
```

Make sure this is configured in your backend's environment variables.

## Post-Deployment Checklist
- [ ] Frontend deployed successfully
- [ ] Backend deployed and accessible
- [ ] Environment variables configured
- [ ] MongoDB Atlas connection working
- [ ] All routes working (test navigation)
- [ ] API calls working (test login, courses, etc.)
- [ ] Custom domain configured (optional)

## Support
For issues, check:
- Vercel deployment logs
- Browser console for errors
- Network tab for API call failures
