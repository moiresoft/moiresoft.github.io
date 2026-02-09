// Current business tab state
let currentBusiness = 'building';

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

// Business tab switching function
function switchBusiness(businessType) {
    currentBusiness = businessType;
    
    // Hide all business content
    const contents = document.querySelectorAll('.business-content');
    contents.forEach(content => {
        content.classList.remove('active');
    });
    
    // Remove active class from all tab buttons
    const buttons = document.querySelectorAll('.tab-button');
    buttons.forEach(button => {
        button.classList.remove('active');
    });
    
    // Show selected business content
    const selectedContent = document.getElementById(`${businessType}-content`);
    if (selectedContent) {
        selectedContent.classList.add('active');
    }
    
    // Add active class to selected button
    const selectedButton = document.querySelector(`[onclick="switchBusiness('${businessType}')"]`);
    if (selectedButton) {
        selectedButton.classList.add('active');
    }
    
    // Scroll to business section
    scrollToSection('business');
    
    // Update page URL hash without triggering scroll
    const newHash = `#business-${businessType}`;
    if (history.pushState) {
        history.pushState(null, null, newHash);
    } else {
        location.hash = newHash;
    }
    
    // Trigger animations for new content
    setTimeout(() => {
        animateVisibleElements();
    }, 100);
}

// Check URL hash on page load
function checkUrlHash() {
    const hash = window.location.hash;
    if (hash.includes('business-building')) {
        switchBusiness('building');
    } else if (hash.includes('business-office')) {
        switchBusiness('office');
    }
}

// Navbar scroll effect
let prevScrollpos = window.pageYOffset;
window.onscroll = function() {
    const currentScrollPos = window.pageYOffset;
    const navbar = document.querySelector('.navbar');
    
    // Add shadow on scroll
    if (currentScrollPos > 50) {
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.15)';
    } else {
        navbar.style.boxShadow = 'var(--shadow)';
    }
    
    // Hide/show navbar on scroll (only on mobile)
    if (window.innerWidth <= 768) {
        if (prevScrollpos > currentScrollPos || currentScrollPos < 100) {
            navbar.style.top = "0";
        } else {
            navbar.style.top = "-100px";
        }
    }
    prevScrollpos = currentScrollPos;
    
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero && currentScrollPos < window.innerHeight) {
        hero.style.transform = `translateY(${currentScrollPos * 0.3}px)`;
    }
}

// Mobile menu toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
}

// Form submission handler
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            businessType: document.getElementById('business-type').value,
            company: document.getElementById('company').value,
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            message: document.getElementById('message').value
        };
        
        // Validate required fields
        if (!formData.businessType || !formData.company || !formData.name || !formData.email) {
            alert('필수 항목을 모두 입력해주세요.');
            return;
        }
        
        // Here you would normally send the data to a server
        // For GitHub Pages, you can use a service like Formspree or EmailJS
        
        const businessTypeName = formData.businessType === 'building' ? '건물 관리 자동화 & 실내 네비게이션' : 
                                 formData.businessType === 'office' ? '사무 자동화' : '두 분야 모두';
        
        alert(`AI 자동화 상담 신청이 접수되었습니다!\n\n` + 
              `관심 분야: ${businessTypeName}\n` +
              `회사: ${formData.company}\n` +
              `담당자: ${formData.name}\n` +
              `이메일: ${formData.email}\n\n` +
              `48시간 내에 AI 전문가가 연락드리겠습니다.`);
        
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
            // Add staggered animation for grids
            if (entry.target.closest('.problem-grid') || 
                entry.target.closest('.solution-grid') || 
                entry.target.closest('.market-grid')) {
                const siblings = Array.from(entry.target.parentNode.children);
                const index = siblings.indexOf(entry.target);
                entry.target.style.animationDelay = `${index * 0.1}s`;
            }
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Animate visible elements function
function animateVisibleElements() {
    const elementsToAnimate = document.querySelectorAll('.solution-card, .feature-item, .market-card, .problem-item');
    elementsToAnimate.forEach((el, index) => {
        if (el.closest('.business-content.active') || !el.closest('.business-content')) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease';
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}

// Observe elements on page load
document.addEventListener('DOMContentLoaded', function() {
    const elementsToObserve = document.querySelectorAll('.solution-card, .feature-item, .market-card, .problem-item');
    elementsToObserve.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000, suffix = '') {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            if (suffix === '%') {
                element.textContent = Math.ceil(start) + suffix;
            } else if (suffix === '/7') {
                element.textContent = '24' + suffix;
            } else {
                element.textContent = Math.ceil(start) + suffix;
            }
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + suffix;
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
                if (text.includes('70%')) {
                    animateCounter(item, 70, 2000, '%');
                } else if (text.includes('50%')) {
                    animateCounter(item, 50, 2000, '%');
                } else if (text.includes('24/7')) {
                    item.textContent = '24/7';
                } else {
                    const number = parseInt(text);
                    const suffix = text.replace(number.toString(), '');
                    if (!isNaN(number)) {
                        animateCounter(item, number, 2000, suffix);
                    }
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

// Typing effect for hero title - HTML 태그 지원
function typeWriter(element, text, speed = 50) {
    let i = 0;
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = text;
    const plainText = tempDiv.textContent || tempDiv.innerText || '';
    
    element.innerHTML = '';
    
    function type() {
        if (i < plainText.length) {
            let currentChar = plainText.charAt(i);
            element.innerHTML = text.substring(0, getHtmlIndex(i + 1));
            i++;
            setTimeout(type, speed);
        }
    }
    
    function getHtmlIndex(textIndex) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = text;
        const walker = document.createTreeWalker(
            tempDiv,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );
        
        let currentLength = 0;
        let node;
        let lastNode = tempDiv;
        
        while (node = walker.nextNode()) {
            const nodeLength = node.textContent.length;
            if (currentLength + nodeLength >= textIndex) {
                const offset = textIndex - currentLength;
                node.textContent = node.textContent.substring(0, offset);
                break;
            }
            currentLength += nodeLength;
        }
        
        return tempDiv.innerHTML;
    }
    
    type();
}

// AI animation effects
function initAiAnimations() {
    // Animate AI brain neurons
    const brainElements = document.querySelectorAll('.ai-animation circle, .ai-animation line');
    brainElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            element.style.opacity = element.tagName === 'line' ? '0.7' : '1';
        }, index * 200);
    });
    
    // Random blinking effect for automation symbols
    const automationSymbols = document.querySelectorAll('.float-animation');
    automationSymbols.forEach((symbol, index) => {
        setInterval(() => {
            if (Math.random() > 0.7) {
                symbol.style.opacity = symbol.style.opacity === '0.3' ? '0.7' : '0.3';
                setTimeout(() => {
                    symbol.style.opacity = '0.7';
                }, 500);
            }
        }, 2000 + index * 1000);
    });
}

