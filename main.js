// main.js

document.addEventListener('DOMContentLoaded', () => {

    // Initialize hero entrance animation sequence
    initHeroAnimations();

    // Setup scroll observer for stats section
    setupScrollObservers();

    // Animate background shapes
    animateBackgroundShapes();

    // Setup Interactive Enhancements
    setupScrollProgress();
    setupCardTiltEffects();
    setupNavbarInteractivity();
    setupMarquee();
    setupButtonRipples();

});

function initHeroAnimations() {
    // Create an anime timeline for staggered entrance
    const heroTimeline = anime.timeline({
        easing: 'easeOutExpo',
        duration: 1000
    });

    heroTimeline
        .add({
            targets: '.navbar',
            translateY: [-50, 0],
            opacity: [0, 1],
            duration: 800
        })
        .add({
            targets: '.hero-subtitle',
            translateY: [20, 0],
            opacity: [0, 1]
        }, '-=400')
        .add({
            targets: '.hero-title',
            translateY: [20, 0],
            opacity: [0, 1]
        }, '-=800')
        .add({
            targets: '.hero-description',
            translateY: [20, 0],
            opacity: [0, 1]
        }, '-=800')
        .add({
            targets: '.hero-cta',
            translateY: [20, 0],
            opacity: [0, 1]
        }, '-=800')
        .add({
            targets: '.hero-image-wrapper',
            scale: [0.95, 1],
            opacity: [0, 1],
            duration: 1200
        }, '-=1000')
        .add({
            targets: '.floating-badge',
            translateY: [20, 0],
            opacity: [0, 1],
            duration: 800
        }, '-=800');
}

function animateBackgroundShapes() {
    // Gentle floating animation to the abstract background shapes
    anime({
        targets: '.shape-1',
        translateX: () => anime.random(-30, 30),
        translateY: () => anime.random(-30, 30),
        scale: () => anime.random(90, 110) / 100,
        rotate: () => anime.random(-15, 15),
        duration: () => anime.random(4000, 7000),
        easing: 'easeInOutSine',
        direction: 'alternate',
        loop: true
    });

    anime({
        targets: '.shape-2',
        translateX: () => anime.random(-40, 40),
        translateY: () => anime.random(-40, 40),
        scale: () => anime.random(90, 120) / 100,
        duration: () => anime.random(5000, 8000),
        easing: 'easeInOutQuad',
        direction: 'alternate',
        loop: true
    });

    anime({
        targets: '.shape-3',
        translateX: () => anime.random(-50, 50),
        translateY: () => anime.random(-20, 20),
        scale: () => anime.random(80, 110) / 100,
        duration: () => anime.random(4500, 6500),
        easing: 'easeInOutCubic',
        direction: 'alternate',
        loop: true
    });

    // Add interactive parallax and dynamic color shifting to shapes based on mouse movement
    document.addEventListener('mousemove', (e) => {
        const xPos = (e.clientX / window.innerWidth) - 0.5;
        const yPos = (e.clientY / window.innerHeight) - 0.5;
        
        // Interactive parallax for shapes
        anime({
            targets: '.shape-1',
            translateX: xPos * -50,
            translateY: yPos * -50,
            duration: 800,
            easing: 'easeOutQuad'
        });
        
        anime({
            targets: '.shape-2',
            translateX: xPos * 60,
            translateY: yPos * 60,
            duration: 900,
            easing: 'easeOutQuad'
        });
        
        anime({
            targets: '.shape-3',
            translateX: xPos * -80,
            translateY: yPos * -80,
            duration: 1000,
            easing: 'easeOutQuad'
        });

        // Dynamic subtly shifting pastel background based on cursor position
        const hueShift = Math.floor(xPos * 30); // +/- 15 degrees hue shift
        document.documentElement.style.setProperty('--clr-bg', `hsl(${40 + hueShift}, 80%, 98%)`); // Warm off-white shift
    });
}

