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
     */
    load() {
        const footerContainer = document.querySelector('body');
        if (footerContainer && !document.querySelector('.site-footer')) {
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
                        <a href="#" class="social-link" title="Twitter">🐦</a>
                        <a href="#" class="social-link" title="Discord">💬</a>
                        <a href="#" class="social-link" title="GitHub">⚫</a>
                        <a href="#" class="social-link" title="Instagram">📷</a>
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
                    <span>© 2024 NFT Avatar Zone. All rights reserved. Crafted with dark magic and code.</span>
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
     */
    _initializeNewsletterForm() {
        const form = document.getElementById('newsletterForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = form.querySelector('.newsletter-input').value;
                alert(`Thanks for subscribing! 👻\nWe'll send updates to ${email}`);
                form.reset();
            });
        }
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
