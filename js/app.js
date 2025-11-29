// Main Application - Initialize and coordinate all modules

// Character Templates Data
window.CHARACTER_TEMPLATES = [
  // Zombie Category
  {
    id: 'zombie-01',
    name: 'Zombie Walker',
    category: 'zombie',
    imagePath: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%23228B22" width="400" height="400"/%3E%3Ccircle cx="200" cy="200" r="120" fill="%23556B2F"/%3E%3Ctext x="200" y="220" font-size="80" text-anchor="middle" fill="%23fff"%3E🧟%3C/text%3E%3C/svg%3E',
    thumbnail: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23228B22" width="200" height="200"/%3E%3Ctext x="100" y="120" font-size="60" text-anchor="middle"%3E🧟%3C/text%3E%3C/svg%3E',
    faceRegion: { x: 140, y: 140, width: 120, height: 120 },
    colorTone: { hue: 120, saturation: 60, lightness: 40 }
  },
  {
    id: 'zombie-02',
    name: 'Rotten Corpse',
    category: 'zombie',
    imagePath: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%23556B2F" width="400" height="400"/%3E%3Ccircle cx="200" cy="200" r="120" fill="%236B8E23"/%3E%3Ctext x="200" y="220" font-size="80" text-anchor="middle" fill="%23fff"%3E🧟‍♂️%3C/text%3E%3C/svg%3E',
    thumbnail: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23556B2F" width="200" height="200"/%3E%3Ctext x="100" y="120" font-size="60" text-anchor="middle"%3E🧟‍♂️%3C/text%3E%3C/svg%3E',
    faceRegion: { x: 140, y: 140, width: 120, height: 120 },
    colorTone: { hue: 80, saturation: 50, lightness: 35 }
  },
  
  // Demon Category
  {
    id: 'demon-01',
    name: 'Hell Spawn',
    category: 'demon',
    imagePath: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%238B0000" width="400" height="400"/%3E%3Ccircle cx="200" cy="200" r="120" fill="%23DC143C"/%3E%3Ctext x="200" y="220" font-size="80" text-anchor="middle" fill="%23fff"%3E😈%3C/text%3E%3C/svg%3E',
    thumbnail: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%238B0000" width="200" height="200"/%3E%3Ctext x="100" y="120" font-size="60" text-anchor="middle"%3E😈%3C/text%3E%3C/svg%3E',
    faceRegion: { x: 140, y: 140, width: 120, height: 120 },
    colorTone: { hue: 0, saturation: 80, lightness: 30 }
  },
  {
    id: 'demon-02',
    name: 'Dark Lord',
    category: 'demon',
    imagePath: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%23800020" width="400" height="400"/%3E%3Ccircle cx="200" cy="200" r="120" fill="%23B22222"/%3E%3Ctext x="200" y="220" font-size="80" text-anchor="middle" fill="%23fff"%3E👹%3C/text%3E%3C/svg%3E',
    thumbnail: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23800020" width="200" height="200"/%3E%3Ctext x="100" y="120" font-size="60" text-anchor="middle"%3E👹%3C/text%3E%3C/svg%3E',
    faceRegion: { x: 140, y: 140, width: 120, height: 120 },
    colorTone: { hue: 350, saturation: 70, lightness: 35 }
  },
  
  // Ghost Category
  {
    id: 'ghost-01',
    name: 'Phantom',
    category: 'ghost',
    imagePath: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%23191970" width="400" height="400"/%3E%3Ccircle cx="200" cy="200" r="120" fill="%23483D8B"/%3E%3Ctext x="200" y="220" font-size="80" text-anchor="middle" fill="%23fff"%3E👻%3C/text%3E%3C/svg%3E',
    thumbnail: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23191970" width="200" height="200"/%3E%3Ctext x="100" y="120" font-size="60" text-anchor="middle"%3E👻%3C/text%3E%3C/svg%3E',
    faceRegion: { x: 140, y: 140, width: 120, height: 120 },
    colorTone: { hue: 240, saturation: 30, lightness: 60 }
  },
  {
    id: 'ghost-02',
    name: 'Specter',
    category: 'ghost',
    imagePath: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%232F4F4F" width="400" height="400"/%3E%3Ccircle cx="200" cy="200" r="120" fill="%23708090"/%3E%3Ctext x="200" y="220" font-size="80" text-anchor="middle" fill="%23fff"%3E🌫️%3C/text%3E%3C/svg%3E',
    thumbnail: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%232F4F4F" width="200" height="200"/%3E%3Ctext x="100" y="120" font-size="60" text-anchor="middle"%3E🌫️%3C/text%3E%3C/svg%3E',
    faceRegion: { x: 140, y: 140, width: 120, height: 120 },
    colorTone: { hue: 180, saturation: 20, lightness: 50 }
  },
  
  // Witch Category
  {
    id: 'witch-01',
    name: 'Dark Witch',
    category: 'witch',
    imagePath: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%234B0082" width="400" height="400"/%3E%3Ccircle cx="200" cy="200" r="120" fill="%238B008B"/%3E%3Ctext x="200" y="220" font-size="80" text-anchor="middle" fill="%23fff"%3E🧙‍♀️%3C/text%3E%3C/svg%3E',
    thumbnail: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%234B0082" width="200" height="200"/%3E%3Ctext x="100" y="120" font-size="60" text-anchor="middle"%3E🧙‍♀️%3C/text%3E%3C/svg%3E',
    faceRegion: { x: 140, y: 140, width: 120, height: 120 },
    colorTone: { hue: 280, saturation: 60, lightness: 40 }
  },
  {
    id: 'witch-02',
    name: 'Sorceress',
    category: 'witch',
    imagePath: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%23663399" width="400" height="400"/%3E%3Ccircle cx="200" cy="200" r="120" fill="%239370DB"/%3E%3Ctext x="200" y="220" font-size="80" text-anchor="middle" fill="%23fff"%3E🔮%3C/text%3E%3C/svg%3E',
    thumbnail: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23663399" width="200" height="200"/%3E%3Ctext x="100" y="120" font-size="60" text-anchor="middle"%3E🔮%3C/text%3E%3C/svg%3E',
    faceRegion: { x: 140, y: 140, width: 120, height: 120 },
    colorTone: { hue: 270, saturation: 50, lightness: 45 }
  },
  
  // Skull Category
  {
    id: 'skull-01',
    name: 'Death Head',
    category: 'skull',
    imagePath: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%23000000" width="400" height="400"/%3E%3Ccircle cx="200" cy="200" r="120" fill="%23333333"/%3E%3Ctext x="200" y="220" font-size="80" text-anchor="middle" fill="%23fff"%3E💀%3C/text%3E%3C/svg%3E',
    thumbnail: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23000000" width="200" height="200"/%3E%3Ctext x="100" y="120" font-size="60" text-anchor="middle"%3E💀%3C/text%3E%3C/svg%3E',
    faceRegion: { x: 140, y: 140, width: 120, height: 120 },
    colorTone: { hue: 0, saturation: 0, lightness: 20 }
  },
  {
    id: 'skull-02',
    name: 'Bone Collector',
    category: 'skull',
    imagePath: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%231C1C1C" width="400" height="400"/%3E%3Ccircle cx="200" cy="200" r="120" fill="%23404040"/%3E%3Ctext x="200" y="220" font-size="80" text-anchor="middle" fill="%23fff"%3E☠️%3C/text%3E%3C/svg%3E',
    thumbnail: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%231C1C1C" width="200" height="200"/%3E%3Ctext x="100" y="120" font-size="60" text-anchor="middle"%3E☠️%3C/text%3E%3C/svg%3E',
    faceRegion: { x: 140, y: 140, width: 120, height: 120 },
    colorTone: { hue: 0, saturation: 0, lightness: 25 }
  },
  
  // Anime Horror Category
  {
    id: 'anime-01',
    name: 'Yandere',
    category: 'anime-horror',
    imagePath: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%23FF1493" width="400" height="400"/%3E%3Ccircle cx="200" cy="200" r="120" fill="%23FF69B4"/%3E%3Ctext x="200" y="220" font-size="80" text-anchor="middle" fill="%23fff"%3E🔪%3C/text%3E%3C/svg%3E',
    thumbnail: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23FF1493" width="200" height="200"/%3E%3Ctext x="100" y="120" font-size="60" text-anchor="middle"%3E🔪%3C/text%3E%3C/svg%3E',
    faceRegion: { x: 140, y: 140, width: 120, height: 120 },
    colorTone: { hue: 330, saturation: 70, lightness: 50 }
  },
  {
    id: 'anime-02',
    name: 'Cursed Spirit',
    category: 'anime-horror',
    imagePath: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%23800080" width="400" height="400"/%3E%3Ccircle cx="200" cy="200" r="120" fill="%239932CC"/%3E%3Ctext x="200" y="220" font-size="80" text-anchor="middle" fill="%23fff"%3E👁️%3C/text%3E%3C/svg%3E',
    thumbnail: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23800080" width="200" height="200"/%3E%3Ctext x="100" y="120" font-size="60" text-anchor="middle"%3E👁️%3C/text%3E%3C/svg%3E',
    faceRegion: { x: 140, y: 140, width: 120, height: 120 },
    colorTone: { hue: 280, saturation: 60, lightness: 45 }
  },
  
  // Cyberpunk Category
  {
    id: 'cyber-01',
    name: 'Glitch Monster',
    category: 'cyberpunk',
    imagePath: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%2300FFFF" width="400" height="400"/%3E%3Ccircle cx="200" cy="200" r="120" fill="%2300CED1"/%3E%3Ctext x="200" y="220" font-size="80" text-anchor="middle" fill="%23000"%3E🤖%3C/text%3E%3C/svg%3E',
    thumbnail: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%2300FFFF" width="200" height="200"/%3E%3Ctext x="100" y="120" font-size="60" text-anchor="middle"%3E🤖%3C/text%3E%3C/svg%3E',
    faceRegion: { x: 140, y: 140, width: 120, height: 120 },
    colorTone: { hue: 180, saturation: 100, lightness: 50 }
  },
  {
    id: 'cyber-02',
    name: 'Neon Nightmare',
    category: 'cyberpunk',
    imagePath: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%23FF00FF" width="400" height="400"/%3E%3Ccircle cx="200" cy="200" r="120" fill="%23DA70D6"/%3E%3Ctext x="200" y="220" font-size="80" text-anchor="middle" fill="%23000"%3E⚡%3C/text%3E%3C/svg%3E',
    thumbnail: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23FF00FF" width="200" height="200"/%3E%3Ctext x="100" y="120" font-size="60" text-anchor="middle"%3E⚡%3C/text%3E%3C/svg%3E',
    faceRegion: { x: 140, y: 140, width: 120, height: 120 },
    colorTone: { hue: 300, saturation: 100, lightness: 50 }
  },
  
  // NFT Style Category
  {
    id: 'nft-01',
    name: 'Ape Horror',
    category: 'nft-style',
    imagePath: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%23FFD700" width="400" height="400"/%3E%3Ccircle cx="200" cy="200" r="120" fill="%23FFA500"/%3E%3Ctext x="200" y="220" font-size="80" text-anchor="middle" fill="%23000"%3E🦍%3C/text%3E%3C/svg%3E',
    thumbnail: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23FFD700" width="200" height="200"/%3E%3Ctext x="100" y="120" font-size="60" text-anchor="middle"%3E🦍%3C/text%3E%3C/svg%3E',
    faceRegion: { x: 140, y: 140, width: 120, height: 120 },
    colorTone: { hue: 45, saturation: 100, lightness: 50 }
  },
  {
    id: 'nft-02',
    name: 'Crypto Creature',
    category: 'nft-style',
    imagePath: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%2300FF00" width="400" height="400"/%3E%3Ccircle cx="200" cy="200" r="120" fill="%2332CD32"/%3E%3Ctext x="200" y="220" font-size="80" text-anchor="middle" fill="%23000"%3E👾%3C/text%3E%3C/svg%3E',
    thumbnail: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%2300FF00" width="200" height="200"/%3E%3Ctext x="100" y="120" font-size="60" text-anchor="middle"%3E👾%3C/text%3E%3C/svg%3E',
    faceRegion: { x: 140, y: 140, width: 120, height: 120 },
    colorTone: { hue: 120, saturation: 100, lightness: 50 }
  }
];

