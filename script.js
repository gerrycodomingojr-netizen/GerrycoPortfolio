// ============================================
// GLOBAL STATE & VARIABLES
// ============================================

const state = {
    currentPage: getCurrentPage(),
    isScrolling: false,
    isMobileMenuOpen: false,
    scrollPosition: 0
};

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', initializePortfolio);

function initializePortfolio() {
    setupScrollObserver();
    setupNavigation();
    setupMobileMenu();
    setupScrollToTop();
    setupPagination();
    setupFAQ();
    setupAnimations();
    updateActiveNavLink();
    console.log('✨ Portfolio initialized successfully!');
}

// ============================================
// HELPER FUNCTIONS
// ============================================

function getCurrentPage() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    return path.replace('.html', '');
}

function getPageTitle(page) {
    const titles = {
        'index': 'Home',
        'about_me': 'About Me',
        'page2': 'Schedule',
        'page3': 'Contact'
    };
    return titles[page] || page;
}

function getPageNumber(page) {
    const pages = {
        'index': 1,
        'about_me': 2,
        'page2': 3,
        'page3': 4
    };
    return pages[page] || 1;
}

// ============================================
// SCROLL OBSERVER - ANIMATE ON SCROLL
// ============================================

function setupScrollObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Observe feature cards
    document.querySelectorAll('[data-feature]').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Observe talent cards
    document.querySelectorAll('[data-talent]').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
}

// ============================================
// NAVIGATION
// ============================================

function setupNavigation() {
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Logo click to home
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', () => {
            navigateToPage('index.html');
        });
    }
}

function updateActiveNavLink() {
    const currentPage = state.currentPage;
    const pageMap = {
        'index': 'home',
        'about_me': 'about',
        'page2': 'schedule',
        'page3': 'contact'
    };

    document.querySelectorAll('.nav-link').forEach(link => {
        const dataPage = link.getAttribute('data-page');
        const href = link.getAttribute('href');
        const currentDataPage = pageMap[currentPage];

        if (dataPage === currentDataPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// ============================================
// MOBILE MENU
// ============================================

function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            state.isMobileMenuOpen = !state.isMobileMenuOpen;
        });

        // Close menu when a link is clicked
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                state.isMobileMenuOpen = false;
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                state.isMobileMenuOpen = false;
            }
        });
    }
}

// ============================================
// PAGINATION
// ============================================

function setupPagination() {
    const paginationBtns = document.querySelectorAll('[data-page]');
    const currentPageNumber = getPageNumber(state.currentPage);

    paginationBtns.forEach(btn => {
        const pageNum = btn.getAttribute('data-page');
        if (parseInt(pageNum) === currentPageNumber) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Setup prev/next buttons
    const prevBtn = document.querySelector('.pagination-btn.prev');
    const nextBtn = document.querySelector('.pagination-btn.next');
    const infoSpan = document.querySelector('.pagination-info');

    if (infoSpan) {
        infoSpan.textContent = `Page ${currentPageNumber} of 4`;
    }
}

// ============================================
// ANIMATIONS
// ============================================

function setupAnimations() {
    // Talent cards hover effect
    setupTalentCardAnimations();

    // Hobby items click effect
    setupHobbyItemAnimations();

    // Contact link animations
    setupContactLinkAnimations();

    // Feature card animations
    setupFeatureCardAnimations();

    // Next card animations
    setupNextCardAnimations();
}

function setupTalentCardAnimations() {
    const talentCards = document.querySelectorAll('.talent-card');

    talentCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            talentCards.forEach(c => c.style.transform = '');
            this.style.transform = 'scale(1.05)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

function setupHobbyItemAnimations() {
    const hobbyItems = document.querySelectorAll('.hobby-item');

    hobbyItems.forEach(item => {
        item.addEventListener('click', function() {
            this.style.animation = 'none';
            void this.offsetWidth;
            this.style.animation = 'bounce 0.6s ease';

            setTimeout(() => {
                this.style.animation = '';
            }, 600);
        });
    });

    // Add bounce animation to style
    if (!document.querySelector('style[data-bounce]')) {
        const style = document.createElement('style');
        style.setAttribute('data-bounce', 'true');
        style.textContent = `
            @keyframes bounce {
                0%, 100% { transform: scale(1) translateY(0); }
                25% { transform: scale(1.05) translateY(-10px); }
                50% { transform: scale(1.1) translateY(-20px); }
                75% { transform: scale(1.05) translateY(-10px); }
            }
        `;
        document.head.appendChild(style);
    }
}

function setupContactLinkAnimations() {
    const contactLinks = document.querySelectorAll('.contact-link');

    contactLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1.3) rotate(5deg)';
            }
        });

        link.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
    });
}

function setupFeatureCardAnimations() {
    const featureCards = document.querySelectorAll('.feature-card');

    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

function setupNextCardAnimations() {
    const nextCards = document.querySelectorAll('.next-card');

    nextCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// ============================================
// SCROLL TO TOP BUTTON
// ============================================

function setupScrollToTop() {
    const scrollButton = document.querySelector('.scroll-to-top');

    if (!scrollButton) {
        const button = document.createElement('button');
        button.className = 'scroll-to-top';
        button.innerHTML = '<i class="fas fa-arrow-up"></i>';
        button.title = 'Scroll to top';
        document.body.appendChild(button);

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                button.classList.add('show');
            } else {
                button.classList.remove('show');
            }
        });

        button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) translateY(-5px)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    } else {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollButton.classList.add('show');
            } else {
                scrollButton.classList.remove('show');
            }
        });

        scrollButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        scrollButton.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) translateY(-5px)';
        });

        scrollButton.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
}

// ============================================
// FAQ ACCORDION
// ============================================

function setupFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        if (question) {
            question.addEventListener('click', () => {
                // Close other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });

                // Toggle current item
                item.classList.toggle('active');
            });
        }
    });
}

// ============================================
// PAGE NAVIGATION
// ============================================

function navigateToPage(url) {
    const transition = document.querySelector('.page-transition');

    if (transition) {
        transition.classList.add('active');
    }

   setTimeout(() => {
    window.location.href = url;
}, 0);
}