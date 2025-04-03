// Initialize particles on all pages
function initParticles() {
    const particlesContainer = document.getElementById('particles-js');
    if (!particlesContainer) return;

    const particleCount = window.innerWidth < 768 ? 20 : 30;
    const colors = ['rgba(120,120,120,0.1)', 'rgba(150,150,150,0.15)', 'rgba(100,100,100,0.12)'];

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const size = Math.random() * 8 + 4;
        const posX = Math.random() * 100;
        const delay = Math.random() * 20;
        const duration = 15 + Math.random() * 25;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.bottom = `-${size}px`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.backgroundColor = color;
        
        particlesContainer.appendChild(particle);
    }
}

// Smooth scrolling for anchor links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Page load animations
function initPageAnimations() {
    const animatables = document.querySelectorAll('.profile-logo, .title, .menu-item, .social-icon, .content-box');
    animatables.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    setTimeout(() => {
        animatables.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, 100 * index);
        });
    }, 300);
}

// Initialize everything when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    setupSmoothScrolling();
    initPageAnimations();
});
