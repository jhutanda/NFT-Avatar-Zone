// Animation Controller - Manages UI animations and effects
class AnimationController {
  constructor() {
    this.fogElements = [];
    this.isAnimating = false;
  }

  // Initialize and start background animation
  startBackgroundAnimation() {
    if (this.isAnimating) return;
    
    this.fogElements = document.querySelectorAll('.fog');
    this.isAnimating = true;
    
    // Fog animation is handled by CSS, just ensure elements exist
    this.fogElements.forEach((fog, index) => {
      fog.style.animationPlayState = 'running';
    });
  }

  // Stop background animation
  stopBackgroundAnimation() {
    this.isAnimating = false;
    this.fogElements.forEach(fog => {
      fog.style.animationPlayState = 'paused';
    });
  }

  // Trigger selection effect on element
  triggerSelectionEffect(element) {
    if (!element) return;
    
    // Remove existing animation
    element.classList.remove('selected-character');
    
    // Trigger reflow to restart animation
    void element.offsetWidth;
    
    // Add animation class
    element.classList.add('selected-character');
    
    // Remove class after animation completes
    setTimeout(() => {
      element.classList.remove('selected-character');
    }, 600);
  }

  // Apply hover glow effect
  applyHoverGlow(element) {
    if (!element) return;
    element.classList.add('hover-glow');
  }

  // Remove hover glow effect
  removeHoverGlow(element) {
    if (!element) return;
    element.classList.remove('hover-glow');
  }

  // Flicker neon border effect
  flickerNeonBorder(element) {
    if (!element) return;
    
    element.classList.add('flicker-neon');
    
    // Optional: remove after some time
    setTimeout(() => {
      element.classList.remove('flicker-neon');
    }, 3000);
  }

  // Fade in element
  fadeIn(element, duration = 500) {
    if (!element) return;
    
    element.style.opacity = '0';
    element.style.display = 'block';
    
    let start = null;
    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const opacity = Math.min(progress / duration, 1);
      
      element.style.opacity = opacity;
      
      if (progress < duration) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }

  // Fade out element
  fadeOut(element, duration = 500) {
    if (!element) return;
    
    let start = null;
    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const opacity = Math.max(1 - progress / duration, 0);
      
      element.style.opacity = opacity;
      
      if (progress < duration) {
        requestAnimationFrame(animate);
      } else {
        element.style.display = 'none';
      }
    };
    
    requestAnimationFrame(animate);
  }

  // Slide in element
  slideIn(element, direction = 'left', duration = 400) {
    if (!element) return;
    
    element.classList.add('slide-in');
    
    setTimeout(() => {
      element.classList.remove('slide-in');
    }, duration);
  }

  // Pulse animation
  pulse(element, duration = 2000) {
    if (!element) return;
    
    element.classList.add('pulse');
    
    setTimeout(() => {
      element.classList.remove('pulse');
    }, duration);
  }

  // Shake animation (for errors)
  shake(element) {
    if (!element) return;
    
    element.classList.add('shake');
    
    setTimeout(() => {
      element.classList.remove('shake');
    }, 500);
  }

  // Button press animation
  buttonPress(element) {
    if (!element) return;
    
    element.classList.add('btn-press');
    
    setTimeout(() => {
      element.classList.remove('btn-press');
    }, 200);
  }

  // Glow pulse animation
  glowPulse(element, duration = 2000) {
    if (!element) return;
    
    element.classList.add('glow-pulse');
    
    if (duration > 0) {
      setTimeout(() => {
        element.classList.remove('glow-pulse');
      }, duration);
    }
  }

  // Success check animation
  successAnimation(element) {
    if (!element) return;
    
    const icon = element.querySelector('.success-icon');
    if (icon) {
      icon.style.animation = 'none';
      void icon.offsetWidth; // Trigger reflow
      icon.style.animation = 'successCheck 0.6s ease-out';
    }
  }

  // Monitor FPS for performance
  monitorFPS(callback) {
    let lastTime = performance.now();
    let frames = 0;
    
    const checkFPS = () => {
      const currentTime = performance.now();
      frames++;
      
      if (currentTime >= lastTime + 1000) {
        const fps = Math.round((frames * 1000) / (currentTime - lastTime));
        callback(fps);
        frames = 0;
        lastTime = currentTime;
      }
      
      requestAnimationFrame(checkFPS);
    };
    
    requestAnimationFrame(checkFPS);
  }
}

// Export for use in other modules
if (typeof window !== 'undefined') {
  window.AnimationController = AnimationController;
}
