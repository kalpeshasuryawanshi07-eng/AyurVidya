# Deployment Fix Steps

## Current Status
- ✅ Frontend code fixed (commit 79120f4)
- ✅ Backend deployed on Render
- ❌ Vercel deploying old commit (a04de18)
- ❌ CORS not configured for Vercel domain
- ❌ Frontend not connecting to backend

## Step 1: Configure Backend CORS on Render

1. Go to your Render dashboard: https://dashboard.render.com
2. Select your backend service
3. Go to "Environment" tab
4. Add this environment variable:
   ```
   Key: CORS_ORIGIN
   Value: https://ayur-vidya-8iw0yfvlo-kalpeshasuryawanshi07-7026s-projects.vercel.app
   ```
   (Use your actual Vercel deployment URL)
5. Click "Save Changes"
6. Render will automatically redeploy your backend

## Step 2: Configure Frontend API URL on Vercel

1. Go to Vercel dashboard: https://vercel.com/dashboard
2. Select your AyurVidya project
3. Go to "Settings" → "Environment Variables"
4. Add this environment variable:
   ```
   Key: REACT_APP_API_URL
   Value: https://your-render-service.onrender.com/api
   ```
   **IMPORTANT**: Replace `your-render-service` with your actual Render service URL
   **IMPORTANT**: Make sure to include `/api` at the end
5. Click "Save"

## Step 3: Redeploy Frontend on Vercel

Option A - Trigger new deployment:
1. In Vercel dashboard, go to "Deployments" tab
2. Click the three dots (...) next to the latest deployment
3. Click "Redeploy"
4. Make sure it's deploying commit `79120f4` or later

Option B - Push a small change to trigger deployment:
```bash
# In your local project
git commit --allow-empty -m "Trigger Vercel redeploy"
git push origin main
```

## Step 4: Verify Deployment

1. Wait for Vercel deployment to complete
2. Open your Vercel URL in browser
3. Open browser console (F12)
4. Try to register/login
5. Check for errors:
   - ✅ No 405 errors = Backend is responding
   - ✅ No CORS errors = CORS configured correctly
   - ✅ No 401 errors on manifest.json = Normal (PWA issue, not critical)

## Common Issues

### Issue: Still getting 405 errors
- **Cause**: Backend route not found or method not allowed
- **Fix**: Verify your Render backend URL is correct and includes `/api`
- **Test**: Try accessing `https://your-render-service.onrender.com/health` in browser

### Issue: CORS errors
- **Cause**: CORS_ORIGIN not set correctly on Render
- **Fix**: Make sure CORS_ORIGIN matches your Vercel URL exactly (including https://)

### Issue: Vercel still deploying old commit
- **Cause**: Vercel cache or deployment settings
- **Fix**: 
  1. Go to Vercel Settings → Git
  2. Make sure "Production Branch" is set to `main`
  3. Try redeploying with "Clear Cache and Redeploy"

## Expected Result

After completing all steps:
- ✅ Frontend loads on Vercel
- ✅ API calls work (register, login, etc.)
- ✅ No 405 or CORS errors
- ✅ Application fully functional

## Your Render Backend URL

You mentioned you deployed to Render. Your backend URL should look like:
```
https://ayurvidya-backend-xxxx.onrender.com
```

Make sure to:
1. Add `/api` when setting REACT_APP_API_URL: `https://ayurvidya-backend-xxxx.onrender.com/api`
2. Use the full Vercel URL for CORS_ORIGIN (no `/api` suffix)
