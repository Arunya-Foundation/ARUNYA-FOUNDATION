import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PageTransition } from '../components/ui/PageTransition';
import CountUp from '../components/CountUp';
import BounceCards from '../components/BounceCards';

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
    fullbleed: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=1600&q=80',
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

const staggerContainer = {
    initial: {},
    whileInView: { transition: { staggerChildren: 0.12 } },
    viewport: { once: true, margin: '-80px' },
};

/* ── Syllabus Data ────────────────────────────── */
const syllabusData = [
    {
        level: 'Foundation',
        ages: '5 – 8 Years',
        icon: '🌱',
        color: 'blue',
        description: 'Building strong fundamentals through play-based and story-based learning that sparks curiosity.',
        subjects: [
            { icon: '📖', name: 'Basic Literacy', detail: 'Alphabets, phonics, simple reading in Hindi & English' },
            { icon: '🔢', name: 'Numeracy', detail: 'Counting, basic addition & subtraction, shapes' },
            { icon: '🎨', name: 'Art & Drawing', detail: 'Creative expression through colors, shapes, and craft' },
            { icon: '📚', name: 'Moral Stories', detail: 'Value-based storytelling for character development' },
            { icon: '🎵', name: 'Rhymes & Music', detail: 'Learning through songs, rhymes, and rhythm activities' },
            { icon: '🧩', name: 'Activity Based', detail: 'Puzzles, games, and hands-on learning activities' },
        ],
    },
    {
        level: 'Primary',
        ages: '9 – 12 Years',
        icon: '📘',
        color: 'golden',
        description: 'Strengthening core academic skills with structured lessons and real-world applications.',
        subjects: [
            { icon: '📝', name: 'English', detail: 'Grammar, comprehension, essay writing, spoken English' },
            { icon: '📕', name: 'Hindi', detail: 'Vyakaran, nibandh, kavita, and conversational Hindi' },
            { icon: '➕', name: 'Mathematics', detail: 'Multiplication, division, fractions, basic geometry' },
            { icon: '🔬', name: 'Science Basics', detail: 'Plants, animals, human body, simple experiments' },
            { icon: '🌍', name: 'General Knowledge', detail: 'India, world, current affairs, environment awareness' },
            { icon: '🎭', name: 'Art & Culture', detail: 'Drama, folk art, cultural heritage activities' },
        ],
    },
    {
        level: 'Secondary',
        ages: '13 – 16 Years',
        icon: '🎓',
        color: 'blue',
        description: 'Preparing students for higher education and self-sufficiency through advanced academics and life skills.',
        subjects: [
            { icon: '📐', name: 'Advanced Math', detail: 'Algebra, geometry, statistics, trigonometry basics' },
            { icon: '⚗️', name: 'Science', detail: 'Physics, Chemistry, Biology fundamentals and practicals' },
            { icon: '🗣️', name: 'Communication', detail: 'Public speaking, debate, interview preparation' },
            { icon: '💡', name: 'Career Guidance', detail: 'Skill assessment, career paths, scholarship awareness' },
            { icon: '💻', name: 'Computer Literacy', detail: 'MS Office, internet, basic coding, digital safety' },
            { icon: '🏦', name: 'Financial Literacy', detail: 'Savings, budgeting, banking basics for self-reliance' },
        ],
    },
];

/* ── Programs Data ────────────────────────────── */
const programs = [
    { title: 'Weekend Classes', icon: '📚', desc: 'Free weekend classes every Saturday & Sunday covering core subjects for all age groups, taught by trained volunteers.', img: IMAGES.cause1 },
    { title: 'Study Material Kit', icon: '🎒', desc: 'Complete kit with notebooks, textbooks, stationery, and school bags distributed free to every enrolled student.', img: IMAGES.cause2 },
    { title: 'Computer Literacy', icon: '💻', desc: 'Hands-on computer education teaching MS Office, internet skills, and basics of coding to secondary students.', img: IMAGES.cause3 },
    { title: 'Career Counselling', icon: '💡', desc: 'Monthly career guidance sessions helping students discover scholarships, skill development paths, and job readiness.', img: IMAGES.cause4 },
];

