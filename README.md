# NFT Avatar Zone 👻

A spooky avatar generator that merges your face with haunted character templates to create shareable, mintable NFT avatars. Built for hackathons with a professional horror-themed UI.

## ✨ Features

### Core Features
- 🎭 **Upload & Merge** - Upload your photo and merge with 16 horror-themed character templates
- 🎨 **Real-time Controls** - Adjust zoom, rotation, position, brightness, contrast, and saturation
- 👻 **Horror UI** - Professional glassmorphism effects with fog animations and neon borders
- 📱 **Fully Responsive** - Works on desktop, tablet, and mobile devices
- 💾 **Download** - Export your avatar as high-quality PNG
- 🔗 **Share** - Share on social media or copy to clipboard
- 🎫 **Demo NFT Minting** - Experience the NFT creation process (demo only)
- 🔊 **Sound Effects** - Optional atmospheric horror music and sound effects
- 🎯 **Touch Support** - Full touch gesture support for mobile devices

### 🆕 Advanced Photoshop-Style Features
- 🛠️ **Professional Tools** - Background remover, magic select, crop, eraser, brush
- 🎭 **Effects & Overlays** - Smoke, fog, blood, glitch, lightning, particles
- 💡 **Lighting Effects** - Spotlight, rim light, ambient lighting
- 🎨 **Advanced Filters** - Sharpen, blur, glitch, cartoon conversion
- 📚 **Layer System** - Multiple layers with opacity, blend modes, and visibility
- ⏱️ **History System** - Unlimited undo/redo with 50-action history
- 🎯 **Bottom Toolbar** - Quick access to all editing tools
- 🖼️ **Export Formats** - PNG, JPG, WEBP support

See [ADVANCED_FEATURES.md](ADVANCED_FEATURES.md) for detailed documentation.

## 🎭 Character Categories

- **Zombie** - Zombie Walker, Rotten Corpse
- **Demon** - Hell Spawn, Dark Lord
- **Ghost** - Phantom, Specter
- **Witch** - Dark Witch, Sorceress
- **Skull** - Death Head, Bone Collector
- **Anime Horror** - Yandere, Cursed Spirit
- **Cyberpunk** - Glitch Monster, Neon Nightmare
- **NFT Style** - Ape Horror, Crypto Creature

## 🚀 Getting Started

### Quick Start

1. Clone the repository:
```bash
git clone <repository-url>
cd nft-avatar-zone
```

2. Open `index.html` in a modern browser:
```bash
# On Windows
start index.html

# On Mac
open index.html

# On Linux
xdg-open index.html
```

3. Upload your photo and start creating!

### Local Development

No build tools required! Just open `index.html` in your browser. For a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000`

## 🎨 How to Use

1. **Upload Your Photo**
   - Drag & drop an image onto the upload area
   - Or click to browse and select a file
   - Supports JPG, PNG, and WEBP formats (max 10MB)

2. **Choose a Character**
   - Browse character templates in the sidebar
   - Filter by category (Zombie, Demon, Ghost, etc.)
   - Click a character to merge with your photo

3. **Adjust Your Avatar**
   - Use zoom slider to scale your face
   - Rotate to adjust angle
   - Position X/Y to move your face
   - Apply filters (brightness, contrast, saturation)

4. **Export & Share**
   - Download as PNG
   - Share on social media
   - Mint as demo NFT

## 🛠️ Tech Stack

- **Frontend**: Pure HTML5, CSS3, JavaScript (ES6+)
- **Image Processing**: HTML5 Canvas API
- **Storage**: LocalStorage for user preferences
- **Styling**: CSS Custom Properties, Glassmorphism, CSS Animations
- **No Dependencies**: Zero npm packages, no build tools required

## 📁 Project Structure

```
nft-avatar-zone/
├── index.html              # Main HTML file
├── css/
│   ├── theme.css          # Color palette and variables
│   ├── animations.css     # Animation keyframes
│   ├── main.css           # Main styles
│   └── responsive.css     # Responsive breakpoints
├── js/
│   ├── app.js             # Main application & templates
│   ├── stateManager.js    # State management
│   ├── imageProcessor.js  # Image manipulation
│   ├── avatarBuilder.js   # Avatar merging logic
│   ├── uiManager.js       # UI interactions
│   ├── animationController.js  # Animation control
│   └── nftMinter.js       # Demo NFT minting
├── assets/
│   ├── characters/        # Character template images
│   ├── sounds/           # Audio files (optional)
│   └── icons/            # UI icons
└── README.md
```

## 🎯 Key Features Explained

### Glassmorphism UI
Modern frosted glass effect with backdrop blur, transparency, and subtle borders for a professional look.

### Real-time Preview
All adjustments update the canvas within 100ms using debounced rendering for smooth performance.

### Responsive Design
Breakpoints for mobile (< 768px), tablet (768-1023px), and desktop (1024px+) with touch gesture support.

### Demo NFT Minting
Simulates wallet connection and minting process with fake transaction hashes for demonstration purposes.

## 🌐 Deployment

### GitHub Pages

1. Push to GitHub
2. Go to Settings > Pages
3. Select branch and save
4. Visit `https://yourusername.github.io/nft-avatar-zone`

### Vercel

```bash
npm i -g vercel
vercel deploy
```

### Netlify

Drag and drop the `nft-avatar-zone` folder to [Netlify Drop](https://app.netlify.com/drop)

## 🎵 Audio Files (Optional)

The app works without audio files. To add sound effects:

1. Download free horror-themed audio from:
   - [Freesound.org](https://freesound.org/)
   - [OpenGameArt.org](https://opengameart.org/)
   - [ZapSplat](https://www.zapsplat.com/)

2. Add these files to `assets/sounds/`:
   - `ambient.mp3` - Background music (looping)
   - `click.mp3` - UI click sound
   - `success.mp3` - Success notification sound

## 🌟 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Required Features:**
- HTML5 Canvas API
- ES6+ JavaScript
- CSS Grid and Flexbox
- LocalStorage API
- File API

## 🎨 Customization

### Adding New Characters

Edit `js/app.js` and add to `CHARACTER_TEMPLATES` array:

```javascript
{
  id: 'custom-01',
  name: 'Custom Character',
  category: 'zombie',
  imagePath: 'path/to/image.png',
  thumbnail: 'path/to/thumbnail.png',
  faceRegion: { x: 140, y: 140, width: 120, height: 120 },
  colorTone: { hue: 120, saturation: 60, lightness: 40 }
}
```

### Changing Colors

Edit `css/theme.css` and modify CSS custom properties:

```css
:root {
  --color-accent-blood: #8b0000;
  --color-accent-neon: #00ff41;
  /* ... more colors */
}
```

## 🐛 Troubleshooting

**Images not loading?**
- Check file format (JPG, PNG, WEBP only)
- Ensure file size is under 10MB
- Try a different browser

**Canvas not rendering?**
- Clear browser cache
- Check browser console for errors
- Ensure JavaScript is enabled

**Sound not playing?**
- Click the sound toggle button
- Check if audio files exist in `assets/sounds/`
- Some browsers require user interaction before playing audio

## 📝 License

MIT License - feel free to use for your projects!

## 🙏 Credits

Built with ❤️ for hackathons and creative projects.

## 🔗 Links

- [Live Demo](#) (Add your deployment URL)
- [Report Bug](../../issues)
- [Request Feature](../../issues)

---

Made with 👻 by the NFT Avatar Zone team
