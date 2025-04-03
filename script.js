// Enhanced Particle Animation
function initParticles() {
    const particlesContainer = document.getElementById('particles-js');
    if (!particlesContainer) return;

    // Clear existing particles
    particlesContainer.innerHTML = '';

    // Adjust particle count based on screen size
    const particleCount = window.innerWidth < 768 ? 30 : 60;
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random properties
        const size = Math.random() * 12 + 4;
        const posX = Math.random() * 100;
        const delay = Math.random() * 30;
        const duration = 20 + Math.random() * 40;
        const opacity = Math.random() * 0.1 + 0.05;
        
        // Apply styles
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.bottom = `-${size}px`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.opacity = opacity;
        
        // Random color variation
        const hue = 200 + Math.random() * 40; // Blue-ish range
        particle.style.backgroundColor = `hsla(${hue}, 80%, 60%, ${opacity})`;
        
        particlesContainer.appendChild(particle);
    }
}

// Initialize everything when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    
    // Re-init particles on resize
    window.addEventListener('resize', () => {
        initParticles();
    });
    
    // Page load animations
    const elements = document.querySelectorAll('.profile-logo, .title, .menu-item, .social-icon');
    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 100 * index);
    });
});
