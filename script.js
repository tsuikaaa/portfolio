// Mobile navigation toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// Active link on scroll
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 150;

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollPos >= top && scrollPos <= top + height) {
            navAnchors.forEach(a => a.classList.remove('active'));
            const activeLink = document.querySelector(`.nav-links a[href="#${id}"]`);
            if (activeLink) activeLink.classList.add('active');
        }
    });
});

// Contact form handling (fake submit)
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
const submitBtn = document.getElementById('submitBtn');
const toast = document.getElementById('toast');

function showToast(text) {
    if (!toast) return;
    toast.textContent = text;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

if (contactForm && formMessage && submitBtn) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        submitBtn.classList.add('loading');
        const btnText = submitBtn.querySelector('.btn-text');
        if (btnText) btnText.textContent = 'Sending...';

        setTimeout(() => {
            submitBtn.classList.remove('loading');
            if (btnText) btnText.textContent = 'Send Message';

            formMessage.className = 'form-message success';
            formMessage.textContent = 'Thank you! Your message has been sent (demo).';
            showToast('Your message has been sent (demo only).');

            contactForm.reset();
        }, 1200);
    });
}

// Set current year in footer
const yearSpan = document.getElementById('year');
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// ======================
// Character Counter
// ======================
function initCharCounter() {
    const messageTextarea = document.getElementById('message');
    const charCount = document.getElementById('charCount');

    if (!messageTextarea || !charCount) return;

    charCount.textContent = messageTextarea.value.length;

    messageTextarea.addEventListener('input', () => {
        const length = messageTextarea.value.length;
        charCount.textContent = length;
        
        if (length > 1800) charCount.style.color = '#f56565';
        else if (length > 1500) charCount.style.color = '#ed8936';
        else charCount.style.color = 'var(--soft-pink)';
    });
}

// ======================
// Show Message
// ======================
function showFormMessage(message, type = 'success') {
    const formMessage = document.getElementById('formMessage');
    if (!formMessage) return;

    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';

    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 8000);
}

// ======================
// SIMPLE Form Handling
// ======================
function setupForm() {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    
    if (!form || !submitBtn) return;

    // Minimal validation on submit
    form.addEventListener('submit', function(e) {
        // Basic check for empty required fields
        const requiredFields = form.querySelectorAll('[required]');
        let hasEmpty = false;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.style.borderColor = '#f56565';
                hasEmpty = true;
                
                if (!field.previousElementSibling) {
                    const error = document.createElement('div');
                    error.textContent = 'This field is required';
                    error.style.color = '#f56565';
                    error.style.fontSize = '0.85rem';
                    error.style.marginTop = '5px';
                    field.parentNode.insertBefore(error, field.nextSibling);
                    
                    // Remove error after 5 seconds
                    setTimeout(() => error.remove(), 5000);
                }
            } else {
                field.style.borderColor = '';
            }
        });

        if (hasEmpty) {
            e.preventDefault();
            showFormMessage('Please fill all required fields.', 'error');
            return;
        }

        // Show loading
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
        
        // Let Formspree handle submission
        // Remove any leftover errors
        form.querySelectorAll('.field-error').forEach(el => el.remove());
    });

    // Clear errors when user types
    form.querySelectorAll('input, textarea').forEach(field => {
        field.addEventListener('input', function() {
            this.style.borderColor = '';
            const error = this.nextElementSibling;
            if (error && error.style.color === 'rgb(245, 101, 101)') {
                error.remove();
            }
        });
    });
}

// ======================
// Initialize
// ======================
document.addEventListener('DOMContentLoaded', () => {
    initCharCounter();
    setupForm();

    // Check for success in URL
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('success')) {
        showFormMessage('Thank you! Your message has been sent successfully.', 'success');
        window.history.replaceState({}, document.title, window.location.pathname);
        
        // Reset form
        const form = document.getElementById('contactForm');
        if (form) {
            form.reset();
            document.getElementById('charCount').textContent = '0';
        }
    }
});
