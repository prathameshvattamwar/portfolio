// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    window.addEventListener('load', function() {
        setTimeout(function() {
            document.querySelector('.preloader').classList.add('fade-out');
        }, 500);
    });

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Theme Switcher
    const themeToggle = document.querySelector('.theme-switch');
    const themeIcon = document.querySelector('.theme-icon i');
    
    // Check if user has previously set a theme preference
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        
        if (document.body.classList.contains('dark-theme')) {
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });

    // Tabs Functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to current button and content
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Project Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Remove active class from all filter buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter projects
            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category');
                
                if (filter === 'all') {
                    card.style.display = 'block';
                } else if (categories.includes(filter)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Achievements Slider
    const sliderContainer = document.querySelector('.slider-container');
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');
    const sliderDots = document.querySelector('.slider-dots');
    const certificates = document.querySelectorAll('.certificate-card');
    
    // Initialize the slider pagination
    function initSlider() {
        // Create dots based on number of certificates
        for (let i = 0; i < Math.ceil(certificates.length / 3); i++) {
            const dot = document.createElement('div');
            dot.classList.add('slider-dot');
            if (i === 0) dot.classList.add('active');
            dot.setAttribute('data-index', i);
            sliderDots.appendChild(dot);
        }
        
        updateSliderVisibility(0);
    }
    
    // Media query for responsive slider
    function getVisibleSlides() {
        if (window.innerWidth >= 1024) {
            return 3; // Desktop: show 3 slides
        } else if (window.innerWidth >= 768) {
            return 2; // Tablet: show 2 slides
        } else {
            return 1; // Mobile: show 1 slide
        }
    }
    
    // Update which certificates are visible
    function updateSliderVisibility(activeIndex) {
        const visibleSlides = getVisibleSlides();
        const startIndex = activeIndex * visibleSlides;
        
        certificates.forEach((cert, index) => {
            if (index >= startIndex && index < startIndex + visibleSlides) {
                cert.style.display = 'block';
            } else {
                cert.style.display = 'none';
            }
        });
        
        // Update active dot
        document.querySelectorAll('.slider-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === activeIndex);
        });
    }
    
    // Initialize the slider
    initSlider();
    
    // Slider navigation
    prevArrow.addEventListener('click', function() {
        const activeDot = document.querySelector('.slider-dot.active');
        const currentIndex = parseInt(activeDot.getAttribute('data-index'));
        
        if (currentIndex > 0) {
            updateSliderVisibility(currentIndex - 1);
        }
    });
    
    nextArrow.addEventListener('click', function() {
        const activeDot = document.querySelector('.slider-dot.active');
        const currentIndex = parseInt(activeDot.getAttribute('data-index'));
        const totalPages = Math.ceil(certificates.length / getVisibleSlides());
        
        if (currentIndex < totalPages - 1) {
            updateSliderVisibility(currentIndex + 1);
        }
    });
    
    // Click on dots to navigate
    sliderDots.addEventListener('click', function(e) {
        if (e.target.classList.contains('slider-dot')) {
            const index = parseInt(e.target.getAttribute('data-index'));
            updateSliderVisibility(index);
        }
    });
    
    // Update slider on window resize
    window.addEventListener('resize', function() {
        const activeDot = document.querySelector('.slider-dot.active');
        const currentIndex = parseInt(activeDot.getAttribute('data-index'));
        
        // Clear existing dots
        sliderDots.innerHTML = '';
        
        // Reinitialize dots
        for (let i = 0; i < Math.ceil(certificates.length / getVisibleSlides()); i++) {
            const dot = document.createElement('div');
            dot.classList.add('slider-dot');
            if (i === 0) dot.classList.add('active');
            dot.setAttribute('data-index', i);
            sliderDots.appendChild(dot);
        }
        
        // Update visible slides
        updateSliderVisibility(0);
    });

    // Form Validation and Submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (name === '' || email === '' || subject === '' || message === '') {
                alert('Please fill in all fields');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Form submission would typically go here with AJAX
            alert('Thanks for your message! I will get back to you soon.');
            
            // Reset form
            contactForm.reset();
        });
    }

    // Scroll to top button
    const backToTop = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });
    
    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Header scroll effect
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Active link highlighting based on scroll position
    const sections = document.querySelectorAll('section');
    // const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // Scroll to section when clicking on navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Reveal animations on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.skill-card, .project-card, .certificate-card, .contact-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    };
    
    // Add animation classes
    const addAnimationStyles = function() {
        const style = document.createElement('style');
        style.textContent = `
            .skill-card, .project-card, .certificate-card, .contact-card {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.5s ease, transform 0.5s ease;
            }
            
            .skill-card.animate, .project-card.animate, .certificate-card.animate, .contact-card.animate {
                opacity: 1;
                transform: translateY(0);
            }
        `;
        document.head.appendChild(style);
    };
    
    addAnimationStyles();
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);
});