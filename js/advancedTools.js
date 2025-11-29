// Advanced Tools - Photoshop-style editing tools
class AdvancedTools {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.tempCanvas = document.createElement('canvas');
    this.tempCtx = this.tempCanvas.getContext('2d');
  }

  // Background Remover (simplified)
  removeBackground(imageData, tolerance = 30) {
    const data = imageData.data;
    const width = imageData.width;
    const height = imageData.height;
    
    // Sample edge colors
    const edgeColors = this.sampleEdgeColors(imageData);
    
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      
      // Check if pixel matches background colors
      let isBackground = false;
      for (const edgeColor of edgeColors) {
        const diff = Math.abs(r - edgeColor.r) + 
                     Math.abs(g - edgeColor.g) + 
                     Math.abs(b - edgeColor.b);
        
        if (diff < tolerance * 3) {
          isBackground = true;
          break;
        }
      }
      
      if (isBackground) {
        data[i + 3] = 0; // Make transparent
      }
    }
    
    return imageData;
  }

  // Sample edge colors for background detection
  sampleEdgeColors(imageData) {
    const { width, height, data } = imageData;
    const samples = [];
    const samplePoints = [
      [0, 0], [width - 1, 0], [0, height - 1], [width - 1, height - 1],
      [Math.floor(width / 2), 0], [Math.floor(width / 2), height - 1],
      [0, Math.floor(height / 2)], [width - 1, Math.floor(height / 2)]
    ];
    
    samplePoints.forEach(([x, y]) => {
      const i = (y * width + x) * 4;
      samples.push({ r: data[i], g: data[i + 1], b: data[i + 2] });
    });
    
    return samples;
  }

  // Magic Selection (flood fill)
  magicSelect(imageData, x, y, tolerance = 30) {
    const { width, height, data } = imageData;
    const targetColor = this.getPixelColor(data, x, y, width);
    const mask = new Uint8Array(width * height);
    const stack = [[x, y]];
    
    while (stack.length > 0) {
      const [cx, cy] = stack.pop();
      const index = cy * width + cx;
      
      if (cx < 0 || cx >= width || cy < 0 || cy >= height || mask[index]) {
        continue;
      }
      
      const currentColor = this.getPixelColor(data, cx, cy, width);
      const diff = this.colorDifference(targetColor, currentColor);
      
      if (diff <= tolerance) {
        mask[index] = 255;
        stack.push([cx + 1, cy], [cx - 1, cy], [cx, cy + 1], [cx, cy - 1]);
      }
    }
    
    return mask;
  }

  // Get pixel color
  getPixelColor(data, x, y, width) {
    const i = (y * width + x) * 4;
    return { r: data[i], g: data[i + 1], b: data[i + 2], a: data[i + 3] };
  }

  // Color difference
  colorDifference(c1, c2) {
    return Math.abs(c1.r - c2.r) + Math.abs(c1.g - c2.g) + Math.abs(c1.b - c2.b);
  }

  // Crop image
  cropImage(imageData, x, y, width, height) {
    const croppedCanvas = document.createElement('canvas');
    croppedCanvas.width = width;
    croppedCanvas.height = height;
    const ctx = croppedCanvas.getContext('2d');
    
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = imageData.width;
    tempCanvas.height = imageData.height;
    const tempCtx = tempCanvas.getContext('2d');
    tempCtx.putImageData(imageData, 0, 0);
    
    ctx.drawImage(tempCanvas, x, y, width, height, 0, 0, width, height);
    return ctx.getImageData(0, 0, width, height);
  }

  // Flip image
  flipImage(imageData, direction = 'horizontal') {
    const { width, height } = imageData;
    const flipped = this.ctx.createImageData(width, height);
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const srcX = direction === 'horizontal' ? width - 1 - x : x;
        const srcY = direction === 'vertical' ? height - 1 - y : y;
        
        const srcIndex = (srcY * width + srcX) * 4;
        const dstIndex = (y * width + x) * 4;
        
        flipped.data[dstIndex] = imageData.data[srcIndex];
        flipped.data[dstIndex + 1] = imageData.data[srcIndex + 1];
        flipped.data[dstIndex + 2] = imageData.data[srcIndex + 2];
        flipped.data[dstIndex + 3] = imageData.data[srcIndex + 3];
      }
    }
    
    return flipped;
  }

  // Eraser with soft edges
  erase(imageData, x, y, radius, hardness = 0.5) {
    const { width, height, data } = imageData;
    
    for (let dy = -radius; dy <= radius; dy++) {
      for (let dx = -radius; dx <= radius; dx++) {
        const px = x + dx;
        const py = y + dy;
        
        if (px >= 0 && px < width && py >= 0 && py < height) {
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance <= radius) {
            const i = (py * width + px) * 4;
            const falloff = 1 - (distance / radius);
            const alpha = Math.pow(falloff, 1 / hardness);
            data[i + 3] *= (1 - alpha);
          }
        }
      }
    }
    
    return imageData;
  }

  // Brush with soft edges
  brush(imageData, x, y, radius, color, hardness = 0.5) {
    const { width, height, data } = imageData;
    
    for (let dy = -radius; dy <= radius; dy++) {
      for (let dx = -radius; dx <= radius; dx++) {
        const px = x + dx;
        const py = y + dy;
        
        if (px >= 0 && px < width && py >= 0 && py < height) {
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance <= radius) {
            const i = (py * width + px) * 4;
            const falloff = 1 - (distance / radius);
            const alpha = Math.pow(falloff, 1 / hardness) * (color.a / 255);
            
            // Alpha blending
            const srcAlpha = data[i + 3] / 255;
            const outAlpha = alpha + srcAlpha * (1 - alpha);
            
            if (outAlpha > 0) {
              data[i] = (color.r * alpha + data[i] * srcAlpha * (1 - alpha)) / outAlpha;
              data[i + 1] = (color.g * alpha + data[i + 1] * srcAlpha * (1 - alpha)) / outAlpha;
              data[i + 2] = (color.b * alpha + data[i + 2] * srcAlpha * (1 - alpha)) / outAlpha;
              data[i + 3] = outAlpha * 255;
            }
          }
        }
      }
    }
    
    return imageData;
  }

  // Sharpen filter
  sharpen(imageData, amount = 1) {
    const kernel = [
      0, -amount, 0,
      -amount, 1 + 4 * amount, -amount,
      0, -amount, 0
    ];
    return this.applyConvolution(imageData, kernel);
  }

  // Blur filter
  blur(imageData, radius = 1) {
    const size = radius * 2 + 1;
    const kernel = new Array(size * size).fill(1 / (size * size));
    return this.applyConvolution(imageData, kernel, size);
  }

  // Apply convolution kernel
  applyConvolution(imageData, kernel, kernelSize = 3) {
    const { width, height, data } = imageData;
    const output = new ImageData(width, height);
    const half = Math.floor(kernelSize / 2);
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let r = 0, g = 0, b = 0;
        
        for (let ky = 0; ky < kernelSize; ky++) {
          for (let kx = 0; kx < kernelSize; kx++) {
            const px = Math.min(width - 1, Math.max(0, x + kx - half));
            const py = Math.min(height - 1, Math.max(0, y + ky - half));
            const i = (py * width + px) * 4;
            const weight = kernel[ky * kernelSize + kx];
            
            r += data[i] * weight;
            g += data[i + 1] * weight;
            b += data[i + 2] * weight;
          }
        }
        
        const i = (y * width + x) * 4;
        output.data[i] = Math.max(0, Math.min(255, r));
        output.data[i + 1] = Math.max(0, Math.min(255, g));
        output.data[i + 2] = Math.max(0, Math.min(255, b));
        output.data[i + 3] = data[i + 3];
      }
    }
    
    return output;
  }

  // Glitch effect
  glitchEffect(imageData, intensity = 0.5) {
    const { width, height, data } = imageData;
    const output = new ImageData(width, height);
    output.data.set(data);
    
    const glitchLines = Math.floor(height * intensity * 0.1);
    
    for (let i = 0; i < glitchLines; i++) {
      const y = Math.floor(Math.random() * height);
      const offset = Math.floor((Math.random() - 0.5) * width * intensity * 0.2);
      const lineHeight = Math.floor(Math.random() * 5) + 1;
      
      for (let ly = y; ly < Math.min(y + lineHeight, height); ly++) {
        for (let x = 0; x < width; x++) {
          const srcX = Math.max(0, Math.min(width - 1, x + offset));
          const srcIndex = (ly * width + srcX) * 4;
          const dstIndex = (ly * width + x) * 4;
          
          // RGB shift
          output.data[dstIndex] = data[srcIndex + (Math.random() > 0.5 ? 4 : 0)];
          output.data[dstIndex + 1] = data[srcIndex + 1];
          output.data[dstIndex + 2] = data[srcIndex + (Math.random() > 0.5 ? -4 : 0)];
          output.data[dstIndex + 3] = data[srcIndex + 3];
        }
      }
    }
    
    return output;
  }

  // Color balance
  colorBalance(imageData, shadows, midtones, highlights) {
    const { data } = imageData;
    
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const luminance = (r + g + b) / 3 / 255;
      
      let weight;
      if (luminance < 0.33) {
        weight = shadows;
      } else if (luminance < 0.66) {
        weight = midtones;
      } else {
        weight = highlights;
      }
      
      data[i] = Math.max(0, Math.min(255, r + weight.r));
      data[i + 1] = Math.max(0, Math.min(255, g + weight.g));
      data[i + 2] = Math.max(0, Math.min(255, b + weight.b));
    }
    
    return imageData;
  }

  // Add glow effect
  addGlow(imageData, color, intensity = 0.5, radius = 10) {
    const { width, height } = imageData;
    const glowCanvas = document.createElement('canvas');
    glowCanvas.width = width;
    glowCanvas.height = height;
    const glowCtx = glowCanvas.getContext('2d');
    
    glowCtx.putImageData(imageData, 0, 0);
    glowCtx.globalCompositeOperation = 'source-atop';
    glowCtx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${intensity})`;
    glowCtx.fillRect(0, 0, width, height);
    
    glowCtx.shadowColor = `rgba(${color.r}, ${color.g}, ${color.b}, ${intensity})`;
    glowCtx.shadowBlur = radius;
    glowCtx.drawImage(glowCanvas, 0, 0);
    
    return glowCtx.getImageData(0, 0, width, height);
  }

  // Add shadow
  addShadow(imageData, offsetX, offsetY, blur, color) {
    const { width, height } = imageData;
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = width + Math.abs(offsetX) + blur * 2;
    shadowCanvas.height = height + Math.abs(offsetY) + blur * 2;
    const shadowCtx = shadowCanvas.getContext('2d');
    
    shadowCtx.shadowColor = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a / 255})`;
    shadowCtx.shadowBlur = blur;
    shadowCtx.shadowOffsetX = offsetX;
    shadowCtx.shadowOffsetY = offsetY;
    
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = width;
    tempCanvas.height = height;
    const tempCtx = tempCanvas.getContext('2d');
    tempCtx.putImageData(imageData, 0, 0);
    
    shadowCtx.drawImage(tempCanvas, blur, blur);
    
    return shadowCtx.getImageData(0, 0, shadowCanvas.width, shadowCanvas.height);
  }
}

if (typeof window !== 'undefined') {
  window.AdvancedTools = AdvancedTools;
}
