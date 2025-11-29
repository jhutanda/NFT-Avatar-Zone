// UI Manager - Handles all DOM manipulation and user interactions
class UIManager {
  constructor(stateManager, avatarBuilder, animationController, imageProcessor) {
    this.state = stateManager;
    this.builder = avatarBuilder;
    this.animator = animationController;
    this.processor = imageProcessor;
    
    this.elements = {};
    this.debounceTimers = {};
    
    this.initializeElements();
    this.initializeUploadArea();
    this.initializeControls();
    this.initializeCharacterSelector();
    this.initializeActionButtons();
    this.initializeModals();
    this.initializeSound();
  }

  // Initialize DOM element references
  initializeElements() {
    this.elements = {
      uploadArea: document.getElementById('uploadArea'),
      fileInput: document.getElementById('fileInput'),
      canvas: document.getElementById('previewCanvas'),
      loadingIndicator: document.getElementById('loadingIndicator'),
      characterGrid: document.getElementById('characterGrid'),
      categoryBtns: document.querySelectorAll('.category-btn'),
      zoomSlider: document.getElementById('zoomSlider'),
      rotationSlider: document.getElementById('rotationSlider'),
      positionX: document.getElementById('positionX'),
      positionY: document.getElementById('positionY'),
      brightnessSlider: document.getElementById('brightnessSlider'),
      contrastSlider: document.getElementById('contrastSlider'),
      saturationSlider: document.getElementById('saturationSlider'),
      downloadBtn: document.getElementById('downloadBtn'),
      shareBtn: document.getElementById('shareBtn'),
      mintBtn: document.getElementById('mintBtn'),
      soundToggle: document.getElementById('soundToggle'),
      notificationContainer: document.getElementById('notificationContainer'),
      shareModal: document.getElementById('shareModal'),
      mintModal: document.getElementById('mintModal')
    };
  }

