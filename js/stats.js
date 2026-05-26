document.addEventListener('DOMContentLoaded', () => {
    initCounters();
});

function initCounters() {
    const counters = document.querySelectorAll('.stat-counter');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'), 10);
        const duration = 2000;
        const frameRate = 1000 / 60;
        const totalFrames = Math.round(duration / frameRate);
        let frame = 0;

        const countUp = () => {
            frame++;
            const progress = frame / totalFrames;
            const currentCount = Math.round(target * progress);

            if (frame < totalFrames) {
                counter.textContent = formatNumber(currentCount);
                requestAnimationFrame(countUp);
            } else {
                counter.textContent = formatNumber(target);
            }
        };

        requestAnimationFrame(countUp);
    };

    const formatNumber = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        counters.forEach(counter => observer.observe(counter));
    } else {
        counters.forEach(counter => animateCounter(counter));
    }
}