/* ── Blog / Stories Data ─────────────────────── */
const blogPosts = [
    {
        title: 'Meera Scored 92% in Board Exams',
        date: 'Mar 05, 2026',
        excerpt: 'From struggling with basic math to topping her class — meet Meera, an Arunya student from a village near Gwalior who proved that with the right support, anything is possible. Her journey from our weekend classes to board exam success inspires every child in our program.',
        img: IMAGES.blog1,
        readMore: 'Meera joined Arunya Foundation at age 9. She could barely read Hindi and had never held a textbook of her own. Our volunteers noticed her curiosity and quiet determination. Over four years of weekend classes, moral support, and study materials, she transformed. In her board exams, she scored 92%, the highest in her village. Today she dreams of becoming a teacher herself.'
    },
    {
        title: '500+ Students Enrolled This Year',
        date: 'Feb 12, 2026',
        excerpt: 'Our 2026 enrollment drive crossed 500 students across five villages! We\'re expanding our classrooms, training more volunteers, and adding new subjects like Computer Literacy and English Speaking to our syllabus.',
        img: IMAGES.blog2,
        readMore: 'With increasing demand from communities, we organized enrollment camps in five villages surrounding Gwalior. Parents who once hesitated to send their children now actively seek our classes. We added 15 new volunteers, set up two new learning centers, and introduced computer literacy classes. Our goal is to reach 1,000 students by December 2026.'
    },
    {
        title: 'Annual Day Celebration 2026',
        date: 'Jan 26, 2026',
        excerpt: 'Republic Day became extra special as 300+ students performed cultural programs, received certificates, and celebrated their learning milestones. Parents, volunteers, and community leaders came together in an emotional day of pride and joy.',
        img: IMAGES.blog3,
        readMore: 'The Annual Day was held at a local community hall. Students performed skits on education, sang patriotic songs, and showcased their art projects. Top students received certificates and school supply kits. Several parents shared testimonials about how their children have changed since joining Arunya. It was a day that reminded us why we do what we do.'
    },
];