  // Initialize upload area with drag & drop
  initializeUploadArea() {
    const { uploadArea, fileInput } = this.elements;

    // Click to upload
    uploadArea.addEventListener('click', () => {
      fileInput.click();
    });

    // File input change
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        this.handleFileUpload(file);
      }
    });

    // Drag and drop
    uploadArea.addEventListener('dragover', (e) => {
      e.preventDefault();
      uploadArea.classList.add('drag-over');
    });

    uploadArea.addEventListener('dragleave', () => {
      uploadArea.classList.remove('drag-over');
    });

    uploadArea.addEventListener('drop', (e) => {
      e.preventDefault();
      uploadArea.classList.remove('drag-over');
      
      const file = e.dataTransfer.files[0];
      if (file) {
        this.handleFileUpload(file);
      }
    });
  }

  // Handle file upload
  async handleFileUpload(file) {
    this.showLoading(true);
    
    try {
      const image = await this.processor.loadImage(file);
      this.state.setState('userImage', image);
      this.builder.setUserImage(image);
      
      // If template is selected, render immediately
      if (this.state.getState('selectedTemplate')) {
        this.builder.renderToCanvas();
      } else {
        // Just show the uploaded image
        const ctx = this.elements.canvas.getContext('2d');
        this.elements.canvas.width = 600;
        this.elements.canvas.height = 600;
        ctx.clearRect(0, 0, 600, 600);
        
        const scale = Math.min(600 / image.width, 600 / image.height);
        const x = (600 - image.width * scale) / 2;
        const y = (600 - image.height * scale) / 2;
        ctx.drawImage(image, x, y, image.width * scale, image.height * scale);
      }
      
      this.updateButtonStates();
      this.showNotification('Image uploaded successfully!', 'success');
      this.playSound('click');
    } catch (error) {
      this.handleError(error);
    } finally {
      this.showLoading(false);
    }
  }

  // Initialize control sliders
  initializeControls() {
    const controls = [
      { slider: this.elements.zoomSlider, value: 'zoomValue', state: 'transforms.zoom', suffix: 'x' },
      { slider: this.elements.rotationSlider, value: 'rotationValue', state: 'transforms.rotation', suffix: '°' },
      { slider: this.elements.positionX, value: 'positionXValue', state: 'transforms.position.x', suffix: '' },
      { slider: this.elements.positionY, value: 'positionYValue', state: 'transforms.position.y', suffix: '' },
      { slider: this.elements.brightnessSlider, value: 'brightnessValue', state: 'filters.brightness', suffix: '%' },
      { slider: this.elements.contrastSlider, value: 'contrastValue', state: 'filters.contrast', suffix: '%' },
      { slider: this.elements.saturationSlider, value: 'saturationValue', state: 'filters.saturation', suffix: '%' }
    ];

    controls.forEach(({ slider, value, state, suffix }) => {
      if (!slider) return;
      
      slider.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value);
        document.getElementById(value).textContent = val + suffix;
        
        // Update state
        if (state.includes('position')) {
          const pos = this.state.getState('transforms.position');
          if (state.includes('.x')) {
            this.state.setState('transforms.position', { ...pos, x: val });
          } else {
            this.state.setState('transforms.position', { ...pos, y: val });
          }
        } else {
          this.state.setState(state, val);
        }
        
        // Debounced render
        this.debouncedRender();
      });
    });
  }

  // Debounced render for performance
  debouncedRender() {
    clearTimeout(this.debounceTimers.render);
    this.debounceTimers.render = setTimeout(() => {
      this.renderAvatar();
    }, 50);
  }

  // Render avatar with current settings
  renderAvatar() {
    if (!this.builder.isReady()) return;
    
    const transforms = this.state.getState('transforms');
    this.builder.applyTransform(
      transforms.zoom,
      transforms.rotation,
      transforms.position
    );
    
    this.builder.renderToCanvas();
  }

  // Initialize character selector
  initializeCharacterSelector() {
    this.renderCharacterGrid();
    
    // Category filter buttons
    this.elements.categoryBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.elements.categoryBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const category = btn.dataset.category;
        this.state.setState('currentCategory', category);
        this.renderCharacterGrid(category);
        this.playSound('click');
      });
    });
  }

  // Render character grid
  renderCharacterGrid(category = 'all') {
    const grid = this.elements.characterGrid;
    grid.innerHTML = '';
    
    const templates = this.getCharacterTemplates();
    const filtered = category === 'all' 
      ? templates 
      : templates.filter(t => t.category === category);
    
    filtered.forEach(template => {
      const card = this.createCharacterCard(template);
      grid.appendChild(card);
    });
  }

  // Create character card element
  createCharacterCard(template) {
    const card = document.createElement('div');
    card.className = 'character-card';
    card.dataset.templateId = template.id;
    
    const img = document.createElement('img');
    img.className = 'character-image';
    img.src = template.thumbnail || template.imagePath;
    img.alt = template.name;
    
    const name = document.createElement('div');
    name.className = 'character-name';
    name.textContent = template.name;
    
    card.appendChild(img);
    card.appendChild(name);
    
    card.addEventListener('click', () => {
      this.selectCharacter(template, card);
    });
    
    return card;
  }

  // Select character template
  async selectCharacter(template, cardElement) {
    this.showLoading(true);
    
    try {
      await this.builder.loadTemplate(template);
      this.state.setState('selectedTemplate', template);
      
      // Update UI
      document.querySelectorAll('.character-card').forEach(c => c.classList.remove('selected'));
      cardElement.classList.add('selected');
      this.animator.triggerSelectionEffect(cardElement);
      
      // Render if user image exists
      if (this.state.getState('userImage')) {
        this.renderAvatar();
      }
      
      this.updateButtonStates();
      this.showNotification(`${template.name} selected!`, 'success');
      this.playSound('click');
    } catch (error) {
      this.handleError(error);
    } finally {
      this.showLoading(false);
    }
  }

  // Initialize action buttons
  initializeActionButtons() {
    this.elements.downloadBtn.addEventListener('click', () => {
      this.handleDownload();
    });
    
    this.elements.shareBtn.addEventListener('click', () => {
      this.showShareModal();
    });
    
    this.elements.mintBtn.addEventListener('click', () => {
      this.handleMint();
    });
  }

  // Handle download
  handleDownload() {
    if (!this.builder.isReady()) return;
    
    try {
      const success = this.builder.downloadImage();
      if (success) {
        this.showNotification('Avatar downloaded successfully!', 'success');
        this.playSound('success');
      } else {
        throw new Error('EXPORT_FAILED');
      }
    } catch (error) {
      this.handleError(error);
    }
  }

  // Initialize modals
  initializeModals() {
    // Close buttons
    document.querySelectorAll('.modal-close').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.target.closest('.modal').classList.add('hidden');
      });
    });
    
    // Click outside to close
    document.querySelectorAll('.modal').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.add('hidden');
        }
      });
    });
    
    // Share buttons
    document.querySelectorAll('.share-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.handleShare(btn.dataset.platform);
      });
    });
  }

  // Show share modal
  showShareModal() {
    this.elements.shareModal.classList.remove('hidden');
  }

  // Handle share
  async handleShare(platform) {
    try {
      const blob = await this.builder.getBlob();
      
      if (platform === 'download') {
        this.handleDownload();
        return;
      }
      
      if (platform === 'copy') {
        // Copy image to clipboard
        try {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob })
          ]);
          this.showNotification('Image copied to clipboard!', 'success');
        } catch {
          this.showNotification('Clipboard not supported. Use download instead.', 'info');
        }
        return;
      }
      
      // Web Share API
      if (navigator.share) {
        const file = new File([blob], 'nft-avatar.png', { type: 'image/png' });
        await navigator.share({
          files: [file],
          title: 'My NFT Avatar',
          text: 'Check out my spooky avatar!'
        });
        this.showNotification('Shared successfully!', 'success');
      } else {
        this.showNotification('Sharing not supported. Use download instead.', 'info');
      }
      
      this.elements.shareModal.classList.add('hidden');
      this.playSound('success');
    } catch (error) {
      if (error.name !== 'AbortError') {
        this.handleError(error);
      }
    }
  }

  // Handle NFT mint
  async handleMint() {
    if (!this.builder.isReady()) return;
    
    const minter = new NFTMinter();
    minter.init(this.elements.mintModal);
    
    try {
      const imageData = this.builder.exportImage();
      await minter.completeMintFlow(imageData);
      this.playSound('success');
    } catch (error) {
      this.handleError(error);
    }
  }

  // Initialize sound
  initializeSound() {
    const soundEnabled = this.state.getState('soundEnabled');
    this.updateSoundUI(soundEnabled);
    
    this.elements.soundToggle.addEventListener('click', () => {
      const enabled = !this.state.getState('soundEnabled');
      this.state.setState('soundEnabled', enabled);
      this.state.savePreferences();
      this.updateSoundUI(enabled);
      
      if (enabled) {
        this.playSound('ambient', true);
      } else {
        this.stopSound('ambient');
      }
    });
  }

  // Update sound UI
  updateSoundUI(enabled) {
    if (enabled) {
      this.elements.soundToggle.classList.add('active');
    } else {
      this.elements.soundToggle.classList.remove('active');
    }
  }

  // Play sound
  playSound(type, loop = false) {
    if (!this.state.getState('soundEnabled')) return;
    
    const soundMap = {
      ambient: 'ambientMusic',
      click: 'clickSound',
      success: 'successSound'
    };
    
    const audio = document.getElementById(soundMap[type]);
    if (audio) {
      audio.loop = loop;
      audio.play().catch(() => {});
    }
  }

  // Stop sound
  stopSound(type) {
    const soundMap = {
      ambient: 'ambientMusic',
      click: 'clickSound',
      success: 'successSound'
    };
    
    const audio = document.getElementById(soundMap[type]);
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  }

  // Show/hide loading indicator
  showLoading(show) {
    if (show) {
      this.elements.loadingIndicator.classList.remove('hidden');
    } else {
      this.elements.loadingIndicator.classList.add('hidden');
    }
  }

  // Update button states
  updateButtonStates() {
    const ready = this.builder.isReady();
    this.elements.downloadBtn.disabled = !ready;
    this.elements.shareBtn.disabled = !ready;
    this.elements.mintBtn.disabled = !ready;
  }

  // Show notification
  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    this.elements.notificationContainer.appendChild(notification);
    
    setTimeout(() => {
      notification.style.opacity = '0';
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  }

  // Handle errors
  handleError(error) {
    const messages = {
      'INVALID_FILE_TYPE': 'Please upload a valid image file (JPG, PNG, or WEBP)',
      'FILE_TOO_LARGE': 'Image file is too large. Please use an image under 10MB',
      'INVALID_IMAGE': 'Unable to load image. Please try a different file',
      'TEMPLATE_NOT_FOUND': 'Character template could not be loaded',
      'EXPORT_FAILED': 'Unable to export image. Please try again'
    };
    
    const message = messages[error.message] || 'An error occurred. Please try again';
    this.showNotification(message, 'error');
    this.animator.shake(this.elements.notificationContainer);
  }

  // Get character templates (placeholder data)
  getCharacterTemplates() {
    return window.CHARACTER_TEMPLATES || [];
  }
}

// Export for use in other modules
if (typeof window !== 'undefined') {
  window.UIManager = UIManager;
}
