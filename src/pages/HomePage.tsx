import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Eye, HandHeart,
    Rocket, Trophy
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageTransition } from '../components/ui/PageTransition';
import { ModalOverlay } from '../components/ui/ModalOverlay';
import BounceCards from '../components/BounceCards';
import { ImpactStats } from '../components/ImpactStats';

/* ── Images ────────────────────────────────────── */
const HERO_IMG = 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1600&q=80';
const IMAGES = {
    vision: '/assets/work/63624.jpg.jpeg',
    mission: '/assets/work/63626.jpg.jpeg',
    objective: '/assets/work/63627.jpg.jpeg',
    cause1: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80',
    cause2: 'https://images.unsplash.com/photo-1594708767771-a7502209ff51?w=800&q=80',
    cause3: 'https://images.unsplash.com/photo-1560785496-3c9d27877182?w=800&q=80',
    cause4: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=800&q=80',
    fullbleed: '/IMAGE/LANDSCAPE/21492.jpg.jpeg',
    blog1: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800&q=80',
    blog2: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&q=80',
    blog3: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80',
};

/* ── Animation variants ───────────────────────── */
const fadeUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
};

const slideInLeft = {
    initial: { opacity: 0, x: -50 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
};

const slideInRight = {
    initial: { opacity: 0, x: 50 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
};




/* ── Blog / Stories Data ─────────────────────── */
const blogPosts = [
    {
        title: 'Little Habits, Big Impact 🌿',
        date: 'Apr 10, 2026',
        excerpt: 'At Arunya Foundation, we believe that education is not limited to books—it begins with self-care and dignity. Before stepping into the classroom, children are gently guided to practice basic hygiene habits.',
        img: '/assets/blog/hygiene.jpeg',
        readMore: 'At Arunya Foundation, we believe that education is not limited to books—it begins with self-care and dignity. Before stepping into the classroom, children are gently guided to practice basic hygiene habits such as washing their face, brushing their teeth, and maintaining personal cleanliness.\n\nThese small routines not only promote better health but also build confidence, self-respect, and readiness to learn. Moments like these reflect how simple actions can create lasting change in a child\'s life.\n\nBecause nurturing clean habits today lays the foundation for a healthier, brighter tomorrow.\n\n#CleanlinessDrive #HygieneAwareness #HealthyHabits #ChildDevelopment #ArunyaFoundation #CommunityImpact'
    },
    {
        title: 'Colors of Joy, Learning Beyond Books 🎨',
        date: 'Apr 05, 2026',
        excerpt: 'Through creative activities like hand painting, children are encouraged to express themselves, explore their imagination, and simply enjoy the process of creating.',
        img: '/assets/blog/creative.jpeg',
        readMore: 'At Arunya Foundation, learning goes beyond textbooks.\n\nThrough creative activities like hand painting, children are encouraged to express themselves, explore their imagination, and simply enjoy the process of creating.\n\nMoments filled with colors, laughter, and little handprints remind us that education is not just about knowledge, but also about joy, confidence, and self-expression.\n\nBecause sometimes, the brightest learning happens when little hands dive into colors and hearts into happiness 💛\n\n#CreativeLearning #JoyfulEducation #ArtAndExpression #ArunyaFoundation #LearningWithFun #ChildhoodJoy'
    },
];

/* ── Vision/Mission/Goal Interactive Accordion ──── */
const VMG_DATA = [
    {
        key: 'vision',
        icon: <Eye size={28} />,
        title: 'Our Vision',
        text: 'To achieve the social and economic upliftment of underserved and minority communities by ensuring every individual has the direction, goals, and educational foundation needed to thrive.',
        img: IMAGES.vision,
        gradient: 'linear-gradient(135deg, #123C73, #0B1F3A)',
    },
    {
        key: 'mission',
        icon: <Rocket size={28} />,
        title: 'Our Mission',
        text: 'To provide transformative education and mentorship to underserved communities by creating a premier platform where young educators and youth can showcase their skills, grow professionally, and serve as catalysts for social change.',
        img: IMAGES.mission,
        gradient: 'linear-gradient(135deg, #CF8C36, #B5772A)',
    },
    {
        key: 'goal',
        icon: <Trophy size={28} />,
        title: 'Our Goal',
        text: 'To promote educational equity by providing accessible, high-quality education, foundational learning, and life-direction coaching to children from underserved and minority communities. To empower youth educators and facilitate social upliftment by equipping marginalized communities with knowledge, mentorship, and resources for self-reliance.',
        img: IMAGES.objective,
        gradient: 'linear-gradient(135deg, #123C73, #0B1F3A)',
    },
];

const VisionMissionGoal = ({ fadeUp }: { fadeUp: any }) => {
    const [active, setActive] = useState<string | null>(null);

    const toggle = (key: string) => {
        setActive(prev => (prev === key ? null : key));
    };

    return (
        <section className="section-block">
            <div className="section-header">
                <motion.h2 {...fadeUp}>About Arunya Foundation</motion.h2>
                <div className="golden-underline" />
                <motion.p {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }}>
                    A youth-driven initiative based in Gwalior, dedicated to empowering
                    underprivileged children through free education and holistic development.
                </motion.p>
            </div>

            <div style={{ maxWidth: 800, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {VMG_DATA.map((item, idx) => {
                    const isOpen = active === item.key;
                    return (
                        <motion.div
                            key={item.key}
                            {...fadeUp}
                            transition={{ ...fadeUp.transition, delay: idx * 0.1 }}
                            style={{
                                borderRadius: 20,
                                overflow: 'hidden',
                                background: 'white',
                                border: isOpen ? '2px solid rgba(207,140,54,0.3)' : '1px solid rgba(11,31,58,0.08)',
                                boxShadow: isOpen
                                    ? '0 8px 32px rgba(11,31,58,0.1), 0 2px 8px rgba(207,140,54,0.1)'
                                    : '0 2px 12px rgba(11,31,58,0.05)',
                                transition: 'border 0.3s, box-shadow 0.3s',
                            }}
                        >
                            <button
                                onClick={() => toggle(item.key)}
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    padding: '1.25rem 1.5rem',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontFamily: 'inherit',
                                    transition: 'background 0.2s',
                                }}
                                onMouseEnter={e => { if (!isOpen) e.currentTarget.style.background = 'rgba(207,140,54,0.04)'; }}
                                onMouseLeave={e => { e.currentTarget.style.background = 'none'; }}
                            >
                                <div style={{
                                    width: 56, height: 56, borderRadius: 16,
                                    background: item.gradient,
                                    color: 'white',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    flexShrink: 0,
                                    boxShadow: '0 4px 16px rgba(11,31,58,0.15)',
                                    transition: 'transform 0.3s, box-shadow 0.3s',
                                    transform: isOpen ? 'scale(1.05)' : 'scale(1)',
                                }}>
                                    {item.icon}
                                </div>
                                <h3 style={{
                                    flex: 1, textAlign: 'left',
                                    fontSize: '1.2rem', fontWeight: 800,
                                    color: '#0B1F3A',
                                    fontFamily: 'Poppins, Inter, sans-serif',
                                    margin: 0,
                                }}>
                                    {item.title}
                                </h3>
                                <div style={{
                                    width: 32, height: 32, borderRadius: '50%',
                                    background: isOpen ? 'linear-gradient(135deg, #CF8C36, #B5772A)' : 'rgba(11,31,58,0.06)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    transition: 'all 0.3s',
                                    flexShrink: 0,
                                    color: isOpen ? 'white' : '#6b7280',
                                }}>
                                    <svg
                                        width="16" height="16" viewBox="0 0 24 24" fill="none"
                                        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                                        style={{
                                            transition: 'transform 0.3s',
                                            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                        }}
                                    >
                                        <polyline points="6 9 12 15 18 9" />
                                    </svg>
                                </div>
                            </button>

                            <AnimatePresence>
                                {isOpen && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                        style={{ overflow: 'hidden' }}
                                    >
                                        <div style={{ padding: '0 1.5rem 1.5rem' }}>
                                            <img
                                                src={item.img}
                                                alt={item.title}
                                                loading="lazy"
                                                decoding="async"
                                                width={400}
                                                height={220}
                                                style={{
                                                    width: '100%', height: 220,
                                                    objectFit: 'cover',
                                                    borderRadius: 14,
                                                    marginBottom: '1rem',
                                                }}
                                            />
                                            <p style={{
                                                color: '#6b7280',
                                                fontSize: '0.95rem',
                                                lineHeight: 1.75,
                                                margin: 0,
                                            }}>
                                                {item.text}
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
};

/* ── Component ────────────────────────────────── */
export const HomePage = () => {
    // Bug Fix
    const [scrollY, setScrollY] = useState(0);
    const [expandedBlog, setExpandedBlog] = useState<number | null>(null);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);

        return () => { window.removeEventListener('scroll', handleScroll); };
    }, []);

    return (
        <PageTransition>
            {/* ═══════════════════ HERO ═══════════════════ */}
            <section className="hero-section">
                <img
                    src={HERO_IMG}
                    alt="Children learning"
                    className="hero-bg-image"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    width={1600}
                    height={900}
                    style={{ transform: `scale(${1 + scrollY * 0.0003})` }}
                />
                <div className="hero-overlay" />

                <div className="hero-content">

                    <motion.h1
                        className="hero-heading"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                    >
                        शिक्षा सर्वाधिकारिका
                    </motion.h1>

                    <motion.p
                        className="hero-description"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.45 }}
                    >
                        We believe education is the ultimate equalizer, transforming underserved communities while empowering young teachers to lead and inspire real change.
                    </motion.p>

                    <motion.div
                        className="hero-actions"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.55 }}
                        style={{ display: 'flex', justifyContent: 'center', width: '100%' }}
                    >
                        <a
                            href="https://forms.gle/CGpuK1YiLiF1D5UJA"
                            target="_blank"
                            rel="noreferrer"
                            className="hero-volunteer-cta"
                        >
                            <HandHeart size={22} style={{ flexShrink: 0 }} />
                            Join as Volunteer
                        </a>
                    </motion.div>
                </div>

                <div className="hero-bottom-bar">
                    <div className="hbb-left">
                        Education • Empowerment • Future <span className="hbb-separator">|</span> Gwalior, India
                    </div>
                    <div className="hbb-right">
                        <a href="#next-section" className="scroll-hint-arrow" aria-label="Scroll down">
                           ↓
                        </a>
                    </div>
                </div>
            </section>

            {/* ═══════════════════ IMPACT STATISTICS ═══════════════════ */}
            <div id="next-section">
                <ImpactStats />
            </div>

            {/* ═══════════════════ ARUNYA JUNIOR LEADERS 2K26 CAMPAIGN ═══════════════════ */}
            <section className="section-block" id="campaign" style={{ background: '#F8F5F0', padding: '5rem 2rem' }}>
                <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                        gap: '4rem',
                        alignItems: 'center',
                    }}>
                        {/* Left: Banner Image */}
                        <motion.div
                            {...fadeUp}
                            transition={{ ...fadeUp.transition, delay: 0.1 }}
                            style={{
                                position: 'relative',
                                borderRadius: 24,
                                overflow: 'hidden',
                                boxShadow: '0 4px 24px rgba(11,31,58,0.06), 0 16px 48px rgba(11,31,58,0.12)',
                                border: '2px solid rgba(207,140,54,0.15)',
                            }}
                        >
                            <img
                                src="/assets/work/junior_leaders.png"
                                alt="Arunya Junior Leaders 2K26 Campaign Banner"
                                loading="lazy"
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    maxHeight: 480,
                                    objectFit: 'cover',
                                    display: 'block',
                                    transition: 'transform 0.5s ease',
                                }}
                                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
                                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                            />
                            <div style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'linear-gradient(180deg, rgba(11,31,58,0) 40%, rgba(11,31,58,0.85) 100%)',
                                pointerEvents: 'none',
                            }} />
                            <div style={{
                                position: 'absolute',
                                bottom: 24,
                                left: 24,
                                right: 24,
                                color: 'white',
                            }}>
                                <span style={{
                                    background: '#CF8C36',
                                    color: '#0B1F3A',
                                    padding: '0.3rem 0.8rem',
                                    borderRadius: 999,
                                    fontSize: '0.75rem',
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                    display: 'inline-block',
                                    marginBottom: '0.5rem',
                                }}>New Initiative</span>
                                <h4 style={{
                                    color: 'white',
                                    fontSize: '1.25rem',
                                    fontWeight: 800,
                                    fontFamily: 'Poppins, Inter, sans-serif',
                                    margin: 0,
                                    textShadow: '0 2px 8px rgba(0,0,0,0.5)',
                                }}>Empowering Tomorrow's Leaders</h4>
                            </div>
                        </motion.div>

                        {/* Right: Content */}
                        <motion.div
                            {...fadeUp}
                            transition={{ ...fadeUp.transition, delay: 0.2 }}
                            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
                        >
                            <div>
                                <span style={{
                                    color: '#123C73',
                                    fontSize: '0.88rem',
                                    fontWeight: 700,
                                    letterSpacing: '0.1em',
                                    textTransform: 'uppercase',
                                    display: 'block',
                                    marginBottom: '0.5rem',
                                }}>Active Campaign</span>
                                <h2 style={{
                                    fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                                    fontWeight: 800,
                                    color: '#0B1F3A',
                                    fontFamily: 'Poppins, Inter, sans-serif',
                                    lineHeight: 1.15,
                                    margin: 0,
                                }}>
                                    Arunya Junior Leaders<br />
                                    <span style={{
                                        background: 'linear-gradient(135deg, #CF8C36 0%, #B5772A 100%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text',
                                    }}>2K26 Campaign</span>
                                </h2>
                                <div style={{ display: 'block', width: 60, height: 4, background: 'linear-gradient(135deg, #CF8C36, #B5772A)', borderRadius: 2, margin: '1rem 0' }} />
                                <p style={{
                                    color: '#0B1F3A',
                                    fontWeight: 600,
                                    fontSize: '1.05rem',
                                    lineHeight: 1.6,
                                    marginBottom: '1rem',
                                }}>
                                    Empowering the next generation of leaders through education, mentorship, social responsibility, and community engagement.
                                </p>
                                <p style={{ color: '#6b7280', fontSize: '0.95rem', lineHeight: 1.7, margin: 0 }}>
                                    The Arunya Junior Leaders Campaign is designed to cultivate essential leadership qualities and a strong sense of civic duty in young learners. Through active group collaborations, project-based mentorship, and social impact challenges, we guide students to lead, inspire, and build sustainable solutions for their communities.
                                </p>
                            </div>

                            {/* Key Highlights Grid */}
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(2, 1fr)',
                                gap: '1.25rem',
                                marginTop: '0.5rem',
                            }}>
                                {[
                                    { title: 'Leadership Development', desc: 'Confidence, communication & decision making.' },
                                    { title: 'Community Impact', desc: 'Real-world solutions for local issues.' },
                                    { title: 'Team Collaboration', desc: 'Empathy, cooperation & teamwork.' },
                                    { title: 'Social Responsibility', desc: 'Civic duty & environmental awareness.' },
                                ].map((highlight, idx) => (
                                    <div
                                        key={idx}
                                        style={{
                                            background: 'white',
                                            padding: '1.25rem',
                                            borderRadius: 16,
                                            border: '1px solid rgba(11,31,58,0.06)',
                                            boxShadow: '0 2px 10px rgba(11,31,58,0.02)',
                                            transition: 'transform 0.25s, box-shadow 0.25s',
                                        }}
                                        onMouseEnter={e => {
                                            e.currentTarget.style.transform = 'translateY(-3px)';
                                            e.currentTarget.style.boxShadow = '0 6px 18px rgba(18,60,115,0.08)';
                                        }}
                                        onMouseLeave={e => {
                                            e.currentTarget.style.transform = 'none';
                                            e.currentTarget.style.boxShadow = '0 2px 10px rgba(11,31,58,0.02)';
                                        }}
                                    >
                                        <h4 style={{
                                            color: '#0B1F3A',
                                            fontWeight: 700,
                                            fontSize: '0.95rem',
                                            marginBottom: '0.25rem',
                                            fontFamily: 'Poppins, Inter, sans-serif',
                                        }}>{highlight.title}</h4>
                                        <p style={{
                                            color: '#6b7280',
                                            fontSize: '0.78rem',
                                            lineHeight: 1.4,
                                            margin: 0,
                                        }}>{highlight.desc}</p>
                                    </div>
                                ))}
                            </div>

                            {/* CTA Button */}
                            <div style={{ marginTop: '0.5rem' }}>
                                <a
                                    href="https://forms.gle/v7ofeXeqiJow3RXc7"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="hero-volunteer-cta"
                                    style={{
                                        padding: '0.95rem 2.5rem',
                                        fontSize: '1.05rem',
                                        display: 'inline-flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        width: 'auto',
                                        textDecoration: 'none',
                                    }}
                                >
                                    Join the Campaign ↗
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════ BOUNCE CARDS 3D ═══════════════════ */}
            <section style={{ background: '#EEF4FB', padding: '5rem 2rem', textAlign: 'center', overflow: 'hidden' }}>
                <motion.h2 {...fadeUp} style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 800, color: '#0B1F3A', fontFamily: 'Poppins, Inter, sans-serif', marginBottom: '0.5rem' }}>
                    Life Inside Our Classrooms
                </motion.h2>
                <div style={{ display: 'block', width: 60, height: 4, background: 'linear-gradient(135deg, #CF8C36, #B5772A)', borderRadius: 2, margin: '0.75rem auto 3rem' }} />
                <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.15 }} style={{ display: 'flex', justifyContent: 'center' }}>
                    <BounceCards
                        images={[
                            '/assets/classrooms/63632.jpg.jpeg',
                            '/assets/classrooms/63633.jpg.jpeg',
                            '/assets/classrooms/63634.jpg.jpeg',
                            '/assets/classrooms/63635.jpg.jpeg',
                            '/assets/classrooms/IMG-20260321-WA0067.jpg.jpeg',
                        ]}
                        containerWidth={500}
                        containerHeight={320}
                        animationDelay={0.3}
                        enableHover={true}
                        transformStyles={[
                            'rotate(10deg) translate(-180px)',
                            'rotate(5deg) translate(-90px)',
                            'rotate(-3deg)',
                            'rotate(-10deg) translate(90px)',
                            'rotate(2deg) translate(180px)'
                        ]}
                    />
                </motion.div>
            </section>

            {/* ═══════════════════ ABOUT / VISION / MISSION / GOAL — Interactive ═══════════════════ */}
            <VisionMissionGoal fadeUp={fadeUp} />





            {/* ═══════════════════ FULL BLEED IMAGE ═══════════════════ */}
            <motion.img
                src={IMAGES.fullbleed}
                alt="Students learning together"
                className="full-bleed-image"
                loading="lazy"
                decoding="async"
                width={1600}
                height={600}
                {...fadeUp}
            />



            {/* ═══════════════════ STORIES / BLOG ═══════════════════ */}
            <section className="section-block">
                <div className="section-header">
                    <motion.h2 {...fadeUp}>Stories of Impact</motion.h2>
                    <div className="golden-underline" />
                    <motion.p {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }}>
                        Real stories from our classrooms — proof that education changes lives.
                    </motion.p>
                </div>

                <div style={{ display: 'grid', gap: '2rem', maxWidth: 1200, margin: '0 auto', gridTemplateColumns: 'repeat(auto-fit, minmax(320px,1fr))' }}>
                    {blogPosts.map((post, idx) => (
                        <motion.div key={idx} className="premium-card" {...(idx % 2 === 0 ? slideInLeft : slideInRight)} transition={{ ...(idx % 2 === 0 ? slideInLeft : slideInRight).transition, delay: idx * 0.12 }}>
                            <img src={post.img} alt={post.title} className="premium-card-img" loading="lazy" decoding="async" width={400} height={240} />
                            <div className="premium-card-body">
                                <span style={{ color: 'var(--color-royal-blue)', fontSize: '0.8rem', fontWeight: 600 }}>{post.date}</span>
                                <h3>{post.title}</h3>
                                <p style={{ WebkitLineClamp: 3, display: '-webkit-box', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{post.excerpt}</p>
                                <button
                                    onClick={() => setExpandedBlog(idx)}
                                    style={{
                                        color: 'var(--color-royal-blue)', background: 'none', border: 'none',
                                        fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem',
                                        marginTop: '1rem', cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.95rem',
                                        padding: 0,
                                    }}
                                >
                                    Read Full Story →
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Blog story overlay modal via Portal */}
                <ModalOverlay open={expandedBlog !== null} onClose={() => setExpandedBlog(null)}>
                    {expandedBlog !== null && (
                        <>
                            <div style={{ position: 'relative', flexShrink: 0 }}>
                                <img src={blogPosts[expandedBlog].img} alt={blogPosts[expandedBlog].title} style={{ width: '100%', height: 260, objectFit: 'cover', display: 'block' }} />
                                <button
                                    onClick={() => setExpandedBlog(null)}
                                    style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%', width: 40, height: 40, fontSize: '1.3rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0B1F3A', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
                                >×</button>
                            </div>
                            <div style={{ padding: '2rem', overflowY: 'auto', flex: 1 }}>
                                <span style={{ color: '#CF8C36', fontWeight: 600, fontSize: '0.85rem', display: 'block', marginBottom: '0.5rem' }}>{blogPosts[expandedBlog].date}</span>
                                <h3 style={{ fontSize: '1.6rem', color: '#0B1F3A', marginBottom: '1.25rem', fontFamily: 'Poppins, Inter, sans-serif' }}>{blogPosts[expandedBlog].title}</h3>
                                <p style={{ color: '#6B7280', lineHeight: 1.8, fontSize: '1rem', whiteSpace: 'pre-line' }}>{blogPosts[expandedBlog].readMore}</p>
                            </div>
                        </>
                    )}
                </ModalOverlay>
            </section>


        </PageTransition>
    );
};
