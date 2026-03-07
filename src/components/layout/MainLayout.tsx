import { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ThemeToggle } from '../ui/theme-toggle';
import Dock from '../ui/Dock';
import { HomeIcon, InfoIcon, HeartIcon, CopiedIcon, EyeToggleIcon, NotificationIcon } from '../ui/animated-state-icons';
import { VscAccount } from 'react-icons/vsc';
import { AnimatePresence, motion } from 'framer-motion';
import { JoinCommunity, Footer } from './Footer';

const CyclingText = () => {
    const texts = ["Login", "Sign Up", "Sign In"];
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % texts.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ position: 'relative', height: 20, width: 65, overflow: 'hidden' }}>
            <AnimatePresence mode="wait">
                <motion.span
                    key={texts[index]}
                    initial={{ y: 18, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -18, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    style={{
                        position: 'absolute', inset: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'flex-start',
                        fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)',
                        whiteSpace: 'nowrap',
                    }}
                >
                    {texts[index]}
                </motion.span>
            </AnimatePresence>
        </div>
    );
};

interface MainLayoutProps {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
}

export const MainLayout = ({ theme, toggleTheme }: MainLayoutProps) => {
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);

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
        // Re-observe on route change
        const timeoutId = setTimeout(observeElements, 500);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            observer.disconnect();
            clearTimeout(timeoutId);
        };
    }, [location.pathname]);

    // Scroll to top on route change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    const dockItems = [
        { icon: <HomeIcon size={24} color={location.pathname === '/' ? 'white' : 'var(--text-primary)'} />, label: 'Home', onClick: () => navigate('/'), active: location.pathname === '/' },
        { icon: <InfoIcon size={24} color={location.pathname === '/about' ? 'white' : 'var(--text-primary)'} />, label: 'About', onClick: () => navigate('/about'), active: location.pathname === '/about' },
        { icon: <HeartIcon size={24} color={location.pathname === '/causes' ? 'white' : 'var(--text-primary)'} />, label: 'Causes', onClick: () => navigate('/causes'), active: location.pathname === '/causes' },
        { icon: <CopiedIcon size={24} color={location.pathname === '/blog' ? 'white' : 'var(--text-primary)'} />, label: 'Blog', onClick: () => navigate('/blog'), active: location.pathname === '/blog' },
        { icon: <EyeToggleIcon size={24} color={location.pathname === '/gallery' ? 'white' : 'var(--text-primary)'} />, label: 'Gallery', onClick: () => navigate('/gallery'), active: location.pathname === '/gallery' },
        { icon: <NotificationIcon size={24} color={location.pathname === '/contact' ? 'white' : 'var(--text-primary)'} />, label: 'Contact', onClick: () => navigate('/contact'), active: location.pathname === '/contact' },
    ];

    return (
        <div className="landing-page relative min-h-screen pb-24">
            {/* Header */}
            <header className={`header ${scrolled ? 'scrolled' : ''}`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pointerEvents: 'none' }}>
                {/* Clicking Logo goes to main website (Home) */}
                <div className="brand glass-panel cursor-pointer flex items-center gap-2" style={{ width: 'auto', padding: '0.5rem 1.25rem', pointerEvents: 'auto' }} onClick={() => navigate('/')}>
                    <img src="/logo.jpg" alt="Logo" style={{ width: '28px', height: '28px', objectFit: 'cover', borderRadius: '50%' }}
                        onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                    <h2 style={{ margin: 0, fontSize: '1.1rem' }}>Arunya</h2>
                </div>

                <div className="center-nav" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', height: '58px', overflow: 'visible', pointerEvents: 'auto' }}>
                    <div style={{ height: '58px', display: 'flex', alignItems: 'center', overflow: 'visible' }}>
                        <Dock
                            items={dockItems}
                            panelHeight={52}
                            baseItemSize={36}
                            magnification={56}
                            distance={150}
                            dockHeight={52}
                            direction="down"
                        />
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', pointerEvents: 'auto', justifySelf: 'flex-end' }}>
                    <div className="glass-panel flex-center cursor-pointer" style={{ height: 48, borderRadius: 99, padding: '0 0.5rem', flexShrink: 0 }}>
                        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
                    </div>
                    <div
                        className="header-controls glass-panel flex items-center cursor-pointer"
                        style={{ height: 48, borderRadius: 99, padding: '0 1.25rem 0 0.35rem', gap: '0.6rem' }}
                        onClick={() => navigate('/login')}
                        title="Profile / Login"
                    >
                        <div className="flex-center rounded-full" style={{ width: 40, height: 40, background: 'rgba(255,255,255,0.08)', flexShrink: 0 }}>
                            <VscAccount size={20} color="var(--text-primary)" />
                        </div>
                        <CyclingText />
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="w-full">
                <AnimatePresence mode="wait">
                    <Outlet key={location.pathname} />
                </AnimatePresence>
            </main>

            {/* Common CTA & Footer */}
            <JoinCommunity />
            <Footer />

            {/* Bottom Dock Navigation */}
            <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-6">
                <Dock
                    items={dockItems}
                    panelHeight={68}
                    baseItemSize={50}
                    magnification={70}
                />
            </div>

            {/* Floating Donate Button */}
            <div
                className="floating-donate-btn"
                onClick={() => {
                    navigate('/login');
                }}
            >
                Donate Monthly
                <HeartIcon size={20} color="white" />
            </div>
        </div>
    );
};
