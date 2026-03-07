import { useState, useEffect, useRef } from 'react';
import { PageTransition } from '../components/ui/PageTransition';
import { ContainerScroll } from '../components/ui/container-scroll-animation';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import BounceCards from '../components/BounceCards';
import DomeGallery from '../components/DomeGallery';
import CountUp from '../components/CountUp';

/* ── Image Data ───────────────────────────────────────────── */
const heroImages = [
    "/assets/work/20251102_131451.jpg",
    "/assets/work/20251102_131454.jpg",
    "/assets/work/20251102_131457.jpg",
    "/assets/work/20251102_131502.jpg",
    "/assets/work/20251102_131508.jpg"
];

const bounceTransforms = [
    "rotate(5deg) translate(-150px)",
    "rotate(0deg) translate(-70px)",
    "rotate(-5deg)",
    "rotate(5deg) translate(70px)",
    "rotate(-5deg) translate(150px)"
];

const causes = [
    { title: 'Weekend Basic Classes', category: 'Education', icon: '📚', amount: '₹500/Child', img: '/assets/work/20251102_131620.jpg', desc: 'Free weekend classes teaching reading, writing, and basic math to underprivileged children.' },
    { title: 'Feed a Homeless Child', category: 'Food', icon: '🍲', amount: '₹50/Meal', img: '/assets/work/20251102_131624.jpg', desc: 'Nutritious meals served daily to children who cannot afford regular food.' },
    { title: 'Virtual Cake Cutting', category: 'Birthday', icon: '🎂', amount: '₹2000/Event', img: '/assets/work/20251102_131626.jpg', desc: 'Celebrate your birthday by sponsoring a party for orphaned children.' },
    { title: 'School Supplies Kit', category: 'Education', icon: '🎒', amount: '₹350/Kit', img: '/assets/work/20251102_131627.jpg', desc: 'Complete kit with notebooks, pens, and bags for each child\'s school year.' },
];

const blogPosts = [
    { title: 'A New School in Rantau', date: 'Oct 12, 2023', excerpt: 'Thanks to our generous donors, we successfully inaugurated a primary school catering to 120 children.', img: '/assets/work/20251102_131631.jpg' },
    { title: "Ramesh's Journey to College", date: 'Sep 28, 2023', excerpt: 'Meet Ramesh, the first from his village to attend university — an inspiring story of perseverance.', img: '/assets/work/20251102_131634.jpg' },
    { title: 'Annual Food Drive Success', date: 'Aug 15, 2023', excerpt: 'Over 15,000 meals were served across the city on Independence Day by our volunteer network.', img: '/assets/work/20251102_131635.jpg' },
];