// Initialize everything when page loads
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Check URL hash for business tab
    checkUrlHash();
    
    // Initialize AI animations
    initAiAnimations();
    
    // Animate initial elements
    setTimeout(() => {
        animateVisibleElements();
    }, 1000);
});

// Handle browser back/forward buttons
window.addEventListener('popstate', function(e) {
    checkUrlHash();
});

// Easter egg for developers
console.log('%c🤖 MoireSoft - AI 에이전트 기반 자동화 솔루션', 
            'color: #0066cc; font-size: 24px; font-weight: bold;');
console.log('%c우리와 함께 AI의 미래를 만들어갈 개발자를 찾고 있습니다!', 
            'color: #00cc66; font-size: 16px;');
console.log('%c현재 모집 분야:', 'color: #ff6b35; font-size: 14px; font-weight: bold;');
console.log('• AI/ML 엔지니어\n• 풀스택 개발자\n• UI/UX 디자이너\n• 데이터 사이언티스트');
console.log('채용 문의: recruit@moiresoft.com');

// Add some fun interactions
document.addEventListener('keydown', function(e) {
    // Konami code easter egg
    if (e.ctrlKey && e.shiftKey && e.code === 'KeyA') {
        document.body.style.filter = 'hue-rotate(180deg)';
        setTimeout(() => {
            document.body.style.filter = 'none';
        }, 2000);
        console.log('🎉 AI 모드 활성화! 2초 후 정상으로 돌아갑니다.');
    }
});

// Smooth business type selection based on current section
function autoSelectBusiness() {
    const businessSection = document.getElementById('business');
    if (!businessSection) return;
    
    const rect = businessSection.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
    
    if (isVisible && window.location.hash === '') {
        // Auto-select based on time of day or random
        const hour = new Date().getHours();
        const suggestedBusiness = hour < 12 ? 'building' : 'office';
        if (currentBusiness !== suggestedBusiness) {
            setTimeout(() => {
                switchBusiness(suggestedBusiness);
            }, 1000);
        }
    }
}

// Performance optimization: throttle scroll events
let scrollTimer = null;
window.addEventListener('scroll', function() {
    if (scrollTimer !== null) {
        clearTimeout(scrollTimer);        
    }
    scrollTimer = setTimeout(function() {
        autoSelectBusiness();
    }, 150);
});

// Add ripple effect to buttons
document.querySelectorAll('.btn, .tab-button').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple effect styles
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .btn, .tab-button {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        background: rgba(255,255,255,0.4);
        border-radius: 50%;
        transform: scale(0);
        animation: rippleEffect 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes rippleEffect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .fade-in-up {
        animation: fadeInUp 0.8s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(40px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(rippleStyle);