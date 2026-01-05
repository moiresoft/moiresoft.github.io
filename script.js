// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Function to scroll to section
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Navbar scroll effect
let prevScrollpos = window.pageYOffset;
window.onscroll = function() {
    const currentScrollPos = window.pageYOffset;
    const navbar = document.querySelector('.navbar');
    
    // Add shadow on scroll
    if (currentScrollPos > 50) {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    // Hide/show navbar on scroll
    if (prevScrollpos > currentScrollPos) {
        navbar.style.top = "0";
    } else {
        navbar.style.top = "-100px";
    }
    prevScrollpos = currentScrollPos;
}

// Mobile menu toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Add mobile menu styles dynamically
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            left: -100%;
            top: 70px;
            flex-direction: column;
            background-color: white;
            width: 100%;
            text-align: center;
            transition: 0.3s;
            box-shadow: 0 10px 27px rgba(0,0,0,0.05);
            padding: 20px 0;
        }
        
        .nav-menu.active {
            left: 0;
            display: flex;
        }
        
        .nav-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .nav-toggle.active span:nth-child(1) {
            transform: translateY(8px) rotate(45deg);
        }
        
        .nav-toggle.active span:nth-child(3) {
            transform: translateY(-8px) rotate(-45deg);
        }
    }
`;
document.head.appendChild(style);

// Form submission handler
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            company: document.getElementById('company').value,
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            message: document.getElementById('message').value
        };
        
        // Here you would normally send the data to a server
        // For GitHub Pages, you can use a service like Formspree or EmailJS
        
        alert('문의가 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.\n\n' + 
              '회사: ' + formData.company + '\n' +
              '담당자: ' + formData.name + '\n' +
              '이메일: ' + formData.email);
        
        // Reset form
        contactForm.reset();
    });
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.solution-card, .feature-item, .market-card, .problem-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    observer.observe(el);
});

// Add fade-in animation styles
const animationStyle = document.createElement('style');
animationStyle.textContent = `
    .fade-in-up {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(animationStyle);

// Typing effect for hero title
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            if (text.substring(i, i + 6) === '<span>') {
                const spanEnd = text.indexOf('</span>', i) + 7;
                element.innerHTML += text.substring(i, spanEnd);
                i = spanEnd;
            } else {
                element.innerHTML += text.charAt(i);
                i++;
            }
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Apply typing effect on page load
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        typeWriter(heroTitle, originalText, 30);
    }
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.ceil(start) + (element.dataset.suffix || '');
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + (element.dataset.suffix || '');
        }
    }
    
    updateCounter();
}

// Observe stats section for counter animation
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statItems = entry.target.querySelectorAll('.stat-item h4');
            statItems.forEach(item => {
                const text = item.textContent;
                const number = parseInt(text);
                const suffix = text.replace(number.toString(), '');
                if (!isNaN(number)) {
                    item.dataset.suffix = suffix;
                    animateCounter(item, number);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add hover effect for building animation
const buildingWindows = document.querySelectorAll('.building-animation rect[fill="#0066cc"]');
buildingWindows.forEach((window, index) => {
    window.style.transition = 'all 0.3s ease';
    window.addEventListener('mouseenter', () => {
        window.style.fill = '#00cc66';
        window.style.opacity = '1';
    });
    window.addEventListener('mouseleave', () => {
        window.style.fill = '#0066cc';
        window.style.opacity = '0.6';
    });
    
    // Random blinking effect
    setInterval(() => {
        if (Math.random() > 0.8) {
            window.style.opacity = window.style.opacity === '0.6' ? '1' : '0.6';
        }
    }, 3000 + index * 500);
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Console message for developers
console.log('%c🏢 MoireSoft - 실내공간정보 전문기업', 
            'color: #0066cc; font-size: 20px; font-weight: bold;');
console.log('%c우리와 함께 실내 공간의 미래를 만들어갈 개발자를 찾고 있습니다!', 
            'color: #00cc66; font-size: 14px;');
console.log('채용 문의: recruit@moiresoft.com');