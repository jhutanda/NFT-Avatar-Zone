# Development Guide 🛠️

Guide for developers who want to extend or customize NFT Avatar Zone.

## Architecture Overview

The application follows a modular architecture with clear separation of concerns:

```
┌─────────────────────────────────────────┐
│         Presentation Layer              │
│  UIManager, AnimationController         │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│         Application Layer               │
│  AvatarBuilder, ImageProcessor          │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│            Data Layer                   │
│  StateManager, CHARACTER_TEMPLATES      │
└─────────────────────────────────────────┘
```

## Module Responsibilities

### StateManager (`stateManager.js`)
**Purpose**: Centralized state management with observer pattern

**Key Methods**:
- `setState(key, value)` - Update state and notify observers
- `getState(key)` - Retrieve state value
- `subscribe(callback)` - Register state change listener
- `savePreferences()` - Persist to localStorage
- `loadPreferences()` - Load from localStorage

**State Structure**:
```javascript
{
  userImage: HTMLImageElement | null,
  selectedTemplate: Object | null,
  currentCategory: string,
  transforms: { zoom, rotation, position },
  filters: { brightness, contrast, saturation },
  soundEnabled: boolean,
  isProcessing: boolean
}
```

### ImageProcessor (`imageProcessor.js`)
**Purpose**: Image loading, validation, and manipulation

**Key Methods**:
- `loadImage(file)` - Load and validate image file
- `detectFaceBounds(imageData)` - Simplified face detection
- `removeBackground(imageData)` - Background removal
- `adjustColorTone(imageData, targetTone)` - Color adjustment
- `applyFilter(imageData, filters)` - Apply brightness/contrast/saturation

**Note**: Face detection is simplified. For production, integrate TensorFlow.js.

### AvatarBuilder (`avatarBuilder.js`)
**Purpose**: Core avatar merging logic using Canvas API

**Key Methods**:
- `loadTemplate(templateData)` - Load character template
- `setUserImage(image)` - Set user's uploaded image
- `applyTransform(zoom, rotation, position)` - Apply transformations
- `mergeImages()` - Merge user face with template
- `renderToCanvas()` - Render to canvas
- `exportImage()` - Export as data URL
- `downloadImage()` - Trigger download
- `getBlob()` - Get blob for sharing

### UIManager (`uiManager.js`)
**Purpose**: Handle all DOM manipulation and user interactions

**Key Methods**:
- `initializeUploadArea()` - Setup drag & drop
- `initializeControls()` - Setup sliders and inputs
- `initializeCharacterSelector()` - Setup character grid
- `handleFileUpload(file)` - Process uploaded file
- `selectCharacter(template)` - Handle character selection
- `renderAvatar()` - Trigger avatar rendering
- `showNotification(message, type)` - Display notification
- `handleError(error)` - Error handling

### AnimationController (`animationController.js`)
**Purpose**: Manage UI animations and effects

**Key Methods**:
- `startBackgroundAnimation()` - Start fog animation
- `triggerSelectionEffect(element)` - Animate selection
- `fadeIn/fadeOut(element)` - Fade animations
- `shake(element)` - Shake animation for errors
- `pulse(element)` - Pulse animation
- `monitorFPS(callback)` - Performance monitoring

### NFTMinter (`nftMinter.js`)
**Purpose**: Demo NFT minting flow

**Key Methods**:
- `showWalletModal()` - Display wallet connection modal
- `connectWallet()` - Simulate wallet connection
- `mintNFT(imageData)` - Simulate minting process
- `showMintSuccess(txHash)` - Display success state
- `generateWalletAddress()` - Generate fake address
- `generateTxHash()` - Generate fake transaction hash

## Adding New Features

### Adding a New Character Template

1. Create or obtain character image (400x400px recommended)
2. Add to `CHARACTER_TEMPLATES` array in `app.js`:

```javascript
{
  id: 'unique-id',
  name: 'Character Name',
  category: 'zombie', // or demon, ghost, witch, skull, anime-horror, cyberpunk, nft-style
  imagePath: 'path/to/image.png',
  thumbnail: 'path/to/thumbnail.png', // optional, uses imagePath if not provided
  faceRegion: {
    x: 140,      // X position where face should be placed
    y: 140,      // Y position
    width: 120,  // Width of face region
    height: 120  // Height of face region
  },
  colorTone: {
    hue: 120,        // 0-360
    saturation: 60,  // 0-100
    lightness: 40    // 0-100
  }
}
```

3. Place image files in `assets/characters/[category]/`

### Adding a New Category

1. Add category button in `index.html`:
```html
<button class="category-btn" data-category="new-category">New Category</button>
```

2. Create templates with `category: 'new-category'`

