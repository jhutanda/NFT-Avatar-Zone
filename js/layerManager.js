// Layer Manager - Photoshop-style layer system
class LayerManager {
  constructor() {
    this.layers = [];
    this.activeLayerId = null;
    this.nextLayerId = 1;
    this.history = [];
    this.historyIndex = -1;
    this.maxHistory = 50;
  }

  // Create new layer
  createLayer(name, type = 'image', data = null) {
    const layer = {
      id: this.nextLayerId++,
      name: name || `Layer ${this.nextLayerId}`,
      type: type, // 'image', 'effect', 'text', 'shape'
      visible: true,
      opacity: 100,
      blendMode: 'normal',
      data: data,
      canvas: document.createElement('canvas'),
      locked: false,
      position: { x: 0, y: 0 },
      scale: 1,
      rotation: 0
    };
    
    this.layers.push(layer);
    this.activeLayerId = layer.id;
    this.saveHistory('Create Layer');
    return layer;
  }

  // Get layer by ID
  getLayer(id) {
    return this.layers.find(l => l.id === id);
  }

  // Get active layer
  getActiveLayer() {
    return this.getLayer(this.activeLayerId);
  }

  // Set active layer
  setActiveLayer(id) {
    if (this.getLayer(id)) {
      this.activeLayerId = id;
    }
  }

  // Delete layer
  deleteLayer(id) {
    const index = this.layers.findIndex(l => l.id === id);
    if (index !== -1) {
      this.layers.splice(index, 1);
      if (this.activeLayerId === id && this.layers.length > 0) {
        this.activeLayerId = this.layers[0].id;
      }
      this.saveHistory('Delete Layer');
    }
  }

  // Duplicate layer
  duplicateLayer(id) {
    const layer = this.getLayer(id);
    if (layer) {
      const newLayer = JSON.parse(JSON.stringify(layer));
      newLayer.id = this.nextLayerId++;
      newLayer.name = `${layer.name} copy`;
      
      // Clone canvas
      newLayer.canvas = document.createElement('canvas');
      newLayer.canvas.width = layer.canvas.width;
      newLayer.canvas.height = layer.canvas.height;
      const ctx = newLayer.canvas.getContext('2d');
      ctx.drawImage(layer.canvas, 0, 0);
      
      this.layers.push(newLayer);
      this.saveHistory('Duplicate Layer');
      return newLayer;
    }
  }

  // Move layer
  moveLayer(id, direction) {
    const index = this.layers.findIndex(l => l.id === id);
    if (index === -1) return;
    
    const newIndex = direction === 'up' ? index + 1 : index - 1;
    if (newIndex >= 0 && newIndex < this.layers.length) {
      [this.layers[index], this.layers[newIndex]] = [this.layers[newIndex], this.layers[index]];
      this.saveHistory('Move Layer');
    }
  }

  // Toggle layer visibility
  toggleVisibility(id) {
    const layer = this.getLayer(id);
    if (layer) {
      layer.visible = !layer.visible;
    }
  }

  // Set layer opacity
  setOpacity(id, opacity) {
    const layer = this.getLayer(id);
    if (layer) {
      layer.opacity = Math.max(0, Math.min(100, opacity));
    }
  }

  // Set blend mode
  setBlendMode(id, mode) {
    const layer = this.getLayer(id);
    if (layer) {
      layer.blendMode = mode;
    }
  }

  // Merge layers
  mergeLayers(id1, id2) {
    const layer1 = this.getLayer(id1);
    const layer2 = this.getLayer(id2);
    
    if (layer1 && layer2) {
      const canvas = document.createElement('canvas');
      canvas.width = Math.max(layer1.canvas.width, layer2.canvas.width);
      canvas.height = Math.max(layer1.canvas.height, layer2.canvas.height);
      const ctx = canvas.getContext('2d');
      
      ctx.globalAlpha = layer1.opacity / 100;
      ctx.drawImage(layer1.canvas, 0, 0);
      ctx.globalAlpha = layer2.opacity / 100;
      ctx.drawImage(layer2.canvas, 0, 0);
      
      layer1.canvas = canvas;
      this.deleteLayer(id2);
      this.saveHistory('Merge Layers');
    }
  }

  // Flatten all layers
  flattenLayers() {
    if (this.layers.length === 0) return null;
    
    const canvas = document.createElement('canvas');
    canvas.width = this.layers[0].canvas.width;
    canvas.height = this.layers[0].canvas.height;
    const ctx = canvas.getContext('2d');
    
    this.layers.forEach(layer => {
      if (layer.visible) {
        ctx.globalAlpha = layer.opacity / 100;
        ctx.globalCompositeOperation = layer.blendMode;
        ctx.drawImage(layer.canvas, layer.position.x, layer.position.y);
      }
    });
    
    return canvas;
  }

  // Save history state
  saveHistory(action) {
    // Remove future history if we're not at the end
    if (this.historyIndex < this.history.length - 1) {
      this.history = this.history.slice(0, this.historyIndex + 1);
    }
    
    // Save current state
    const state = {
      action: action,
      timestamp: Date.now(),
      layers: JSON.parse(JSON.stringify(this.layers.map(l => ({
        id: l.id,
        name: l.name,
        type: l.type,
        visible: l.visible,
        opacity: l.opacity,
        blendMode: l.blendMode,
        locked: l.locked,
        position: l.position,
        scale: l.scale,
        rotation: l.rotation
      }))))
    };
    
    this.history.push(state);
    this.historyIndex++;
    
    // Limit history size
    if (this.history.length > this.maxHistory) {
      this.history.shift();
      this.historyIndex--;
    }
  }

  // Undo
  undo() {
    if (this.historyIndex > 0) {
      this.historyIndex--;
      this.restoreState(this.history[this.historyIndex]);
      return true;
    }
    return false;
  }

  // Redo
  redo() {
    if (this.historyIndex < this.history.length - 1) {
      this.historyIndex++;
      this.restoreState(this.history[this.historyIndex]);
      return true;
    }
    return false;
  }

  // Restore state
  restoreState(state) {
    // Restore layer properties (canvas data would need separate handling)
    state.layers.forEach(savedLayer => {
      const layer = this.getLayer(savedLayer.id);
      if (layer) {
        Object.assign(layer, savedLayer);
      }
    });
  }

  // Get all layers
  getAllLayers() {
    return [...this.layers];
  }

  // Clear all layers
  clearAll() {
    this.layers = [];
    this.activeLayerId = null;
    this.history = [];
    this.historyIndex = -1;
  }
}

if (typeof window !== 'undefined') {
  window.LayerManager = LayerManager;
}
