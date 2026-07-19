console.log('🚀 Portfolio Script Loading...');

// ========== DARK MODE TOGGLE ==========
function setupDarkMode() {
    const savedMode = localStorage.getItem('darkMode') === 'true';

    if (savedMode) {
        document.body.classList.add('dark-mode');
    }

    const darkModeBtn = document.getElementById('darkModeBtn');
    if (darkModeBtn) {
        darkModeBtn.innerHTML = savedMode ? '☀️' : '🌙';
        darkModeBtn.addEventListener('click', toggleDarkMode);
    }
}

function toggleDarkMode() {
    const isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', isDark);
    const btn = document.getElementById('darkModeBtn');
    if (btn) {
        btn.innerHTML = isDark ? '☀️' : '🌙';
    }
    console.log('✅ Dark mode toggled:', isDark ? 'ON' : 'OFF');
}

// ========== NAVBAR NAVIGATION ==========
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const href = this.getAttribute('href');
            const target = document.querySelector(href);

            if (target) {
                // Scroll to section smoothly
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });

                // Update active state
                updateActiveLink(href);

                console.log('✅ Navigated to:', href);
            }
        });
    });

    // Update active link when scrolling
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('[id^="div"]');
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                current = '#' + section.getAttribute('id');
            }
        });

        if (current) {
            updateActiveLink(current);
        }
    }, { passive: true });
}

function updateActiveLink(targetId) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === targetId) {
            link.classList.add('active');
        }
    });
}

// ========== PROJECT BUTTONS ==========
function setupProjectButtons() {
    const projectButtons = document.querySelectorAll('.project-btn');

    projectButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();

            const url = this.getAttribute('data-url');

            if (url && (url.startsWith('http') || url.startsWith('https'))) {
                console.log('✅ Opening project in new tab:', url);
                window.open(url, '_blank');
            }
        });
    });
}

// ========== CONTACT FORM ==========
function setupContactForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const nameInput = form.querySelector('input[type="text"]');
        const emailInput = form.querySelector('input[type="email"]');
        const messageInput = form.querySelector('textarea');

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();

        // Validation
        if (!name || name.length < 2) {
            showAlert('❌ Please enter a valid name', 'error');
            return;
        }

        if (!validateEmail(email)) {
            showAlert('❌ Please enter a valid email', 'error');
            return;
        }

        if (!message || message.length < 10) {
            showAlert('❌ Message must be at least 10 characters', 'error');
            return;
        }

        // Success
        showAlert('✅ Message sent! Thank you for reaching out!', 'success');
        console.log('📧 Form submitted:', { name, email, message });
        form.reset();
    });
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showAlert(message, type) {
    const alert = document.createElement('div');
    alert.textContent = message;
    alert.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        padding: 16px 28px;
        border-radius: 50px;
        color: white;
        font-weight: 600;
        font-size: 0.95rem;
        z-index: 10000;
        animation: alertSlideIn 0.3s ease;
        background: ${type === 'error' ? '#ff6b6b' : '#51cf66'};
        box-shadow: 0 8px 25px rgba(0,0,0,0.25);
    `;

    document.body.appendChild(alert);

    setTimeout(() => {
        alert.style.animation = 'alertSlideOut 0.3s ease';
        setTimeout(() => alert.remove(), 300);
    }, 3500);
}

// ========== SCROLL TO TOP BUTTON ==========
function setupScrollToTop() {
    const btn = document.getElementById('scrollTopBtn');
    if (!btn) return;

    btn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        console.log('↑ Scrolled to top');
    });

    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            btn.style.opacity = '1';
            btn.style.pointerEvents = 'auto';
        } else {
            btn.style.opacity = '0';
            btn.style.pointerEvents = 'none';
        }
    }, { passive: true });

    // Initially hide
    btn.style.opacity = '0';
    btn.style.pointerEvents = 'none';
    btn.style.transition = 'all 0.3s ease';
}

// ========== SCROLL ANIMATIONS ==========
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, index * 100);
            }
        });
    }, observerOptions);

    document.querySelectorAll('[id^="div"]').forEach(el => {
        el.classList.add('scroll-animate');
        observer.observe(el);
    });
}

// ========== PARALLAX EFFECT ==========
function setupParallax() {
    const photo = document.getElementById('photo');
    if (!photo) return;

    window.addEventListener('scroll', function() {
        const scrollTop = window.scrollY;
        photo.style.transform = `translateY(${scrollTop * 0.2}px)`;
    }, { passive: true });
}

// ========== BUTTON RIPPLE EFFECT ==========
function setupButtonRipples() {
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                left: ${x}px;
                top: ${y}px;
                width: 20px;
                height: 20px;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// ========== ADD ANIMATIONS ==========
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes alertSlideIn {
            from {
                opacity: 0;
                transform: translateX(100px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        @keyframes alertSlideOut {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(100px);
            }
        }

        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// ========== INITIALIZE EVERYTHING ==========
function initializePortfolio() {
    console.log('📋 Initializing Portfolio Features...');

    addAnimationStyles();
    setupDarkMode();
    setupNavigation();
    setupProjectButtons();
    setupContactForm();
    setupScrollToTop();
    setupScrollAnimations();
    setupParallax();
    setupButtonRipples();

    console.log('✅ All Portfolio Features Loaded Successfully!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📌 Features Available:');
    console.log('  ✓ Dark/Light Mode Toggle');
    console.log('  ✓ Smooth Navigation');
    console.log('  ✓ Project Links');
    console.log('  ✓ Contact Form Validation');
    console.log('  ✓ Scroll to Top');
    console.log('  ✓ Scroll Animations');
    console.log('  ✓ Parallax Effects');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
}

// Start when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePortfolio);
} else {
    initializePortfolio();
}
