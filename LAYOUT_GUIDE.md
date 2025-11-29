# Layout Guide - Split Screen Design 📐

## Application Layout

```
┌─────────────────────────────────────────────────────────────────┐
│  🎃 NFT Avatar Zone                                    🔇 Sound  │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────────────────────┐  ┌────────────────────────┐  │
│  │                              │  │  CHOOSE YOUR CHARACTER │  │
│  │      UPLOAD AREA             │  │                        │  │
│  │   📸 Drag & Drop Photo       │  │  [All][Zombie][Demon]  │  │
│  │                              │  │  [Ghost][Witch][Skull] │  │
│  │                              │  │  [Anime][Cyber][NFT]   │  │
│  └──────────────────────────────┘  │                        │  │
│                                     │  ┌────┐ ┌────┐ ┌────┐ │  │
│  ┌──────────────────────────────┐  │  │ 🧟 │ │ 😈 │ │ 👻 │ │  │
│  │                              │  │  └────┘ └────┘ └────┘ │  │
│  │      CANVAS PREVIEW          │  │  ┌────┐ ┌────┐ ┌────┐ │  │
│  │                              │  │  │ 🧙 │ │ 💀 │ │ 🔪 │ │  │
│  │      [Your Avatar Here]      │  │  └────┘ └────┘ └────┘ │  │
│  │                              │  │  ┌────┐ ┌────┐ ┌────┐ │  │
│  │                              │  │  │ 🤖 │ │ ⚡ │ │ 🦍 │ │  │
│  │                              │  │  └────┘ └────┘ └────┘ │  │
│  └──────────────────────────────┘  │                        │  │
│                                     └────────────────────────┘  │
│  ┌──────────────────────────────┐                              │
│  │  ADJUST YOUR AVATAR          │                              │
│  │  Zoom:     [========○===]    │                              │
│  │  Rotation: [====○========]   │                              │
│  │  Position: X[===○====] Y[○]  │                              │
│  │  Brightness:[====○=======]   │                              │
│  │  Contrast:  [=====○======]   │                              │
│  │  Saturation:[====○=======]   │                              │
│  └──────────────────────────────┘                              │
│                                                                   │
│  [💾 Download] [🔗 Share] [🎫 Mint NFT]                        │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                      BOTTOM TOOLBAR                              │
│  [✂️ Crop] [🎭 Remove BG] [✨ Magic] [🧹 Eraser] [🖌️ Brush]    │
│  [🔍 Sharpen] [💫 Blur] [⚡ Glitch] [🎨 Cartoon]                │
│  [↔️ Flip H] [↕️ Flip V] [↶ Undo] [↷ Redo] [🔄 Reset]          │
└─────────────────────────────────────────────────────────────────┘

┌──────────────┐                                    ┌──────────────┐
│  HISTORY     │                                    │  LAYERS      │
│  ▼           │                                    │  [+ Add]     │
│              │                                    │              │
│  ✓ Upload    │                                    │  👁️ Layer 3  │
│  ✓ Crop      │                                    │  👁️ Layer 2  │
│  ✓ Remove BG │                                    │  👁️ Layer 1  │
│  ✓ Cartoon   │                                    │              │
└──────────────┘                                    └──────────────┘

                    ┌──────────────────────┐
                    │  EFFECTS & OVERLAYS  │
                    │  ▼                   │
                    │                      │
                    │  [💨] [🌫️] [🩸]     │
                    │  [📺] [⚡] [✨]      │
                    │                      │
                    │  Lighting:           │
                    │  [Spotlight] [Rim]   │
                    │                      │
                    │  Glow: [====○====]   │
                    └──────────────────────┘
```

## Panel Positions

### Desktop Layout (1024px+)

**Left Side:**
- History Panel (bottom-left)
  - Position: Fixed, left: 16px, bottom: 100px
  - Width: 250px
  - Collapsible

**Center:**
- Main Panel (full width)
  - Upload Area (top)
  - Canvas Preview (center)
  - Control Panel (below canvas)
  - Action Buttons (bottom)

**Right Side:**
- Layers Panel (top-right)
  - Position: Fixed, right: 16px, top: 100px
  - Width: 250px
  - Always visible

- Character Sidebar (main right)
  - Category filters
  - Character grid
  - Scrollable

