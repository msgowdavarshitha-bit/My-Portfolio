// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    updateActiveNavLink();
});

// Active nav link
function updateActiveNavLink() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.about-content, .experience-card, .project-card, .timeline-item, .skill-category, .cert-card, .hobby-card, .contact-form-container, .contact-item').forEach(el => {
    observer.observe(el);
});


// Modal for certificates
function openModal(file) {

    const modal = document.getElementById("cert-modal");
    const iframe = document.getElementById("modal-iframe");

    modal.style.display = "flex";

    if (
        file.toLowerCase().endsWith(".png") ||
        file.toLowerCase().endsWith(".jpg") ||
        file.toLowerCase().endsWith(".jpeg")
    ) {

        iframe.removeAttribute("src");

        iframe.srcdoc = `
            <html>
            <body style="margin:0;display:flex;justify-content:center;align-items:center;background:white;">
                <img src="${file}" style="max-width:100%;max-height:100%;object-fit:contain;">
            </body>
            </html>
        `;

    } else {

        iframe.removeAttribute("srcdoc");

        if (!file.includes("Certificates/")) {
            file = "Certificates/" + file;
        }

        iframe.src = file;
    }

}

function closeModal() {
    const modal = document.getElementById('cert-modal');
    const iframe = document.getElementById('modal-iframe');
    if (modal) modal.style.display = 'none';
    if (iframe) iframe.src = '';
}

// Close modal on outside click
window.onclick = function(event) {
    const modal = document.getElementById('cert-modal');
    if (event.target === modal) {
        closeModal();
    }
};

// Close modal on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Contact form handling
function handleContactForm(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    const mailtoLink = `mailto:varshithams02@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
    
    window.location.href = mailtoLink;
    
    alert('Thank you for your message! Your email client will open to send the message.');
    document.querySelector('.contact-form').reset();
}

// Add stagger animation delays
document.querySelectorAll('.project-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

document.querySelectorAll('.cert-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

document.querySelectorAll('.hobby-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

// Rotating Text Animation (Cool Slide!)
document.addEventListener('DOMContentLoaded', () => {
    const rotatingText = document.querySelector('.rotating-text');
    if (!rotatingText) return;
    
    const spans = rotatingText.querySelectorAll('span');
    let currentIndex = 0;
    
    // Set initial active
    spans.forEach((span, index) => {
        span.classList.remove('active', 'exit');
        if (index === 0) span.classList.add('active');
    });
    
    setInterval(() => {
        const current = spans[currentIndex];
        currentIndex = (currentIndex + 1) % spans.length;
        const next = spans[currentIndex];
        
        current.classList.remove('active');
        current.classList.add('exit');
        
        setTimeout(() => {
            next.classList.add('active');
            current.classList.remove('exit');
        }, 100);
    }, 2500);
});


// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    .about-content.animate .profile-image-container {
        animation: slideInLeft 0.8s ease-out;
    }
    .about-content.animate .about-right {
        animation: slideInRight 0.8s ease-out;
    }
    .experience-card.animate {
        animation: fadeInUp 0.8s ease-out;
    }
    .project-card.animate {
        animation: fadeInUp 0.6s ease-out forwards;
        opacity: 0;
    }
    .timeline-item.animate .timeline-card {
        animation: fadeInUp 0.6s ease-out;
    }
    .skill-category.animate {
        animation: fadeInUp 0.6s ease-out;
    }
    .cert-card.animate {
        animation: fadeInUp 0.6s ease-out forwards;
        opacity: 0;
    }
    .hobby-card.animate {
        animation: fadeInUp 0.5s ease-out forwards;
        opacity: 0;
    }
    .contact-form-container.animate {
        animation: slideInLeft 0.8s ease-out;
    }
    .contact-info.animate .contact-item {
        animation: slideInRight 0.8s ease-out;
    }
    
    @keyframes slideInLeft {
        from { opacity: 0; transform: translateX(-50px); }
        to { opacity: 1; transform: translateX(0); }
    }
    @keyframes slideInRight {
        from { opacity: 0; transform: translateX(50px); }
        to { opacity: 1; transform: translateX(0); }
    }
    @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);