// Application Class
class App {
  constructor() {
    this.stateManager = null;
    this.imageProcessor = null;
    this.avatarBuilder = null;
    this.animationController = null;
    this.uiManager = null;
    this.layerManager = null;
    this.advancedTools = null;
    this.effectsManager = null;
    this.activeTool = null;
  }

  // Initialize application
  init() {
    console.log('🎃 Initializing NFT Avatar Zone with Advanced Features...');
    
    try {
      // Initialize modules
      this.stateManager = new StateManager();
      this.imageProcessor = new ImageProcessor();
      this.animationController = new AnimationController();
      this.layerManager = new LayerManager();
      this.effectsManager = new EffectsManager();
      
      const canvas = document.getElementById('previewCanvas');
      this.avatarBuilder = new AvatarBuilder(canvas);
      this.advancedTools = new AdvancedTools(canvas);
      
      this.uiManager = new UIManager(
        this.stateManager,
        this.avatarBuilder,
        this.animationController,
        this.imageProcessor
      );
      
      // Initialize advanced features
      this.initializeAdvancedTools();
      this.initializeEffects();
      this.initializeLayers();
      this.initializeHistory();
      
      // Start background animations
      this.animationController.startBackgroundAnimation();
      
      // Load saved sound preference
      if (this.stateManager.getState('soundEnabled')) {
        this.uiManager.playSound('ambient', true);
      }
      
      console.log('✅ Application initialized successfully with advanced features!');
    } catch (error) {
      console.error('❌ Failed to initialize application:', error);
    }
  }

