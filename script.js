document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active nav on scroll
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 150)) {
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
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
                
                formMessage.textContent = 'Thank you! Your message has been sent.';
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
        });
    }

    // Animate skill bars
    const skillBars = document.querySelectorAll('.skill-level');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillBars.forEach(bar => {
                    bar.style.animationPlayState = 'running';
                });
            }
        });
    }, { threshold: 0.5 });

    const skillsSection = document.querySelector('.skills');
    if (skillsSection) skillObserver.observe(skillsSection);

    // Animate project cards
    const projectCards = document.querySelectorAll('.project-card');
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) rotate(0deg)';

                    const techSpans = entry.target.querySelectorAll('.project-tech span');
                    techSpans.forEach((span, i) => {
                        setTimeout(() => {
                            span.style.opacity = '1';
                            span.style.transform = 'translateY(0)';
                        }, i * 100 + 300);
                    });
                }, index * 200);
            }
        });
    }, { threshold: 0.1 });

    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px) rotate(-3deg)';
        card.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        
        const techSpans = card.querySelectorAll('.project-tech span');
        techSpans.forEach(span => {
            span.style.opacity = '0';
            span.style.transform = 'translateY(20px)';
            span.style.transition = 'all 0.4s ease';
        });

        cardObserver.observe(card);
    });

    // Random hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            const rotations = [-3, -1, 0, 1, 3];
            const randomRot = rotations[Math.floor(Math.random() * rotations.length)];
            button.style.transform = `translate(-3px, -3px) rotate(${randomRot}deg)`;
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0) rotate(0deg)';
        });
    });

    // Title glitch effect
    const title = document.querySelector('.title');
    setInterval(() => {
        if (Math.random() > 0.7) {
            title.style.textShadow = 
                `4px 4px 0 var(--black),
                 6px 6px 0 rgba(0, 0, 0, 0.8),
                 0 0 10px var(--poppy-pink)`;
            setTimeout(() => {
                title.style.textShadow = 
                    `6px 6px 0 var(--black),
                     10px 10px 20px rgba(0, 0, 0, 0.8)`;
            }, 100);
        }
    }, 3000);

    // Random star twinkle
    const stars = document.querySelectorAll('.star');
    setInterval(() => {
        stars.forEach(star => {
            if (Math.random() > 0.9) {
                star.style.animation = 'none';
                star.offsetHeight;
                star.style.animation = 'twinkle 4s infinite';
            }
        });
    }, 1000);
});