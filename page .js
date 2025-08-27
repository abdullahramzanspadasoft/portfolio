document.addEventListener('DOMContentLoaded', () => {
    // Selectors
    const header = document.querySelector('.header');
    const menuIcon = document.getElementById('menu-icon');
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar a');
    const backToTopBtn = document.getElementById('back-to-top');
    const themeToggle = document.getElementById('theme-toggle');

    // Sticky Navbar & Active Link
    window.addEventListener('scroll', () => {
        // Sticky Header
        if (window.scrollY > 0) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }

        // Active Link on Scroll
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(currentSection)) {
                link.classList.add('active');
            }
        });

        // Show/Hide Back to Top Button
        if (window.scrollY > 500) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    // Hamburger Menu Toggle
    menuIcon.addEventListener('click', () => {
        navbar.classList.toggle('active');
        menuIcon.querySelector('i').classList.toggle('fa-bars');
        menuIcon.querySelector('i').classList.toggle('fa-times');
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('active');
            menuIcon.querySelector('i').classList.remove('fa-times');
            menuIcon.querySelector('i').classList.add('fa-bars');
        });
    });

    // Day/Night Mode Toggle
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });

    // Scroll-triggered Reveal Animations
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // Animated Skill Counters
    const skillsSection = document.getElementById('skills');
    const skillBars = document.querySelectorAll('.skill-bar');
    const skillPercents = document.querySelectorAll('.skill-percent');
    let hasAnimated = false;

    const skillsObserver = new IntersectionObserver((entries, observer) => {
        if (entries[0].isIntersecting && !hasAnimated) {
            hasAnimated = true;
            skillBars.forEach(bar => {
                const percent = bar.dataset.percent;
                bar.style.width = percent + '%';
            });
            skillPercents.forEach(span => {
                const targetPercent = parseInt(span.previousElementSibling.firstElementChild.dataset.percent);
                let currentPercent = 0;
                const interval = setInterval(() => {
                    if (currentPercent < targetPercent) {
                        currentPercent++;
                        span.textContent = currentPercent + '%';
                    } else {
                        clearInterval(interval);
                    }
                }, 20); // Adjust speed here
            });
        }
    }, {
        threshold: 0.5
    });

    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }

    // Smooth Scrolling for all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Contact Form Submission (Dummy)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }
});