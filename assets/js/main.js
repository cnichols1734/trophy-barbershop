document.addEventListener('DOMContentLoaded', () => {

    // ── Loader ────────────────────────────────────────────────
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        setTimeout(() => loader?.classList.add('done'), 500);
    });

    // ── Mobile menu ───────────────────────────────────────────
    const menuBtn     = document.querySelector('.menu-btn');
    const mobileNav   = document.querySelector('.mobile-nav');
    const overlay     = document.querySelector('.mobile-overlay');
    const closeBtn    = document.querySelector('.mobile-close');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    function openMenu() {
        mobileNav.classList.add('open');
        overlay.classList.add('open');
        menuBtn.classList.add('open');
        menuBtn.setAttribute('aria-expanded', 'true');
        mobileNav.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        mobileNav.classList.remove('open');
        overlay.classList.remove('open');
        menuBtn.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
        mobileNav.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    menuBtn?.addEventListener('click', openMenu);
    closeBtn?.addEventListener('click', closeMenu);
    overlay?.addEventListener('click', closeMenu);
    mobileLinks.forEach(link => link.addEventListener('click', closeMenu));

    // Close on Escape key
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeMenu();
    });

    // ── Scroll reveal ─────────────────────────────────────────
    // Assign stagger delays to sibling reveal elements in list containers
    document.querySelectorAll('.services-list, .barbers-list, .reviews-grid').forEach(parent => {
        parent.querySelectorAll('.reveal').forEach((el, i) => {
            el.style.transitionDelay = `${i * 0.09}s`;
        });
    });

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -36px 0px'
    });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // ── Header background on scroll ───────────────────────────
    const header = document.getElementById('site-header');

    window.addEventListener('scroll', () => {
        header.style.background = window.scrollY > 60
            ? 'rgba(17, 17, 24, 0.97)'
            : 'var(--dark)';
    }, { passive: true });

    // ── Smooth scroll for anchor links ────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            const href = link.getAttribute('href');
            if (!href || href === '#') return;
            const target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            const headerH = header ? header.getBoundingClientRect().height : 0;
            window.scrollTo({
                top: target.getBoundingClientRect().top + window.scrollY - headerH,
                behavior: 'smooth'
            });
        });
    });

});
