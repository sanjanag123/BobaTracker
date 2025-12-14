# How to Run Your App 🚀

This guide will walk you through installing dependencies and starting your development server step-by-step.

## Step 1: Open Terminal

### On Mac:
1. Press `Cmd + Space` (Command key + Spacebar)
2. Type "Terminal" 
3. Press Enter

OR

1. Open Finder
2. Go to Applications → Utilities → Terminal

### On Windows:
1. Press `Windows key + R`
2. Type `cmd` and press Enter

OR

1. Press `Windows key`
2. Type "Command Prompt" or "PowerShell"
3. Press Enter

## Step 2: Navigate to Your Project Folder

**What does "navigate" mean?** It means telling the terminal which folder you want to work in. Think of it like opening a folder in Finder/File Explorer.

In the terminal, type this command and press Enter:

```bash
cd ~/Desktop/GitHub/BobaTracker
```

**What this does:** 
- `cd` = "change directory" (go to this folder)
- This command moves you to your project folder so the terminal knows where your code is

**How to know it worked:**
- The terminal might not show a message (that's normal!)
- Or you might see the folder name appear in your prompt
- Type `pwd` and press Enter to see your current location - it should show the BobaTracker path

**Tip:** On Mac, you can type `cd ` (with a space), then drag your project folder from Finder into the terminal window to automatically paste the path!

**Still confused?** See [NAVIGATE_EXPLAINED.md](./NAVIGATE_EXPLAINED.md) for a detailed explanation with examples!

## Step 3: Install Dependencies

**What are dependencies?** These are the libraries and packages your app needs to run (like React, Next.js, Firebase, etc.). The `package.json` file lists them all.

**Run this command:**

```bash
npm install
```

**What happens:**
- This will download all the required packages
- It creates a `node_modules` folder with all the code
- This might take 1-3 minutes the first time
- You'll see lots of text scrolling - that's normal!

**You only need to run this:**
- ✅ Once when you first set up the project
- ✅ Again if you add new dependencies
- ✅ If you delete the `node_modules` folder

**If you see errors:**
- Make sure you have Node.js installed: `node --version`
- If not, install it from [nodejs.org](https://nodejs.org/)

## Step 4: Start the Development Server

After `npm install` finishes (you'll see your prompt again), run:

```bash
npm run dev
```

**What happens:**
- Your app starts compiling
- You'll see something like: "Ready on http://localhost:3000"
- The terminal will keep running (don't close it!)

**Keep this terminal window open** - your app is running in it!

## Step 5: Open Your App in Browser

1. Look in the terminal for a message like: `Local: http://localhost:3000`
2. Open your web browser (Chrome, Firefox, Safari, etc.)
3. Go to: **http://localhost:3000**
4. You should see your Boba Tracker app! 🎉

## Complete Command Sequence

Here's everything in order:

```bash
# 1. Navigate to project (you only need to do this once per terminal session)
cd ~/Desktop/GitHub/BobaTracker

# 2. Install dependencies (only needed once, or if you add new packages)
npm install

# 3. Start the server (do this every time you want to run your app)
npm run dev
```

## Common Questions

### Q: Do I need to run `npm install` every time?
**A:** No! Only when:
- First setting up the project
- Someone adds new dependencies
- You delete `node_modules`

### Q: Do I need to run `npm run dev` every time?
**A:** Yes! Every time you want to see your app, run `npm run dev`

### Q: How do I stop the server?
**A:** In the terminal where it's running, press `Ctrl + C` (Mac: `Cmd + C`)

### Q: The terminal says "port 3000 is already in use"
**A:** You might have another app running. Either:
- Stop the other app
- Or run: `npm run dev -- -p 3001` to use a different port

### Q: I made changes but don't see them
**A:** 
- Next.js automatically reloads! Just refresh your browser
- If that doesn't work, stop the server (`Ctrl + C`) and run `npm run dev` again

### Q: I see errors in the terminal
**A:** 
- Red errors usually mean something is wrong with your code
- Yellow warnings are usually okay (just warnings)
- Copy the error message and ask for help or search online

## Quick Reference

| Command | When to Use | What It Does |
|---------|-------------|--------------|
| `npm install` | First time, or after adding packages | Downloads dependencies |
| `npm run dev` | Every time you want to run the app | Starts the development server |
| `Ctrl + C` | When server is running | Stops the server |

## Video Walkthrough Concept

If you're still confused, here's what it should look like:

1. **Terminal opens** → blank black/white screen
2. **Type** `cd ~/Desktop/GitHub/BobaTracker` → press Enter
3. **Type** `npm install` → press Enter → wait 1-3 minutes → see "added X packages"
4. **Type** `npm run dev` → press Enter → see "Ready on http://localhost:3000"
5. **Open browser** → go to http://localhost:3000 → see your app!

That's it! You're running your app! 🎉

