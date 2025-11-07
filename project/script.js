function createStars() {
    const starsContainer = document.querySelector('.stars');
    const numberOfStars = 100;

    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';

        const size = Math.random() * 3;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = 2 + Math.random() * 3;
        const delay = Math.random() * 5;

        star.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: white;
            border-radius: 50%;
            left: ${x}%;
            top: ${y}%;
            animation: twinkle ${duration}s infinite ${delay}s;
            box-shadow: 0 0 ${size * 2}px rgba(255, 255, 255, 0.8);
        `;

        starsContainer.appendChild(star);
    }
}

const style = document.createElement('style');
style.textContent = `
    @keyframes twinkle {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 1; }
    }
`;
document.head.appendChild(style);

createStars();

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 1s ease-out forwards';
        }
    });
}, observerOptions);

document.querySelectorAll('.image-break, .memory-card, .quote-section').forEach(el => {
    observer.observe(el);
});

document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    document.querySelector('.letter-wrapper').style.transform =
        `perspective(1000px) rotateY(${(mouseX - 0.5) * 2}deg) rotateX(${(mouseY - 0.5) * -2}deg)`;
});

document.querySelector('.letter-wrapper').addEventListener('mouseleave', () => {
    document.querySelector('.letter-wrapper').style.transform =
        'perspective(1000px) rotateY(0deg) rotateX(0deg)';
});
