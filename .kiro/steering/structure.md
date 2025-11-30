# Project Structure and Conventions

## Architecture Pattern

**Modular Class-Based Architecture** - Each module is a self-contained ES6 class with single responsibility.

```
StateManager ──────┐
ImageProcessor ────┤
AvatarBuilder ─────┼──> UIManager ──> DOM
AnimationController┤
NFTMinter ─────────┘
LayerManager
EffectsManager
AdvancedTools
```

## Module Responsibilities

- **StateManager**: Centralized state with observer pattern, localStorage persistence
- **ImageProcessor**: File validation, image loading, color manipulation, filters
- **AvatarBuilder**: Canvas rendering, template merging, transform application
- **UIManager**: DOM manipulation, event handling, user interactions
- **AnimationController**: CSS animation triggers, visual effects
- **NFTMinter**: Demo minting flow with modal UI
- **LayerManager**: Layer system with undo/redo history (50 actions)
- **EffectsManager**: Visual effects (smoke, fog, blood, glitch, lighting)
- **AdvancedTools**: Professional editing tools (crop, eraser, brush, background removal)

## Code Organization

### JavaScript Modules

Each JS file exports a single class to `window` object:

```javascript
class ModuleName {
  constructor() {
    // Initialize
  }
  
  // Public methods
  publicMethod() {}
  
  // Private methods (convention: prefix with _)
  _privateMethod() {}
}

if (typeof window !== 'undefined') {
  window.ModuleName = ModuleName;
}
```

### CSS Structure

- **theme.css**: CSS custom properties only (colors, spacing, fonts)
- **animations.css**: @keyframes definitions only
- **main.css**: Component styles, layout, UI elements
- **navigation.css**: Navigation-specific styles
- **responsive.css**: Media queries only (mobile < 768px, tablet 768-1023px, desktop 1024px+)

### HTML Structure

Single-page application with sections:
- Navigation bar (sticky)
- Main content area (grid layout)
- Character sidebar (sticky)
- Modals (share, mint)
- Notification container (fixed)

## Naming Conventions

### CSS Classes

- **BEM-inspired**: `.component-name`, `.component-name__element`, `.component-name--modifier`
- **State classes**: `.active`, `.hidden`, `.disabled`, `.selected`
- **Utility classes**: `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-accent`

### JavaScript

- **Classes**: PascalCase (`StateManager`, `UIManager`)
- **Methods**: camelCase (`renderAvatar`, `handleUpload`)
- **Constants**: UPPER_SNAKE_CASE (`CHARACTER_TEMPLATES`, `MAX_FILE_SIZE`)
- **Private methods**: Prefix with underscore (`_privateMethod`)

### Files

- **HTML**: lowercase with hyphens (`index.html`, `editing-tools.html`)
- **CSS**: lowercase with hyphens (`main.css`, `responsive.css`)
- **JS**: camelCase (`stateManager.js`, `imageProcessor.js`)

## Data Flow

1. User interaction → UIManager
2. UIManager updates StateManager
3. StateManager notifies observers
4. UIManager triggers rendering
5. AvatarBuilder/ImageProcessor manipulates canvas
6. Canvas updates displayed to user

## State Management

Centralized state in StateManager with observer pattern:

```javascript
// Set state
this.state.setState('transforms.zoom', 1.5);

// Get state
const zoom = this.state.getState('transforms.zoom');

// Subscribe to changes
this.state.subscribe((key, value) => {
  console.log(`${key} changed to ${value}`);
});
```

## Performance Patterns

- **Debouncing**: All slider inputs debounced to 50ms
- **Lazy loading**: Templates loaded on demand
- **Canvas optimization**: Clear and redraw only when needed
- **Event delegation**: Use for dynamic elements

## Error Handling

Consistent error handling with user-friendly messages:

```javascript
try {
  // Operation
} catch (error) {
  this.handleError(error);
}
```

Error codes: `INVALID_FILE_TYPE`, `FILE_TOO_LARGE`, `INVALID_IMAGE`, `TEMPLATE_NOT_FOUND`, `EXPORT_FAILED`

## Asset Organization

```
assets/
├── characters/
│   ├── zombie/
│   ├── demon/
│   ├── ghost/
│   └── ...
├── sounds/
│   ├── ambient.mp3
│   ├── click.mp3
│   └── success.mp3
└── icons/
    └── (UI icons)
```

## Documentation Standards

- README.md: User-facing documentation
- Inline comments: Explain "why", not "what"
- JSDoc comments for public methods
- Markdown files for guides (QUICKSTART.md, FEATURES.md, DEVELOPMENT.md)
