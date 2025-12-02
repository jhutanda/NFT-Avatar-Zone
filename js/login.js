/**
 * Login Page JavaScript
 * Handles form submission, validation, and authentication
 */

class LoginController {
    constructor() {
        this.form = document.getElementById('loginForm');
        this.passwordInput = document.getElementById('password');
        this.passwordToggle = document.getElementById('passwordToggle');
        this.notificationContainer = document.getElementById('notificationContainer');
        
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Form submission
        this.form.addEventListener('submit', (e) => this.handleLogin(e));
        
        // Password visibility toggle
        this.passwordToggle.addEventListener('click', () => this.togglePasswordVisibility());
        
        // Social login buttons
        document.querySelectorAll('.social-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleSocialLogin(e));
        });
        
        // Forgot password link
        document.querySelector('.forgot-link').addEventListener('click', (e) => {
            e.preventDefault();
            this.handleForgotPassword();
        });
        
        // Signup link
        document.querySelector('.signup-link').addEventListener('click', (e) => {
            e.preventDefault();
            this.handleSignup();
        });
    }

    togglePasswordVisibility() {
        const type = this.passwordInput.type === 'password' ? 'text' : 'password';
        this.passwordInput.type = type;
        
        const icon = this.passwordToggle.querySelector('.toggle-icon');
        icon.textContent = type === 'password' ? '👁️' : '🙈';
    }

    handleLogin(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const remember = document.getElementById('remember').checked;
        
        // Basic validation
        if (!this.validateEmail(email)) {
            this.showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        if (password.length < 6) {
            this.showNotification('Password must be at least 6 characters', 'error');
            return;
        }
        
        // Demo authentication (password not validated in demo mode)
        this.authenticateUser(email, remember);
    }

    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    authenticateUser(email, remember) {
        // Show loading state
        const submitBtn = this.form.querySelector('[type="submit"]');
        submitBtn.innerHTML = '<span>🔄</span><span>Signing in...</span>';
        submitBtn.disabled = true;
        
        // Simulate API call (demo only - no real authentication)
        setTimeout(() => {
            // DEMO MODE: Accepts any credentials for testing
            const userData = {
                email: email,
                name: email.split('@')[0],
                loggedIn: true,
                loginTime: new Date().toISOString()
            };
            
            // Store user session
            if (remember) {
                localStorage.setItem('nftAvatarUser', JSON.stringify(userData));
            } else {
                sessionStorage.setItem('nftAvatarUser', JSON.stringify(userData));
            }
            
            this.showNotification('Login successful! Redirecting...', 'success');
            
            // Redirect to home page
            setTimeout(() => {
                window.location.href = 'home.html';
            }, 1500);
        }, 1000);
    }

    handleSocialLogin(e) {
        const btn = e.currentTarget;
        const provider = btn.classList.contains('social-google') ? 'Google' :
                        btn.classList.contains('social-github') ? 'GitHub' : 'Discord';
        
        this.showNotification(`${provider} login coming soon!`, 'info');
        
        // Demo: Simulate social login
        setTimeout(() => {
            const userData = {
                email: `user@${provider.toLowerCase()}.com`,
                name: `${provider} User`,
                loggedIn: true,
                provider: provider,
                timestamp: new Date().toISOString()
            };
            
            sessionStorage.setItem('nftAvatarUser', JSON.stringify(userData));
            this.showNotification(`${provider} login successful!`, 'success');
            
            setTimeout(() => {
                window.location.href = 'home.html';
            }, 1500);
        }, 1000);
    }

    handleForgotPassword() {
        this.showNotification('Password reset feature coming soon!', 'info');
    }

    handleSignup() {
        this.showNotification('Signup feature coming soon!', 'info');
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        this.notificationContainer.appendChild(notification);
        
        // Trigger animation
        setTimeout(() => notification.classList.add('show'), 10);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new LoginController();
    });
} else {
    new LoginController();
}
