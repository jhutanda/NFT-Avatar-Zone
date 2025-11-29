# Design Document

## Overview

NFT Avatar Zone is a client-side web application built with vanilla HTML, CSS, and JavaScript that provides a professional horror-themed interface for creating spooky avatars. The application uses the HTML5 Canvas API for image manipulation, CSS animations for atmospheric effects, and a modular JavaScript architecture for maintainability. The system processes user-uploaded photos, merges them with pre-designed character templates, and provides export/sharing capabilities along with a demo NFT minting experience.

## Architecture

### High-Level Architecture

The application follows a modular client-side architecture with clear separation of concerns:

```
┌─────────────────────────────────────────────────────────┐
│                     Presentation Layer                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   UI Manager │  │ Theme Engine │  │ Animation Mgr│  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
                            │
┌─────────────────────────────────────────────────────────┐
│                     Application Layer                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │Image Processor│ │Avatar Builder│  │ State Manager│  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
                            │
┌─────────────────────────────────────────────────────────┐
│                        Data Layer                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │Template Store│  │  User Prefs  │  │ Canvas State │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### Technology Stack

- **Frontend Framework**: Vanilla JavaScript (ES6+)
- **Image Processing**: HTML5 Canvas API
- **Styling**: CSS3 with custom properties for theming
- **Animations**: CSS animations and transitions
- **Storage**: LocalStorage for user preferences
- **Build Tool**: None required (pure HTML/CSS/JS)

### File Structure

```
nft-avatar-zone/
├── index.html
├── css/
│   ├── main.css
│   ├── theme.css
│   ├── animations.css
│   └── responsive.css
├── js/
│   ├── app.js
│   ├── imageProcessor.js
│   ├── avatarBuilder.js
│   ├── uiManager.js
│   ├── stateManager.js
│   ├── animationController.js
│   └── nftMinter.js
├── assets/
│   ├── characters/
│   │   ├── zombie/
│   │   ├── demon/
│   │   ├── ghost/
│   │   ├── witch/
│   │   ├── skull/
│   │   ├── anime-horror/
│   │   ├── cyberpunk/
│   │   └── nft-style/
│   ├── sounds/
│   │   ├── ambient.mp3
│   │   ├── click.mp3
│   │   └── success.mp3
│   └── icons/
└── README.md
```

## Components and Interfaces

### 1. UI Manager (`uiManager.js`)

Handles all DOM manipulation and user interactions.

**Responsibilities:**
- Initialize UI components
- Handle file upload (drag & drop and click)
- Manage control panel interactions
- Update UI state based on application state
- Display notifications and modals

**Key Methods:**
```javascript
class UIManager {
  constructor()
  initializeUploadArea()
  initializeControls()
  initializeCharacterSelector()
  showNotification(message, type)
  showModal(modalType)
  updateControlValues(zoom, rotation, position)
  disableControls()
  enableControls()
}
```

### 2. Image Processor (`imageProcessor.js`)

Handles image loading, manipulation, and background removal.

**Responsibilities:**
- Load and validate uploaded images
- Detect face boundaries (simplified algorithm)
- Remove or blur background
- Apply color adjustments
- Handle image transformations

**Key Methods:**
```javascript
class ImageProcessor {
  constructor()
  loadImage(file)
  detectFaceBounds(imageData)
  removeBackground(imageData)
  adjustColorTone(imageData, targetTone)
  applyFilter(imageData, filterType)
  getImageData(image)
}
```

### 3. Avatar Builder (`avatarBuilder.js`)

Core logic for merging user face with character templates.

**Responsibilities:**
- Load character templates
- Merge user image with template
- Apply transformations (zoom, rotate, position)
- Render final composite on canvas
- Export final image

**Key Methods:**
```javascript
class AvatarBuilder {
  constructor(canvas)
  loadTemplate(templatePath)
  setUserImage(image)
  mergeImages(userImage, template, transforms)
  applyTransform(zoom, rotation, position)
  renderToCanvas()
  exportImage(format)
}
```

### 4. State Manager (`stateManager.js`)

Manages application state and coordinates between components.

**Responsibilities:**
- Store current application state
- Notify observers of state changes
- Persist user preferences
- Manage undo/redo functionality

**Key Methods:**
```javascript
class StateManager {
  constructor()
  setState(key, value)
  getState(key)
  subscribe(callback)
  savePreferences()
  loadPreferences()
  resetState()
}
```

### 5. Animation Controller (`animationController.js`)

Manages all UI animations and effects.

**Responsibilities:**
- Control background fog animation
- Handle flickering neon effects
- Manage hover glow effects
- Coordinate transition animations

**Key Methods:**
```javascript
class AnimationController {
  constructor()
  startBackgroundAnimation()
  stopBackgroundAnimation()
  triggerSelectionEffect(element)
  applyHoverGlow(element)
  flickerNeonBorder(element)
}
```

### 6. NFT Minter (`nftMinter.js`)

Handles demo NFT minting functionality.

**Responsibilities:**
- Display wallet connection modal
- Simulate wallet connection
- Animate minting process
- Show success state with fake transaction

**Key Methods:**
```javascript
class NFTMinter {
  constructor()
  showWalletModal()
  connectWallet()
  mintNFT(imageData)
  showMintingProgress()
  showMintSuccess(txHash)
}
```

## Data Models

### Application State

```javascript
const AppState = {
  userImage: null,              // HTMLImageElement or null
  selectedTemplate: null,       // Template object or null
  currentCategory: 'all',       // string
  transforms: {
    zoom: 1.0,                  // number (0.5 - 2.0)
    rotation: 0,                // number (0 - 360)
    position: { x: 0, y: 0 }    // object {x: number, y: number}
  },
  filters: {
    brightness: 100,            // number (0 - 200)
    contrast: 100,              // number (0 - 200)
    saturation: 100             // number (0 - 200)
  },
  soundEnabled: false,          // boolean
  isProcessing: false           // boolean
}
```

### Character Template

```javascript
const CharacterTemplate = {
  id: 'zombie-01',              // string (unique identifier)
  name: 'Zombie Walker',        // string
  category: 'zombie',           // string (zombie|demon|ghost|witch|skull|anime-horror|cyberpunk|nft-style)
  imagePath: 'assets/characters/zombie/zombie-01.png',  // string
  thumbnail: 'assets/characters/zombie/zombie-01-thumb.png',  // string
  faceRegion: {                 // object defining where face should be placed
    x: 150,                     // number (pixels from left)
    y: 100,                     // number (pixels from top)
    width: 200,                 // number (pixels)
    height: 250                 // number (pixels)
  },
  colorTone: {                  // object for color adjustment
    hue: 120,                   // number (0-360)
    saturation: 80,             // number (0-100)
    lightness: 40               // number (0-100)
  }
}
```

### User Preferences

```javascript
const UserPreferences = {
  soundEnabled: false,          // boolean
  lastCategory: 'all',          // string
  favoriteTemplates: []         // array of template IDs
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Upload validation consistency
*For any* file input, if the file type is not a valid image format (JPG, PNG, WEBP), then the system should reject the upload and display an error message without modifying the current state.
**Validates: Requirements 1.4, 1.5**

### Property 2: Valid image upload and display
*For any* valid image file (JPG, PNG, WEBP) that is dropped or selected, the Avatar Generator should load the image and display it on the preview canvas.
**Validates: Requirements 1.2, 1.4**

### Property 3: Drag interaction visual feedback
*For any* drag event over the upload area, the appropriate CSS class indicating the drop zone should be applied to provide visual feedback.
**Validates: Requirements 1.1**

### Property 4: Character hover effect application
*For any* character card in the selector, hovering over it should apply the glow effect styling to that card.
**Validates: Requirements 2.2**

### Property 5: Character selection and merge
*For any* character template clicked and any uploaded user image, the Avatar Generator should merge the user's face with the selected character and update the preview canvas.
**Validates: Requirements 2.3**

### Property 6: Category filter correctness
*For any* category filter selection, all displayed character templates should belong to the selected category, and no templates from other categories should be visible.
**Validates: Requirements 2.4**

### Property 7: Selection state visual consistency
*For any* selected character template, the UI should display an animated selection effect on that card and the application state should reflect the same selection.
**Validates: Requirements 2.5**

### Property 8: Face positioning within bounds
*For any* face detected in an uploaded image and any character template, the Avatar Generator should automatically position the face within the character template's defined face region boundaries.
**Validates: Requirements 3.2**

### Property 9: Color tone adjustment
*For any* positioned face and any character template, the Avatar Generator should adjust the face's color tones to match the character's color palette.
**Validates: Requirements 3.3**

### Property 10: Transform application correctness
*For any* zoom value, rotation angle, and position coordinates applied to a user image, the Avatar Generator should scale proportionally, rotate around the center point, and move to the specified coordinates respectively.
**Validates: Requirements 4.1, 4.2, 4.3**

### Property 11: Transform preserves image quality
*For any* combination of zoom, rotation, and position transforms applied to a user image, the output image quality should not degrade beyond acceptable thresholds (no pixelation visible at normal viewing distance).
**Validates: Requirements 4.5**

### Property 12: Real-time preview updates
*For any* adjustment to zoom, rotation, position, or filters, the canvas preview should update within 100 milliseconds to reflect the new state.
**Validates: Requirements 4.4, 12.1, 12.2, 12.3**

### Property 13: Export matches canvas preview
*For any* avatar created in the system, exporting the image should produce a PNG file that exactly matches the canvas preview display.
**Validates: Requirements 5.1**

### Property 14: Download triggers browser save
*For any* completed avatar, clicking the Download button should trigger a browser download with a descriptive filename containing the exported PNG.
**Validates: Requirements 5.2**

### Property 15: Control state consistency
*For any* application state where no user image is uploaded or no character is selected, the Download, Share, and Mint NFT buttons should be disabled.
**Validates: Requirements 5.3**

### Property 16: Success notification on download
*For any* successful download operation, the Avatar Generator should display a success notification to the user.
**Validates: Requirements 5.4**

### Property 17: Error handling with retry
*For any* failed export or share operation, the Avatar Generator should display an error message with a retry option or fallback.
**Validates: Requirements 5.5, 6.5**

### Property 18: Share data preparation
*For any* sharing platform selected, the Avatar Generator should prepare the image data in the format appropriate for that platform's API.
**Validates: Requirements 6.2**

### Property 19: Share dialog opening
*For any* platform selected for sharing, the Avatar Generator should open that platform's share dialog with the avatar image data.
**Validates: Requirements 6.3**

### Property 20: Share confirmation feedback
*For any* successful share operation, the Avatar Generator should display a confirmation message to the user.
**Validates: Requirements 6.4**

### Property 21: Mint popup state preservation
*For any* NFT mint popup close action, the Avatar Generator should return to the main interface with all user data (uploaded image, selected character, transforms) preserved unchanged.
**Validates: Requirements 7.5**

### Property 22: Glassmorphism styling application
*For any* card or panel UI element rendered in the application, the Avatar Generator should apply glassmorphism effects (backdrop blur, transparency, border styling).
**Validates: Requirements 8.2**

### Property 23: Interactive element hover effects
*For any* interactive element (buttons, cards, controls), hovering over it should display the blood glow hover effect.
**Validates: Requirements 8.3**

### Property 24: Neon border animation
*For any* element with neon borders, the Avatar Generator should apply flickering animation effects to those borders.
**Validates: Requirements 8.4**

### Property 25: Animation performance maintenance
*For any* UI animation running in the application, the frame rate should maintain at least 60fps to ensure smooth visual experience.
**Validates: Requirements 8.5**

### Property 26: Responsive layout adaptation
*For any* viewport size (desktop, tablet, mobile), the Avatar Generator should display the appropriate responsive layout without overlapping elements or broken functionality.
**Validates: Requirements 9.1, 9.2, 9.3, 9.4**

### Property 27: Touch gesture support
*For any* touch gesture (pinch, drag, rotate) used on mobile devices, the Avatar Generator should apply the corresponding transform (zoom, position, rotation) to the user's face.
**Validates: Requirements 9.5**

### Property 28: Sound playback when enabled
*For any* UI interaction when sound is enabled, the Avatar Generator should play the appropriate sound effect, and ambient music should play continuously.
**Validates: Requirements 10.2, 10.3**

### Property 29: Sound toggle immediate effect
*For any* sound toggle click, the Avatar Generator should immediately mute or unmute all audio based on the new state.
**Validates: Requirements 10.4**

### Property 30: Sound preference persistence
*For any* sound preference setting (enabled/disabled), the Avatar Generator should persist that preference in localStorage and restore it on page refresh.
**Validates: Requirements 10.5**

### Property 31: Console error-free execution
*For any* user interaction or application operation, the Avatar Generator should execute without producing console errors or warnings.
**Validates: Requirements 11.5**

### Property 32: Debounced rapid adjustments
*For any* sequence of rapid adjustments (multiple changes within 100ms), the Avatar Generator should debounce the canvas updates to maintain performance while still reflecting the final state.
**Validates: Requirements 12.4**

### Property 33: Loading indicator during rendering
*For any* rendering operation that takes longer than 50ms, the Avatar Generator should display a loading indicator until the operation completes.
**Validates: Requirements 12.5**

## Error Handling

### Error Categories

1. **File Upload Errors**
   - Invalid file type
   - File too large (>10MB)
   - Corrupted image file
   - Network error during load

2. **Image Processing Errors**
   - Canvas rendering failure
   - Memory allocation error
   - Invalid image dimensions
   - Color adjustment overflow

3. **Template Loading Errors**
   - Template file not found
   - Invalid template format
   - Template metadata missing

4. **Export Errors**
   - Canvas export failure
   - Browser compatibility issue
   - Insufficient memory

### Error Handling Strategy

**User-Facing Errors:**
- Display clear, non-technical error messages
- Provide actionable recovery steps
- Maintain application state when possible
- Log errors to console for debugging

**Example Error Handler:**
```javascript
class ErrorHandler {
  static handle(error, context) {
    console.error(`Error in ${context}:`, error);
    
    const userMessage = this.getUserMessage(error);
    UIManager.showNotification(userMessage, 'error');
    
    // Attempt recovery
    if (this.isRecoverable(error)) {
      this.attemptRecovery(error, context);
    }
  }
  
  static getUserMessage(error) {
    const messages = {
      'INVALID_FILE_TYPE': 'Please upload a valid image file (JPG, PNG, or WEBP)',
      'FILE_TOO_LARGE': 'Image file is too large. Please use an image under 10MB',
      'CANVAS_ERROR': 'Unable to process image. Please try a different image',
      'TEMPLATE_NOT_FOUND': 'Character template could not be loaded. Please try another',
      'EXPORT_FAILED': 'Unable to download image. Please try again'
    };
    
    return messages[error.code] || 'An unexpected error occurred. Please try again';
  }
}
```

## Testing Strategy

### Unit Testing

Unit tests will verify individual component functionality:

1. **Image Processor Tests**
   - Test image loading with valid/invalid files
   - Test color adjustment algorithms
   - Test filter application
   - Test background removal logic

2. **Avatar Builder Tests**
   - Test template loading
   - Test merge operation with various image sizes
   - Test transform calculations
   - Test canvas export

3. **State Manager Tests**
   - Test state updates and notifications
   - Test localStorage persistence
   - Test state reset functionality

4. **UI Manager Tests**
   - Test control value updates
   - Test button enable/disable logic
   - Test notification display

### Property-Based Testing

Property-based tests will verify correctness properties using a JavaScript PBT library (fast-check):

**Library:** fast-check (https://github.com/dubzzz/fast-check)

**Configuration:** Each property test will run a minimum of 100 iterations with randomly generated inputs.

**Test Structure:**
```javascript
// Example property test structure
import fc from 'fast-check';

describe('Avatar Builder Properties', () => {
  it('Property 3: Transform application preserves image quality', () => {
    fc.assert(
      fc.property(
        fc.float({ min: 0.5, max: 2.0 }),  // zoom
        fc.float({ min: 0, max: 360 }),     // rotation
        fc.record({ x: fc.integer(), y: fc.integer() }),  // position
        (zoom, rotation, position) => {
          const builder = new AvatarBuilder(canvas);
          builder.setUserImage(testImage);
          builder.applyTransform(zoom, rotation, position);
          const quality = measureImageQuality(builder.exportImage());
          return quality > ACCEPTABLE_THRESHOLD;
        }
      ),
      { numRuns: 100 }
    );
  });
});
```

### Integration Testing

Integration tests will verify component interactions:

1. **Upload to Preview Flow**
   - Upload image → Process → Display on canvas
   - Verify state updates at each step

2. **Character Selection Flow**
   - Select template → Merge with user image → Update preview
   - Verify visual output matches expected result

3. **Export Flow**
   - Create avatar → Apply transforms → Export
   - Verify exported file matches canvas

### Manual Testing Checklist

- [ ] Test on Chrome, Firefox, Safari, Edge
- [ ] Test on desktop (1920x1080, 1366x768)
- [ ] Test on tablet (768x1024)
- [ ] Test on mobile (375x667, 414x896)
- [ ] Test all character categories
- [ ] Test all transform controls
- [ ] Test all filter effects
- [ ] Test drag & drop upload
- [ ] Test click upload
- [ ] Test download functionality
- [ ] Test share functionality
- [ ] Test NFT mint demo
- [ ] Test sound toggle
- [ ] Test with various image sizes
- [ ] Test with various image formats
- [ ] Test error scenarios

## UI/UX Design Specifications

### Color Palette

```css
:root {
  /* Primary Colors */
  --color-bg-primary: #0a0a0f;
  --color-bg-secondary: #1a1a2e;
  --color-bg-tertiary: #16213e;
  
  /* Accent Colors */
  --color-accent-blood: #8b0000;
  --color-accent-neon: #00ff41;
  --color-accent-purple: #9d00ff;
  --color-accent-cyan: #00d9ff;
  
  /* Text Colors */
  --color-text-primary: #ffffff;
  --color-text-secondary: #b0b0b0;
  --color-text-muted: #6b6b6b;
  
  /* Glow Effects */
  --glow-blood: 0 0 20px rgba(139, 0, 0, 0.8);
  --glow-neon: 0 0 20px rgba(0, 255, 65, 0.6);
  --glow-purple: 0 0 20px rgba(157, 0, 255, 0.6);
}
```

### Typography

```css
/* Primary Font: Creepster for headers */
@import url('https://fonts.googleapis.com/css2?family=Creepster&display=swap');

/* Secondary Font: Roboto for body */
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap');

:root {
  --font-header: 'Creepster', cursive;
  --font-body: 'Roboto', sans-serif;
}
```

### Glassmorphism Effect

```css
.glass-card {
  background: rgba(26, 26, 46, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
}
```

### Animation Specifications

1. **Fog Background Animation**
   - Multiple layers of semi-transparent fog
   - Slow horizontal movement (30-60s duration)
   - Opacity variation for depth

2. **Flickering Neon Border**
   - Random flicker intervals (100-300ms)
   - Brightness variation (80-100%)
   - Color shift between accent colors

3. **Blood Glow Hover**
   - Smooth transition (300ms)
   - Box-shadow expansion
   - Color intensity increase

4. **Selection Effect**
   - Scale animation (1.0 → 1.05 → 1.0)
   - Glow pulse effect
   - Duration: 600ms

### Responsive Breakpoints

```css
/* Mobile */
@media (max-width: 767px) {
  /* Stack layout vertically */
}

/* Tablet */
@media (min-width: 768px) and (max-width: 1023px) {
  /* Adjust sidebar width */
}

/* Desktop */
@media (min-width: 1024px) {
  /* Full two-column layout */
}

/* Large Desktop */
@media (min-width: 1440px) {
  /* Wider canvas area */
}
```

## Performance Considerations

### Optimization Strategies

1. **Image Processing**
   - Use Web Workers for heavy computations
   - Implement progressive rendering for large images
   - Cache processed images in memory
   - Limit maximum image dimensions (4096x4096)

2. **Canvas Rendering**
   - Use requestAnimationFrame for smooth updates
   - Debounce rapid control changes (100ms)
   - Clear and redraw only changed regions when possible
   - Use offscreen canvas for complex operations

3. **Asset Loading**
   - Lazy load character templates
   - Preload visible templates only
   - Use image sprites for icons
   - Compress all assets (WebP for images)

4. **Animation Performance**
   - Use CSS transforms (GPU-accelerated)
   - Avoid layout thrashing
   - Use will-change property sparingly
   - Limit simultaneous animations

### Performance Targets

- Initial page load: < 2 seconds
- Template switching: < 200ms
- Transform update: < 100ms
- Export operation: < 1 second
- Memory usage: < 200MB

## Security Considerations

### Client-Side Security

1. **File Upload Validation**
   - Validate file type using MIME type and extension
   - Limit file size to prevent memory issues
   - Sanitize file names before display

2. **XSS Prevention**
   - Sanitize all user inputs
   - Use textContent instead of innerHTML where possible
   - Validate URLs before navigation

3. **Data Privacy**
   - All processing happens client-side
   - No images uploaded to servers
   - Clear localStorage on user request
   - No tracking or analytics (optional)

## Deployment

### Build Process

No build process required - pure HTML/CSS/JS application.

### Deployment Steps

1. Prepare assets:
   - Optimize all images
   - Minify CSS and JavaScript
   - Compress audio files

2. Deploy to static hosting:
   - GitHub Pages
   - Netlify
   - Vercel
   - AWS S3 + CloudFront

3. Configure:
   - Set up custom domain (optional)
   - Enable HTTPS
   - Configure caching headers

### Browser Compatibility

**Minimum Requirements:**
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

## Future Enhancements

### Phase 2 Features

1. **Advanced Face Detection**
   - Integrate TensorFlow.js for ML-based face detection
   - Auto-align facial features with template

2. **Real NFT Minting**
   - Integrate with Web3 wallet (MetaMask)
   - Deploy smart contract for minting
   - Support multiple blockchains

3. **Social Features**
   - User gallery
   - Share to community
   - Like and comment system

4. **Additional Effects**
   - More filter options
   - Animation effects on avatars
   - Video avatar support

5. **Template Creator**
   - Allow users to upload custom templates
   - Template marketplace

### Technical Debt

- Implement comprehensive error logging
- Add analytics for usage patterns
- Optimize for low-end devices
- Add accessibility features (ARIA labels, keyboard navigation)
- Implement automated testing pipeline

## Conclusion

This design provides a solid foundation for building a professional, hackathon-ready spooky avatar generator. The modular architecture ensures maintainability, the Canvas API provides powerful image manipulation capabilities, and the horror-themed UI creates an immersive user experience. The combination of unit tests and property-based tests ensures correctness and reliability of the core functionality.
