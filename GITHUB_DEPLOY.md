# Deploying to GitHub & Vercel 🚀

Your Boba Book app is ready to deploy! Here's how to get it live.

## Step 1: Initialize Git (if not already done)

If you haven't initialized git yet, run:

```bash
git init
```

## Step 2: Create a GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the **"+"** icon in the top right → **"New repository"**
3. Repository name: `BobaBook` (or whatever you want!)
4. Description: "A cute boba consumption tracker with analytics 🧋"
5. Choose **Public** (so Vercel can deploy it for free)
6. **DON'T** check "Initialize with README" (you already have files)
7. Click **"Create repository"**

## Step 3: Push Your Code to GitHub

After creating the repository, GitHub will show you commands. Use these:

```bash
# Add all files
git add .

# Commit your changes
git commit -m "Initial commit: Boba Book app"

# Add your GitHub repository as remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/BobaBook.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 4: Deploy to Vercel (Recommended for Next.js)

**Why Vercel?** Next.js apps work best on Vercel (made by the Next.js team). It's free and easy!

### Option A: Deploy via Vercel Website (Easiest!)

1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"** → Sign up with your GitHub account
3. Click **"Add New Project"**
4. Import your `BobaBook` repository
5. **Important:** Add your Firebase environment variables:
   - Click **"Environment Variables"**
   - Add each variable:
     - `NEXT_PUBLIC_FIREBASE_API_KEY`
     - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
     - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
     - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
     - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
     - `NEXT_PUBLIC_FIREBASE_APP_ID`
   - Use the same values from your `.env.local` file
6. Click **"Deploy"**
7. Wait 2-3 minutes
8. Your app will be live at `https://your-app-name.vercel.app`! 🎉

### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (in your project folder)
vercel

# Follow the prompts:
# - Link to existing project? No
# - Project name? BobaBook
# - Directory? ./
# - Override settings? No

# Add environment variables
vercel env add NEXT_PUBLIC_FIREBASE_API_KEY
vercel env add NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
# ... (repeat for all Firebase env vars)

# Deploy to production
vercel --prod
```

## Important: Environment Variables

⚠️ **NEVER commit your `.env.local` file to GitHub!**

Your `.gitignore` already has `.env*.local` which is good. But you MUST add your Firebase environment variables to Vercel:

1. Go to your Vercel project dashboard
2. Settings → Environment Variables
3. Add each variable one by one (use the same values from your `.env.local`)
4. After adding, redeploy your app

## Step 5: Update Firebase Allowed Domains

After deploying, you need to tell Firebase about your new domain:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to **Authentication** → **Settings** → **Authorized domains**
4. Click **"Add domain"**
5. Add: `your-app-name.vercel.app`
6. Save

## Your App is Live! 🎉

Your Boba Book is now accessible at:
- **Live URL**: `https://your-app-name.vercel.app`
- **GitHub Repo**: `https://github.com/YOUR_USERNAME/BobaBook`

## Future Updates

Every time you push to GitHub, Vercel automatically redeploys your app!

```bash
git add .
git commit -m "Your update message"
git push
```

Vercel will automatically rebuild and deploy! ✨

## Troubleshooting

### "Environment variables not found"
- Make sure you added all Firebase env vars to Vercel
- Redeploy after adding them

### "Firebase auth domain not authorized"
- Add your Vercel domain to Firebase Authorized domains

### Build fails
- Check the build logs in Vercel dashboard
- Make sure all dependencies are in `package.json`
- Check that you're using `NEXT_PUBLIC_` prefix for client-side env vars

---

**Congratulations! Your Boba Book is now live on the internet! 🧋✨**

