/* ============================================
   Dark Theme JavaScript
   Animations and Interactivity
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // Initialize theme from localStorage or default to light mode
    initializeTheme();

    // Smooth scroll for anchor links
    initSmoothScroll();

    // Add scroll effect to navbar
    addNavbarScrollEffect();

    // Add interactive elements
    addInteractiveEffects();

    // Initialize tooltips if needed
    initializeTooltips();
});

/**
 * Initialize theme from localStorage
 */
function initializeTheme() {
    const themeToggleBtn = document.getElementById('themeToggle');
    const navbar = document.getElementById('mainNavbar');
    const logo = document.getElementById('logoImage');
    const savedTheme = localStorage.getItem('theme') || 'light';

    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        if (navbar) {
            navbar.classList.add('navbar-dark');
        }
        if (logo) {
            logo.src = 'assets/img/logo-dark.svg';
        }
        updateThemeIcon(true);
    } else {
        if (logo) {
            logo.src = 'assets/img/logo.svg';
        }
        updateThemeIcon(false);
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleTheme);
    }
}

/**
 * Toggle between light and dark theme
 */
function toggleTheme() {
    const body = document.body;
    const navbar = document.getElementById('mainNavbar');
    const logo = document.getElementById('logoImage');
    const isDark = body.classList.toggle('dark-theme');

    // Update navbar
    if (navbar) {
        if (isDark) {
            navbar.classList.add('navbar-dark');
        } else {
            navbar.classList.remove('navbar-dark');
        }
    }

    // Update logo
    if (logo) {
        if (isDark) {
            logo.src = 'assets/img/logo-dark.svg';
        } else {
            logo.src = 'assets/img/logo.svg';
        }
    }

    // Save preference to localStorage
    localStorage.setItem('theme', isDark ? 'dark' : 'light');

    // Update icon
    updateThemeIcon(isDark);
}

/**
 * Update theme toggle icon
 */
function updateThemeIcon(isDark) {
    const themeToggleBtn = document.getElementById('themeToggle');
    if (themeToggleBtn) {
        const icon = themeToggleBtn.querySelector('i');
        if (isDark) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#' || href === '') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Add scroll effect to navbar
 */
function addNavbarScrollEffect() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 212, 255, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });
}

/**
 * Add interactive effects to buttons and cards
 */
function addInteractiveEffects() {
    // Button ripple effect
    const buttons = document.querySelectorAll('.btn, .btn-icon-link, .btn-icon-sm');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });

    // Card hover effects
    const cards = document.querySelectorAll('.feature-box, .team-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });

    // Add parallax effect to hero graphic
    const heroGraphic = document.querySelector('.hero-graphic');
    if (heroGraphic) {
        window.addEventListener('mousemove', function(e) {
            const x = (window.innerWidth - e.clientX) / 100;
            const y = (window.innerHeight - e.clientY) / 100;
            
            heroGraphic.style.transform = `translate(${x * 5}px, ${y * 5}px)`;
        });
    }
}

/**
 * Initialize tooltips
 */
function initializeTooltips() {
    // Bootstrap tooltips initialization if needed
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

/**
 * Utility: Add class to element
 */
function addClass(element, className) {
    if (element && !element.classList.contains(className)) {
        element.classList.add(className);
    }
}

/**
 * Utility: Remove class from element
 */
function removeClass(element, className) {
    if (element && element.classList.contains(className)) {
        element.classList.remove(className);
    }
}

/**
 * Utility: Toggle class on element
 */
function toggleClass(element, className) {
    if (element) {
        element.classList.toggle(className);
    }
}

/**
 * Scroll to element
 */
function scrollToElement(selector) {
    const element = document.querySelector(selector);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

/**
 * Detect when element is in viewport
 */
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Counter animation for statistics
 */
function animateCounter(element, target, duration = 2000) {
    if (!element || element.dataset.animated) return;
    
    element.dataset.animated = true;
    const start = 0;
    const range = target - start;
    const increment = range / (duration / 16);
    let current = start;

    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

/**
 * Add click handler for smooth navigation
 */
document.addEventListener('click', function(e) {
    // Handle navigation clicks
    if (e.target.matches('[data-scroll]')) {
        const selector = e.target.dataset.scroll;
        scrollToElement(selector);
    }
});

/**
 * Handle mobile menu closing on link click
 */
document.addEventListener('click', function(e) {
    const navbar = document.querySelector('.navbar-collapse');
    const toggle = document.querySelector('.navbar-toggler');
    
    if (navbar && navbar.classList.contains('show')) {
        if (e.target.matches('.nav-link') || e.target.matches('[data-bs-toggle="collapse"]')) {
            // Menu will auto-close due to Bootstrap
        }
    }
});

/**
 * Lazy load images
 */
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Call lazy load on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', lazyLoadImages);
} else {
    lazyLoadImages();
}

/**
 * Add active state to navigation based on scroll position
 */
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
            link.style.color = 'var(--primary)';
        } else {
            link.style.color = '';
        }
    });
});

/**
 * Console message for developers
 */
console.log('%c BackAppX - Modern Backend as a Service ', 'background: linear-gradient(135deg, #00d4ff, #8338ec); color: white; padding: 10px 20px; font-weight: bold; border-radius: 5px;');
console.log('%c Thank you for visiting! Check out our documentation and GitHub repository.', 'color: #00d4ff; font-size: 12px;');

