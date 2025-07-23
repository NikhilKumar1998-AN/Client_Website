// Woowads.js - Enhanced JavaScript functionalities for Woowads website
    // Enhanced notification system
function showNotification(message, type = 'info', duration = 3000) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: bold;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        transform: translateX(100%);
        transition: transform 0.3s ease, opacity 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    // Set background color based on type
    const colors = {
        success: '#4CAF50',
        error: '#f44336',
        warning: '#ff9800',
        info: '#2196F3'
    };
    notification.style.backgroundColor = colors[type] || colors.info;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto-remove after specified duration
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        notification.style.opacity = '0';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, duration);
}

// Enhanced page navigation with error handling
function showPage(pageId) {
    try {
        const pages = document.querySelectorAll('.page');
        const links = document.querySelectorAll('.nav-link');
        
        // Check if page exists
        const targetPage = document.getElementById(pageId);
        if (!targetPage) {
            showNotification(`Page "${pageId}" not found`, 'error');
            return false;
        }
        
        // Remove active class from all pages and links
        pages.forEach(page => {
            page.classList.remove('active');
        });
        
        links.forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to target page
        targetPage.classList.add('active');
        
        // Add active class to corresponding nav link
        const targetLink = document.querySelector(`a[href="#${pageId}"]`);
        if (targetLink) {
            targetLink.classList.add('active');
        }
        
        // Update URL hash without triggering page reload
        if (history.pushState) {
            history.pushState(null, null, `#${pageId}`);
        } else {
            location.hash = `#${pageId}`;
        }
        
        // Scroll to top of page
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        return true;
    } catch (error) {
        console.error('Error navigating to page:', error);
        showNotification('Navigation error occurred', 'error');
        return false;
    }
}

// Enhanced form validation
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    const errors = [];
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            errors.push(`${field.name || field.id || 'Field'} is required`);
            field.style.borderColor = '#f44336';
            field.style.boxShadow = '0 0 0 2px rgba(244, 67, 54, 0.2)';
        } else {
            field.style.borderColor = '';
            field.style.boxShadow = '';
        }
        
        // Email validation
        if (field.type === 'email' && field.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value.trim())) {
                errors.push('Please enter a valid email address');
                field.style.borderColor = '#f44336';
                field.style.boxShadow = '0 0 0 2px rgba(244, 67, 54, 0.2)';
            }
        }
    });
    
    return errors;
}

// Enhanced contact form handler
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        
        // Validate form
        const errors = validateForm(this);
        if (errors.length > 0) {
            showNotification(errors[0], 'error');
            return;
        }
        
        const loading = document.getElementById('loading');
        const submitButton = this.querySelector('button[type="submit"]');
        
        try {
            // Show loading state
            if (loading) loading.style.display = 'block';
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = 'Sending...';
            }
            
            // Simulate API call (replace with actual submission)
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Success
            showNotification('Your message has been sent successfully!', 'success');
            this.reset();
            
        } catch (error) {
            console.error('Form submission error:', error);
            showNotification('Failed to send message. Please try again.', 'error');
        } finally {
            // Hide loading state
            if (loading) loading.style.display = 'none';
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = 'Send Message';
            }
        }
    });
}

// Enhanced newsletter subscription
function initNewsletterSubscription() {
    const newsletterBtn = document.querySelector('.newsletter-btn');
    const newsletterInput = document.querySelector('.newsletter-input');
    
    if (!newsletterBtn || !newsletterInput) return;
    
    function handleSubscription() {
        const email = newsletterInput.value.trim();
        
        if (!email) {
            showNotification('Please enter your email address', 'warning');
            newsletterInput.focus();
            return;
        }
        
        // Enhanced email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address', 'error');
            newsletterInput.focus();
            return;
        }
        
        // Simulate subscription process
        newsletterBtn.disabled = true;
        newsletterBtn.textContent = 'Subscribing...';
        
        setTimeout(() => {
            showNotification('Thank you for subscribing to our newsletter!', 'success');
            newsletterInput.value = '';
            newsletterBtn.disabled = false;
            newsletterBtn.textContent = 'Subscribe';
        }, 1500);
    }
    
    // Button click handler
    newsletterBtn.addEventListener('click', handleSubscription);
    
    // Enter key handler
    newsletterInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSubscription();
        }
    });
    
    // Real-time validation feedback
    newsletterInput.addEventListener('input', function() {
        this.style.borderColor = '';
        this.style.boxShadow = '';
        const email = this.value.trim();
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            this.style.borderColor = '#f44336';
            this.style.boxShadow = '0 0 0 2px rgba(244, 67, 54, 0.2)';
        }
    });
}

// Handle browser back/forward navigation
function initBrowserNavigation() {
    window.addEventListener('popstate', function(event) {
        const hash = location.hash.substring(1);
        if (hash) {
            showPage(hash);
        } else {
            showPage('home');
        }
    });
    
    // Handle initial page load with hash
    window.addEventListener('load', function() {
        const hash = location.hash.substring(1);
        if (hash) {
            showPage(hash);
        }
    });
}

// Enhanced keyboard navigation
function initKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // ESC key to close notifications
        if (e.key === 'Escape') {
            const notifications = document.querySelectorAll('.notification');
            notifications.forEach(notification => notification.remove());
        }
        
        // Ctrl+H to go to home
        if (e.ctrlKey && e.key === 'h') {
            e.preventDefault();
            showPage('home');
        }
    });
}