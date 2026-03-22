import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { HeartIcon } from './ui/animated-state-icons';
import { ContainerScroll } from './ui/container-scroll-animation';
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { VscAccount } from 'react-icons/vsc';
import BounceCards from './BounceCards';
import DomeGallery from './DomeGallery';
import CountUp from './CountUp';
import { RevealWaveImage } from './ui/reveal-wave-image';

const bounceImages = [
    "/assets/work/20251102_131451.jpg",
    "/assets/work/20251102_131454.jpg",
    "/assets/work/20251102_131457.jpg",
    "/assets/work/20251102_131502.jpg",
    "/assets/work/20251102_131508.jpg"
];

const bounceTransformStyles = [
    "rotate(5deg) translate(-150px)",
    "rotate(0deg) translate(-70px)",
    "rotate(-5deg)",
    "rotate(5deg) translate(70px)",
    "rotate(-5deg) translate(150px)"
];



const LandingPage = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);
    const parallaxRef = useRef<HTMLDivElement>(null);
    const [scrolled, setScrolled] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const [statsVisible, setStatsVisible] = useState(false);
    const [parallaxVisible, setParallaxVisible] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
            setScrollY(window.scrollY);
        };
        window.addEventListener('scroll', handleScroll);

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target as HTMLElement;
                    target.classList.add('animate-play');
                    target.style.opacity = '1';
                    target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        const elements = document.querySelectorAll('.scroll-animate');
        elements.forEach(el => observer.observe(el));

        // Separate observer for CountUp sections
        const countUpObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (entry.target === statsRef.current) setStatsVisible(true);
                    if (entry.target === parallaxRef.current) setParallaxVisible(true);
                }
            });
        }, { threshold: 0.2 });

        if (statsRef.current) countUpObserver.observe(statsRef.current);
        if (parallaxRef.current) countUpObserver.observe(parallaxRef.current);

        return () => {
            observer.disconnect();
            countUpObserver.disconnect();
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="landing-page" ref={scrollRef}>
            {/* Background image reflecting community/campus styled background */}
            <div className="hero-bg-parallax" style={{ transform: 'translateY(' + (scrollY * 0.4) + 'px)' }} />

            {/* Header */}
            <header className={`header ${scrolled ? 'scrolled' : ''}`}>
                {/* Desktop Layout (Hidden on Mobile) */}
                <div className="hidden lg:flex w-full justify-between items-center px-4">
                    {/* Brand Pill */}
                    <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-full px-5 py-2.5 flex items-center shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] border border-gray-100 dark:border-slate-800 pointer-events-auto">
                        <img src="/logo.png" alt="Logo" style={{ width: '28px', height: '28px', objectFit: 'contain', marginRight: '12px' }}
                            onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                        <h2 className="font-bold text-lg text-slate-800 dark:text-white mr-2">Arunya</h2>
                    </div>

                    {/* Navigation Links Pill */}
                    <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-full px-8 py-3.5 flex items-center gap-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] border border-gray-100 dark:border-slate-800 pointer-events-auto">
                        <a href="#home" onClick={(e) => { e.preventDefault(); document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-black dark:hover:text-white transition-colors">Home</a>
                        <a href="#about" onClick={(e) => { e.preventDefault(); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-black dark:hover:text-white transition-colors">About</a>
                        <a href="#causes" onClick={(e) => { e.preventDefault(); document.getElementById('causes')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-black dark:hover:text-white transition-colors">Causes</a>
                        <a href="#blog" onClick={(e) => { e.preventDefault(); document.getElementById('blog')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-black dark:hover:text-white transition-colors">Blog</a>
                        <a href="#gallery" onClick={(e) => { e.preventDefault(); document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-black dark:hover:text-white transition-colors">Gallery</a>
                        <a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }} className="flex items-center gap-1 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-black dark:hover:text-white transition-colors">
                            Contact
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                        </a>
                    </div>

                    {/* Controls Pill */}
                    <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-full p-1.5 flex items-center gap-2 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] border border-gray-100 dark:border-slate-800 pointer-events-auto">
                        <div className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 flex items-center justify-center transition-colors cursor-pointer text-slate-800 dark:text-slate-200" title="Profile">
                            <VscAccount size={18} />
                        </div>
                    </div>
                </div>

                {/* Mobile/Tablet Layout (Visible below lg) */}
                <div className="lg:hidden w-full px-2">
                    <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-[2rem] p-2 flex justify-between items-center shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] border border-gray-100 dark:border-slate-800 pointer-events-auto w-full">
                        {/* Brand */}
                        <div className="flex items-center pl-3">
                            <img src="/logo.png" alt="Logo" style={{ width: '26px', height: '26px', objectFit: 'contain', marginRight: '10px' }}
                                onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                            <h2 className="font-bold text-[1.1rem] text-slate-800 dark:text-white">Arunya</h2>
                        </div>

                        {/* Controls & Hamburger */}
                        <div className="flex items-center gap-1.5">
                            <div className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 flex items-center justify-center transition-colors cursor-pointer text-slate-800 dark:text-slate-200">
                                <VscAccount size={18} />
                            </div>
                            <div
                                className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 flex items-center justify-center transition-colors cursor-pointer text-slate-800 dark:text-slate-200"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            >
                                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                            </div>
                        </div>
                    </div>

                    {/* Mobile Menu Dropdown */}
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-80 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                        <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl p-4 flex flex-col gap-4 shadow-lg border border-gray-100 dark:border-slate-800 pointer-events-auto mx-1">
                            {['Home', 'About', 'Causes', 'Blog', 'Gallery', 'Contact'].map((item) => (
                                <a
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setIsMobileMenuOpen(false);
                                        document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                    className="text-[15px] font-medium text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white pl-2 py-1 border-b border-gray-100 dark:border-slate-800/60 last:border-0"
                                >
                                    {item}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Gallery (New Top Layout) */}
            <main className="hero-gallery relative mt-24 mx-4 md:mx-8 rounded-3xl overflow-hidden" style={{ height: '80vh', zIndex: 1, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
                <RevealWaveImage
                    src="/assets/loading-screen/1.png"
                    waveSpeed={0.2}
                    waveFrequency={0.7}
                    waveAmplitude={0.5}
                    revealRadius={0.5}
                    revealSoftness={1}
                    pixelSize={2}
                    mouseRadius={0.4}
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none select-none drop-shadow-2xl">
                    <h1 style={{ fontSize: '10vw', whiteSpace: 'nowrap', color: 'white', letterSpacing: '0.05em', margin: 0 }}>
                        ARUNYA
                    </h1>
                </div>
            </main>

            {/* Mission Section (Moved down) */}
            <section className="hero" style={{ minHeight: '80vh', paddingTop: '2rem' }}>
                <div className="hero-badge glass-panel scroll-animate" style={{ opacity: 0, transform: 'translateY(20px)', transition: 'all 0.8s ease-out' }}>
                    <span className="badge-new">Welcome</span> To Our Community! 🌿 📖 ✨
                </div>

                <h1 className="hero-title scroll-animate" style={{ opacity: 0, transform: 'translateY(20px)', transition: 'all 0.8s ease-out 0.1s' }}>
                    Empowering Individuals & <br />
                    Building Futures
                </h1>

                <p className="hero-subtitle scroll-animate" style={{ opacity: 0, transform: 'translateY(20px)', transition: 'all 0.8s ease-out 0.2s', animation: 'none' }}>
                    "Dedicated to spreading the light of education and building a future where no one is left behind. Together, we rise. Together, we transform. 💫"
                </p>

                <div className="hero-cta scroll-animate" style={{ opacity: 0, transform: 'translateY(20px)', transition: 'all 0.8s ease-out 0.3s', animation: 'none' }}>
                    <a href="https://forms.gle/CGpuK1YiLiF1D5UJA" target="_blank" rel="noreferrer" className="btn btn-primary" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>Join as Volunteer</a>
                    <a href="#causes" className="btn btn-secondary glass-panel" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>View Our Causes</a>
                </div>

                {/* Parallax Assets / Mockup Area */}
                <div ref={parallaxRef} className="parallax-assets-container scroll-animate" style={{ opacity: 0, transition: 'all 1s ease-out 0.4s' }}>
                    {/* Left Small Asset */}
                    <div className="floating-asset asset-left" style={{ transform: 'translateY(' + (scrollY * -0.15) + 'px)' }}>
                        <div className="flex-center icon-circle bg-orange">✨</div>
                        <h4 style={{ margin: 0, fontSize: '1rem' }}>Impact milestone</h4>
                        <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}><CountUp from={0} to={1000} separator="," direction="up" duration={2} startWhen={parallaxVisible} />+ lives improved</p>
                    </div>

                    {/* Center Main Asset */}
                    <div className="floating-asset asset-center" style={{ transform: 'translateY(' + (scrollY * -0.05) + 'px)' }}>
                        <div className="asset-header">
                            <div>
                                <h3 style={{ margin: 0, fontSize: '1.2rem' }}>Today's Mission</h3>
                                <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>4 of 6 goals completed</p>
                            </div>
                            <div className="streak-badge">30 day streak</div>
                        </div>
                        <div className="task-list">
                            <div className="task-item glass-blur">
                                <div className="task-check checked">✓</div>
                                <div className="task-details">
                                    <strong>Food Distribution Drive</strong>
                                    <span>Before 11:00 am</span>
                                </div>
                                <div className="task-progress"><CountUp from={0} to={100} direction="up" duration={2} startWhen={parallaxVisible} />%</div>
                            </div>
                            <div className="task-item glass-blur">
                                <div className="task-check"></div>
                                <div className="task-details">
                                    <strong>Education Workshop</strong>
                                    <span>Evening focus block</span>
                                </div>
                                <div className="task-progress"><CountUp from={0} to={67} direction="up" duration={2} startWhen={parallaxVisible} />%</div>
                            </div>
                        </div>
                    </div>

                    {/* Right Small Asset */}
                    <div className="floating-asset asset-right" style={{ transform: 'translateY(' + (scrollY * -0.2) + 'px)' }}>
                        <h4 style={{ margin: 0, fontSize: '1rem' }}>Today's Goal</h4>
                        <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>Complete 3 activities</p>
                        <div className="goal-circles">
                            <div className="goal-circle"><span className="g-value"><CountUp from={0} to={65} direction="up" duration={2} startWhen={parallaxVisible} />%</span></div>
                            <div className="goal-circle"><span className="g-value"><CountUp from={0} to={87} direction="up" duration={2} startWhen={parallaxVisible} />%</span></div>
                            <div className="goal-circle"><span className="g-value"><CountUp from={0} to={94} direction="up" duration={2} startWhen={parallaxVisible} />%</span></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Us Section */}
            <section id="about" className="about-section" style={{ padding: '6rem 2rem', position: 'relative', zIndex: 10 }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 className="section-title scroll-animate" style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem', opacity: 0, transform: 'translateY(20px)', transition: 'all 0.8s ease-out' }}>About Arunya</h2>
                    <div className="section-subtitle scroll-animate" style={{ color: 'var(--text-muted)', maxWidth: '800px', margin: '0 auto', opacity: 0, transform: 'translateY(20px)', transition: 'all 0.8s ease-out 0.2s', textAlign: 'justify' }}>
                        <p style={{ marginBottom: '1rem' }}>
                            Arunya Foundation is a youth-driven community initiative based in Gwalior, dedicated to empowering rural communities and transforming the lives of children through education. Founded with the belief that education is the most powerful tool for social change, the foundation works to bridge learning gaps and create opportunities for children in underserved areas.
                        </p>
                        <p style={{ marginBottom: '1rem' }}>
                            Through volunteer-led programs, community engagement, and collaborative initiatives, Arunya Foundation focuses on strengthening foundational learning, nurturing curiosity, and encouraging young minds to dream beyond limitations. Our work is rooted in compassion, innovation, and the collective spirit of youth working together for meaningful change.
                        </p>
                        <p>
                            With passionate volunteers, grassroots engagement, and a vision for inclusive development, Arunya Foundation aims to build stronger rural communities where every child has access to quality education, guidance, and the opportunity to grow into a confident and capable future leader.
                        </p>
                    </div>
                </div>
                <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
                    {/* Vision Card */}
                    <div className="glass-panel scroll-animate" style={{ padding: '2rem', borderRadius: '24px', opacity: 0, transform: 'translateY(40px)', transition: 'all 0.8s ease-out 0.3s' }}>
                        <div className="flex-center icon-circle bg-orange" style={{ width: '60px', height: '60px', fontSize: '1.5rem', marginBottom: '1.5rem' }}>👁️</div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Our Vision</h3>
                        <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>To build empowered rural communities where every child has access to quality education, opportunities to learn, and the support needed to grow into responsible, confident, and capable leaders of the future.</p>
                        <img src="/assets/work/63624.jpg.jpeg" alt="Vision" style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '16px', marginTop: '1.5rem' }} />
                    </div>
                    {/* Mission Card */}
                    <div className="glass-panel scroll-animate" style={{ padding: '2rem', borderRadius: '24px', opacity: 0, transform: 'translateY(40px)', transition: 'all 0.8s ease-out 0.4s' }}>
                        <div className="flex-center icon-circle" style={{ background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', width: '60px', height: '60px', fontSize: '1.5rem', marginBottom: '1.5rem' }}>🎯</div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Our Mission</h3>
                        <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>To empower children in rural areas through accessible and meaningful education by mobilizing youth volunteers, strengthening foundational learning, and creating community-driven initiatives that nurture knowledge, creativity, and social responsibility.</p>
                        <img src="/assets/work/63626.jpg.jpeg" alt="Mission" style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '16px', marginTop: '1.5rem' }} />
                    </div>
                    {/* Objective Card */}
                    <div className="glass-panel scroll-animate" style={{ padding: '2rem', borderRadius: '24px', opacity: 0, transform: 'translateY(40px)', transition: 'all 0.8s ease-out 0.5s' }}>
                        <div className="flex-center icon-circle" style={{ background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', color: 'white', width: '60px', height: '60px', fontSize: '1.5rem', marginBottom: '1.5rem' }}>📋</div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Our Objectives</h3>
                        <ul style={{ color: 'var(--text-muted)', lineHeight: 1.4, textAlign: 'left', listStyleType: 'disc', paddingLeft: '1.2rem', fontSize: '0.9rem' }}>
                            <li style={{ marginBottom: '0.4rem' }}>To promote access to quality education for children in rural communities.</li>
                            <li style={{ marginBottom: '0.4rem' }}>To bridge learning gaps through volunteer-led teaching and support.</li>
                            <li style={{ marginBottom: '0.4rem' }}>To encourage youth participation in community development.</li>
                            <li style={{ marginBottom: '0.4rem' }}>To create safe and supportive learning environments.</li>
                            <li style={{ marginBottom: '0.4rem' }}>To raise awareness about the importance of education.</li>
                            <li style={{ marginBottom: '0.4rem' }}>To develop sustainable community initiatives.</li>
                        </ul>
                        <img src="/assets/work/63627.jpg.jpeg" alt="Objectives" style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '16px', marginTop: '1.5rem' }} />
                    </div>
                </div>
            </section>

            {/* Container Scroll Animation Section */}
            <section className="scroll-demo-section" style={{ position: 'relative', zIndex: 10, overflow: 'hidden' }}>
                <ContainerScroll
                    titleComponent={
                        <>
                            <h1 className="text-4xl font-semibold text-black dark:text-white pb-4">
                                Experience the future of <br />
                                <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none text-[var(--accent-color)]">
                                    Impact Tracking
                                </span>
                            </h1>
                        </>
                    }
                >
                    <img
                        src="/assets/work/20251102_131451.jpg"
                        alt="hero"
                        style={{ height: '100%', width: '100%', objectFit: 'cover', borderRadius: '1rem', objectPosition: 'left top' }}
                        draggable={false}
                    />
                </ContainerScroll>
            </section>

            {/* Impact Stats Section */}
            <section className="impact-stats-section" style={{ padding: '4rem 2rem', position: 'relative', zIndex: 10 }}>
                <div ref={statsRef} className="stats-container glass-panel scroll-animate" style={{ opacity: 0, transform: 'translateY(40px)', transition: 'all 0.8s ease-out' }}>
                    <div className="stat-item tooltip-container">
                        <div className="stat-icon flex-center bg-orange">👥</div>
                        <h3 className="stat-number"><CountUp from={0} to={1250} separator="," direction="up" duration={2} startWhen={statsVisible} />+</h3>
                        <p className="stat-label">Children Taught</p>
                        <div className="tooltip-text glass-panel">Every weekend, volunteers teach basic knowledge on-site to underprivileged children.</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-icon flex-center" style={{ background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white' }}>💚</div>
                        <h3 className="stat-number">₹<CountUp from={0} to={5.2} direction="up" duration={2} startWhen={statsVisible} />L+</h3>
                        <p className="stat-label">Donation Raised</p>
                    </div>
                    <div className="stat-item">
                        <div className="stat-icon flex-center" style={{ background: 'linear-gradient(135deg, #ec4899, #be185d)', color: 'white' }}>🍲</div>
                        <h3 className="stat-number"><CountUp from={0} to={15} direction="up" duration={2} startWhen={statsVisible} />k+</h3>
                        <p className="stat-label">Meals Served</p>
                    </div>
                    <div className="stat-item">
                        <div className="stat-icon flex-center" style={{ background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', color: 'white' }}>🤝</div>
                        <h3 className="stat-number"><CountUp from={0} to={300} direction="up" duration={2} startWhen={statsVisible} />+</h3>
                        <p className="stat-label">Active Volunteers</p>
                    </div>
                </div>
            </section>

            <section id="causes" className="causes-section" style={{ padding: '8rem 2rem', position: 'relative', zIndex: 10 }}>
                <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                    <h2 className="section-title scroll-animate" style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1.5rem', opacity: 0, transform: 'translateY(20px)', transition: 'all 0.8s ease-out' }}>Support Our Mission</h2>
                    <p className="section-subtitle scroll-animate" style={{ color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto', fontSize: '1.2rem', opacity: 0, transform: 'translateY(20px)', transition: 'all 0.8s ease-out 0.2s' }}>
                        Your contribution directly impacts lives. Explore our primary focus areas and choose where you'd like to make a difference.
                    </p>
                </div>

                <div className="flex-center mb-16 scroll-animate" style={{ opacity: 0, transform: 'translateY(20px)', transition: 'all 0.8s ease-out 0.3s' }}>
                    <BounceCards
                        className="custom-bounceCards scale-110 lg:scale-150"
                        images={bounceImages}
                        containerWidth={800}
                        containerHeight={500}
                        animationDelay={0.5}
                        animationStagger={0.08}
                        easeType="elastic.out(1, 0.5)"
                        transformStyles={bounceTransformStyles}
                        enableHover={true}
                    />
                </div>

                {/* Filter Bar */}
                <div className="filter-bar scroll-animate" style={{ opacity: 0, transform: 'translateY(20px)', transition: 'all 0.8s ease-out 0.3s' }}>
                    <button className="filter-btn active"><span>🏠</span> All</button>
                    <button className="filter-btn"><span>🍲</span> Food</button>
                    <button className="filter-btn"><span>📚</span> Education</button>
                    <button className="filter-btn"><span>🎂</span> Birthday</button>
                    <button className="filter-btn"><span>🌱</span> Environment</button>
                </div>

                {/* Causes Grid */}
                <div className="causes-grid">
                    {[
                        { title: 'Weekend Basic Classes', category: 'Education', icon: '📚', amount: '₹500/Child', img: '/assets/work/20251102_131620.jpg' },
                        { title: 'Feed a Homeless Child', category: 'Food', icon: '🍲', amount: '₹50/Meal', img: '/assets/work/20251102_131624.jpg' },
                        { title: 'Virtual Cake Cutting', category: 'Birthday', icon: '🎂', amount: '₹2000/Celebration', img: '/assets/work/20251102_131626.jpg' },
                        { title: 'School Supplies Kit', category: 'Education', icon: '🎒', amount: '₹350/Kit', img: '/assets/work/20251102_131627.jpg' },
                    ].map((cause, idx) => (
                        <div key={idx} className="cause-card glass-panel scroll-animate" style={{ opacity: 0, transform: 'translateY(40px)', transition: 'all 0.8s ease-out ' + (0.4 + (idx * 0.1)) + 's' }}>
                            <div className="cause-image" style={{ backgroundImage: `url(${cause.img})` }}>
                                <div className="cause-badge">{cause.amount}</div>
                            </div>
                            <div className="cause-content">
                                <h3>{cause.icon} {cause.title}</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>Support our {cause.category.toLowerCase()} initiative and make a direct impact today.</p>
                                <InteractiveHoverButton text="Donate Now" className="w-full" />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Gallery and Media Section */}
            <section id="gallery" className="gallery-section" style={{ padding: '6rem 2rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 className="section-title scroll-animate" style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem', opacity: 0, transform: 'translateY(20px)', transition: 'all 0.8s ease-out' }}>Impact in Action</h2>
                    <p className="section-subtitle scroll-animate" style={{ color: 'var(--text-muted)', opacity: 0, transform: 'translateY(20px)', transition: 'all 0.8s ease-out 0.2s' }}>Moments of joy, learning, and community building.</p>
                </div>

                <div className="gallery-container scroll-animate" style={{ height: '80vh', width: '100%', maxWidth: '1400px', margin: '0 auto', position: 'relative', borderRadius: '24px', overflow: 'hidden', opacity: 0, transform: 'translateY(40px)', transition: 'all 0.8s ease-out 0.3s' }}>
                    <DomeGallery />
                </div>
            </section>

            {/* Stories & Blog Section */}
            <section id="blog" className="blog-section" style={{ padding: '6rem 2rem', position: 'relative', zIndex: 10 }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 className="section-title scroll-animate" style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem', opacity: 0, transform: 'translateY(20px)', transition: 'all 0.8s ease-out' }}>Stories of Change</h2>
                    <p className="section-subtitle scroll-animate" style={{ color: 'var(--text-muted)', opacity: 0, transform: 'translateY(20px)', transition: 'all 0.8s ease-out 0.2s' }}>Read about the lives we've touched together.</p>
                </div>

                <div className="blog-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
                    {[
                        { title: 'A New School in Rantau', date: 'Oct 12, 2023', excerpt: 'Thanks to our generous donors, we successfully inaugurated a primary school catering to 120 children.', img: '/assets/work/20251102_131631.jpg' },
                        { title: 'Ramesh\'s Journey to College', date: 'Sep 28, 2023', excerpt: 'Meet Ramesh, the first from his village to attend university. Here is his inspiring story of perseverance.', img: '/assets/work/20251102_131634.jpg' },
                        { title: 'Annual Food Drive Success', date: 'Aug 15, 2023', excerpt: 'Over 15,000 meals were served across the city on Independence Day by our dedicated volunteer network.', img: '/assets/work/20251102_131635.jpg' }
                    ].map((post, idx) => (
                        <div key={idx} className="blog-card glass-panel scroll-animate" style={{ borderRadius: '24px', overflow: 'hidden', opacity: 0, transform: 'translateY(40px)', transition: 'all 0.8s ease-out ' + (0.3 + (idx * 0.1)) + 's' }}>
                            <div className="blog-image" style={{ height: '220px', backgroundImage: `url(${post.img})`, backgroundSize: 'cover', backgroundPosition: 'center', transition: 'transform 0.5s' }}></div>
                            <div className="blog-content" style={{ padding: '2rem' }}>
                                <span style={{ color: 'var(--accent-color)', fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.75rem' }}>{post.date}</span>
                                <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', fontWeight: 700 }}>{post.title}</h3>
                                <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: 1.6 }}>{post.excerpt}</p>
                                <a href="#" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>Read Full Story <span style={{ fontSize: '1.2rem' }}>→</span></a>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Join the Community Section */}
            <section id="community" className="community-cta-section" style={{ padding: '6rem 2rem', position: 'relative', zIndex: 10 }}>
                <div className="glass-panel scroll-animate" style={{
                    maxWidth: '1000px',
                    margin: '0 auto',
                    padding: '4rem 2rem',
                    borderRadius: '40px',
                    textAlign: 'center',
                    border: '1px solid var(--glass-border)',
                    opacity: 0,
                    transform: 'translateY(40px)',
                    transition: 'all 0.8s ease-out'
                }}>
                    <div className="flex-center icon-circle bg-orange mb-6" style={{ width: '80px', height: '80px', fontSize: '2rem', margin: '0 auto 1.5rem' }}>🌍</div>
                    <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1.5rem', lineHeight: 1.1 }}>Join Our Growing <br /> Community</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 3rem', lineHeight: 1.6 }}>
                        Help us spread the light of education. Get daily updates on our work and see how your contribution transforms lives every day.
                    </p>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                        <InteractiveHoverButton text="Join WhatsApp" className="w-full md:w-auto min-w-[220px]" />
                        <InteractiveHoverButton text="Follow Instagram" className="w-full md:w-auto min-w-[220px]" />
                    </div>
                </div>
            </section>

            {/* Floating Donate Button */}
            <div
                className="floating-donate-btn"
                onClick={() => {
                    const el = document.getElementById('causes');
                    el?.scrollIntoView({ behavior: 'smooth' });
                }}
            >
                Donate Monthly
                <HeartIcon size={20} color="white" />
            </div>
        </div>
    );
};

export default LandingPage;
