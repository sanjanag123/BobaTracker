# 🌟 Boba Book

A cute and fun boba consumption tracker with analytics, encouragement mode, and sassy roasts!

## Features

- ✨ Add boba entries with all the details (shop, drink, sweetness, toppings, price, rating, notes)
- 📊 Dashboard with comprehensive analytics
- 😊 Nice Mode: wholesome encouragement
- 😏 Sassy Mode: straight-up chaos and roasts
- 🎨 Beautiful pastel pink & cream UI

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Recharts for data visualization
- **Firebase Authentication** for user login (Guest & Email/Password)
- **Firestore** (NoSQL database) for data persistence

## Firebase Setup

This application uses Firebase for authentication and data storage. **You must set up Firebase before running the app.**

**Your project is a Next.js app**, so use this guide: **[FIREBASE_SETUP_NEXTJS.md](./FIREBASE_SETUP_NEXTJS.md)**

For plain HTML/CSS/JS projects, see: [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)

Quick setup for Next.js:
1. Create a free Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication (Anonymous + Email/Password)
3. Create Firestore Database (start in test mode)
4. Get your Firebase config from Project Settings
5. Create `.env.local` file with your Firebase config (see `firebase.env.example`)
6. Start the app: `npm run dev`

## Features

- 🔐 **Guest Login** - Quick anonymous access with device-specific storage
- ✉️ **Email/Password Login** - Create account for cross-device access
- 🧋 **User-specific data** - Each user's boba entries are stored separately
- 📊 **Analytics Dashboard** - Track your boba consumption with cute visualizations
- 😊 **Nice Mode / 😏 Sassy Mode** - Get encouragement or roasts based on your consumption

