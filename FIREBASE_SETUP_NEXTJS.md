# Firebase Setup Guide for Next.js 🔥

**This guide is for Next.js/React projects.** Your project is already set up with Firebase! You just need to add your Firebase configuration.

## Step 1-5: Set Up Firebase Project

Follow steps 1-5 from `FIREBASE_SETUP.md` to:
1. Create a Firebase project
2. Enable Authentication (Anonymous + Email/Password)
3. Create Firestore Database
4. Set up Security Rules
5. Get your Firebase configuration

## Step 6: Add Firebase Config to Your Next.js App

Your Firebase code is already set up in `lib/firebase.ts`. You just need to add your configuration values:

1. **Create a `.env.local` file** in your project root (same level as `package.json`)

2. **Add your Firebase configuration:**

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef
```

**Important:** 
- Replace all the placeholder values with your actual Firebase config values
- All variables must start with `NEXT_PUBLIC_` to be accessible in the browser
- Never commit `.env.local` to git (it's already in `.gitignore`)

## Step 7: Run Your App

**New to terminal commands?** See [HOW_TO_RUN.md](./HOW_TO_RUN.md) for detailed step-by-step instructions!

1. **Open Terminal** (Mac: `Cmd + Space`, type "Terminal". Windows: `Windows + R`, type "cmd")

2. **Navigate to your project folder**:
   ```bash
   cd ~/Desktop/GitHub/BobaTracker
   ```

3. **Install dependencies** (only needed once, or if you add new packages):
   ```bash
   npm install
   ```
   This downloads all the required packages. Wait 1-3 minutes - you'll see lots of text scrolling (that's normal!).

4. **Start the development server**:
   ```bash
   npm run dev
   ```
   You should see: "Ready on http://localhost:3000"

5. **Open** [http://localhost:3000](http://localhost:3000) in your browser

6. You should see the login page! 🎉

**Keep the terminal window open** while your app is running. To stop it, press `Ctrl + C` (or `Cmd + C` on Mac).

## Step 8: Verify Everything Works

1. Open your browser's Developer Console (F12)
2. You should see the login page
3. Try clicking **"Continue as Guest"** - it should log you in
4. Try creating an account with email/password
5. Add a boba entry and verify it saves
6. Check the Firebase Console → Firestore Database to see your data!

## Your Firebase Code Structure

Your project already has Firebase integrated:

- **`lib/firebase.ts`** - Firebase configuration and initialization
- **`contexts/AuthContext.tsx`** - Authentication context for React
- **`components/LoginPage.tsx`** - Login UI component
- **`utils/storage.ts`** - Firestore database operations
- **`components/AddBobaForm.tsx`** - Uses Firebase to save entries
- **`components/Dashboard.tsx`** - Loads data from Firebase

Everything is already connected! You just need the `.env.local` file with your Firebase config.

## Troubleshooting

### "Firebase: Error (auth/configuration-not-found)"
- Make sure your `.env.local` file exists in the project root
- Make sure all variables start with `NEXT_PUBLIC_`
- Restart your development server: `npm run dev`
- Check that you're using the exact variable names shown above

### "Firebase: Error (auth/popup-closed-by-user)"
- This is normal if the user closes the auth popup
- Just try again

### "Missing or insufficient permissions"
- Check your Firestore security rules in Firebase Console
- Make sure the rules allow authenticated users to access their own data

### Data not saving
- Check the browser console for errors
- Verify you're logged in (check the header for your email or "Guest User")
- Verify Firestore is enabled and rules are published
- Make sure your `.env.local` file has the correct values

## Quick Reference

Your `.env.local` file should look like this (with your actual values):

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyC...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef
```

That's it! Your Next.js app will automatically use these environment variables.

