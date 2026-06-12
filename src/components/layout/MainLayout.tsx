import { useState, useEffect, useCallback, useRef } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { JoinCommunity, Footer } from './Footer';
import { FloatingShapes } from '../ui/FloatingShapes';
import { Chatbot } from '../Chatbot';

import { SEOHead } from '../SEOHead';

/* ── Nav link data ─────────────────────────────────────────── */
const NAV_LINKS = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Programs', path: '/causes' },
    { label: 'Stories', path: '/blog' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Contact', path: '/contact' },
];

/* ── Layout Component ────────────────────────────────────────── */

export const MainLayout = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { scrollY } = useScroll();
    const menuRef = useRef<HTMLDivElement>(null);

    const isHome = location.pathname === '/';

    /* Scroll threshold */
    useMotionValueEvent(scrollY, 'change', (latest) => {
        setScrolled(latest > 40);
    });

    /* Lock body scroll when mobile menu is open */
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [mobileMenuOpen]);

    useEffect(() => {
        /* Global scroll-animate observer */
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const t = entry.target as HTMLElement;
                    t.classList.add('animate-play');
                    t.style.opacity = '1';
                    t.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        const observeElements = () => {
            document.querySelectorAll('.scroll-animate').forEach(el => observer.observe(el));
        };
        observeElements();
        const timeoutId = setTimeout(observeElements, 500);

        return () => {
            observer.disconnect();
            clearTimeout(timeoutId);
        };
    }, [location.pathname]);

    // Scroll to top on route change & close mobile menu
    useEffect(() => {
        window.scrollTo(0, 0);
        setMobileMenuOpen(false);
    }, [location.pathname]);

    const handleNavigate = useCallback((path: string) => {
        navigate(path);
        setMobileMenuOpen(false);
    }, [navigate]);

    return (
        <div className="site-root">
            {/* ═══════════════════ SEO ═══════════════════ */}
            <SEOHead />

            {/* Ambient Background layer */}
            <FloatingShapes />

            {/* ═══════════════════ NAVBAR ═══════════════════ */}
            <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''} ${!isHome && !scrolled ? 'navbar--solid' : ''}`} role="banner">
                <div className="navbar__container">

                    {/* ── Logo ── */}
                    <div className="navbar__brand" onClick={() => handleNavigate('/')} role="link" aria-label="Arunya Foundation — Go to homepage" tabIndex={0} onKeyDown={e => e.key === 'Enter' && handleNavigate('/')}>
                        <img
                            src="/logo.png"
                            alt="Arunya Foundation"
                            className="navbar__logo"
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                        <img
                            src="/arunya-typography.png"
                            alt="Arunya"
                            className="navbar__brand-typography"
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                    </div>

                    {/* ── Center Nav Links (desktop) ── */}
                    <nav className="navbar__links" aria-label="Main navigation">
                        {NAV_LINKS.map((link) => (
                            <button
                                key={link.path}
                                className={`navbar__link ${location.pathname === link.path ? 'navbar__link--active' : ''}`}
                                onClick={() => handleNavigate(link.path)}
                            >
                                {link.label}
                            </button>
                        ))}
                    </nav>

                    {/* ── Right Section ── */}
                    <div className="navbar__actions">
                        {/* Hamburger — mobile only */}
                        <button
                            className="navbar__hamburger"
                            onClick={() => setMobileMenuOpen(v => !v)}
                            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                        >
                            <span className={`navbar__hamburger-line ${mobileMenuOpen ? 'navbar__hamburger-line--open' : ''}`} />
                        </button>
                    </div>
                </div>
            </header>

            {/* ═══════════════════ MOBILE MENU ═══════════════════ */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        {/* Backdrop overlay — click to close */}
                        <motion.div
                            className="mobile-menu__backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            onClick={() => setMobileMenuOpen(false)}
                        />

                        {/* Slide-in drawer */}
                        <motion.div
                            ref={menuRef}
                            className="mobile-menu__drawer"
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
                        >
                            {/* Drawer header */}
                            <div className="mobile-menu__header">
                                <span className="mobile-menu__title">Menu</span>
                                <button
                                    className="mobile-menu__close"
                                    onClick={() => setMobileMenuOpen(false)}
                                    aria-label="Close menu"
                                >
                                    ✕
                                </button>
                            </div>

                            {/* Nav links */}
                            <nav className="mobile-menu__nav">
                                {NAV_LINKS.map((link, idx) => (
                                    <motion.button
                                        key={link.path}
                                        className={`mobile-menu__link ${location.pathname === link.path ? 'mobile-menu__link--active' : ''}`}
                                        onClick={() => handleNavigate(link.path)}
                                        initial={{ opacity: 0, x: 30 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.05 + idx * 0.05, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                                    >
                                        {link.label}
                                    </motion.button>
                                ))}
                            </nav>


                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* ═══════════════════ MAIN CONTENT ═══════════════════ */}
            <main className="w-full" style={{ paddingTop: isHome ? '0px' : '80px' }}>
                <AnimatePresence mode="wait">
                    <Outlet key={location.pathname} />
                </AnimatePresence>
            </main>



            {/* ═══════════════════ FOOTER ═══════════════════ */}
            {isHome && <JoinCommunity />}
            <Footer />

            {/* ═══════════════════ CHATBOT ═══════════════════ */}
            <Chatbot />
        </div>
    );
};

