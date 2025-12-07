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

    // Initial count
    charCount.textContent = messageTextarea.value.length;

    messageTextarea.addEventListener('input', () => {
        const length = messageTextarea.value.length;
        charCount.textContent = length;

        if (length > 1800) {
            charCount.style.color = '#f56565'; // red
        } else if (length > 1500) {
            charCount.style.color = '#ed8936'; // orange
        } else {
            charCount.style.color = 'var(--soft-pink)';
        }
    });
}

// ======================
// Show Form Message
// ======================
function showFormMessage(message, type = 'success') {
    const formMessage = document.getElementById('formMessage');
    if (!formMessage) return;

    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';

    // Auto-hide after 10 seconds
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 10000);
}

// ======================
// Form Validation & Submission - FIXED VERSION
// ======================
function setupForm() {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    if (!form || !submitBtn) return;

    const inputs = form.querySelectorAll('input, textarea, select');

    // Real-time validation
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (!input.checkValidity() && input.value.trim() !== '') {
                input.style.borderColor = '#f56565';
            } else {
                input.style.borderColor = '';
            }
        });
        input.addEventListener('input', () => {
            if (input.checkValidity()) input.style.borderColor = '';
        });
    });

    // Submit handler
    form.addEventListener('submit', (e) => {
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value.trim();
        const terms = document.getElementById('terms').checked;

        const errors = [];
        if (!name || name.length < 2) errors.push('Please enter a valid name (at least 2 characters).');
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Please enter a valid email address.');
        if (!subject) errors.push('Please select an inquiry type.');
        if (!message || message.length < 20) errors.push('Please enter a message with at least 20 characters.');
        if (!terms) errors.push('Please agree to the terms and privacy policy.');

        if (errors.length > 0) {
            // Show error and prevent submission
            e.preventDefault();
            showFormMessage(errors[0], 'error');
            const firstInvalid = form.querySelector(':invalid');
            if (firstInvalid) firstInvalid.focus();
            return;
        }

        // If validation passes, allow Formspree to handle it
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
        
        // Form will submit normally to Formspree
        // Formspree will redirect back to https://tsuikaaa.github.io/portfolio/?success=true
    });
}

// ======================
// Initialize on page load
// ======================
document.addEventListener('DOMContentLoaded', () => {
    initCharCounter();
    setupForm();

    // Check for success parameter in URL
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('success')) {
        showFormMessage('Thank you! Your message has been sent successfully. I\'ll respond within 24 hours.', 'success');
        
        // Clear the URL parameter without reloading
        window.history.replaceState({}, document.title, window.location.pathname);
        
        // Reset form if it exists
        const form = document.getElementById('contactForm');
        if (form) {
            form.reset();
            document.getElementById('charCount').textContent = '0';
        }
    }
});
