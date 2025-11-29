# 🎃 START HERE - NFT Avatar Zone

Welcome to NFT Avatar Zone! This guide will get you started in 60 seconds.

## 🚀 Quick Start (60 seconds)

### Step 1: Open the App (10 seconds)
```bash
# Just open this file in your browser:
index.html
```

Double-click `index.html` or drag it into your browser. That's it!

### Step 2: Try It Out (50 seconds)

1. **Upload a photo** (10s)
   - Drag & drop any photo onto the upload area
   - Or click to browse

2. **Choose a character** (10s)
   - Click any character on the right sidebar
   - Try different categories!

3. **Customize** (20s)
   - Move the sliders to adjust your avatar
   - Zoom, rotate, position, filters

4. **Download** (10s)
   - Click the "Download" button
   - Your avatar is saved!

## ✨ What You Get

- **16 spooky characters** across 8 categories
- **Real-time customization** with instant preview
- **Professional UI** with horror theme
- **Works everywhere** - desktop, tablet, mobile
- **No installation** - just open and use!

## 📚 Documentation

- **[README.md](README.md)** - Full documentation
- **[QUICKSTART.md](QUICKSTART.md)** - Detailed quick start
- **[FEATURES.md](FEATURES.md)** - Complete feature list
- **[DEVELOPMENT.md](DEVELOPMENT.md)** - For developers
- **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - Project overview

## 🎯 Key Features

✅ Drag & drop photo upload
✅ 16 character templates
✅ Real-time preview
✅ Zoom, rotate, position controls
✅ Color filters
✅ Download as PNG
✅ Share on social media
✅ Demo NFT minting
✅ Sound effects (optional)
✅ Fully responsive

## 🌐 Deploy It

Want to share with the world?

### GitHub Pages
1. Push to GitHub
2. Enable Pages in settings
3. Done!

### Vercel
```bash
vercel deploy
```

### Netlify
Drag the folder to [Netlify Drop](https://app.netlify.com/drop)

## 🛠️ Customize It

Want to add your own characters?

1. Open `js/app.js`
2. Find `CHARACTER_TEMPLATES` array
3. Add your template:
```javascript
{
  id: 'my-character',
  name: 'My Character',
  category: 'zombie',
  imagePath: 'path/to/image.png',
  faceRegion: { x: 140, y: 140, width: 120, height: 120 },
  colorTone: { hue: 120, saturation: 60, lightness: 40 }
}
```

See [DEVELOPMENT.md](DEVELOPMENT.md) for more details.

## 🎨 Change Colors

Want a different theme?

1. Open `css/theme.css`
2. Change the color variables:
```css
:root {
  --color-accent-blood: #8b0000;  /* Change this! */
  --color-accent-neon: #00ff41;   /* And this! */
}
```

## 🔊 Add Sounds

Want spooky sounds?

1. Download free horror audio from [Freesound.org](https://freesound.org/)
2. Add to `assets/sounds/`:
   - `ambient.mp3` - Background music
   - `click.mp3` - Click sound
   - `success.mp3` - Success sound
3. Click the sound toggle in the app!

## ❓ Need Help?

- **Not working?** Check [README.md](README.md) troubleshooting section
- **Want to customize?** See [DEVELOPMENT.md](DEVELOPMENT.md)
- **Found a bug?** Open an issue on GitHub

## 🎉 That's It!

You now have a fully functional NFT avatar generator. Enjoy creating spooky avatars!

---

**Pro Tips:**
- Try all 8 character categories
- Experiment with filters for different moods
- Use the rotation slider for dynamic poses
- Share your creations on social media!

**Made with 👻 by the NFT Avatar Zone team**
