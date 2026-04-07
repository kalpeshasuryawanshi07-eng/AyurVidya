# Vercel Setup Checklist for AyurVidya

## ✅ What I've Done

1. **Created `client/vercel.json`** - Configures React Router to work properly on Vercel
2. **Updated `client/.gitignore`** - Added `.env` to prevent committing sensitive data
3. **Updated `client/.env.example`** - Added clear instructions for environment variables
4. **Created `client/VERCEL_DEPLOYMENT.md`** - Complete deployment guide
5. **Pushed all changes to GitHub** - Ready for Vercel deployment

## 🔧 What You Need to Do in Vercel Dashboard

### Step 1: Configure Project Settings
In your Vercel project settings, set:

- **Root Directory**: `client`
- **Framework Preset**: Create React App
- **Build Command**: `npm run build`
- **Output Directory**: `build`

### Step 2: Add Environment Variable
Go to: Project Settings → Environment Variables

Add this variable:
- **Name**: `REACT_APP_API_URL`
- **Value**: Your backend API URL (see options below)
- **Environments**: Select all (Production, Preview, Development)

### Step 3: Redeploy
Click "Redeploy" button in your deployment to apply the new configuration.

## 🌐 Backend API Options

You need to deploy your backend and use its URL. Here are your options:

### Option 1: Deploy Backend to Vercel (Easiest)
1. Create a new Vercel project
2. Import the same GitHub repo
3. Set **Root Directory**: `server`
4. Add environment variables:
   - `MONGODB_URI`: `mongodb+srv://suryawanshikalpesh3_db_user:lH9kX7Ck5RV20kb2@cluster0.jnycn33.mongodb.net/ayurveda-learning`
   - `JWT_SECRET`: (create a random secret key)
   - `PORT`: `5000`
5. Deploy
6. Copy the deployed URL (e.g., `https://your-backend.vercel.app`)
7. Use this URL + `/api` in frontend's `REACT_APP_API_URL`
   - Example: `https://your-backend.vercel.app/api`

### Option 2: Deploy Backend to Render/Railway/Heroku
Follow their deployment guides and use the deployed URL.

### Option 3: Keep Backend Local (Testing Only)
- Not recommended for production
- Frontend on Vercel won't be able to connect to localhost

## 🚨 Important Notes

1. **CORS Configuration**: Your backend needs to allow requests from your Vercel domain
   - Add your Vercel URL to CORS allowed origins in `server/server.js`

2. **MongoDB Atlas**: Already configured, no changes needed
   - Connection string is in your backend `.env`

3. **Environment Variables**: Never commit `.env` files to GitHub
   - Use Vercel's environment variable settings instead

## 🧪 Testing After Deployment

1. Visit your Vercel URL
2. Check if HomePage loads
3. Try navigating to different pages
4. Test login functionality
5. Check browser console for errors
6. Check Network tab for API call failures

## 📝 Current Status

- ✅ Frontend code ready for Vercel
- ✅ Vercel configuration files created
- ✅ Changes pushed to GitHub
- ⏳ Waiting for you to configure Vercel settings
- ⏳ Waiting for backend deployment
- ⏳ Waiting for environment variable configuration

## 🆘 If You See Errors

### "404 NOT_FOUND" on Vercel
- Make sure Root Directory is set to `client`
- Verify `vercel.json` exists in client folder
- Redeploy after making changes

### "Failed to fetch" or API errors
- Backend is not deployed or not accessible
- `REACT_APP_API_URL` environment variable not set correctly
- CORS not configured on backend

### Build fails
- Check Vercel build logs
- Ensure all dependencies are in `package.json`
- Try building locally first: `cd client && npm run build`

## 📞 Next Steps

1. Go to your Vercel dashboard
2. Click on your project
3. Go to Settings → General → Root Directory → Set to `client`
4. Go to Settings → Environment Variables → Add `REACT_APP_API_URL`
5. Deploy your backend (Option 1 recommended)
6. Update `REACT_APP_API_URL` with your backend URL
7. Redeploy frontend
8. Test the application

---

**Need help?** Check `client/VERCEL_DEPLOYMENT.md` for detailed instructions.