3. Create directory: `assets/characters/new-category/`

### Adding a New Filter

1. Add slider in `index.html`:
```html
<div class="control-group">
  <label for="newFilterSlider">
    <span class="control-label">New Filter</span>
    <span id="newFilterValue" class="control-value">100%</span>
  </label>
  <input type="range" id="newFilterSlider" min="0" max="200" value="100" class="slider">
</div>
```

2. Add to state in `stateManager.js`:
```javascript
filters: {
  brightness: 100,
  contrast: 100,
  saturation: 100,
  newFilter: 100  // Add here
}
```

3. Add control initialization in `uiManager.js`:
```javascript
{ 
  slider: this.elements.newFilterSlider, 
  value: 'newFilterValue', 
  state: 'filters.newFilter', 
  suffix: '%' 
}
```

4. Implement filter logic in `imageProcessor.js`:
```javascript
applyFilter(imageData, filters) {
  // ... existing code
  const newFilterMult = filters.newFilter / 100;
  // Apply your filter logic
}
```

### Adding Sound Effects

1. Add audio element in `index.html`:
```html
<audio id="newSound">
  <source src="assets/sounds/new-sound.mp3" type="audio/mpeg">
</audio>
```

2. Add to sound map in `uiManager.js`:
```javascript
const soundMap = {
  ambient: 'ambientMusic',
  click: 'clickSound',
  success: 'successSound',
  newSound: 'newSound'  // Add here
};
```

3. Play sound:
```javascript
this.uiManager.playSound('newSound');
```

### Customizing Animations

Edit `css/animations.css` to modify or add animations:

```css
@keyframes myCustomAnimation {
  0% { /* start state */ }
  100% { /* end state */ }
}

.my-element {
  animation: myCustomAnimation 1s ease-in-out;
}
```

### Customizing Theme

Edit `css/theme.css` to change colors:

```css
:root {
  --color-accent-blood: #8b0000;  /* Change this */
  --color-accent-neon: #00ff41;   /* And this */
  /* ... more colors */
}
```

## Performance Optimization

### Debouncing

The app uses debouncing for slider inputs to prevent excessive rendering:

```javascript
debouncedRender() {
  clearTimeout(this.debounceTimers.render);
  this.debounceTimers.render = setTimeout(() => {
    this.renderAvatar();
  }, 50); // 50ms delay
}
```

### Canvas Optimization

- Use `requestAnimationFrame` for smooth animations
- Clear only necessary regions when possible
- Use offscreen canvas for complex operations
- Limit canvas size to reasonable dimensions

### Image Optimization

- Validate file size before processing
- Scale down large images
- Use WebP format when possible
- Lazy load character templates

## Testing

### Manual Testing Checklist

- [ ] Upload various image formats (JPG, PNG, WEBP)
- [ ] Test invalid file types
- [ ] Test file size limits
- [ ] Test all character categories
- [ ] Test all sliders and controls
- [ ] Test download functionality
- [ ] Test share functionality
- [ ] Test NFT mint demo
- [ ] Test sound toggle
- [ ] Test on different browsers
- [ ] Test on mobile devices
- [ ] Test touch gestures
- [ ] Test responsive breakpoints

### Browser Testing

Test on:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile Safari (iOS)
- Chrome Mobile (Android)

### Performance Testing

Monitor:
- FPS (should maintain 60fps)
- Memory usage (< 200MB)
- Load time (< 2 seconds)
- Render time (< 100ms)

## Debugging

### Enable Verbose Logging

Add to `app.js`:
```javascript
window.DEBUG = true;

// Then in modules:
if (window.DEBUG) {
  console.log('Debug info:', data);
}
```

### Common Issues

**Canvas not rendering:**
- Check browser console for errors
- Verify image loaded successfully
- Check canvas dimensions

**Slow performance:**
- Reduce debounce delay
- Optimize image size
- Check for memory leaks

**Images not loading:**
- Check file paths
- Verify CORS settings
- Check file format support

## Code Style

### Naming Conventions

- Classes: `PascalCase`
- Functions/Methods: `camelCase`
- Constants: `UPPER_SNAKE_CASE`
- Private methods: `_prefixWithUnderscore`
- CSS classes: `kebab-case`

### Comments

```javascript
// Single line comment for brief explanations

/**
 * Multi-line comment for complex functions
 * @param {string} param - Description
 * @returns {boolean} Description
 */
function myFunction(param) {
  // Implementation
}
```

### File Organization

- One class per file
- Export at bottom of file
- Group related methods together
- Keep files under 500 lines

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Resources

- [Canvas API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [Web Share API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Share_API)
- [LocalStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [CSS Animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations)

---

Happy coding! 🎃
