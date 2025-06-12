// Loading Screen
window.addEventListener('load', () => {
    const loading = document.querySelector('.loading');
    setTimeout(() => {
        loading.classList.add('hidden');
    }, 1000);
});

// Initialize Swiper Carousel
const swiper = new Swiper('.swiper', {
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    }
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                navLinks.style.display = 'none';
            }
        }
    });
});

// Animate Service Steps
const animateServiceSteps = () => {
    const steps = document.querySelectorAll('.animation-step');
    steps.forEach((step, index) => {
        setTimeout(() => {
            step.classList.add('active');
        }, index * 1000);
    });
};

// Reset and replay service animations when in view
const serviceCards = document.querySelectorAll('.service-card');
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const serviceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const steps = entry.target.querySelectorAll('.animation-step');
            steps.forEach(step => step.classList.remove('active'));
            setTimeout(animateServiceSteps, 500);
        }
    });
}, observerOptions);

serviceCards.forEach(card => serviceObserver.observe(card));

// Form Submission Handling
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        service: document.getElementById('service').value,
        message: document.getElementById('message').value
    };

    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    
    // Show success message with animation
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = 'Thank you for your message! We will get back to you soon.';
    contactForm.appendChild(successMessage);
    
    // Remove success message after 3 seconds
    setTimeout(() => {
        successMessage.remove();
    }, 3000);
    
    // Reset form
    contactForm.reset();
});

// Enhanced scroll animations
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service-card, .pricing-card, .portfolio-item, .stat-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initialize scroll animations
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Animate statistics numbers
const animateNumbers = () => {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        let current = 0;
        const increment = target / 50;
        const duration = 2000;
        const interval = duration / 50;
        
        const counter = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target + '+';
                clearInterval(counter);
            } else {
                stat.textContent = Math.floor(current) + '+';
            }
        }, interval);
    });
};

// Trigger number animation when stats section is in view
const statsSection = document.querySelector('.hero-stats');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateNumbers();
            statsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

if (statsSection) {
    statsObserver.observe(statsSection);
}

// Add portfolio items dynamically
const portfolioItems = [
    {
        title: 'E-commerce Website',
        category: 'Web Development',
        image: 'path/to/image1.jpg',
        description: 'A modern e-commerce platform with advanced features'
    },
    {
        title: 'Data Analysis Dashboard',
        category: 'Data Science',
        image: 'path/to/image2.jpg',
        description: 'Interactive dashboard for business analytics'
    },
    {
        title: 'Village Community Portal',
        category: 'Web Development',
        image: 'path/to/image3.jpg',
        description: 'Community platform for village residents'
    }
];

const portfolioGrid = document.querySelector('.portfolio-grid');

// Function to create portfolio items with enhanced animations
const createPortfolioItems = () => {
    portfolioItems.forEach((item, index) => {
        const portfolioItem = document.createElement('div');
        portfolioItem.className = 'portfolio-item';
        portfolioItem.style.opacity = '0';
        portfolioItem.style.transform = 'translateY(20px)';
        portfolioItem.style.transition = 'all 0.5s ease';
        portfolioItem.style.transitionDelay = `${index * 0.2}s`;
        
        portfolioItem.innerHTML = `
            <div class="portfolio-image">
                <img src="${item.image}" alt="${item.title}">
                <div class="portfolio-overlay">
                    <h3>${item.title}</h3>
                    <p>${item.category}</p>
                    <p class="description">${item.description}</p>
                </div>
            </div>
        `;
        
        portfolioGrid.appendChild(portfolioItem);
    });
};

// Call the function when the page loads
window.addEventListener('load', createPortfolioItems);

// Add active state to navigation links based on scroll position
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
}); 