/* ── Component ────────────────────────────────── */
export const HomePage = () => {
    const navigate = useNavigate();
    const statsRef = useRef<HTMLDivElement>(null);
    const [statsVisible, setStatsVisible] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const [expandedBlog, setExpandedBlog] = useState<number | null>(null);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);

        const countObs = new IntersectionObserver((entries) => {
            entries.forEach(e => { if (e.isIntersecting) setStatsVisible(true); });
        }, { threshold: 0.2 });
        if (statsRef.current) countObs.observe(statsRef.current);

        return () => { countObs.disconnect(); window.removeEventListener('scroll', handleScroll); };
    }, []);

    return (
        <PageTransition>
            {/* ═══════════════════ HERO ═══════════════════ */}
            <section className="hero-section">
                <img
                    src={HERO_IMG}
                    alt="Children learning"
                    className="hero-bg-image"
                    style={{ transform: `scale(${1 + scrollY * 0.0003})` }}
                />
                <div className="hero-overlay" />

                <div className="hero-content">

                    <motion.h1
                        className="hero-heading"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        style={{ fontSize: 'clamp(3.5rem, 10vw, 7rem)', fontWeight: 900 }}
                    >
                        शिक्षा सर्वार्थसाधिका
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
                    >
                        <a href="https://forms.gle/CGpuK1YiLiF1D5UJA" target="_blank" rel="noreferrer" className="hero-btn-primary">
                            Join as Volunteer ↗
                        </a>
                        <a href="#syllabus" className="hero-btn-secondary">
                            View Syllabus
                        </a>
                        <button onClick={() => navigate('/login')} className="hero-btn-golden">
                            Donate Now 💛
                        </button>
                    </motion.div>
                </div>

                <div className="hero-bottom-bar">
                    <div className="hbb-left">Education • Empowerment • Future</div>
                    <div className="hbb-center">Gwalior, India</div>
                    <div className="hbb-right">
                        <a href="#next-section" className="scroll-hint-arrow" aria-label="Scroll down">
                           ↓
                        </a>
                    </div>
                </div>
            </section>

            {/* ═══════════════════ BOUNCE CARDS 3D ═══════════════════ */}
            <section id="next-section" style={{ background: '#EEF4FB', padding: '5rem 2rem', textAlign: 'center', overflow: 'hidden' }}>
                <motion.h2 {...fadeUp} style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 800, color: '#1e3a5f', fontFamily: 'Outfit, Inter, sans-serif', marginBottom: '0.5rem' }}>
                    Life Inside Our Classrooms
                </motion.h2>
                <div style={{ display: 'block', width: 60, height: 4, background: 'linear-gradient(135deg, #d4a847, #b8922e)', borderRadius: 2, margin: '0.75rem auto 3rem' }} />
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

            {/* ═══════════════════ IMPACT NUMBERS ═══════════════════ */}
            {/* 
            <div ref={statsRef} className="stats-row" style={{ background: 'var(--color-offwhite)' }}>
                {[
                    { icon: '👨‍🎓', value: 1250, suffix: '+', label: 'Students Taught' },
                    { icon: '📖', value: 520, suffix: '+', label: 'Classes Conducted' },
                    { icon: '🤝', value: 300, suffix: '+', label: 'Active Volunteers' },
                    { icon: '🏘️', value: 12, suffix: '+', label: 'Villages Reached' },
                ].map((s, i) => (
                    <motion.div key={i} className="stat-block" {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.1 }}>
                        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{s.icon}</div>
                        <div className="number">
                            <CountUp from={0} to={s.value} separator="," direction="up" duration={2} startWhen={statsVisible} />{s.suffix}
                        </div>
                        <div className="label">{s.label}</div>
                    </motion.div>
                ))}
            </div>
            */}

            {/* ═══════════════════ ABOUT / VISION / MISSION ═══════════════════ */}
            <section className="section-block">
                <div className="section-header">
                    <motion.h2 {...fadeUp}>About Arunya Foundation</motion.h2>
                    <div className="golden-underline" />
                    <motion.p {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }}>
                        A youth-driven initiative based in Gwalior, dedicated to empowering
                        underprivileged children through free education and holistic development.
                    </motion.p>
                </div>

                <motion.div
                    {...staggerContainer}
                    className="grid gap-8 max-w-6xl mx-auto"
                    style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px,1fr))' }}
                >
                    {[
                        { icon: '👁️', title: 'Our Vision', text: 'To achieve the social and economic upliftment of underserved and minority communities by ensuring every individual has the direction, goals, and educational foundation needed to thrive.', img: IMAGES.vision },
                        { icon: '🎯', title: 'Our Mission', text: 'To provide transformative education and mentorship to underserved communities by creating a premier platform where young educators and youth can showcase their skills, grow professionally, and serve as catalysts for social change.', img: IMAGES.mission },
                        { icon: '📋', title: 'Our Goal', text: 'To enroll 1,000+ students by 2027, expand to 20 villages, and equip every child with the academic foundation and life skills needed to pursue higher education and meaningful careers.', img: IMAGES.objective },
                    ].map((c, i) => (
                        <motion.div key={i} className="premium-card" {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.12 }}>
                            <img src={c.img} alt={c.title} className="premium-card-img" />
                            <div className="premium-card-body">
                                <h3>{c.icon} {c.title}</h3>
                                <p>{c.text}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* ═══════════════════ SYLLABUS OVERVIEW ═══════════════════ */}
            <section id="syllabus" className="section-block alt-bg">
                <div className="section-header">
                    <motion.h2 {...fadeUp}>Syllabus Overview</motion.h2>
                    <div className="golden-underline" />
                    <motion.p {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }}>
                        Our carefully designed curriculum covers three age groups, 
                        building from foundational literacy to career readiness.
                    </motion.p>
                </div>

                <div className="syllabus-grid">
                    {syllabusData.map((level, idx) => (
                        <motion.div
                            key={idx}
                            className={`syllabus-card ${level.color === 'golden' ? 'golden' : ''}`}
                            {...fadeUp}
                            transition={{ ...fadeUp.transition, delay: idx * 0.15 }}
                        >
                            <div className="age-badge">
                                <span>{level.icon}</span> {level.ages}
                            </div>
                            <h3>{level.level} Level</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '0.5rem' }}>
                                {level.description}
                            </p>
                            <ul className="subject-list">
                                {level.subjects.map((sub, si) => (
                                    <li key={si}>
                                        <span className="subject-icon">{sub.icon}</span>
                                        <div>
                                            <strong style={{ color: 'var(--color-deep-blue)', fontSize: '0.9rem' }}>{sub.name}</strong>
                                            <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>{sub.detail}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ═══════════════════ FULL BLEED IMAGE ═══════════════════ */}
            <motion.img
                src={IMAGES.fullbleed}
                alt="Students learning together"
                className="full-bleed-image"
                {...fadeUp}
            />

            {/* ═══════════════════ OUR PROGRAMS ═══════════════════ */}
            <section className="section-block">
                <div className="section-header">
                    <motion.h2 {...fadeUp}>Our Programs</motion.h2>
                    <div className="golden-underline" />
                    <motion.p {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }}>
                        Structured educational programs designed to build skills, 
                        knowledge, and confidence in every child.
                    </motion.p>
                </div>

                <div className="grid gap-8 max-w-6xl mx-auto" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px,1fr))' }}>
                    {programs.map((prog, idx) => (
                        <motion.div key={idx} className="premium-card" {...fadeUp} transition={{ ...fadeUp.transition, delay: idx * 0.1 }}>
                            <img src={prog.img} alt={prog.title} className="premium-card-img" />
                            <div className="premium-card-body">
                                <h3>{prog.icon} {prog.title}</h3>
                                <p>{prog.desc}</p>
                                <button
                                    className="hero-btn-primary"
                                    style={{ marginTop: '1rem', width: '100%', justifyContent: 'center', fontSize: '0.9rem', padding: '0.7rem 1.5rem' }}
                                    onClick={() => navigate('/causes')}
                                >
                                    Learn More →
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ═══════════════════ DONATION ═══════════════════ */}
            <section className="donation-section">
                <motion.h2 {...fadeUp}>Support a Child's Education</motion.h2>
                <motion.p {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }}>
                    Your contribution directly funds textbooks, notebooks, 
                    learning materials, and new classrooms for children in need.
                </motion.p>

                <div className="donation-cards">
                    {[
                        { amount: '₹500', desc: 'Study Materials for 1 child for a month' },
                        { amount: '₹2,000', desc: 'Complete school kit with bag, books & uniform' },
                        { amount: '₹5,000', desc: 'Sponsor a child\'s education for a full year' },
                    ].map((d, idx) => (
                        <motion.div
                            key={idx}
                            className="donation-card"
                            {...fadeUp}
                            transition={{ ...fadeUp.transition, delay: idx * 0.1 }}
                            onClick={() => navigate('/login')}
                        >
                            <div className="amount">{d.amount}</div>
                            <div className="desc">{d.desc}</div>
                        </motion.div>
                    ))}
                </div>

                <motion.button
                    className="hero-btn-golden"
                    style={{ marginTop: '2.5rem', padding: '1rem 3rem', fontSize: '1.1rem' }}
                    onClick={() => navigate('/login')}
                    {...fadeUp}
                    transition={{ ...fadeUp.transition, delay: 0.3 }}
                >
                    Donate Now 💛
                </motion.button>
            </section>

            {/* ═══════════════════ STORIES / BLOG ═══════════════════ */}
            <section className="section-block">
                <div className="section-header">
                    <motion.h2 {...fadeUp}>Stories of Impact</motion.h2>
                    <div className="golden-underline" />
                    <motion.p {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }}>
                        Real stories from our classrooms — proof that education changes lives.
                    </motion.p>
                </div>

                <div className="grid gap-8 max-w-6xl mx-auto" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px,1fr))' }}>
                    {blogPosts.map((post, idx) => (
                        <motion.div key={idx} className="premium-card" {...fadeUp} transition={{ ...fadeUp.transition, delay: idx * 0.1 }}>
                            <img src={post.img} alt={post.title} className="premium-card-img" />
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

                {/* Blog story overlay modal */}
                <AnimatePresence>
                    {expandedBlog !== null && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setExpandedBlog(null)}
                            style={{
                                position: 'fixed', inset: 0, zIndex: 999,
                                background: 'rgba(30,58,95,0.7)', backdropFilter: 'blur(8px)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                padding: '2rem',
                            }}
                        >
                            <motion.div
                                initial={{ scale: 0.85, opacity: 0, y: 40 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                onClick={(e) => e.stopPropagation()}
                                style={{
                                    background: 'white', borderRadius: 28, maxWidth: 700, width: '100%',
                                    maxHeight: '85vh', overflow: 'auto',
                                    boxShadow: '0 32px 64px rgba(0,0,0,0.25)',
                                }}
                            >
                                {expandedBlog !== null && (
                                    <>
                                        <div style={{ position: 'relative' }}>
                                            <img src={blogPosts[expandedBlog].img} alt={blogPosts[expandedBlog].title} style={{ width: '100%', height: 260, objectFit: 'cover', borderRadius: '28px 28px 0 0', display: 'block' }} />
                                            <button
                                                onClick={() => setExpandedBlog(null)}
                                                style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%', width: 40, height: 40, fontSize: '1.3rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                            >×</button>
                                        </div>
                                        <div style={{ padding: '2rem' }}>
                                            <span style={{ color: '#d4a847', fontWeight: 600, fontSize: '0.85rem', display: 'block', marginBottom: '0.5rem' }}>{blogPosts[expandedBlog].date}</span>
                                            <h3 style={{ fontSize: '1.6rem', color: '#1e3a5f', marginBottom: '1.25rem', fontFamily: 'Outfit, Inter, sans-serif' }}>{blogPosts[expandedBlog].title}</h3>
                                            <p style={{ color: '#4b5563', lineHeight: 1.8, fontSize: '1rem' }}>{blogPosts[expandedBlog].readMore}</p>
                                        </div>
                                    </>
                                )}
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>

            {/* ═══════════════════ BECOME A VOLUNTEER CTA ═══════════════════ */}
            <section style={{
                background: 'linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)',
                padding: 'clamp(3rem, 6vw, 5rem) 1.5rem',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
            }}>
                {/* Decorative circles */}
                <div style={{ position: 'absolute', top: -80, right: -80, width: 300, height: 300, borderRadius: '50%', background: 'rgba(212,168,71,0.08)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', bottom: -60, left: -60, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', pointerEvents: 'none' }} />
                <div style={{ position: 'relative', zIndex: 1, maxWidth: 700, margin: '0 auto' }}>
                    <motion.div {...fadeUp} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(212,168,71,0.2)', border: '1px solid rgba(212,168,71,0.35)', borderRadius: 9999, padding: '0.4rem 1.1rem', marginBottom: '1.5rem' }}>
                        <span style={{ color: '#d4a847', fontWeight: 700, fontSize: '0.8rem', letterSpacing: 1, textTransform: 'uppercase' }}>🙌 Join Our Team</span>
                    </motion.div>
                    <motion.h2 {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.05 }} style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, color: 'white', fontFamily: 'Outfit, Inter, sans-serif', marginBottom: '1.25rem', lineHeight: 1.1 }}>
                        Become a <span style={{ color: '#d4a847' }}>Volunteer</span>
                    </motion.h2>
                    <motion.p {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }} style={{ fontSize: 'clamp(1rem, 2.5vw, 1.15rem)', color: 'rgba(255,255,255,0.8)', lineHeight: 1.75, marginBottom: '2.5rem' }}>
                        Join 300+ passionate youth volunteers who give their weekends to teach, mentor, and inspire. No experience needed — just the heart to serve.
                    </motion.p>
                    <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.15 }} style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <button
                            onClick={() => navigate('/volunteer')}
                            style={{
                                padding: 'clamp(0.875rem, 2vw, 1rem) clamp(1.75rem, 4vw, 2.5rem)',
                                borderRadius: 9999, background: '#d4a847', color: 'white',
                                fontWeight: 800, fontSize: 'clamp(0.95rem, 2.5vw, 1.05rem)',
                                border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                                boxShadow: '0 6px 24px rgba(212,168,71,0.4)', transition: 'all 0.2s',
                                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                            }}
                        >
                            Fill the Volunteer Form ↗
                        </button>
                    </motion.div>
                </div>
            </section>
        </PageTransition>
    );
};
