import { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { JoinCommunity, Footer } from './Footer';
import { FloatingShapes } from '../ui/FloatingShapes';

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
    const [scrolled, setScrolled] = useState(false);
    const [isNarrow, setIsNarrow] = useState(() => window.matchMedia('(max-width: 1024px)').matches);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { scrollY } = useScroll();

    const isHome = location.pathname === '/';
    const compact = scrolled || isNarrow;

    /* Detect narrow viewport */
    useEffect(() => {
        const mql = window.matchMedia('(max-width: 1024px)');
        const handler = (e: MediaQueryListEvent) => setIsNarrow(e.matches);
        mql.addEventListener('change', handler);
        return () => mql.removeEventListener('change', handler);
    }, []);

    /* Scroll threshold */
    useMotionValueEvent(scrollY, 'change', (latest) => {
        setScrolled(latest > 60);
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
            {/* Ambient Background layer */}
            <FloatingShapes />

            {/* ═══════════════════ NAVBAR ═══════════════════ */}
            <motion.header
                className="main-navbar"
                animate={compact ? 'compact' : 'full'}
                initial="full"
                variants={{
                    full: { top: 0, padding: '0px' },
                    compact: { top: 16, padding: '0px 24px' },
                }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
                <motion.div
                    className="navbar-inner"
                    animate={compact ? 'compact' : 'full'}
                    variants={{
                        full: {
                            maxWidth: '100vw',
                            borderRadius: '0px',
                            backgroundColor: isHome ? 'rgba(0,0,0,0)' : 'rgba(18,35,58,0.97)',
                            backdropFilter: isHome ? 'blur(0px)' : 'blur(12px)',
                            boxShadow: isHome ? 'none' : '0 2px 24px rgba(0,0,0,0.2)',
                            padding: '1.25rem 3rem',
                        },
                        compact: {
                            maxWidth: '1100px',
                            borderRadius: '9999px',
                            backgroundColor: 'rgba(15,30,50,0.82)',
                            backdropFilter: 'blur(24px)',
                            boxShadow: '0 8px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.1)',
                            padding: '0.6rem 2rem',
                            border: '1px solid rgba(255,255,255,0.12)',
                        }
                    }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                    {/* ── Logo ── */}
                    <div className="nav-brand" onClick={() => navigate('/')}>
                        <img
                            src="/logo.png"
                            alt="Arunya Foundation"
                            className="nav-logo-img"
                            style={compact ? { width: 70, height: 70 } : {}}
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                        <motion.span
                            className="nav-brand-text"
                            style={{
                                marginLeft: '0.2rem',
                                color: compact ? '#ffffff' : '#ffffff',
                                textTransform: 'uppercase',
                                fontSize: compact ? '1.1rem' : undefined,
                            }}
                        >
                            ARUNYA
                        </motion.span>
                    </div>

                    {/* ── Center Nav Links (always visible) ── */}
                    <motion.nav
                        className="nav-links"
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {NAV_LINKS.map((link) => (
                            <button
                                key={link.path}
                                className={`nav-link-btn ${location.pathname === link.path ? 'active' : ''}`}
                                onClick={() => navigate(link.path)}
                                style={{
                                    color: compact ? '#ffffff' : '#ffffff',
                                    borderColor: compact ? 'rgba(30,58,95,0.15)' : undefined,
                                    textShadow: compact ? 'none' : undefined,
                                    padding: compact ? '0.45rem 1rem' : undefined,
                                    fontSize: compact ? '0.85rem' : undefined,
                                }}
                            >
                                {link.label}
                            </button>
                        ))}
                    </motion.nav>

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
                            width: 48, height: 48,
                            alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer', flexShrink: 0,
                            transition: 'background 0.2s',
                        }}
                    >
                        {mobileMenuOpen ? (
                            <span style={{ fontSize: '1.5rem', color: '#1e3a5f' }}>✕</span>
                        ) : (
                            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="7" cy="7" r="2.5" fill="#d4a847" />
                                <circle cx="17" cy="7" r="2.5" fill="#d4a847" />
                                <circle cx="7" cy="17" r="2.5" fill="#d4a847" />
                                <circle cx="17" cy="17" r="2.5" fill="#d4a847" />
                            </svg>
                        )}
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
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ═══════════════════ MAIN CONTENT ═══════════════════ */}
            <main className="w-full" style={{ paddingTop: location.pathname === '/' ? '0px' : '210px' }}>
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
