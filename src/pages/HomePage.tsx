import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Leaf, BookOpen, Calculator, Palette, Library, Music, Puzzle, 
    Book, FileText, Microscope, Globe, Smile, GraduationCap, 
    FlaskConical, Megaphone, Lightbulb, Laptop, Landmark, 
    Backpack, Eye, Target, ClipboardList, HeartHandshake, 
    Handshake, Heart, ShieldCheck, Flame 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { PageTransition } from '../components/ui/PageTransition';
import { ModalOverlay } from '../components/ui/ModalOverlay';
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

const staggerContainer = {
    initial: {},
    whileInView: { transition: { staggerChildren: 0.12 } },
    viewport: { once: true, margin: '-80px' },
};

/* ── Syllabus Data ────────────────────────────── */
const syllabusData = [
    {
        level: 'Group A',
        ages: '1 – 3 Years',
        icon: <Smile size={24} />,
        color: 'blue',
        description: 'Senses, sounds, movement',
        subjects: [
            { icon: <Music size={16} />, name: 'Language', detail: 'Animal sounds, basic words (Songs, clapping)' },
            { icon: <Puzzle size={16} />, name: 'Math', detail: 'Big-small, one-many (Toys, stones)' },
            { icon: <FlaskConical size={16} />, name: 'Science', detail: 'Touch & feel, water (Sensory play)' },
            { icon: <HeartHandshake size={16} />, name: 'Social', detail: 'Sharing, smiling (Group play)' },
            { icon: <Palette size={16} />, name: 'Art', detail: 'Scribbling (Crayons & colors)' },
        ],
    },
    {
        level: 'Group B',
        ages: '4 – 6 Years',
        icon: <Leaf size={24} />,
        color: 'golden',
        description: 'Play-based learning',
        subjects: [
            { icon: <BookOpen size={16} />, name: 'English', detail: 'Alphabets, words (Action songs)' },
            { icon: <Book size={16} />, name: 'Hindi', detail: 'Swar, simple words (Rhymes)' },
            { icon: <Calculator size={16} />, name: 'Math', detail: 'Counting 1-50 (Objects, jumps)' },
            { icon: <Microscope size={16} />, name: 'Science', detail: 'Plants, animals (Pictures, walks)' },
            { icon: <HeartHandshake size={16} />, name: 'Social', detail: 'Clean habits (Role play)' },
            { icon: <Palette size={16} />, name: 'Art', detail: 'Drawing, clay (Free creativity)' },
        ],
    },
    {
        level: 'Group C',
        ages: '7 – 9 Years',
        icon: <Library size={24} />,
        color: 'blue',
        description: 'Reading & curiosity',
        subjects: [
            { icon: <BookOpen size={16} />, name: 'English', detail: 'Reading, sentences (Story reading)' },
            { icon: <Book size={16} />, name: 'Hindi', detail: 'Paragraphs, matras (Loud reading)' },
            { icon: <Calculator size={16} />, name: 'Math', detail: 'Tables (2-5) (Group practice)' },
            { icon: <Globe size={16} />, name: 'Science', detail: 'Living / non-living (Real examples)' },
            { icon: <HeartHandshake size={16} />, name: 'Social', detail: 'Festivals, helpers (Discussion)' },
            { icon: <Smile size={16} />, name: 'Games', detail: 'Team activities (Outdoor play)' },
        ],
    },
    {
        level: 'Group D',
        ages: '10 – 12 Years',
        icon: <Book size={24} />,
        color: 'golden',
        description: 'Concepts & expression',
        subjects: [
            { icon: <FileText size={16} />, name: 'English', detail: 'Paragraph writing (Picture-based)' },
            { icon: <Book size={16} />, name: 'Hindi', detail: 'Short essays (Guided writing)' },
            { icon: <Calculator size={16} />, name: 'Math', detail: 'Fractions (Paper activities)' },
            { icon: <Microscope size={16} />, name: 'Science', detail: 'Human body (Charts)' },
            { icon: <HeartHandshake size={16} />, name: 'Social', detail: 'Rights & duties (Storytelling)' },
            { icon: <Lightbulb size={16} />, name: 'Life Skills', detail: 'Hygiene, emotions (Open discussion)' },
        ],
    },
    {
        level: 'Group E',
        ages: '13 – 15 Years',
        icon: <GraduationCap size={24} />,
        color: 'blue',
        description: 'Skills & leadership',
        subjects: [
            { icon: <Megaphone size={16} />, name: 'English', detail: 'Speaking skills (Group discussion)' },
            { icon: <FileText size={16} />, name: 'Hindi', detail: 'Debate, writing (Real-life topics)' },
            { icon: <Calculator size={16} />, name: 'Math', detail: 'Percentages (Daily examples)' },
            { icon: <Microscope size={16} />, name: 'Science', detail: 'Health, environment (Interactive talk)' },
            { icon: <Landmark size={16} />, name: 'Social', detail: 'Constitution basics (Story method)' },
            { icon: <Target size={16} />, name: 'Life Skills', detail: 'Leadership, career (Mentor interaction)' },
        ],
    },
];

