const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', isOpen);
    });

    navLinks.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

const revealTargets = document.querySelectorAll('.reveal');
if (revealTargets.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealTargets.forEach((el) => observer.observe(el));
} else {
    revealTargets.forEach((el) => el.classList.add('in-view'));
}

const sections = document.querySelectorAll('main section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

if (sections.length && navAnchors.length && 'IntersectionObserver' in window) {
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                navAnchors.forEach((a) => a.classList.remove('active'));
                const match = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
                if (match) match.classList.add('active');
            }
        });
    }, { rootMargin: '-40% 0px -55% 0px' });

    sections.forEach((section) => navObserver.observe(section));
}

const siteHeader = document.querySelector('.site-header');
if (siteHeader) {
    const onScroll = () => siteHeader.classList.toggle('scrolled', window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
}

document.querySelectorAll('.dropdown-toggle').forEach((btn) => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const parent = btn.closest('.has-dropdown');
        const isOpen = parent.classList.toggle('open');
        btn.setAttribute('aria-expanded', isOpen);
    });
});

document.addEventListener('click', () => {
    document.querySelectorAll('.has-dropdown.open').forEach((el) => {
        el.classList.remove('open');
        el.querySelector('.dropdown-toggle')?.setAttribute('aria-expanded', 'false');
    });
});

const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotPanel = document.getElementById('chatbotPanel');
const chatbotClose = document.getElementById('chatbotClose');
const chatbotMessages = document.getElementById('chatbotMessages');
const chatbotQuickReplies = document.getElementById('chatbotQuickReplies');

const faqReplies = {
    services: {
        label: 'Services',
        text: 'ShowBio offers four core services: 🌿 landscaping &amp; garden development (ShowBageecha), 🪴 a plants &amp; gardening marketplace (Plantomart), 🤖 AI &amp; robotics for smart agriculture, and 💚 plantation drives &amp; environmental education (ShowPlants).'
    },
    mentorship: {
        label: 'Mentorship',
        text: 'We work with a network of freelance horticulturists and gold-medalist consultants covering crop selection, soil health, irrigation planning, pest control, and value-added plant products. Contact us to get connected with a mentor.'
    },
    agri: {
        label: 'Agri',
        text: 'Through ShowBio AI &amp; Robotics, we build smart crop monitoring, landscaping robotics, and environmental analytics tools for sustainable agriculture across India.'
    },
    startup: {
        label: 'Startup Support',
        text: 'ShowBio was recognized as the Best AgriTech Company 2025 by the Governments of Telangana &amp; Karnataka. We partner with institutions, corporates, and government bodies &mdash; reach out to explore collaboration or support.'
    },
    appointment: {
        label: 'Book an Appointment',
        text: 'You can book a consultation call with our team &mdash; email <a href="mailto:hello@showbio.in">hello@showbio.in</a> or call <a href="tel:+918331801000">+91 83318 01000</a> and we\'ll schedule a time that works for you.'
    },
    contact: {
        label: 'Contact Us',
        text: '📍 Hyderabad, Telangana, India<br>✉ <a href="mailto:hello@showbio.in">hello@showbio.in</a><br>📞 <a href="tel:+918331801000">+91 83318 01000</a>'
    }
};

function appendChatMessage(html, sender) {
    const msg = document.createElement('div');
    msg.className = `chatbot-msg ${sender}`;
    msg.innerHTML = html;
    chatbotMessages.appendChild(msg);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

if (chatbotToggle && chatbotPanel) {
    const openChat = () => {
        chatbotPanel.removeAttribute('hidden');
        chatbotToggle.setAttribute('aria-expanded', 'true');
    };
    const closeChat = () => {
        chatbotPanel.setAttribute('hidden', '');
        chatbotToggle.setAttribute('aria-expanded', 'false');
    };

    chatbotToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        if (chatbotPanel.hasAttribute('hidden')) openChat();
        else closeChat();
    });

    chatbotClose?.addEventListener('click', (e) => {
        e.stopPropagation();
        closeChat();
    });

    chatbotPanel.addEventListener('click', (e) => e.stopPropagation());

    chatbotQuickReplies?.addEventListener('click', (e) => {
        const btn = e.target.closest('button[data-topic]');
        if (!btn) return;
        const topic = faqReplies[btn.dataset.topic];
        if (!topic) return;
        appendChatMessage(topic.label, 'user');
        setTimeout(() => appendChatMessage(topic.text, 'bot'), 400);
    });
}

const counters = document.querySelectorAll('[data-count]');
if (counters.length) {
    const animateCounter = (el) => {
        const target = parseInt(el.dataset.count, 10);
        const duration = 1200;
        const start = performance.now();

        const step = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            el.textContent = Math.round(target * progress);
            if (progress < 1) requestAnimationFrame(step);
            else el.textContent = target;
        };

        requestAnimationFrame(step);
    };

    if ('IntersectionObserver' in window) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach((el) => counterObserver.observe(el));
    } else {
        counters.forEach((el) => { el.textContent = el.dataset.count; });
    }
}
