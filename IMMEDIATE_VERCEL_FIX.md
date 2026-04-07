# Immediate Vercel Fix - Do This Now!

## Problem
Your frontend is deployed but can't connect to the backend because `REACT_APP_API_URL` is not set.

## Quick Fix (2 Options)

### Option A: Use a Mock/Demo Mode (Fastest - 2 minutes)
If you just want to see the UI working without backend:

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add:
   - **Name**: `REACT_APP_API_URL`
   - **Value**: `https://jsonplaceholder.typicode.com` (temporary mock API)
   - **Environments**: All
3. Click "Redeploy" in Deployments tab

**Note**: This won't have your real data, but the UI will load.

---

### Option B: Deploy Backend First (Recommended - 10 minutes)

#### Step 1: Create Backend Vercel Project
1. Go to Vercel Dashboard
2. Click "Add New" → "Project"
3. Select your GitHub repo: `AyurVidya`
4. Click "Import"

#### Step 2: Configure Backend Project
Set these in the import screen:

- **Project Name**: `ayurvidya-backend` (or any name)
- **Root Directory**: `server`
- **Framework Preset**: Other
- **Build Command**: Leave empty or `npm install`
- **Output Directory**: Leave empty
- **Install Command**: `npm install`

#### Step 3: Add Backend Environment Variables
Before deploying, add these environment variables:

```
MONGODB_URI=mongodb+srv://suryawanshikalpesh3_db_user:lH9kX7Ck5RV20kb2@cluster0.jnycn33.mongodb.net/ayurveda-learning?retryWrites=true&w=majority

JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

PORT=5000

NODE_ENV=production

RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

**Important**: Change `JWT_SECRET` to a random string (at least 32 characters)

#### Step 4: Deploy Backend
1. Click "Deploy"
2. Wait for deployment to complete
3. Copy the deployment URL (e.g., `https://ayurvidya-backend.vercel.app`)

#### Step 5: Update Frontend Environment Variable
1. Go to your frontend project in Vercel
2. Settings → Environment Variables
3. Add:
   - **Name**: `REACT_APP_API_URL`
   - **Value**: `https://ayurvidya-backend.vercel.app/api` (your backend URL + `/api`)
   - **Environments**: All
4. Click "Save"

#### Step 6: Update Backend CORS
You need to allow your frontend domain in the backend CORS settings.

In `server/server.js`, update the CORS configuration to include your Vercel frontend URL.

#### Step 7: Redeploy Frontend
1. Go to Deployments tab
2. Click "Redeploy"
3. Wait for deployment

---

## Verification Steps

After deploying:

1. Open your Vercel frontend URL
2. Open browser DevTools (F12)
3. Go to Console tab
4. Check for API errors
5. Go to Network tab
6. Try to navigate or login
7. Check if API calls are going to the right URL

---

## Current Status

✅ Frontend deployed on Vercel
✅ Vercel configuration files ready
✅ React Router configured
⏳ Backend not deployed yet
⏳ Environment variable not set

---

## Need Help?

If you see errors:
- Check browser console (F12)
- Check Vercel deployment logs
- Check Network tab for failed requests

The console warnings you're seeing are normal and don't affect functionality.
