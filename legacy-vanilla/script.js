/**
 * ==========================================================================
 * RISHI MISTRY — PORTFOLIO CORE SCRIPTS
 * High-performance, accessible, vanilla interactions without bloated overhead.
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initTypewriter();
    initScrollAnimations();
    initScrollProgress();
    initBackToTop();
    initLocalClock();
    initContactForm();
});

/* --------------------------------------------------------------------------
   1. NAVIGATION & ACTIVE SECTION HIGHLIGHT
   -------------------------------------------------------------------------- */
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-item-link, .mobile-nav-item');
    const sections = document.querySelectorAll('section[id]');
    const menuToggle = document.getElementById('menuToggle');
    const menuIcon = document.getElementById('menuIcon');
    const mobileNav = document.getElementById('mobileNav');

    // Smooth scroll with offset for floating nav
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const navHeight = 90;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (mobileNav && mobileNav.classList.contains('open')) {
                    closeMobileMenu();
                }
            }
        });
    });

    // Mobile menu toggle
    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', () => {
            const isOpen = mobileNav.classList.contains('open');
            if (isOpen) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });

        // Close on background click
        mobileNav.addEventListener('click', (e) => {
            if (e.target === mobileNav) {
                closeMobileMenu();
            }
        });
    }

    function openMobileMenu() {
        mobileNav.classList.add('open');
        document.body.style.overflow = 'hidden';
        if (menuIcon) {
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-xmark');
        }
    }

    function closeMobileMenu() {
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
        if (menuIcon) {
            menuIcon.classList.remove('fa-xmark');
            menuIcon.classList.add('fa-bars');
        }
    }

    // Active link highlighting via IntersectionObserver
    const observerOptions = {
        root: null,
        rootMargin: '-30% 0px -60% 0px',
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(sec => sectionObserver.observe(sec));
}

/* --------------------------------------------------------------------------
   2. SINGLE-LOOP SUBTLE TYPEWRITER EFFECT
   -------------------------------------------------------------------------- */
function initTypewriter() {
    const el = document.getElementById('typewriterText');
    if (!el) return;

    const phrases = [
        "Web Developer",
        "IT Diploma Student",
        "Full-Stack Builder",
        "React & Python Explorer"
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typeSpeed = 90;
    const deleteSpeed = 45;
    const pauseDelay = 2200;

    function typeLoop() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            el.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            el.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        let nextSpeed = isDeleting ? deleteSpeed : typeSpeed;

        if (!isDeleting && charIndex === currentPhrase.length) {
            nextSpeed = pauseDelay;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            nextSpeed = 350;
        }

        setTimeout(typeLoop, nextSpeed);
    }

    typeLoop();
}

/* --------------------------------------------------------------------------
   3. SCROLL REVEAL ANIMATIONS (IntersectionObserver)
   -------------------------------------------------------------------------- */
function initScrollAnimations() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    if (!revealElements.length) return;

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-revealed');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
}

/* --------------------------------------------------------------------------
   4. SCROLL PROGRESS INDICATOR
   -------------------------------------------------------------------------- */
function initScrollProgress() {
    const progressBar = document.getElementById('scrollProgress');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (scrollTop / scrollHeight) * 100;
        progressBar.style.width = `${scrolled}%`;
    }, { passive: true });
}

/* --------------------------------------------------------------------------
   5. BACK TO TOP BUTTON
   -------------------------------------------------------------------------- */
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    if (!backToTopBtn) return;

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* --------------------------------------------------------------------------
   6. LIVE CLOCK (INDIA STANDARD TIME)
   -------------------------------------------------------------------------- */
function initLocalClock() {
    const clockEl = document.getElementById('localTimeIndicator');
    if (!clockEl) return;

    function updateTime() {
        const options = {
            timeZone: 'Asia/Kolkata',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        };
        const formatter = new Intl.DateTimeFormat([], options);
        clockEl.textContent = `India (IST): ${formatter.format(new Date())}`;
    }

    updateTime();
    setInterval(updateTime, 1000);
}

/* --------------------------------------------------------------------------
   7. EMAILJS CONTACT FORM SUBMISSION
   -------------------------------------------------------------------------- */
function initContactForm() {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const submitText = document.getElementById('submitBtnText');
    const submitIcon = document.getElementById('submitBtnIcon');
    const formStatus = document.getElementById('formStatus');

    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');

        const nameVal = nameInput.value.trim();
        const emailVal = emailInput.value.trim();
        const subjectVal = subjectInput.value.trim();
        const messageVal = messageInput.value.trim();

        if (!nameVal || !emailVal || !subjectVal || !messageVal) {
            showStatus("Please complete all fields before sending.", "error");
            return;
        }

        // Set Loading UI
        submitBtn.disabled = true;
        submitText.textContent = "Sending...";
        submitIcon.className = "fa-solid fa-spinner fa-spin";
        hideStatus();

        // Send through EmailJS
        emailjs.send("service_ygovc0i", "template_i94xbal", {
            from_name: nameVal,
            from_email: emailVal,
            subject: subjectVal,
            message: messageVal
        }).then(() => {
            // Success Feedback
            submitBtn.disabled = false;
            submitText.textContent = "Message Sent";
            submitIcon.className = "fa-solid fa-check";

            showStatus("Thank you! Your message has been sent successfully. I'll get back to you soon.", "success");
            form.reset();

            setTimeout(() => {
                submitText.textContent = "Send Message";
                submitIcon.className = "fa-regular fa-paper-plane";
            }, 4000);
        }).catch((err) => {
            // Error Fallback
            submitBtn.disabled = false;
            submitText.textContent = "Failed to Send";
            submitIcon.className = "fa-solid fa-triangle-exclamation";

            showStatus("Could not deliver your message right now. Please reach out directly to rishimistry33@gmail.com.", "error");
            console.error("EmailJS Error:", err);

            setTimeout(() => {
                submitText.textContent = "Send Message";
                submitIcon.className = "fa-regular fa-paper-plane";
            }, 4000);
        });
    });

    function showStatus(msg, type) {
        if (!formStatus) return;
        formStatus.textContent = msg;
        formStatus.className = `form-status-msg ${type}`;
    }

    function hideStatus() {
        if (!formStatus) return;
        formStatus.textContent = '';
        formStatus.className = 'form-status-msg';
    }
}