function setupScrollObservers() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    let hasAnimatedStats = false;

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {

                // Animate stats cards if they come into view
                if (entry.target.classList.contains('stats') && !hasAnimatedStats) {
                    hasAnimatedStats = true;

                    // Animate the cards in staggering progression
                    anime({
                        targets: '.stat-card',
                        translateY: [30, 0],
                        opacity: [0, 1],
                        delay: anime.stagger(150),
                        duration: 800,
                        easing: 'easeOutQuart'
                    });

                    // Number counter animation (optional enhancement)
                    const numbers = document.querySelectorAll('.stat-number');
                    numbers.forEach(el => {
                        const originalText = el.innerText;
                        const match = originalText.match(/^([0-9]+)(.*)$/);
                        if (match) {
                            const val = parseInt(match[1], 10);
                            const suffix = match[2] || '';

                            anime({
                                targets: {
                                    prop: 0
                                },
                                prop: val,
                                duration: 1500,
                                easing: 'easeOutExpo',
                                round: 1,
                                update: function (anim) {
                                    el.innerHTML = anim.animations[0].currentValue + suffix;
                                }
                            });
                        }
                    });
                }

                // Animate About Section Elements
                if (entry.target.classList.contains('about')) {
                    anime({
                        targets: '.about-image-wrapper',
                        translateX: [-30, 0],
                        opacity: [0, 1],
                        duration: 800,
                        easing: 'easeOutQuart'
                    });
                    
                    anime({
                        targets: '.about-text',
                        translateX: [30, 0],
                        opacity: [0, 1],
                        duration: 800,
                        delay: 200,
                        easing: 'easeOutQuart'
                    });
                    
                    observer.unobserve(entry.target);
                }

                // Animate Notice Cards
                if (entry.target.classList.contains('notices')) {
                    anime({
                        targets: '.notice-card',
                        translateY: [30, 0],
                        opacity: [0, 1],
                        delay: anime.stagger(150),
                        duration: 800,
                        easing: 'easeOutQuart'
                    });
                    
                    observer.unobserve(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe sections
    document.querySelectorAll('.stats, .about, .notices').forEach(section => {
        observer.observe(section);
    });
}

function setupScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress');
    
    if (!progressBar) return;
    
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;
        
        const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
        
        progressBar.style.width = `${scrollPercentage}%`;
    });
}

function setupCardTiltEffects() {
    const cards = document.querySelectorAll('.stat-card, .glass-card, .notice-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -10; // Max rotation 10deg
            const rotateY = ((x - centerX) / centerX) * 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            card.style.transition = 'transform 0.5s ease-out';
        });
        
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'none'; // Disable transition for snappy following
        });
    });
}

function setupNavbarInteractivity() {
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // Add shadow and blur on scroll (Refined Apple Liquid Glass)
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.75)';
            navbar.style.boxShadow = '0 12px 40px 0 rgba(0, 0, 0, 0.08), inset 0 1px 0 0 rgba(255, 255, 255, 1), inset 0 -1px 0 0 rgba(255, 255, 255, 0.5), inset 0 0 20px rgba(255, 255, 255, 0.3)';
            navbar.style.borderBottom = '1px solid rgba(200, 200, 200, 0.5)';
        } else {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
            navbar.style.boxShadow = '0 8px 32px 0 rgba(0, 0, 0, 0.05), inset 0 1px 0 0 rgba(255, 255, 255, 0.9), inset 0 -1px 0 0 rgba(255, 255, 255, 0.4), inset 0 0 20px rgba(255, 255, 255, 0.15)';
            navbar.style.borderBottom = '1px solid rgba(200, 200, 200, 0.3)';
        }
        
        // Highlight active section link
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
}

function setupMarquee() {
    const container = document.getElementById('marquee-container');
    const track = document.getElementById('marquee-track');
    if (!container || !track) return;

    // Clone items more times for wider screens to ensure infinite scroll doesn't break
    const items = [...track.children];
    for(let i=0; i<3; i++){
        items.forEach(item => {
            const clone = item.cloneNode(true);
            track.appendChild(clone);
        });
    }

    let position = 0;
    let speed = 1.5; 
    let targetSpeed = 1.5;

    // Control speed and direction using mouse position relative to center of container
    container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const centerX = rect.width / 2;
        
        // Normalized is -1 at left edge, 0 at center, 1 at right edge
        const normalized = (mouseX - centerX) / centerX; 
        
        targetSpeed = normalized * 6; // max speed 6px per frame
    });

    container.addEventListener('mouseleave', () => {
        targetSpeed = 1.5; // restore default right-to-left slow scroll
    });

    function animateMarquee() {
        speed += (targetSpeed - speed) * 0.05; // smooth easing
        
        position -= speed;
        
        // Need to calculate the total width of one original set of items
        const originalItemsCount = items.length;
        let setWidth = 0;
        
        // We calculate dynamically in case images load late
        if (items[0]) {
             const gap = parseInt(window.getComputedStyle(track).gap) || 40;
             setWidth = (items[0].offsetWidth + gap) * originalItemsCount;
        }

        if (setWidth > 0) {
            // Reset position for infinite effect
            if (position <= -setWidth) {
                position += setWidth;
            } else if (position > 0) {
                position -= setWidth;
            }
        }

        track.style.transform = `translateX(${position}px)`;
        requestAnimationFrame(animateMarquee);
    }

    animateMarquee();
}

function setupButtonRipples() {
    const buttons = document.querySelectorAll('.primary-btn, .secondary-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const x = e.clientX - e.target.getBoundingClientRect().left;
            const y = e.clientY - e.target.getBoundingClientRect().top;
            
            const ripples = document.createElement('span');
            ripples.style.left = x + 'px';
            ripples.style.top = y + 'px';
            ripples.classList.add('ripple-effect');
            
            this.appendChild(ripples);
            
            setTimeout(() => {
                ripples.remove();
            }, 600);
        });
    });
}
