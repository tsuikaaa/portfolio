document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu on link click
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Active navigation on scroll
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').substring(1) === current) {
                item.classList.add('active');
            }
        });
    });

    // Contact Form
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formMessage = document.getElementById('formMessage');
    const toast = document.getElementById('toast');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value,
                timestamp: new Date().toISOString()
            };

            setTimeout(() => {
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
                
                formMessage.textContent = 'Thank you! Your message has been sent. I\'ll respond within 24 hours.';
                formMessage.className = 'form-message success';
                
                toast.textContent = 'Message sent successfully!';
                toast.classList.add('show');
                
                contactForm.reset();
                
                setTimeout(() => {
                    toast.classList.remove('show');
                }, 5000);
                
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 8000);
                
            }, 1500);

            console.log('Form submitted:', formData);
        });
    }

    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.skill-level');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillBars.forEach(bar => {
                    bar.style.animationPlayState = 'running';
                });
            }
        });
    }, { threshold: 0.5 });

    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        observer.observe(skillsSection);
    }

    // Animate project cards on scroll with staggered tech tags
    const projectCards = document.querySelectorAll('.project-card');

    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';

                    // Animate tech tags
                    const techSpans = entry.target.querySelectorAll('.project-tech span');
                    techSpans.forEach((span, i) => {
                        setTimeout(() => {
                            span.style.opacity = '1';
                            span.style.transform = 'translateY(0)';
                        }, i * 100);
                    });
                }, index * 200);
            }
        });
    }, { threshold: 0.2 });

    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        const techSpans = card.querySelectorAll('.project-tech span');
        techSpans.forEach(span => {
            span.style.opacity = '0';
            span.style.transform = 'translateY(10px)';
            span.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        });

        cardObserver.observe(card);
    });

    // Form validation
    if (contactForm) {
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                if (!input.value && input.hasAttribute('required')) {
                    input.style.borderColor = '#f56565';
                } else {
                    input.style.borderColor = '';
                }
            });
        });
    }

    // Add hover effect to hamburger
    hamburger.addEventListener('mouseenter', () => {
        hamburger.style.transform = 'scale(1.1)';
    });
    
    hamburger.addEventListener('mouseleave', () => {
        hamburger.style.transform = 'scale(1)';
    });

    // Add scroll effect to navbar
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.98)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
            navbar.style.backdropFilter = 'blur(14px)';
        }
    });

    // Add click effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mousedown', () => {
            button.style.transform = 'translateY(0)';
        });
        
        button.addEventListener('mouseup', () => {
            button.style.transform = 'translateY(-3px)';
        });
    });
});