/* ── Component ────────────────────────────────────────────── */
export const HomePage = () => {
    const [scrollY, setScrollY] = useState(0);
    const statsRef = useRef<HTMLDivElement>(null);
    const [statsVisible, setStatsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);

        /* CountUp observer */
        const countObs = new IntersectionObserver((entries) => {
            entries.forEach(e => { if (e.isIntersecting) setStatsVisible(true); });
        }, { threshold: 0.2 });
        if (statsRef.current) countObs.observe(statsRef.current);

        return () => { countObs.disconnect(); window.removeEventListener('scroll', handleScroll); };
    }, []);

    return (
        <PageTransition>
            {/* ═══════════════════ HERO ═══════════════════ */}
            <section className="relative" style={{ minHeight: '100vh', overflow: 'hidden' }}>
                {/* Parallax background */}
                <div className="hero-bg-parallax" style={{ transform: `translateY(${scrollY * 0.35}px)` }} />

                {/* Hero content – centered */}
                <div className="flex flex-col items-center justify-center text-center px-6" style={{ minHeight: '100vh', paddingTop: '7rem', position: 'relative', zIndex: 2 }}>
                    <div className="hero-badge glass-panel" style={{ animation: 'fadeInDown 0.6s ease-out' }}>
                        <span className="badge-new">Welcome</span> To Our Community! 🌿 📖 ✨
                    </div>

                    <h1 className="hero-title" style={{ animation: 'slideUp 0.7s ease-out' }}>
                        Empowering Individuals &<br />Building Futures
                    </h1>

                    <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '680px', marginBottom: '2.5rem', lineHeight: 1.7, animation: 'slideUp 0.8s ease-out' }}>
                        Dedicated to spreading the light of education and building a future where no one is left behind. Together, we rise. Together, we transform.
                    </p>

                    <div className="flex gap-4 flex-wrap justify-center" style={{ animation: 'slideUp 0.9s ease-out' }}>
                        <a href="https://forms.gle/CGpuK1YiLiF1D5UJA" target="_blank" rel="noreferrer" className="btn btn-primary" style={{ textDecoration: 'none' }}>Join as Volunteer</a>
                        <a href="#causes" className="btn btn-secondary glass-panel" style={{ textDecoration: 'none' }}>View Our Causes</a>
                    </div>

                    {/* Scroll indicator */}
                    <div className="mt-16 flex flex-col items-center gap-2 opacity-40">
                        <span className="text-sm">Scroll to explore</span>
                        <div style={{ width: '2px', height: '40px', background: 'var(--text-muted)', borderRadius: '2px', animation: 'pulse 2s infinite' }} />
                    </div>
                </div>
            </section>

            {/* ═══════════════════ IMPACT NUMBERS ═══════════════════ */}
            <section ref={statsRef} className="py-16 px-6" style={{ position: 'relative', zIndex: 10 }}>
                <div className="stats-container glass-panel scroll-animate max-w-5xl mx-auto" style={{ opacity: 0, transform: 'translateY(40px)', transition: 'all 0.8s ease-out' }}>
                    {[
                        { icon: '👥', gradient: 'bg-orange', value: 1250, suffix: '+', label: 'Children Taught', tooltip: 'Every weekend, volunteers teach basic knowledge on-site to underprivileged children.' },
                        { icon: '💚', gradient: '', gradientStyle: { background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white' }, prefix: '₹', value: 5.2, suffix: 'L+', label: 'Donation Raised' },
                        { icon: '🍲', gradient: '', gradientStyle: { background: 'linear-gradient(135deg, #ec4899, #be185d)', color: 'white' }, value: 15, suffix: 'k+', label: 'Meals Served' },
                        { icon: '🤝', gradient: '', gradientStyle: { background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', color: 'white' }, value: 300, suffix: '+', label: 'Active Volunteers' },
                    ].map((s, i) => (
                        <div key={i} className={`stat-item ${s.tooltip ? 'tooltip-container' : ''}`}>
                            <div className={`stat-icon flex-center ${s.gradient}`} style={s.gradientStyle}>{s.icon}</div>
                            <h3 className="stat-number">
                                {s.prefix}<CountUp from={0} to={s.value} separator="," direction="up" duration={2} startWhen={statsVisible} />{s.suffix}
                            </h3>
                            <p className="stat-label">{s.label}</p>
                            {s.tooltip && <div className="tooltip-text glass-panel">{s.tooltip}</div>}
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══════════════════ ABOUT / MISSION ═══════════════════ */}
            <section id="about" className="py-24 px-6" style={{ position: 'relative', zIndex: 10 }}>
                <div className="text-center mb-16">
                    <h2 className="section-title scroll-animate" style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem', opacity: 0, transform: 'translateY(20px)', transition: 'all 0.8s ease-out' }}>About Arunya</h2>
                    <p className="scroll-animate" style={{ color: 'var(--text-muted)', maxWidth: '650px', margin: '0 auto', fontSize: '1.15rem', lineHeight: 1.7, opacity: 0, transform: 'translateY(20px)', transition: 'all 0.8s ease-out 0.2s' }}>
                        We are a passionate team dedicated to creating sustainable change through education, health, and community empowerment.
                    </p>
                </div>

                <div className="grid gap-8 max-w-6xl mx-auto" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px,1fr))' }}>
                    {[
                        { icon: '👁️', gradient: 'bg-orange', title: 'Our Vision', text: 'To build a world where every individual has access to basic rights, education, and opportunities to thrive.', img: '/assets/work/20251102_131638.jpg' },
                        { icon: '🎯', gradient: '', gradientStyle: { background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white' }, title: 'Our Mission', text: 'To empower marginalized communities with sustainable resources, education, and support systems.', img: '/assets/work/20251102_131641.jpg' },
                        { icon: '🤝', gradient: '', gradientStyle: { background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', color: 'white' }, title: 'Core Values', text: 'Integrity, Compassion, Transparency, and Community-driven action guide every decision we make.', img: '/assets/work/20251102_131647.jpg' },
                    ].map((c, i) => (
                        <div key={i} className="glass-panel scroll-animate" style={{ padding: '2rem', borderRadius: '24px', opacity: 0, transform: 'translateY(40px)', transition: `all 0.8s ease-out ${0.3 + i * 0.1}s` }}>
                            <div className={`flex-center icon-circle ${c.gradient}`} style={{ ...c.gradientStyle, width: 60, height: 60, fontSize: '1.5rem', marginBottom: '1.5rem' }}>{c.icon}</div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 700 }}>{c.title}</h3>
                            <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.5rem' }}>{c.text}</p>
                            <img src={c.img} alt={c.title} style={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: 16 }} />
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══════════════════ SCROLL ANIMATION ═══════════════════ */}
            <section style={{ position: 'relative', zIndex: 10, overflow: 'hidden' }}>
                <ContainerScroll titleComponent={
                    <h1 className="text-4xl font-semibold text-black dark:text-white pb-4">
                        Experience the future of<br />
                        <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none text-[var(--accent-color)]">Impact Tracking</span>
                    </h1>
                }>
                    <img
                        src="/assets/work/20251102_131451.jpg"
                        alt="hero" draggable={false}
                        style={{ height: '100%', width: '100%', objectFit: 'cover', borderRadius: '1rem', objectPosition: 'left top' }}
                    />
                </ContainerScroll>
            </section>

            {/* ═══════════════════ CAUSES ═══════════════════ */}
            <section id="causes" className="py-24 px-6" style={{ position: 'relative', zIndex: 10 }}>
                <div className="text-center mb-12">
                    <h2 className="section-title scroll-animate" style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem', opacity: 0, transform: 'translateY(20px)', transition: 'all 0.8s ease-out' }}>Support Our Mission</h2>
                    <p className="scroll-animate" style={{ color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto', fontSize: '1.15rem', lineHeight: 1.7, opacity: 0, transform: 'translateY(20px)', transition: 'all 0.8s ease-out 0.2s' }}>
                        Your contribution directly impacts lives. Explore our focus areas and choose where you'd like to make a difference.
                    </p>
                </div>

                {/* BounceCards showcase */}
                <div className="flex-center mb-20 scroll-animate" style={{ opacity: 0, transform: 'translateY(20px)', transition: 'all 0.8s ease-out 0.3s' }}>
                    <BounceCards images={heroImages} containerWidth={700} containerHeight={420} transformStyles={bounceTransforms} enableHover={true} animationDelay={0.4} className="scale-90 md:scale-110" />
                </div>

                {/* Filter bar */}
                <div className="filter-bar scroll-animate" style={{ opacity: 0, transform: 'translateY(20px)', transition: 'all 0.8s ease-out 0.3s' }}>
                    {['🏠 All', '🍲 Food', '📚 Education', '🎂 Birthday', '🌱 Environment'].map((f, i) => (
                        <button key={i} className={`filter-btn ${i === 0 ? 'active' : ''}`}>{f}</button>
                    ))}
                </div>

                {/* Cards grid */}
                <div className="causes-grid max-w-6xl mx-auto">
                    {causes.map((cause, idx) => (
                        <div key={idx} className="cause-card glass-panel scroll-animate" style={{ opacity: 0, transform: 'translateY(40px)', transition: `all 0.8s ease-out ${0.4 + idx * 0.1}s` }}>
                            <div className="cause-image" style={{ backgroundImage: `url(${cause.img})` }}>
                                <div className="cause-badge">{cause.amount}</div>
                            </div>
                            <div className="cause-content">
                                <h3>{cause.icon} {cause.title}</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem', lineHeight: 1.6 }}>{cause.desc}</p>
                                <InteractiveHoverButton text="Donate Now" className="w-full" />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══════════════════ GALLERY ═══════════════════ */}
            <section id="gallery" className="py-24 px-6">
                <div className="text-center mb-16">
                    <h2 className="section-title scroll-animate" style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem', opacity: 0, transform: 'translateY(20px)', transition: 'all 0.8s ease-out' }}>Impact in Action</h2>
                    <p className="scroll-animate" style={{ color: 'var(--text-muted)', fontSize: '1.15rem', opacity: 0, transform: 'translateY(20px)', transition: 'all 0.8s ease-out 0.2s' }}>Moments of joy, learning, and community building.</p>
                </div>
                <div className="scroll-animate" style={{ height: '80vh', width: '100%', maxWidth: '1400px', margin: '0 auto', borderRadius: 24, overflow: 'hidden', opacity: 0, transform: 'translateY(40px)', transition: 'all 0.8s ease-out 0.3s' }}>
                    <DomeGallery />
                </div>
            </section>

            {/* ═══════════════════ STORIES / BLOG ═══════════════════ */}
            <section id="blog" className="py-24 px-6" style={{ position: 'relative', zIndex: 10 }}>
                <div className="text-center mb-16">
                    <h2 className="section-title scroll-animate" style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem', opacity: 0, transform: 'translateY(20px)', transition: 'all 0.8s ease-out' }}>Stories of Change</h2>
                    <p className="scroll-animate" style={{ color: 'var(--text-muted)', fontSize: '1.15rem', opacity: 0, transform: 'translateY(20px)', transition: 'all 0.8s ease-out 0.2s' }}>Read about the lives we've touched together.</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px,1fr))', gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
                    {blogPosts.map((post, idx) => (
                        <div key={idx} className="blog-card glass-panel scroll-animate" style={{ borderRadius: 24, overflow: 'hidden', opacity: 0, transform: 'translateY(40px)', transition: `all 0.8s ease-out ${0.3 + idx * 0.1}s` }}>
                            <div className="blog-image" style={{ height: 220, backgroundImage: `url(${post.img})`, backgroundSize: 'cover', backgroundPosition: 'center', transition: 'transform 0.5s' }} />
                            <div style={{ padding: '2rem' }}>
                                <span style={{ color: 'var(--accent-color)', fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.75rem' }}>{post.date}</span>
                                <h3 style={{ fontSize: '1.35rem', marginBottom: '0.75rem', fontWeight: 700 }}>{post.title}</h3>
                                <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: 1.6 }}>{post.excerpt}</p>
                                <a href="#" style={{ color: 'var(--accent-color)', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>Read Full Story <span>→</span></a>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══════════════════ VIDEO COMPILATION ═══════════════════ */}
            <section id="videos" className="py-24 px-6" style={{ position: 'relative', zIndex: 10 }}>
                <div className="text-center mb-16">
                    <h2 className="section-title scroll-animate" style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem', opacity: 0, transform: 'translateY(20px)', transition: 'all 0.8s ease-out' }}>Moments Captured</h2>
                    <p className="scroll-animate" style={{ color: 'var(--text-muted)', fontSize: '1.15rem', opacity: 0, transform: 'translateY(20px)', transition: 'all 0.8s ease-out 0.2s' }}>Watch our journey and the lives we've impacted.</p>
                </div>

                <div className="grid gap-6 max-w-7xl mx-auto" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
                    {/* Item 1: Video */}
                    <div className="glass-panel scroll-animate overflow-hidden flex flex-col" style={{ borderRadius: '24px', opacity: 0, transform: 'translateY(40px)', transition: 'all 0.8s ease-out 0.3s' }}>
                        <div className="relative w-full h-64">
                            <video
                                src="/assets/work/20251019_103737.mp4"
                                autoPlay
                                loop
                                playsInline
                                muted
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </div>
                        <div style={{ padding: '1.5rem', flex: 1 }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Diwali Celebrations</h3>
                            <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Spreading light and joy in the community.</p>
                        </div>
                    </div>

                    {/* Item 2: Image */}
                    <div className="glass-panel scroll-animate overflow-hidden flex flex-col" style={{ borderRadius: '24px', opacity: 0, transform: 'translateY(40px)', transition: 'all 0.8s ease-out 0.4s' }}>
                        <div className="relative w-full h-64">
                            <img
                                src="/assets/work/20260118_114526.jpg"
                                alt="Community Event"
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </div>
                        <div style={{ padding: '1.5rem', flex: 1 }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Heartwarming Smiles</h3>
                            <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>A beautiful moment capturing the innocence of childhood.</p>
                        </div>
                    </div>

                    {/* Item 3: Video */}
                    <div className="glass-panel scroll-animate overflow-hidden flex flex-col" style={{ borderRadius: '24px', opacity: 0, transform: 'translateY(40px)', transition: 'all 0.8s ease-out 0.5s' }}>
                        <div className="relative w-full h-64">
                            <video
                                src="/assets/work/VID-20251109-WA0106.mp4"
                                autoPlay
                                loop
                                playsInline
                                muted
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </div>
                        <div style={{ padding: '1.5rem', flex: 1 }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Education Drive</h3>
                            <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Providing resources and tutoring to underserved areas.</p>
                        </div>
                    </div>

                    {/* Item 4: Image */}
                    <div className="glass-panel scroll-animate overflow-hidden flex flex-col" style={{ borderRadius: '24px', opacity: 0, transform: 'translateY(40px)', transition: 'all 0.8s ease-out 0.6s' }}>
                        <div className="relative w-full h-64">
                            <img
                                src="/assets/work/IMG-20251109-WA0095.jpg"
                                alt="Volunteer Work"
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </div>
                        <div style={{ padding: '1.5rem', flex: 1 }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Team Effort</h3>
                            <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Volunteers coming together to organize supplies.</p>
                        </div>
                    </div>

                    {/* Item 5: Video */}
                    <div className="glass-panel scroll-animate overflow-hidden flex flex-col" style={{ borderRadius: '24px', opacity: 0, transform: 'translateY(40px)', transition: 'all 0.8s ease-out 0.7s' }}>
                        <div className="relative w-full h-64">
                            <video
                                src="/assets/work/VID-20251109-WA0121.mp4"
                                autoPlay
                                loop
                                playsInline
                                muted
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </div>
                        <div style={{ padding: '1.5rem', flex: 1 }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Food Distribution</h3>
                            <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Ensuring no one goes to sleep hungry tonight.</p>
                        </div>
                    </div>

                    {/* Item 6: Video */}
                    <div className="glass-panel scroll-animate overflow-hidden flex flex-col" style={{ borderRadius: '24px', opacity: 0, transform: 'translateY(40px)', transition: 'all 0.8s ease-out 0.8s' }}>
                        <div className="relative w-full h-64">
                            <video
                                src="/assets/work/20251109_120100.mp4"
                                autoPlay
                                loop
                                playsInline
                                muted
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </div>
                        <div style={{ padding: '1.5rem', flex: 1 }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Community Outreach</h3>
                            <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Connecting with the people who need our support the most.</p>
                        </div>
                    </div>
                </div>
            </section>
        </PageTransition >
    );
};
