// Effects Manager - Overlay effects and filters
class EffectsManager {
  constructor() {
    this.effects = {
      smoke: this.createSmokeEffect,
      fog: this.createFogEffect,
      blood: this.createBloodEffect,
      glitch: this.createGlitchEffect,
      lightning: this.createLightningEffect,
      particles: this.createParticlesEffect
    };
  }

  // Apply overlay effect
  applyOverlay(canvas, effectType, intensity = 0.5) {
    const ctx = canvas.getContext('2d');
    const effect = this.effects[effectType];
    
    if (effect) {
      const overlay = effect.call(this, canvas.width, canvas.height, intensity);
      ctx.globalAlpha = intensity;
      ctx.drawImage(overlay, 0, 0);
      ctx.globalAlpha = 1;
    }
  }

  // Create smoke effect
  createSmokeEffect(width, height, intensity) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    
    const particles = Math.floor(50 * intensity);
    
    for (let i = 0; i < particles; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const radius = Math.random() * 50 + 20;
      
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, `rgba(200, 200, 200, ${0.3 * intensity})`);
      gradient.addColorStop(0.5, `rgba(150, 150, 150, ${0.15 * intensity})`);
      gradient.addColorStop(1, 'rgba(100, 100, 100, 0)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
    }
    
    return canvas;
  }

  // Create fog effect
  createFogEffect(width, height, intensity) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, 'rgba(180, 180, 200, 0)');
    gradient.addColorStop(0.5, `rgba(180, 180, 200, ${0.2 * intensity})`);
    gradient.addColorStop(1, `rgba(150, 150, 180, ${0.4 * intensity})`);
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    return canvas;
  }

  // Create blood effect
  createBloodEffect(width, height, intensity) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    
    const drips = Math.floor(10 * intensity);
    
    for (let i = 0; i < drips; i++) {
      const x = Math.random() * width;
      const startY = Math.random() * height * 0.3;
      const length = Math.random() * height * 0.5 + 50;
      
      const gradient = ctx.createLinearGradient(x, startY, x, startY + length);
      gradient.addColorStop(0, `rgba(139, 0, 0, ${0.8 * intensity})`);
      gradient.addColorStop(0.5, `rgba(100, 0, 0, ${0.5 * intensity})`);
      gradient.addColorStop(1, 'rgba(80, 0, 0, 0)');
      
      ctx.strokeStyle = gradient;
      ctx.lineWidth = Math.random() * 3 + 1;
      ctx.beginPath();
      ctx.moveTo(x, startY);
      
      // Create drip path
      let currentY = startY;
      while (currentY < startY + length) {
        currentY += Math.random() * 10 + 5;
        const offsetX = (Math.random() - 0.5) * 5;
        ctx.lineTo(x + offsetX, currentY);
      }
      
      ctx.stroke();
    }
    
    return canvas;
  }

  // Create glitch effect overlay
  createGlitchEffect(width, height, intensity) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    
    const lines = Math.floor(20 * intensity);
    
    for (let i = 0; i < lines; i++) {
      const y = Math.random() * height;
      const lineHeight = Math.random() * 5 + 1;
      const color = Math.random() > 0.5 ? 
        `rgba(0, 255, 255, ${0.3 * intensity})` : 
        `rgba(255, 0, 255, ${0.3 * intensity})`;
      
      ctx.fillStyle = color;
      ctx.fillRect(0, y, width, lineHeight);
    }
    
    return canvas;
  }

  // Create lightning effect
  createLightningEffect(width, height, intensity) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    
    const bolts = Math.floor(3 * intensity);
    
    for (let i = 0; i < bolts; i++) {
      const startX = Math.random() * width;
      const startY = 0;
      const endX = Math.random() * width;
      const endY = height;
      
      ctx.strokeStyle = `rgba(200, 200, 255, ${0.8 * intensity})`;
      ctx.lineWidth = 2;
      ctx.shadowColor = 'rgba(150, 150, 255, 0.8)';
      ctx.shadowBlur = 10;
      
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      
      let currentX = startX;
      let currentY = startY;
      const segments = 10;
      
      for (let j = 0; j < segments; j++) {
        currentY += (endY - startY) / segments;
        currentX += (Math.random() - 0.5) * 50;
        ctx.lineTo(currentX, currentY);
      }
      
      ctx.lineTo(endX, endY);
      ctx.stroke();
    }
    
    return canvas;
  }

  // Create particles effect
  createParticlesEffect(width, height, intensity) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    
    const particles = Math.floor(100 * intensity);
    
    for (let i = 0; i < particles; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const size = Math.random() * 3 + 1;
      
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.5 * intensity})`;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
    
    return canvas;
  }

  // Lighting effects
  applyLighting(imageData, type, intensity = 0.5) {
    const { width, height, data } = imageData;
    
    switch (type) {
      case 'spotlight':
        return this.applySpotlight(imageData, intensity);
      case 'rim':
        return this.applyRimLight(imageData, intensity);
      case 'ambient':
        return this.applyAmbientLight(imageData, intensity);
      default:
        return imageData;
    }
  }

  // Spotlight effect
  applySpotlight(imageData, intensity) {
    const { width, height, data } = imageData;
    const centerX = width / 2;
    const centerY = height / 2;
    const maxDist = Math.sqrt(centerX * centerX + centerY * centerY);
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const dx = x - centerX;
        const dy = y - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const falloff = 1 - Math.min(1, dist / maxDist);
        const brightness = 1 + (falloff * intensity);
        
        const i = (y * width + x) * 4;
        data[i] *= brightness;
        data[i + 1] *= brightness;
        data[i + 2] *= brightness;
      }
    }
    
    return imageData;
  }

  // Rim light effect
  applyRimLight(imageData, intensity) {
    const { width, height, data } = imageData;
    const edges = this.detectEdges(imageData);
    
    for (let i = 0; i < data.length; i += 4) {
      const edgeStrength = edges[i / 4];
      const boost = 1 + (edgeStrength * intensity);
      
      data[i] = Math.min(255, data[i] * boost);
      data[i + 1] = Math.min(255, data[i + 1] * boost);
      data[i + 2] = Math.min(255, data[i + 2] * boost);
    }
    
    return imageData;
  }

  // Ambient light
  applyAmbientLight(imageData, intensity) {
    const { data } = imageData;
    const boost = intensity * 50;
    
    for (let i = 0; i < data.length; i += 4) {
      data[i] = Math.min(255, data[i] + boost);
      data[i + 1] = Math.min(255, data[i + 1] + boost);
      data[i + 2] = Math.min(255, data[i + 2] + boost);
    }
    
    return imageData;
  }

  // Edge detection
  detectEdges(imageData) {
    const { width, height, data } = imageData;
    const edges = new Float32Array(width * height);
    
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const i = (y * width + x) * 4;
        
        // Sobel operator
        const gx = 
          -data[i - width * 4 - 4] + data[i - width * 4 + 4] +
          -2 * data[i - 4] + 2 * data[i + 4] +
          -data[i + width * 4 - 4] + data[i + width * 4 + 4];
        
        const gy = 
          -data[i - width * 4 - 4] - 2 * data[i - width * 4] - data[i - width * 4 + 4] +
          data[i + width * 4 - 4] + 2 * data[i + width * 4] + data[i + width * 4 + 4];
        
        edges[y * width + x] = Math.min(1, Math.sqrt(gx * gx + gy * gy) / 1000);
      }
    }
    
    return edges;
  }

  // Cartoon effect
  cartoonify(imageData, levels = 4) {
    const { data } = imageData;
    const step = 255 / levels;
    
    for (let i = 0; i < data.length; i += 4) {
      data[i] = Math.floor(data[i] / step) * step;
      data[i + 1] = Math.floor(data[i + 1] / step) * step;
      data[i + 2] = Math.floor(data[i + 2] / step) * step;
    }
    
    // Add edge detection for cartoon outline
    const edges = this.detectEdges(imageData);
    
    for (let i = 0; i < data.length; i += 4) {
      const edgeStrength = edges[i / 4];
      if (edgeStrength > 0.3) {
        data[i] = 0;
        data[i + 1] = 0;
        data[i + 2] = 0;
      }
    }
    
    return imageData;
  }
}

if (typeof window !== 'undefined') {
  window.EffectsManager = EffectsManager;
}
