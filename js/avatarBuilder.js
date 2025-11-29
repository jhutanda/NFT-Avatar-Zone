// Avatar Builder - Core logic for merging user face with character templates
class AvatarBuilder {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.userImage = null;
    this.template = null;
    this.templateData = null;
    this.transforms = {
      zoom: 1.0,
      rotation: 0,
      position: { x: 0, y: 0 }
    };
  }

  // Load character template
  async loadTemplate(templateData) {
    return new Promise((resolve, reject) => {
      this.templateData = templateData;
      const img = new Image();
      
      img.onload = () => {
        this.template = img;
        resolve(img);
      };
      
      img.onerror = () => {
        reject(new Error('TEMPLATE_NOT_FOUND'));
      };
      
      img.src = templateData.imagePath;
    });
  }

  // Set user image
  setUserImage(image) {
    this.userImage = image;
  }

  // Apply transform values
  applyTransform(zoom, rotation, position) {
    this.transforms = { zoom, rotation, position };
  }

  // Merge user image with template
  mergeImages(userImage, template, transforms) {
    if (!userImage || !template) {
      return;
    }

    const { zoom, rotation, position } = transforms;
    const faceRegion = this.templateData.faceRegion;

    // Set canvas size to template size
    this.canvas.width = template.width;
    this.canvas.height = template.height;

    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw template first (background)
    this.ctx.drawImage(template, 0, 0);

    // Save context state
    this.ctx.save();

    // Calculate face position and size
    const faceX = faceRegion.x + position.x;
    const faceY = faceRegion.y + position.y;
    const faceWidth = faceRegion.width * zoom;
    const faceHeight = faceRegion.height * zoom;

    // Move to center of face region for rotation
    this.ctx.translate(faceX + faceWidth / 2, faceY + faceHeight / 2);
    this.ctx.rotate((rotation * Math.PI) / 180);
    this.ctx.translate(-(faceX + faceWidth / 2), -(faceY + faceHeight / 2));

    // Draw user image in face region
    this.ctx.drawImage(
      userImage,
      faceX,
      faceY,
      faceWidth,
      faceHeight
    );

    // Restore context state
    this.ctx.restore();
  }

  // Render to canvas with current settings
  renderToCanvas() {
    if (!this.userImage || !this.template) {
      return;
    }

    this.mergeImages(this.userImage, this.template, this.transforms);
  }

  // Export canvas as image
  exportImage(format = 'image/png', quality = 1.0) {
    if (!this.canvas) {
      throw new Error('EXPORT_FAILED');
    }

    try {
      return this.canvas.toDataURL(format, quality);
    } catch (error) {
      throw new Error('EXPORT_FAILED');
    }
  }

  // Export and trigger download
  downloadImage(filename) {
    try {
      const dataURL = this.exportImage();
      const link = document.createElement('a');
      link.download = filename || `nft-avatar-${Date.now()}.png`;
      link.href = dataURL;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return true;
    } catch (error) {
      console.error('Download failed:', error);
      return false;
    }
  }

  // Get canvas blob for sharing
  async getBlob(type = 'image/png', quality = 0.95) {
    return new Promise((resolve, reject) => {
      this.canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('EXPORT_FAILED'));
          }
        },
        type,
        quality
      );
    });
  }

  // Clear canvas
  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  // Check if avatar is ready
  isReady() {
    return this.userImage !== null && this.template !== null;
  }
}

// Export for use in other modules
if (typeof window !== 'undefined') {
  window.AvatarBuilder = AvatarBuilder;
}