- Effects Panel (bottom-right)
  - Position: Fixed, right: 16px, bottom: 100px
  - Width: 300px
  - Collapsible

**Bottom:**
- Bottom Toolbar (center-bottom)
  - Position: Fixed, bottom: 16px
  - Centered horizontally
  - Scrollable on small screens

### Tablet Layout (768-1023px)

**Changes:**
- Panels narrower (220px)
- Character grid: 1 column
- Effects grid: 2 columns
- Toolbar: Smaller buttons

### Mobile Layout (<768px)

**Changes:**
- Single column layout
- Panels stack vertically
- Toolbar wraps
- Full-width panels
- Bottom panels above toolbar

## Panel Features

### History Panel
```
┌──────────────────┐
│ History      [▼] │
├──────────────────┤
│ ✓ Upload Image   │
│   15:30:45       │
├──────────────────┤
│ ✓ Remove BG      │
│   15:31:12       │
├──────────────────┤
│ ✓ Apply Cartoon  │
│   15:31:45       │
└──────────────────┘
```

### Layers Panel
```
┌──────────────────┐
│ Layers      [+]  │
├──────────────────┤
│ 👁️ [img] Layer 3 │
│     Image   [⋮]  │
├──────────────────┤
│ 👁️ [img] Layer 2 │
│     Effect  [⋮]  │
├──────────────────┤
│ 👁️ [img] Layer 1 │
│     Image   [⋮]  │
└──────────────────┘
```

### Effects Panel
```
┌──────────────────────┐
│ Effects & Overlays[▼]│
├──────────────────────┤
│ [💨]  [🌫️]  [🩸]    │
│ Smoke  Fog   Blood   │
│                      │
│ [📺]  [⚡]  [✨]     │
│ Glitch Light Particle│
├──────────────────────┤
│ Lighting:            │
│ [Spotlight] [Rim]    │
│ [Ambient]            │
├──────────────────────┤
│ Glow Intensity       │
│ [========○=======]   │
└──────────────────────┘
```

### Bottom Toolbar
```
┌─────────────────────────────────────────────────────┐
│ [✂️]  [🎭]  [✨]  [🧹]  [🖌️] │ [🔍] [💫] [⚡] [🎨] │
│ Crop  RemBG Magic Erase Brush │ Sharp Blur Gltch Cart│
│                                                       │
│ [↔️] [↕️] │ [↶] [↷] [🔄]                            │
│ FlipH FlipV│ Undo Redo Reset                         │
└─────────────────────────────────────────────────────┘
```

## Interaction Flow

### Basic Workflow
1. **Upload** → Click/drag photo to upload area
2. **Select** → Click character from right sidebar
3. **Adjust** → Use control sliders
4. **Export** → Click download button

### Advanced Workflow
1. **Upload** → Photo to canvas
2. **Remove BG** → Click Remove BG tool
3. **Select Character** → From sidebar
4. **Create Layer** → Add new layer
5. **Apply Effect** → Choose from effects panel
6. **Adjust** → Use sliders and tools
7. **Layer Management** → Reorder, merge, adjust opacity
8. **Fine-tune** → Apply filters from toolbar
9. **Export** → Choose format and download

## Responsive Behavior

### Desktop (1024px+)
- All panels visible
- Side-by-side layout
- Full toolbar

### Tablet (768-1023px)
- Narrower panels
- Maintained layout
- Smaller buttons

### Mobile (<768px)
- Stacked layout
- Collapsible panels
- Wrapped toolbar
- Touch-optimized

## Z-Index Layers

```
1000 - Notifications
2000 - Modals
100  - Bottom Toolbar
90   - Side Panels
10   - Main Content
-1   - Background Fog
```

## Color Coding

**Panels:**
- Glass effect: rgba(26, 26, 46, 0.7)
- Border: rgba(255, 255, 255, 0.1)

**Active States:**
- Purple: #9d00ff
- Neon: #00ff41
- Blood: #8b0000

**Hover Effects:**
- Glow: 0 0 20px rgba(color, 0.8)
- Transform: translateY(-2px)

## Accessibility

- Minimum touch target: 44px
- Keyboard navigation supported
- ARIA labels on buttons
- High contrast mode support
- Reduced motion support

---

**This layout provides a professional, Photoshop-like experience while maintaining the horror theme!**