/* ── Programs Data ────────────────────────────── */
const programs = [
    { title: 'Weekend Classes', icon: <BookOpen size={24} />, desc: 'Free weekend classes every Saturday & Sunday covering core subjects for all age groups, taught by trained volunteers.', img: IMAGES.cause1 },
    { title: 'Study Material Kit', icon: <Backpack size={24} />, desc: 'Complete kit with notebooks, textbooks, stationery, and school bags distributed free to every enrolled student.', img: IMAGES.cause2 },
    { title: 'Computer Literacy', icon: <Laptop size={24} />, desc: 'Hands-on computer education teaching MS Office, internet skills, and basics of coding to secondary students.', img: IMAGES.cause3 },
    { title: 'Career Counselling', icon: <Lightbulb size={24} />, desc: 'Monthly career guidance sessions helping students discover scholarships, skill development paths, and job readiness.', img: IMAGES.cause4 },
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
                    style={{ display: 'grid', gap: '2rem', maxWidth: 1200, margin: '0 auto', gridTemplateColumns: 'repeat(auto-fit, minmax(320px,1fr))' }}
                >
                    {[
                        { icon: <Eye size={24} />, title: 'Our Vision', text: 'To achieve the social and economic upliftment of underserved and minority communities by ensuring every individual has the direction, goals, and educational foundation needed to thrive.', img: IMAGES.vision },
                        { icon: <Target size={24} />, title: 'Our Mission', text: 'To provide transformative education and mentorship to underserved communities by creating a premier platform where young educators and youth can showcase their skills, grow professionally, and serve as catalysts for social change.', img: IMAGES.mission },
                        { icon: <ClipboardList size={24} />, title: 'Our Goal', text: 'To promote educational equity by providing accessible, high-quality education, foundational learning, and life-direction coaching to children from underserved and minority communities. To empower youth educators by establishing a collaborative platform for pedagogical skills, practical teaching experience, and professional leadership. To facilitate social upliftment by equipping marginalized communities with knowledge, mentorship, and resources for self-reliance.', img: IMAGES.objective },
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

            {/* ═══════════════════ OUR VALUES ═══════════════════ */}
            <section className="section-block alt-bg">
                <div className="section-header">
                    <motion.h2 {...fadeUp}>Our Core Values</motion.h2>
                    <div className="golden-underline" />
                    <motion.p {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }}>
                        The guiding principles that shape every action, decision, and interaction at Arunya Foundation.
                    </motion.p>
                </div>

                <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                    {[
                        {
                            hindi: 'सम्मान',
                            title: 'Service with Dignity',
                            icon: <HeartHandshake size={24} />,
                            color: '#2563eb',
                            concept: 'We do not view the communities we serve as "projects" to be fixed, but as equals who deserve respect, resources, and opportunity.',
                            action: 'Our educators approach every student with respect, ensuring that our help builds self-reliance rather than dependency.',
                        },
                        {
                            hindi: 'सह-विकास',
                            title: 'Mutual Empowerment',
                            icon: <Handshake size={24} />,
                            color: '#d4a847',
                            concept: 'True upliftment happens when both the teacher and the student grow.',
                            action: 'We foster an environment where our youth volunteers develop real-world leadership and professional skills while delivering life-changing education.',
                        },
                        {
                            hindi: 'सहानुभूति',
                            title: 'Empathetic Leadership',
                            icon: <Heart size={24} />,
                            color: '#2563eb',
                            concept: 'We seek to deeply understand the psychological and social barriers our communities face before attempting to remove them.',
                            action: 'Our volunteers lead with emotional intelligence, creating safe, encouraging, and highly attuned learning environments for minority and underserved youth.',
                        },
                        {
                            hindi: 'निष्ठा',
                            title: 'Unwavering Integrity',
                            icon: <ShieldCheck size={24} />,
                            color: '#d4a847',
                            concept: 'Trust is the currency of a successful foundation. We operate with complete transparency and discipline.',
                            action: 'Whether handling resources, executing programs, or fulfilling our legal obligations as a registered organization, we hold ourselves to the highest ethical standards.',
                        },
                        {
                            hindi: 'कर्मयोग',
                            title: 'Resilient Action',
                            icon: <Flame size={24} />,
                            color: '#2563eb',
                            concept: 'Social change is a marathon, not a sprint. We are committed to showing up, especially when the work gets difficult.',
                            action: 'Like the first rays of the sun (Arunya) that persistently pierce through the dark, our team remains dedicated to our mission, regardless of obstacles.',
                        },
                    ].map((value, idx) => (
                        <motion.div
                            key={idx}
                            {...fadeUp}
                            transition={{ ...fadeUp.transition, delay: idx * 0.08 }}
                            style={{
                                background: 'white',
                                borderRadius: 24,
                                padding: '2rem',
                                border: '1px solid rgba(30,58,95,0.08)',
                                boxShadow: '0 4px 24px rgba(30,58,95,0.06)',
                                transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s',
                                position: 'relative',
                                overflow: 'hidden',
                            }}
                        >
                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: value.color === '#d4a847' ? 'linear-gradient(135deg, #d4a847, #b8922e)' : 'linear-gradient(135deg, #2563eb, #1e3a5f)', borderRadius: '24px 24px 0 0' }} />
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                                <div style={{ width: 48, height: 48, borderRadius: '50%', background: value.color === '#d4a847' ? 'linear-gradient(135deg, #d4a847, #b8922e)' : 'linear-gradient(135deg, #2563eb, #1e3a5f)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', flexShrink: 0 }}>
                                    {value.icon}
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1e3a5f', fontFamily: 'Outfit, Inter, sans-serif', lineHeight: 1.2 }}>{value.title}</h3>
                                    <span style={{ fontSize: '0.85rem', color: value.color, fontWeight: 700 }}>({value.hindi})</span>
                                </div>
                            </div>
                            <div style={{ marginBottom: '0.75rem' }}>
                                <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: '#9ca3af' }}>The Concept</span>
                                <p style={{ color: '#4b5563', fontSize: '0.9rem', lineHeight: 1.6, marginTop: '0.25rem' }}>{value.concept}</p>
                            </div>
                            <div>
                                <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: '#9ca3af' }}>In Action</span>
                                <p style={{ color: '#6b7280', fontSize: '0.85rem', lineHeight: 1.6, marginTop: '0.25rem', fontStyle: 'italic' }}>{value.action}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ═══════════════════ SYLLABUS OVERVIEW ═══════════════════ */}
            <section id="syllabus" className="section-block alt-bg">
                <div className="section-header">
                    <motion.h2 {...fadeUp}>Weekend Community Teaching Plan</motion.h2>
                    <div className="golden-underline" />
                    <motion.p {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }}>
                        Our carefully designed curriculum covers five age groups (1–15 years), 
                        building from play-based learning to skills & leadership.
                        <br/><br/>
                        <strong style={{ color: 'var(--color-royal-blue)' }}>Every session ends with a story telling session.</strong>
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

                <motion.div {...fadeUp} style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', maxWidth: 1000, margin: '3rem auto 0' }}>
                    <div className="premium-card" style={{ padding: '2rem' }}>
                        <h3 style={{ color: '#1e3a5f', marginBottom: '1rem', borderBottom: '2px solid #d4a847', paddingBottom: '0.5rem', display: 'inline-block' }}>Common 2-Hour Session Flow</h3>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#4b5563', lineHeight: 1.8 }}>
                            <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,0,0,0.05)', padding: '0.75rem 0' }}><strong>First 10 min</strong> <span>Prayer / song / warm-up</span></li>
                            <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,0,0,0.05)', padding: '0.75rem 0' }}><strong>Next 80 min</strong> <span>Teaching + activities</span></li>
                            <li style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0' }}><strong>Last 30 min</strong> <span>Games / art / recap</span></li>
                        </ul>
                    </div>
                    <div className="premium-card" style={{ padding: '2rem' }}>
                        <h3 style={{ color: '#1e3a5f', marginBottom: '1rem', borderBottom: '2px solid #d4a847', paddingBottom: '0.5rem', display: 'inline-block' }}>Teaching Guidelines</h3>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#4b5563', lineHeight: 2 }}>
                            <li style={{ padding: '0.25rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span style={{ color: '#d4a847' }}>✔</span> No exams or tests</li>
                            <li style={{ padding: '0.25rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span style={{ color: '#d4a847' }}>✔</span> Flexible attendance</li>
                            <li style={{ padding: '0.25rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span style={{ color: '#d4a847' }}>✔</span> Encourage participation</li>
                            <li style={{ padding: '0.25rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span style={{ color: '#d4a847' }}>✔</span> Use local language + Hindi + English</li>
                        </ul>
                    </div>
                </motion.div>
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

                <div style={{ display: 'grid', gap: '2rem', maxWidth: 1200, margin: '0 auto', gridTemplateColumns: 'repeat(auto-fill, minmax(280px,1fr))' }}>
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

                <div style={{ display: 'grid', gap: '2rem', maxWidth: 1200, margin: '0 auto', gridTemplateColumns: 'repeat(auto-fit, minmax(320px,1fr))' }}>
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

                {/* Blog story overlay modal via Portal */}
                <ModalOverlay open={expandedBlog !== null} onClose={() => setExpandedBlog(null)}>
                    {expandedBlog !== null && (
                        <>
                            <div style={{ position: 'relative', flexShrink: 0 }}>
                                <img src={blogPosts[expandedBlog].img} alt={blogPosts[expandedBlog].title} style={{ width: '100%', height: 260, objectFit: 'cover', display: 'block' }} />
                                <button
                                    onClick={() => setExpandedBlog(null)}
                                    style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%', width: 40, height: 40, fontSize: '1.3rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1e3a5f', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
                                >×</button>
                            </div>
                            <div style={{ padding: '2rem', overflowY: 'auto', flex: 1 }}>
                                <span style={{ color: '#d4a847', fontWeight: 600, fontSize: '0.85rem', display: 'block', marginBottom: '0.5rem' }}>{blogPosts[expandedBlog].date}</span>
                                <h3 style={{ fontSize: '1.6rem', color: '#1e3a5f', marginBottom: '1.25rem', fontFamily: 'Outfit, Inter, sans-serif' }}>{blogPosts[expandedBlog].title}</h3>
                                <p style={{ color: '#4b5563', lineHeight: 1.8, fontSize: '1rem' }}>{blogPosts[expandedBlog].readMore}</p>
                            </div>
                        </>
                    )}
                </ModalOverlay>
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
