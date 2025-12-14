# Fix: ChunkLoadError / Loading chunk failed

This error usually means the build cache got corrupted. Here's how to fix it:

## Quick Fix (Try This First!)

In your terminal (while the server is running):

1. **Stop the server**: Press `Ctrl + C`

2. **Delete the build cache**:
   ```bash
   rm -rf .next
   ```

3. **Start the server again**:
   ```bash
   npm run dev
   ```

4. **Refresh your browser** (hard refresh: `Cmd + Shift + R` on Mac, `Ctrl + Shift + R` on Windows)

This usually fixes it! The `.next` folder is just a cache - Next.js will rebuild it.

## If That Doesn't Work (Nuclear Option)

If the quick fix doesn't work, try this:

1. **Stop the server**: `Ctrl + C`

2. **Delete cache and node_modules**:
   ```bash
   rm -rf .next
   rm -rf node_modules
   rm package-lock.json
   ```

3. **Reinstall everything**:
   ```bash
   npm install
   ```

4. **Start the server**:
   ```bash
   npm run dev
   ```

5. **Hard refresh your browser**

## Why This Happens

- The `.next` folder contains compiled/cached files
- Sometimes these get corrupted during development
- Deleting it forces Next.js to rebuild everything fresh
- It's safe to delete - Next.js will recreate it

## Prevention

If this keeps happening:
- Make sure you're not running multiple `npm run dev` instances
- Don't manually edit files in the `.next` folder
- If you switch branches in git, sometimes a rebuild helps

---

**Most likely solution:** Just delete `.next` and restart! 🎯

