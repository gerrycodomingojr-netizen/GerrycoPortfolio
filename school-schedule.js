// ============================================
// SCHEDULE PAGE FUNCTIONALITY
// ============================================

// ============================================
// HAMBURGER MENU FUNCTIONALITY
// ============================================

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// ============================================
// TABLE HIGHLIGHTING
// ============================================

const scheduleTable = document.getElementById('scheduleTable');

if (scheduleTable) {
    // Highlight cells on hover
    const tableCells = scheduleTable.querySelectorAll('td');
    
    tableCells.forEach(cell => {
        cell.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.2s ease';
            this.style.transform = 'scale(1.05)';
        });

        cell.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

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

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// ============================================
// INTERACTIVE TIPS CARDS
// ============================================

const tipCards = document.querySelectorAll('.tip-card');

tipCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ============================================
// SOCIAL CARD ANIMATIONS
// ============================================

const socialCards = document.querySelectorAll('.social-card');

socialCards.forEach(card => {
    card.addEventListener('click', function(e) {
        if (this.href && !this.href.includes('mailto:')) {
            e.preventDefault();
            // Add animation before redirect
            this.style.animation = 'bounce 0.6s ease';
            
            setTimeout(() => {
                window.open(this.href, '_blank');
            }, 300);
        }
    });

    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// ============================================
// STAT CARDS COUNTER ANIMATION
// ============================================

const statCards = document.querySelectorAll('.stat-card');

const countUp = (element, target, duration = 1500) => {
    let current = 0;
    const increment = target / (duration / 50);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 50);
};

// Trigger counter on scroll
let hasCountedUp = false;

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !hasCountedUp) {
            hasCountedUp = true;
            
            const statsSection = document.querySelector('.class-stats');
            if (statsSection) {
                const numbers = statsSection.querySelectorAll('.stat-number');
                const targets = [3, 1, 2, 4]; // Corresponding to total, online, f2f, rest
                
                numbers.forEach((num, index) => {
                    countUp(num, targets[index]);
                });
            }
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.class-stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// ============================================
// ACTIVE NAV LINK DETECTION
// ============================================

function updateActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', updateActiveNavLink);

// ============================================
// SCROLL TO TOP BUTTON
// ============================================

const scrollButton = document.createElement('button');
scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollButton.className = 'scroll-to-top';
scrollButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #6366f1, #ec4899);
    color: white;
    border: none;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    z-index: 99;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
`;

document.body.appendChild(scrollButton);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollButton.style.display = 'flex';
    } else {
        scrollButton.style.display = 'none';
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

// ============================================
// PAGE LOAD ANIMATION
// ============================================

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

console.log('📅 Welcome to the Schedule Page! - Schedule JS loaded successfully');