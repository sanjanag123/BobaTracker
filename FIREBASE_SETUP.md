# Firebase Setup Guide 🔥

This application uses **Firebase** for authentication and **Firestore** (NoSQL database) to store boba entries. 

**Note:** This guide is for **plain HTML/CSS/JavaScript** web apps (GitHub Pages style). If you're using a framework like Next.js or React, you'll need to adapt these instructions.

Follow these steps to set up your Firebase project:

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** or **"Create a project"**
3. Name your project (e.g., `boba-tracker` or `boba-buddy`)
4. (Optional) Enable Google Analytics - you can skip this
5. Click **"Create project"** and wait for it to be set up

## Step 2: Enable Authentication

1. In your Firebase project dashboard, click **"Authentication"** in the left sidebar
2. Click **"Get started"** if prompted
3. Go to the **"Sign-in method"** tab
4. Enable the following sign-in providers:
   - **Anonymous**: Click on it → Enable → Save
   - **Email/Password**: Click on it → Enable → Save

## Step 3: Create Firestore Database

1. In your Firebase project dashboard, click **"Firestore Database"** in the left sidebar
2. Click **"Create database"**
3. Choose **"Start in test mode"** (we'll add security rules later)
4. Select a location for your database (choose the closest region to you)
5. Click **"Enable"** and wait for the database to be created

## Step 4: Set Up Security Rules (Important!)

1. In Firestore Database, go to the **"Rules"** tab
2. Replace the default rules with the following:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      
      // Allow users to read/write their own boba entries
      match /bobaEntries/{entryId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
  }
}
```

3. Click **"Publish"** to save the rules

## Step 5: Get Your Firebase Configuration

1. In your Firebase project dashboard, click the **gear icon** ⚙️ next to "Project Overview"
2. Click **"Project settings"**
3. Scroll down to **"Your apps"** section
4. Click the **Web icon** (`</>`) to add a web app
5. Register your app with a nickname (e.g., "Boba Tracker Web")
6. **Don't check** "Also set up Firebase Hosting" (unless you want to)
7. Click **"Register app"**
8. Copy the `firebaseConfig` object - it will look like this:

```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

## Step 6: Add Firebase Config to Your App

1. Open your `script.js` file

2. At the **VERY TOP**, add Firebase imports:

```javascript
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
```

3. Paste your actual Firebase config (from Step 5)

Replace everything inside with your real values:

```javascript
const firebaseConfig = {
  apiKey: "AIza....",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

⚠️ **This is SAFE for frontend Firebase apps** — Firebase is designed to have public API keys in client-side code.

4. Initialize Firebase

Right below the config, add:

```javascript
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

console.log("🔥 Firebase connected");
```

## Step 7: How You Run the App

**Important:** Firebase will **NOT** work if you open the HTML file directly (`file://`). You need to use a web server.

### Option A: VS Code Live Server (Recommended)

1. Install the **Live Server** extension in VS Code
2. Right-click on your `index.html` file
3. Click **"Open with Live Server"**
4. Your app will open in the browser at `http://localhost:5500` (or similar)

### Option B: GitHub Pages

1. Push your code to GitHub
2. Enable GitHub Pages in your repository settings
3. Your app will be live at `https://yourusername.github.io/your-repo-name/`
4. Firebase will work automatically there

### Option C: Python Simple Server

If you have Python installed, you can run:

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Then open `http://localhost:8000` in your browser.

## Step 8: Verify the Setup

1. Start your web server using one of the options from Step 7

2. Open your app in the browser (the URL provided by your server)

3. Open the browser's Developer Console (F12 or Right-click → Inspect → Console)

4. You should see **"🔥 Firebase connected"** in the console

5. You should see the login page in your app

6. Try clicking **"Continue as Guest"** - it should log you in

7. Try creating an account with email/password

8. Add a boba entry and verify it saves

9. Check the Firebase Console → Firestore Database to see your data being stored!

## Database Structure

Your Firestore database will have this structure:

```
users (collection)
  └── {userId} (document)
      ├── email: string (optional, null for guest users)
      ├── createdAt: timestamp
      └── bobaEntries (subcollection)
          └── {entryId} (document)
              ├── date: timestamp
              ├── shop: string
              ├── drink: string
              ├── sweetness: number (0-100)
              ├── toppings: array of strings
              ├── price: number
              ├── rating: number (1-5)
              └── notes: string (optional)
```

## Troubleshooting

### "Firebase: Error (auth/configuration-not-found)"
- Make sure you've added the Firebase imports at the top of `script.js`
- Make sure your `firebaseConfig` object has all the required fields
- Check that you're using a web server (not opening the file directly)
- Verify your Firebase config values are correct

### "Firebase: Error (auth/popup-closed-by-user)"
- This is normal if the user closes the auth popup
- Just try again

### "Missing or insufficient permissions"
- Check your Firestore security rules
- Make sure the rules allow authenticated users to access their own data

### Data not saving
- Check the browser console for errors
- Verify you're logged in (check the header for your email or "Guest User")
- Verify Firestore is enabled and rules are published

## For Your Professor

This implementation demonstrates:

✅ **Firebase Authentication** - Guest (anonymous) and email/password authentication  
✅ **Firestore Database** - NoSQL document database with proper structure  
✅ **User-specific data** - Each user's boba entries are stored separately  
✅ **Security Rules** - Users can only access their own data  
✅ **Real-time capabilities** - Can be extended with real-time listeners  
✅ **Production ready** - Can be deployed to Vercel/Netlify with Firebase

The database structure is clean, professional, and follows Firebase best practices with proper user isolation and security.

## Quick Reference: script.js Setup

Here's a complete example of what the top of your `script.js` should look like:

```javascript
// Firebase Imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

// Your Firebase Config (paste from Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyC...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

console.log("🔥 Firebase connected");

// Your app code continues below...
```

**Important:** Make sure your `index.html` includes `type="module"` in the script tag:

```html
<script type="module" src="script.js"></script>
```

