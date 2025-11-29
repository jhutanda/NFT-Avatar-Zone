// Image Processor - Handles image loading and manipulation
class ImageProcessor {
  constructor() {
    this.validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    this.maxFileSize = 10 * 1024 * 1024; // 10MB
  }

  // Load and validate image file
  async loadImage(file) {
    return new Promise((resolve, reject) => {
      // Validate file type
      if (!this.validTypes.includes(file.type)) {
        reject(new Error('INVALID_FILE_TYPE'));
        return;
      }

      // Validate file size
      if (file.size > this.maxFileSize) {
        reject(new Error('FILE_TOO_LARGE'));
        return;
      }

      const reader = new FileReader();
      
      reader.onload = (e) => {
        const img = new Image();
        
        img.onload = () => {
          resolve(img);
        };
        
        img.onerror = () => {
          reject(new Error('INVALID_IMAGE'));
        };
        
        img.src = e.target.result;
      };
      
      reader.onerror = () => {
        reject(new Error('FILE_READ_ERROR'));
      };
      
      reader.readAsDataURL(file);
    });
  }

  // Get image data from canvas or image element
  getImageData(source, canvas) {
    const ctx = canvas.getContext('2d');
    
    if (source instanceof HTMLImageElement) {
      canvas.width = source.width;
      canvas.height = source.height;
      ctx.drawImage(source, 0, 0);
    }
    
    return ctx.getImageData(0, 0, canvas.width, canvas.height);
  }

  // Detect face bounds (simplified algorithm)
  detectFaceBounds(imageData) {
    // Simplified face detection using brightness analysis
    // In a real app, you'd use TensorFlow.js or similar
    const { width, height, data } = imageData;
    
    let minX = width, minY = height, maxX = 0, maxY = 0;
    let foundPixels = 0;
    
    // Scan for skin-tone-like pixels (simplified)
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const i = (y * width + x) * 4;
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        
        // Simple skin tone detection
        if (r > 95 && g > 40 && b > 20 &&
            r > g && r > b &&
            Math.abs(r - g) > 15) {
          minX = Math.min(minX, x);
          minY = Math.min(minY, y);
          maxX = Math.max(maxX, x);
          maxY = Math.max(maxY, y);
          foundPixels++;
        }
      }
    }
    
    // If no face detected, return center region
    if (foundPixels < 100) {
      return {
        x: width * 0.25,
        y: height * 0.2,
        width: width * 0.5,
        height: height * 0.6
      };
    }
    
    // Add padding
    const padding = 20;
    return {
      x: Math.max(0, minX - padding),
      y: Math.max(0, minY - padding),
      width: Math.min(width, maxX - minX + padding * 2),
      height: Math.min(height, maxY - minY + padding * 2)
    };
  }

  // Remove or blur background (simplified)
  removeBackground(imageData) {
    const { width, height, data } = imageData;
    const output = new ImageData(width, height);
    
    // Simple edge detection for foreground/background separation
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];
      
      // Calculate brightness
      const brightness = (r + g + b) / 3;
      
      // Simple threshold-based separation
      // In production, use more sophisticated algorithms
      const alpha = brightness > 50 ? a : a * 0.3;
      
      output.data[i] = r;
      output.data[i + 1] = g;
      output.data[i + 2] = b;
      output.data[i + 3] = alpha;
    }
    
    return output;
  }

  // Adjust color tone to match template
  adjustColorTone(imageData, targetTone) {
    const { width, height, data } = imageData;
    const output = new ImageData(width, height);
    
    const hueShift = (targetTone.hue || 0) / 360;
    const satMult = (targetTone.saturation || 100) / 100;
    const lightMult = (targetTone.lightness || 100) / 100;
    
    for (let i = 0; i < data.length; i += 4) {
      let r = data[i];
      let g = data[i + 1];
      let b = data[i + 2];
      const a = data[i + 3];
      
      // Convert to HSL
      const hsl = this.rgbToHsl(r, g, b);
      
      // Apply adjustments
      hsl[0] = (hsl[0] + hueShift) % 1;
      hsl[1] = Math.min(1, hsl[1] * satMult);
      hsl[2] = Math.min(1, hsl[2] * lightMult);
      
      // Convert back to RGB
      const rgb = this.hslToRgb(hsl[0], hsl[1], hsl[2]);
      
      output.data[i] = rgb[0];
      output.data[i + 1] = rgb[1];
      output.data[i + 2] = rgb[2];
      output.data[i + 3] = a;
    }
    
    return output;
  }

  // Apply filter effects
  applyFilter(imageData, filters) {
    const { width, height, data } = imageData;
    const output = new ImageData(width, height);
    
    const brightMult = filters.brightness / 100;
    const contrastMult = filters.contrast / 100;
    const satMult = filters.saturation / 100;
    
    for (let i = 0; i < data.length; i += 4) {
      let r = data[i];
      let g = data[i + 1];
      let b = data[i + 2];
      const a = data[i + 3];
      
      // Apply brightness
      r *= brightMult;
      g *= brightMult;
      b *= brightMult;
      
      // Apply contrast
      r = ((r / 255 - 0.5) * contrastMult + 0.5) * 255;
      g = ((g / 255 - 0.5) * contrastMult + 0.5) * 255;
      b = ((b / 255 - 0.5) * contrastMult + 0.5) * 255;
      
      // Apply saturation
      const gray = 0.2989 * r + 0.5870 * g + 0.1140 * b;
      r = gray + (r - gray) * satMult;
      g = gray + (g - gray) * satMult;
      b = gray + (b - gray) * satMult;
      
      // Clamp values
      output.data[i] = Math.max(0, Math.min(255, r));
      output.data[i + 1] = Math.max(0, Math.min(255, g));
      output.data[i + 2] = Math.max(0, Math.min(255, b));
      output.data[i + 3] = a;
    }
    
    return output;
  }

  // RGB to HSL conversion
  rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    
    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }
    
    return [h, s, l];
  }

  // HSL to RGB conversion
  hslToRgb(h, s, l) {
    let r, g, b;
    
    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };
      
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }
    
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
  }
}

// Export for use in other modules
if (typeof window !== 'undefined') {
  window.ImageProcessor = ImageProcessor;
}
