# Technical Stack

## Core Technologies

- **Pure HTML5/CSS3/JavaScript (ES6+)** - Zero dependencies, no build tools
- **HTML5 Canvas API** - All image manipulation and rendering
- **CSS Custom Properties** - Theme system with color variables
- **LocalStorage API** - User preference persistence
- **Web Share API** - Social media sharing integration

## No Build System

This project runs directly in browsers without compilation, bundling, or transpilation. Simply open `index.html` in any modern browser.

## Browser Requirements

- Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- Required APIs: Canvas, ES6+, LocalStorage, File API

## Project Structure

```
nft-avatar-zone/
├── index.html              # Entry point
├── css/
│   ├── theme.css          # CSS variables, color palette
│   ├── animations.css     # Keyframe animations
│   ├── main.css           # Component styles
│   ├── navigation.css     # Navigation styles
│   └── responsive.css     # Media queries
├── js/
│   ├── app.js             # Main app initialization, CHARACTER_TEMPLATES data
│   ├── stateManager.js    # Centralized state management
│   ├── imageProcessor.js  # Image loading, validation, filters
│   ├── avatarBuilder.js   # Canvas rendering, merging logic
│   ├── uiManager.js       # DOM manipulation, event handlers
│   ├── animationController.js  # UI animations
│   ├── nftMinter.js       # Demo NFT minting flow
│   ├── layerManager.js    # Layer system with history
│   ├── effectsManager.js  # Visual effects and overlays
│   └── advancedTools.js   # Advanced editing tools
└── assets/
    ├── characters/        # Character template images
    ├── sounds/           # Optional audio files
    └── icons/            # UI icons
```

## Common Commands

### Local Development

```bash
# Python
python -m http.server 8000

# Node.js
npx serve

# PHP
php -S localhost:8000
```

### Deployment

```bash
# Vercel
vercel deploy

# GitHub Pages
# Push to GitHub, enable Pages in repo settings

# Netlify
# Drag and drop folder to netlify.com/drop
```

## Performance Targets

- Initial load: < 2 seconds
- Template switch: < 200ms
- Transform update: < 100ms (debounced)
- Animation FPS: 60fps
- Memory usage: < 200MB
