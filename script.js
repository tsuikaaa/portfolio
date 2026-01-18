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

document.addEventListener('DOMContentLoaded', () => {
  // ---- MODAL PROJECTS ----
  const modal = document.getElementById('projectModal');
  const overlay = document.getElementById('projectModalOverlay');
  const closeBtn = document.getElementById('projectModalClose');

  if (modal && overlay && closeBtn) {
    const titleEl = document.getElementById('projectModalTitle');
    const descEl = document.getElementById('projectModalDescription');
    const techEl = document.getElementById('projectModalTech');
    const linkEl = document.getElementById('projectModalLink');

    const openButtons = document.querySelectorAll('.open-project-modal');

    const openModal = (btn) => {
      const title = btn.dataset.title || '';
      const description = btn.dataset.description || '';
      const tech = btn.dataset.tech || '';
      const link = btn.dataset.link || '#';

      titleEl.textContent = title;
      descEl.textContent = description;
      techEl.textContent = tech;
      linkEl.href = link;

      modal.classList.add('is-open');
      overlay.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
    };

    const closeModal = () => {
      modal.classList.remove('is-open');
      overlay.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
    };

    openButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(btn);
      });
    });

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    });
  }
});

// TOGGLE LANGUE - MÊME PAGE, LANGUE CHANGE
document.addEventListener('DOMContentLoaded', () => {
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        const currentPath = window.location.pathname;
        const isFr = currentPath.includes('_fr') || currentPath.includes('fr.html');
        langToggle.textContent = isFr ? '🇬🇧 EN' : '🇫🇷 FR';
        
        console.log('Page:', currentPath, '| Langue:', isFr ? 'FR' : 'EN');
        
        langToggle.addEventListener('click', () => {
            // Extrait nom page SANS langue/extension
            let pageName = currentPath
                .replace(/^\/portfolio\//, '')           // Enlève /portfolio/
                .replace(/^(index|about|skills|projects|contact|cv)_?(fr)?(\.html)?$/i, '$1')
                .replace(/\/$/, '');                     // Enlève slash final
            
            // Ajoute langue OPPOSÉE
            const targetLang = isFr ? '' : '_fr';
            const targetPath = pageName ? `/portfolio/${pageName}${targetLang}.html` : '/portfolio/index.html';
            
            window.location.href = targetPath;
        });
    }
});
