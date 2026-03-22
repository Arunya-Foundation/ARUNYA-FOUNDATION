import { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { JoinCommunity, Footer } from './Footer';

/* ── Nav link data ─────────────────────────────────────────── */
const NAV_LINKS = [
    { label: 'About', path: '/about' },
    { label: 'Programs', path: '/causes' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Blog', path: '/blog' },
    { label: 'Volunteer', path: '/volunteer' },
    { label: 'Contact', path: '/contact' },
];

/* ── Layout Component ────────────────────────────────────────── */

export const MainLayout = () => {
    const [compact, setCompact] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { scrollY } = useScroll();

    /* Scroll threshold — go compact when scrolling DOWN past 100px */
    useMotionValueEvent(scrollY, 'change', (latest) => {
        setCompact(latest > 100);
    });

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

    // Scroll to top on route change
    useEffect(() => {
        window.scrollTo(0, 0);
        setMobileMenuOpen(false);
    }, [location.pathname]);

    return (
        <div className="site-root">
            {/* ═══════════════════ NAVBAR ═══════════════════ */}
            <motion.header
                className="main-navbar"
                animate={compact ? 'compact' : 'full'}
                initial="full"
                variants={{
                    full: { top: 0, padding: '0px' },
                    compact: { top: 12, padding: '0px 16px' },
                }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
                <motion.div
                    className="navbar-inner"
                    variants={{
                        full: {
                            maxWidth: '100vw',
                            borderRadius: '0px',
                            backgroundColor: 'rgba(255,255,255,0.0)',
                            backdropFilter: 'blur(0px)',
                            boxShadow: 'none',
                            padding: '1.25rem 3rem',
                        },
                        compact: {
                            maxWidth: '700px',
                            borderRadius: '9999px',
                            backgroundColor: 'rgba(255,255,255,0.92)',
                            backdropFilter: 'blur(20px)',
                            boxShadow: '0 8px 32px rgba(30,58,95,0.10)',
                            padding: '0.5rem 1.25rem',
                        }
                    }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                    {/* ── Logo ── */}
                    <div className="nav-brand" onClick={() => navigate('/')}>
                        <img
                            src="/logo.jpg"
                            alt="Arunya Foundation"
                            className="nav-logo-img"
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                        <motion.span
                            className="nav-brand-text"
                            style={{ marginLeft: '0.8rem', color: '#d4a847', textTransform: 'uppercase' }}
                        >
                            ARUNYA FOUNDATION
                        </motion.span>
                    </div>

                    {/* ── Center Nav Links (hide in compact / pill mode) ── */}
                    <AnimatePresence>
                        {!compact && (
                            <motion.nav
                                className="nav-links"
                                initial={{ opacity: 0, y: -8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.2 }}
                            >
                                {NAV_LINKS.map((link) => (
                                    <button
                                        key={link.path}
                                        className={`nav-link-btn ${location.pathname === link.path ? 'active' : ''}`}
                                        onClick={() => navigate(link.path)}
                                    >
                                        {link.label}
                                    </button>
                                ))}
                            </motion.nav>
                        )}
                    </AnimatePresence>

                    {/* ── CTA Button ── */}
                    <motion.button
                        className="nav-cta-btn"
                        onClick={() => navigate('/login')}
                        style={{ padding: '0.75rem 1.75rem', fontSize: '0.9rem' }}
                    >
                        <span>Sign In</span>
                        <span className="nav-cta-arrow">→</span>
                    </motion.button>

                    {/* ── Hamburger (mobile only) ── */}
                    <button
                        className="mobile-hamburger"
                        onClick={() => setMobileMenuOpen(v => !v)}
                        aria-label="Open menu"
                        style={{
                            display: 'none', /* shown via CSS on mobile */
                            background: 'rgba(30,58,95,0.08)',
                            border: '1px solid rgba(30,58,95,0.12)',
                            borderRadius: 999,
                            width: 40, height: 40,
                            alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer', flexShrink: 0,
                            fontSize: '1.2rem', color: '#1e3a5f',
                            transition: 'background 0.2s',
                        }}
                    >
                        {mobileMenuOpen ? '✕' : '☰'}
                    </button>
                </motion.div>
            </motion.header>

            {/* ═══════════════════ MOBILE MENU ═══════════════════ */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed', inset: 0, zIndex: 199,
                            background: 'rgba(255,255,255,0.95)',
                            backdropFilter: 'blur(20px)',
                            display: 'flex', flexDirection: 'column',
                            alignItems: 'center', justifyContent: 'center', gap: '1.5rem',
                        }}
                    >
                        {NAV_LINKS.map((link) => (
                            <motion.button
                                key={link.path}
                                onClick={() => { navigate(link.path); setMobileMenuOpen(false); }}
                                style={{
                                    background: 'none', border: 'none',
                                    fontSize: '1.5rem', fontWeight: 700,
                                    color: location.pathname === link.path ? '#2563eb' : '#1e3a5f',
                                    cursor: 'pointer', fontFamily: 'Outfit, Inter, sans-serif',
                                }}
                                whileHover={{ scale: 1.05 }}
                            >
                                {link.label}
                            </motion.button>
                        ))}
                        <button
                            onClick={() => setMobileMenuOpen(false)}
                            style={{
                                position: 'absolute', top: 24, right: 24,
                                background: 'none', border: 'none', fontSize: '2rem',
                                color: '#1e3a5f', cursor: 'pointer',
                            }}
                        >×</button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ═══════════════════ MAIN CONTENT ═══════════════════ */}
            <main className="w-full">
                <AnimatePresence mode="wait">
                    <Outlet key={location.pathname} />
                </AnimatePresence>
            </main>

            {/* ═══════════════════ FOOTER ═══════════════════ */}
            <JoinCommunity />
            <Footer />
        </div>
    );
};