  // Initialize advanced tools
  initializeAdvancedTools() {
    const tools = {
      'cropTool': () => this.activateTool('crop'),
      'removeBgTool': () => this.applyRemoveBackground(),
      'magicSelectTool': () => this.activateTool('magicSelect'),
      'eraserTool': () => this.activateTool('eraser'),
      'brushTool': () => this.activateTool('brush'),
      'sharpenTool': () => this.applyFilter('sharpen'),
      'blurTool': () => this.applyFilter('blur'),
      'glitchTool': () => this.applyFilter('glitch'),
      'cartoonTool': () => this.applyFilter('cartoon'),
      'flipHorizontal': () => this.flipImage('horizontal'),
      'flipVertical': () => this.flipImage('vertical'),
      'undoBtn': () => this.undo(),
      'redoBtn': () => this.redo(),
      'resetBtn': () => this.reset()
    };

    Object.entries(tools).forEach(([id, handler]) => {
      const btn = document.getElementById(id);
      if (btn) {
        btn.addEventListener('click', handler);
      }
    });
  }

  // Initialize effects
  initializeEffects() {
    // Effect buttons (compact version)
    document.querySelectorAll('.effect-btn-compact').forEach(btn => {
      btn.addEventListener('click', () => {
        const effect = btn.dataset.effect;
        this.applyEffect(effect);
      });
    });

    // Lighting buttons (compact version)
    document.querySelectorAll('.lighting-btn-compact').forEach(btn => {
      btn.addEventListener('click', () => {
        const lighting = btn.dataset.lighting;
        this.applyLighting(lighting);
      });
    });
  }

