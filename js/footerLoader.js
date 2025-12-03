/**
 * Footer Loader
 * Dynamically loads footer HTML to avoid duplication across pages
 */

class FooterLoader {
  constructor() {
    this.footerHTML = this._getFooterTemplate();
  }

  /**
   * Load footer into the page
   * Only loads if no footer exists, otherwise enhances existing footer
   */
  load() {
    const existingFooter = document.querySelector('.site-footer');

    if (existingFooter) {
      // Footer already exists in HTML, just initialize functionality
      this._initializeNewsletterForm();
      return;
    }

    // No footer found, inject it dynamically
    const footerContainer = document.querySelector('body');
    if (footerContainer) {
      footerContainer.insertAdjacentHTML('beforeend', this.footerHTML);
      this._initializeNewsletterForm();
    }
  }

  /**
   * Get footer HTML template
   */
  _getFooterTemplate() {
    return `
    <footer class="site-footer">
        <div class="footer-ghost">👻</div>
        <div class="footer-ghost">💀</div>
        <div class="footer-ghost">🦇</div>

        <div class="footer-container">
            <div class="footer-content">
                <div class="footer-section">
                    <h3 class="footer-title">NFT Avatar Zone</h3>
                    <p class="footer-description">
                        Create spine-chilling avatars by merging your photos with haunted character templates.
                        Unleash your dark creativity with professional editing tools and spooky effects.
                    </p>
                    <div class="social-links">
                        <a href="#" class="social-link" aria-label="Twitter" title="Twitter">
                            <span aria-hidden="true">🐦</span>
                        </a>
                        <a href="#" class="social-link" aria-label="Discord" title="Discord">
                            <span aria-hidden="true">💬</span>
                        </a>
                        <a href="#" class="social-link" aria-label="GitHub" title="GitHub">
                            <span aria-hidden="true">⚫</span>
                        </a>
                        <a href="#" class="social-link" aria-label="Instagram" title="Instagram">
                            <span aria-hidden="true">📷</span>
                        </a>
                    </div>
                </div>

                <div class="footer-section">
                    <h3 class="footer-title">Quick Links</h3>
                    <div class="footer-links">
                        <a href="home.html" class="footer-link">
                            <span class="footer-link-icon">🏠</span>
                            <span>Home</span>
                        </a>
                        <a href="editing-tools.html" class="footer-link">
                            <span class="footer-link-icon">🛠️</span>
                            <span>Editing Tools</span>
                        </a>
                        <a href="nft-gallery.html" class="footer-link">
                            <span class="footer-link-icon">🎨</span>
                            <span>NFT Gallery</span>
                        </a>
                        <a href="contact.html" class="footer-link">
                            <span class="footer-link-icon">📧</span>
                            <span>Contact Us</span>
                        </a>
                        <a href="login.html" class="footer-link">
                            <span class="footer-link-icon">🔐</span>
                            <span>Login</span>
                        </a>
                    </div>
                </div>

                <div class="footer-section">
                    <h3 class="footer-title">Resources</h3>
                    <div class="footer-links">
                        <a href="#" class="footer-link">
                            <span class="footer-link-icon">📖</span>
                            <span>Documentation</span>
                        </a>
                        <a href="#" class="footer-link">
                            <span class="footer-link-icon">🎓</span>
                            <span>Tutorials</span>
                        </a>
                        <a href="#" class="footer-link">
                            <span class="footer-link-icon">❓</span>
                            <span>FAQ</span>
                        </a>
                        <a href="#" class="footer-link">
                            <span class="footer-link-icon">🔒</span>
                            <span>Privacy Policy</span>
                        </a>
                        <a href="#" class="footer-link">
                            <span class="footer-link-icon">📜</span>
                            <span>Terms of Service</span>
                        </a>
                    </div>
                </div>

                <div class="footer-section">
                    <h3 class="footer-title">Stay Haunted</h3>
                    <p class="footer-description">
                        Subscribe to our newsletter for spooky updates, new templates, and exclusive features.
                    </p>
                    <form class="newsletter-form" id="newsletterForm">
                        <input type="email" class="newsletter-input" placeholder="your@email.com" required>
                        <button type="submit" class="newsletter-btn">Subscribe</button>
                    </form>
                </div>
            </div>

            <div class="footer-bottom">
                <div class="copyright">
                    <span class="copyright-icon">👻</span>
                    <span>© ${new Date().getFullYear()} NFT Avatar Zone. All rights reserved. Crafted with dark magic and code.</span>
                </div>
                <div class="footer-badges">
                    <span class="badge">
                        <span class="badge-icon">⚡</span>
                        <span>Zero Dependencies</span>
                    </span>
                    <span class="badge">
                        <span class="badge-icon">🎨</span>
                        <span>Pure HTML/CSS/JS</span>
                    </span>
                    <span class="badge">
                        <span class="badge-icon">🚀</span>
                        <span>Open Source</span>
                    </span>
                </div>
            </div>
        </div>
    </footer>
        `;
  }

  /**
   * Initialize newsletter form submission
   * Works with both dynamically loaded and existing footers
   */
  _initializeNewsletterForm() {
    // Support both ID-based and class-based selection
    const form = document.getElementById('newsletterForm') ||
      document.querySelector('.newsletter-form');

    if (!form) return;

    // Remove existing listeners to prevent duplicates
    const newForm = form.cloneNode(true);
    form.parentNode.replaceChild(newForm, form);

    // Add event listener
    newForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = newForm.querySelector('.newsletter-input');
      if (emailInput && emailInput.value) {
        alert(`Thanks for subscribing! 👻\nWe'll send updates to ${emailInput.value}`);
        newForm.reset();
      }
    });
  }
}

// Auto-initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new FooterLoader().load();
  });
} else {
  new FooterLoader().load();
}

if (typeof window !== 'undefined') {
  window.FooterLoader = FooterLoader;
}
