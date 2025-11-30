// Effects Manager - Overlay effects and filters
class EffectsManager {
  constructor() {
    this.effects = {
      smoke: this.createSmokeEffect,
      fog: this.createFogEffect,
      blood: this.createBloodEffect,
      glitch: this.createGlitchEffect,
      lightning: this.createLightningEffect,
      particles: this.createParticlesEffect,
      fire: this.createFireEffect,
      rain: this.createRainEffect,
      snow: this.createSnowEffect,
      stars: this.createStarsEffect,
      neon: this.createNeonEffect,
      vortex: this.createVortexEffect,
      energy: this.createEnergyEffect,
      portal: this.createPortalEffect,
      toxic: this.createToxicEffect,
      frost: this.createFrostEffect
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

  // Fire effect
  createFireEffect(width, height, intensity) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    
    const flames = Math.floor(30 * intensity);
    
    for (let i = 0; i < flames; i++) {
      const x = Math.random() * width;
      const startY = height * 0.7;
      const flameHeight = Math.random() * height * 0.4 + 50;
      
      const gradient = ctx.createLinearGradient(x, startY, x, startY - flameHeight);
      gradient.addColorStop(0, `rgba(255, 100, 0, ${0.8 * intensity})`);
      gradient.addColorStop(0.3, `rgba(255, 150, 0, ${0.6 * intensity})`);
      gradient.addColorStop(0.6, `rgba(255, 200, 0, ${0.4 * intensity})`);
      gradient.addColorStop(1, 'rgba(255, 255, 0, 0)');
      
      ctx.fillStyle = gradient;
      const width_flame = Math.random() * 30 + 20;
      ctx.beginPath();
      ctx.ellipse(x, startY, width_flame, flameHeight, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    
    return canvas;
  }

  // Rain effect
  createRainEffect(width, height, intensity) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    
    const drops = Math.floor(100 * intensity);
    
    for (let i = 0; i < drops; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const length = Math.random() * 20 + 10;
      
      const gradient = ctx.createLinearGradient(x, y, x, y + length);
      gradient.addColorStop(0, `rgba(174, 194, 224, ${0.6 * intensity})`);
      gradient.addColorStop(1, 'rgba(174, 194, 224, 0)');
      
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x - 2, y + length);
      ctx.stroke();
    }
    
    return canvas;
  }

  // Snow effect
  createSnowEffect(width, height, intensity) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    
    const flakes = Math.floor(150 * intensity);
    
    for (let i = 0; i < flakes; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const size = Math.random() * 4 + 1;
      
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.8 * intensity})`;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
      
      // Add sparkle
      if (Math.random() > 0.7) {
        ctx.strokeStyle = `rgba(200, 220, 255, ${0.5 * intensity})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x - size * 2, y);
        ctx.lineTo(x + size * 2, y);
        ctx.moveTo(x, y - size * 2);
        ctx.lineTo(x, y + size * 2);
        ctx.stroke();
      }
    }
    
    return canvas;
  }

  // Stars effect
  createStarsEffect(width, height, intensity) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    
    const stars = Math.floor(80 * intensity);
    
    for (let i = 0; i < stars; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const size = Math.random() * 3 + 1;
      const brightness = Math.random();
      
      // Star glow
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, size * 3);
      gradient.addColorStop(0, `rgba(255, 255, 200, ${brightness * intensity})`);
      gradient.addColorStop(0.5, `rgba(255, 255, 150, ${brightness * 0.3 * intensity})`);
      gradient.addColorStop(1, 'rgba(255, 255, 100, 0)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(x - size * 3, y - size * 3, size * 6, size * 6);
      
      // Star cross
      ctx.strokeStyle = `rgba(255, 255, 255, ${brightness * intensity})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x - size * 2, y);
      ctx.lineTo(x + size * 2, y);
      ctx.moveTo(x, y - size * 2);
      ctx.lineTo(x, y + size * 2);
      ctx.stroke();
    }
    
    return canvas;
  }

  // Neon effect
  createNeonEffect(width, height, intensity) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    
    const lines = Math.floor(15 * intensity);
    
    for (let i = 0; i < lines; i++) {
      const x1 = Math.random() * width;
      const y1 = Math.random() * height;
      const x2 = Math.random() * width;
      const y2 = Math.random() * height;
      
      const hue = Math.random() * 360;
      
      ctx.strokeStyle = `hsla(${hue}, 100%, 50%, ${0.6 * intensity})`;
      ctx.lineWidth = 3;
      ctx.shadowColor = `hsl(${hue}, 100%, 50%)`;
      ctx.shadowBlur = 15;
      
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
    
    return canvas;
  }

  // Vortex effect
  createVortexEffect(width, height, intensity) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    
    const centerX = width / 2;
    const centerY = height / 2;
    const spirals = Math.floor(5 * intensity);
    
    for (let s = 0; s < spirals; s++) {
      const offset = (s / spirals) * Math.PI * 2;
      
      ctx.beginPath();
      for (let i = 0; i < 100; i++) {
        const angle = (i / 100) * Math.PI * 4 + offset;
        const radius = (i / 100) * Math.min(width, height) * 0.4;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      
      const gradient = ctx.createLinearGradient(centerX, centerY, centerX + width * 0.4, centerY);
      gradient.addColorStop(0, `rgba(138, 43, 226, ${0.6 * intensity})`);
      gradient.addColorStop(1, 'rgba(138, 43, 226, 0)');
      
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2;
      ctx.stroke();
    }
    
    return canvas;
  }

  // Energy effect
  createEnergyEffect(width, height, intensity) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    
    const bolts = Math.floor(20 * intensity);
    
    for (let i = 0; i < bolts; i++) {
      const x1 = Math.random() * width;
      const y1 = Math.random() * height;
      const x2 = Math.random() * width;
      const y2 = Math.random() * height;
      
      ctx.strokeStyle = `rgba(0, 255, 255, ${0.7 * intensity})`;
      ctx.lineWidth = 2;
      ctx.shadowColor = 'rgba(0, 255, 255, 0.8)';
      ctx.shadowBlur = 10;
      
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      
      const segments = 5;
      for (let j = 1; j < segments; j++) {
        const t = j / segments;
        const x = x1 + (x2 - x1) * t + (Math.random() - 0.5) * 30;
        const y = y1 + (y2 - y1) * t + (Math.random() - 0.5) * 30;
        ctx.lineTo(x, y);
      }
      
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
    
    return canvas;
  }

  // Portal effect
  createPortalEffect(width, height, intensity) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    
    const centerX = width / 2;
    const centerY = height / 2;
    const maxRadius = Math.min(width, height) * 0.4;
    
    for (let i = 0; i < 10; i++) {
      const radius = (i / 10) * maxRadius;
      const alpha = (1 - i / 10) * intensity;
      
      const gradient = ctx.createRadialGradient(centerX, centerY, radius * 0.8, centerX, centerY, radius);
      gradient.addColorStop(0, `rgba(75, 0, 130, ${alpha * 0.3})`);
      gradient.addColorStop(0.5, `rgba(138, 43, 226, ${alpha * 0.5})`);
      gradient.addColorStop(1, `rgba(75, 0, 130, ${alpha * 0.2})`);
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();
    }
    
    return canvas;
  }

  // Toxic effect
  createToxicEffect(width, height, intensity) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    
    const bubbles = Math.floor(40 * intensity);
    
    for (let i = 0; i < bubbles; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const radius = Math.random() * 30 + 10;
      
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, `rgba(0, 255, 0, ${0.4 * intensity})`);
      gradient.addColorStop(0.5, `rgba(50, 205, 50, ${0.3 * intensity})`);
      gradient.addColorStop(1, 'rgba(0, 128, 0, 0)');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Add toxic drips
    const drips = Math.floor(8 * intensity);
    for (let i = 0; i < drips; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height * 0.5;
      const length = Math.random() * 50 + 30;
      
      const gradient = ctx.createLinearGradient(x, y, x, y + length);
      gradient.addColorStop(0, `rgba(0, 255, 0, ${0.6 * intensity})`);
      gradient.addColorStop(1, 'rgba(0, 255, 0, 0)');
      
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, y + length);
      ctx.stroke();
    }
    
    return canvas;
  }

  // Frost effect
  createFrostEffect(width, height, intensity) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    
    // Frost crystals
    const crystals = Math.floor(50 * intensity);
    
    for (let i = 0; i < crystals; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const size = Math.random() * 15 + 5;
      
      ctx.strokeStyle = `rgba(200, 230, 255, ${0.5 * intensity})`;
      ctx.lineWidth = 1;
      
      // Draw crystal pattern
      for (let j = 0; j < 6; j++) {
        const angle = (j / 6) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + Math.cos(angle) * size, y + Math.sin(angle) * size);
        ctx.stroke();
      }
    }
    
    // Frost overlay
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, `rgba(200, 230, 255, ${0.1 * intensity})`);
    gradient.addColorStop(0.5, `rgba(220, 240, 255, ${0.15 * intensity})`);
    gradient.addColorStop(1, `rgba(200, 230, 255, ${0.1 * intensity})`);
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
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
      case 'dramatic':
        return this.applyDramaticLight(imageData, intensity);
      case 'neon':
        return this.applyNeonLight(imageData, intensity);
      case 'sunset':
        return this.applySunsetLight(imageData, intensity);
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

  // Dramatic light
  applyDramaticLight(imageData, intensity) {
    const { width, height, data } = imageData;
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const i = (y * width + x) * 4;
        
        // Create dramatic side lighting
        const sideFactor = Math.abs(x - width / 2) / (width / 2);
        const topFactor = y / height;
        const lightFactor = 1 - (sideFactor * 0.5 + topFactor * 0.3) * intensity;
        
        data[i] *= lightFactor;
        data[i + 1] *= lightFactor;
        data[i + 2] *= lightFactor;
      }
    }
    
    return imageData;
  }

  // Neon light
  applyNeonLight(imageData, intensity) {
    const { data } = imageData;
    
    for (let i = 0; i < data.length; i += 4) {
      // Boost specific color channels for neon effect
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      
      const max = Math.max(r, g, b);
      const boost = intensity * 80;
      
      if (max === r) {
        data[i] = Math.min(255, r + boost);
        data[i + 2] = Math.min(255, b + boost * 0.5);
      } else if (max === g) {
        data[i + 1] = Math.min(255, g + boost);
        data[i] = Math.min(255, r + boost * 0.3);
      } else {
        data[i + 2] = Math.min(255, b + boost);
        data[i] = Math.min(255, r + boost * 0.5);
      }
    }
    
    return imageData;
  }

  // Sunset light
  applySunsetLight(imageData, intensity) {
    const { width, height, data } = imageData;
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const i = (y * width + x) * 4;
        
        // Warm sunset tones
        const warmth = (1 - y / height) * intensity;
        
        data[i] = Math.min(255, data[i] + warmth * 50);     // Red boost
        data[i + 1] = Math.min(255, data[i + 1] + warmth * 30); // Orange tint
        data[i + 2] = Math.max(0, data[i + 2] - warmth * 20);   // Reduce blue
      }
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