  // Initialize layers
  initializeLayers() {
    document.getElementById('addLayerBtn')?.addEventListener('click', () => {
      this.addLayer();
    });

    this.updateLayersPanel();
  }

  // Initialize history
  initializeHistory() {
    this.updateHistoryPanel();
  }

  // Activate tool
  activateTool(tool) {
    this.activeTool = tool;
    document.querySelectorAll('.tool-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`${tool}Tool`)?.classList.add('active');
    
    const canvas = document.getElementById('previewCanvas');
    canvas.classList.remove('tool-active', 'eraser-active', 'brush-active');
    
    if (tool === 'eraser') {
      canvas.classList.add('eraser-active');
    } else if (tool === 'brush') {
      canvas.classList.add('brush-active');
    } else {
      canvas.classList.add('tool-active');
    }
  }

  // Apply remove background
  applyRemoveBackground() {
    const canvas = document.getElementById('previewCanvas');
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    const processed = this.advancedTools.removeBackground(imageData);
    ctx.putImageData(processed, 0, 0);
    
    this.layerManager.saveHistory('Remove Background');
    this.updateHistoryPanel();
  }

  // Apply filter
  applyFilter(filterType) {
    const canvas = document.getElementById('previewCanvas');
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    let processed;
    switch (filterType) {
      case 'sharpen':
        processed = this.advancedTools.sharpen(imageData);
        break;
      case 'blur':
        processed = this.advancedTools.blur(imageData);
        break;
      case 'glitch':
        processed = this.advancedTools.glitchEffect(imageData);
        break;
      case 'cartoon':
        processed = this.effectsManager.cartoonify(imageData);
        break;
    }
    
    if (processed) {
      ctx.putImageData(processed, 0, 0);
      this.layerManager.saveHistory(`Apply ${filterType}`);
      this.updateHistoryPanel();
    }
  }

  // Apply effect
  applyEffect(effectType) {
    const canvas = document.getElementById('previewCanvas');
    const intensity = document.getElementById('glowIntensity')?.value / 100 || 0.5;
    
    this.effectsManager.applyOverlay(canvas, effectType, intensity);
    this.layerManager.saveHistory(`Apply ${effectType} effect`);
    this.updateHistoryPanel();
  }

  // Apply lighting
  applyLighting(lightingType) {
    const canvas = document.getElementById('previewCanvas');
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    const processed = this.effectsManager.applyLighting(imageData, lightingType, 0.5);
    ctx.putImageData(processed, 0, 0);
    
    this.layerManager.saveHistory(`Apply ${lightingType} lighting`);
    this.updateHistoryPanel();
  }

  // Flip image
  flipImage(direction) {
    const canvas = document.getElementById('previewCanvas');
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    const flipped = this.advancedTools.flipImage(imageData, direction);
    ctx.putImageData(flipped, 0, 0);
    
    this.layerManager.saveHistory(`Flip ${direction}`);
    this.updateHistoryPanel();
  }

  // Add layer
  addLayer() {
    const layer = this.layerManager.createLayer('New Layer');
    this.updateLayersPanel();
  }

  // Update layers panel
  updateLayersPanel() {
    const list = document.getElementById('layersList');
    if (!list) return;
    
    list.innerHTML = '';
    const layers = this.layerManager.getAllLayers();
    
    if (layers.length === 0) {
      list.innerHTML = '<div style="padding: 8px; text-align: center; color: var(--color-text-muted); font-size: 0.75rem;">No layers yet</div>';
      return;
    }
    
    layers.forEach(layer => {
      const item = document.createElement('div');
      item.className = 'history-item-compact';
      if (layer.id === this.layerManager.activeLayerId) {
        item.classList.add('active');
      }
      
      item.innerHTML = `
        ${layer.visible ? '👁️' : '🚫'} ${layer.name}
      `;
      
      item.addEventListener('click', () => {
        this.layerManager.setActiveLayer(layer.id);
        this.updateLayersPanel();
      });
      
      list.appendChild(item);
    });
  }

  // Update history panel
  updateHistoryPanel() {
    const list = document.getElementById('historyList');
    if (!list) return;
    
    list.innerHTML = '';
    const history = this.layerManager.history;
    
    if (history.length === 0) {
      list.innerHTML = '<div style="padding: 8px; text-align: center; color: var(--color-text-muted); font-size: 0.75rem;">No history yet</div>';
      return;
    }
    
    // Show last 5 history items
    const recentHistory = history.slice(-5).reverse();
    
    recentHistory.forEach((item, index) => {
      const historyItem = document.createElement('div');
      historyItem.className = 'history-item-compact';
      const actualIndex = history.length - 1 - index;
      if (actualIndex === this.layerManager.historyIndex) {
        historyItem.classList.add('active');
      }
      
      historyItem.innerHTML = `${item.action}`;
      historyItem.title = new Date(item.timestamp).toLocaleTimeString();
      
      list.appendChild(historyItem);
    });
  }

  // Undo
  undo() {
    if (this.layerManager.undo()) {
      this.updateHistoryPanel();
      this.updateLayersPanel();
    }
  }

  // Redo
  redo() {
    if (this.layerManager.redo()) {
      this.updateHistoryPanel();
      this.updateLayersPanel();
    }
  }

  // Reset
  reset() {
    if (confirm('Reset all changes? This cannot be undone.')) {
      this.layerManager.clearAll();
      this.avatarBuilder.clear();
      this.updateHistoryPanel();
      this.updateLayersPanel();
    }
  }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.init();
  });
} else {
  const app = new App();
  app.init();
}
