// State Manager - Manages application state and persistence
class StateManager {
  constructor() {
    this.state = {
      userImage: null,
      selectedTemplate: null,
      currentCategory: 'all',
      transforms: {
        zoom: 1.0,
        rotation: 0,
        position: { x: 0, y: 0 }
      },
      filters: {
        brightness: 100,
        contrast: 100,
        saturation: 100
      },
      soundEnabled: false,
      isProcessing: false
    };
    
    this.observers = [];
    this.loadPreferences();
  }

  // Set state value and notify observers
  setState(key, value) {
    if (key.includes('.')) {
      // Handle nested keys like 'transforms.zoom'
      const keys = key.split('.');
      let current = this.state;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
    } else {
      this.state[key] = value;
    }
    
    this.notifyObservers(key, value);
  }

  // Get state value
  getState(key) {
    if (key.includes('.')) {
      const keys = key.split('.');
      let current = this.state;
      for (const k of keys) {
        current = current[k];
      }
      return current;
    }
    return this.state[key];
  }

  // Subscribe to state changes
  subscribe(callback) {
    this.observers.push(callback);
  }

  // Notify all observers of state change
  notifyObservers(key, value) {
    this.observers.forEach(callback => callback(key, value));
  }

  // Save user preferences to localStorage
  savePreferences() {
    const preferences = {
      soundEnabled: this.state.soundEnabled,
      lastCategory: this.state.currentCategory
    };
    
    try {
      localStorage.setItem('nft-avatar-zone-prefs', JSON.stringify(preferences));
    } catch (error) {
      console.error('Failed to save preferences:', error);
    }
  }

  // Load user preferences from localStorage
  loadPreferences() {
    try {
      const saved = localStorage.getItem('nft-avatar-zone-prefs');
      if (saved) {
        const preferences = JSON.parse(saved);
        this.state.soundEnabled = preferences.soundEnabled || false;
        this.state.currentCategory = preferences.lastCategory || 'all';
      }
    } catch (error) {
      console.error('Failed to load preferences:', error);
    }
  }

  // Reset state to defaults
  resetState() {
    this.state.transforms = {
      zoom: 1.0,
      rotation: 0,
      position: { x: 0, y: 0 }
    };
    this.state.filters = {
      brightness: 100,
      contrast: 100,
      saturation: 100
    };
    this.notifyObservers('reset', null);
  }

  // Get complete state snapshot
  getSnapshot() {
    return JSON.parse(JSON.stringify(this.state));
  }
}

// Export for use in other modules
if (typeof window !== 'undefined') {
  window.StateManager = StateManager;
}
