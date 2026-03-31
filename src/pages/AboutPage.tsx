import { PageTransition } from '../components/ui/PageTransition';
import { motion } from 'framer-motion';

import {
    Eye, Target, ClipboardList, BookOpen, Users, Leaf,
    TrendingUp, Compass, HeartHandshake, Package,
    Heart, Handshake, SunMedium, ShieldCheck, Flame
} from 'lucide-react';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';

const fadeUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
};

const values = [
    {
        hindi: 'सम्मान',
        title: 'Service with Dignity',
        icon: <Heart size={24} />,
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
        icon: <SunMedium size={24} />,
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
];

const primaryObjectives = [
    {
        icon: <BookOpen size={32} />,
        title: 'To Promote Educational Equity',
        desc: 'To provide accessible, high-quality education, foundational learning, and life-direction coaching to children and individuals from underserved and minority communities.',
    },
    {
        icon: <Users size={32} />,
        title: 'To Empower Youth and Educators',
        desc: 'To establish and maintain a collaborative platform that allows young educators, teachers, and youth volunteers to showcase their pedagogical skills, gain practical teaching experience, and develop professional leadership through community service.',
    },
    {
        icon: <Leaf size={32} />,
        title: 'To Facilitate Social Upliftment',
        desc: 'To bridge the socioeconomic gap by equipping marginalized communities with the knowledge, mentorship, and resources necessary to achieve self-reliance and dignified livelihoods.',
    },
];

const ancillaryObjectives = [
    {
        icon: <TrendingUp size={24} />,
        title: 'Capacity Building',
        desc: 'To conduct training programs, workshops, and seminars that continuously improve the teaching methodologies and leadership capabilities of the foundation\'s youth educators.',
    },
    {
        icon: <Compass size={24} />,
        title: 'Mentorship Programs',
        desc: 'To create structured mentorship initiatives where experienced youth guide students from underserved backgrounds in career planning, goal setting, and personal development.',
    },
    {
        icon: <HeartHandshake size={24} />,
        title: 'Community Integration',
        desc: 'To organize awareness campaigns, educational drives, and community events that promote the value of education ("विद्या अरुणोदयः" – The dawn of knowledge) and encourage active participation from local stakeholders.',
    },
    {
        icon: <Package size={24} />,
        title: 'Resource Development',
        desc: 'To design, distribute, and implement educational materials, curricula, and digital resources tailored to the specific needs of the communities being served.',
    },
];

export const AboutPage = () => {
    return (
        <PageTransition className="pb-16">
            <section className="about-section" style={{ padding: '2rem', position: 'relative', zIndex: 10 }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <motion.h2 {...fadeUp} style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, marginBottom: '1rem', color: '#1e3a5f', fontFamily: 'Outfit, Inter, sans-serif' }}>
                        About Arunya Foundation
                    </motion.h2>
                    <div style={{ display: 'block', width: 60, height: 4, background: 'linear-gradient(135deg, #d4a847, #b8922e)', borderRadius: 2, margin: '1rem auto' }} />
                    <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }} style={{ color: '#6b7280', maxWidth: 800, margin: '0 auto', fontSize: '1.05rem', textAlign: 'justify', lineHeight: 1.8 }}>
                        <p style={{ marginBottom: '1rem' }}>
                            Arunya Foundation is a youth-driven community initiative based in Gwalior, dedicated to empowering underprivileged children through free education. We believe that every child aged 5–16, regardless of their economic background, deserves the chance to learn, grow, and build a self-sufficient future.
                        </p>
                        <p style={{ marginBottom: '1rem' }}>
                            Founded by passionate youth volunteers, our Foundation runs structured weekend classes covering literacy, numeracy, science, English, computer skills, and career guidance. We bridge learning gaps through dedicated teaching, free study materials, and holistic mentoring that builds both academic skill and confidence.
                        </p>
                        <p>
                            With 300+ active volunteers, 12+ villages reached, and 1,250+ students taught so far, Arunya Foundation is proving that a community of caring young people can transform the educational landscape of rural India — one child at a time.
                        </p>
                    </motion.div>
                </div>

                {/* Vision / Mission / Goal Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: 1200, margin: '0 auto' }}>
                    {/* Vision Card */}
                    <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.15 }} style={{
                        padding: '2rem', borderRadius: 24, background: 'white',
                        border: '1px solid rgba(30,58,95,0.08)',
                        boxShadow: '0 4px 24px rgba(30,58,95,0.06)',
                    }}>
                        <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'linear-gradient(135deg, #2563eb, #1e3a5f)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '1.5rem' }}>
                            <Eye size={28} />
                        </div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#1e3a5f', fontFamily: 'Outfit, Inter, sans-serif' }}>Our Vision</h3>
                        <p style={{ color: '#6b7280', lineHeight: 1.6 }}>To achieve the social and economic upliftment of underserved and minority communities by ensuring every individual has the direction, goals, and educational foundation needed to thrive.</p>
                        <img src="/assets/work/63624.jpg.jpeg" alt="Vision" style={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: 16, marginTop: '1.5rem' }} />
                    </motion.div>

                    {/* Mission Card */}
                    <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.2 }} style={{
                        padding: '2rem', borderRadius: 24, background: 'white',
                        border: '1px solid rgba(30,58,95,0.08)',
                        boxShadow: '0 4px 24px rgba(30,58,95,0.06)',
                    }}>
                        <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'linear-gradient(135deg, #d4a847, #b8922e)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '1.5rem' }}>
                            <Target size={28} />
                        </div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#1e3a5f', fontFamily: 'Outfit, Inter, sans-serif' }}>Our Mission</h3>
                        <p style={{ color: '#6b7280', lineHeight: 1.6 }}>To provide transformative education and mentorship to underserved communities by creating a premier platform where young educators and youth can showcase their skills, grow professionally, and serve as catalysts for social change.</p>
                        <img src="/assets/work/63626.jpg.jpeg" alt="Mission" style={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: 16, marginTop: '1.5rem' }} />
                    </motion.div>

                    {/* Objective Card */}
                    <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.25 }} style={{
                        padding: '2rem', borderRadius: 24, background: 'white',
                        border: '1px solid rgba(30,58,95,0.08)',
                        boxShadow: '0 4px 24px rgba(30,58,95,0.06)',
                    }}>
                        <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'linear-gradient(135deg, #2563eb, #1e3a5f)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '1.5rem' }}>
                            <ClipboardList size={28} />
                        </div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#1e3a5f', fontFamily: 'Outfit, Inter, sans-serif' }}>Our Objectives</h3>
                        <ul style={{ color: '#6b7280', lineHeight: 1.5, textAlign: 'left', listStyleType: 'disc', paddingLeft: '1.2rem', fontSize: '0.95rem' }}>
                            <li style={{ marginBottom: '0.4rem' }}>Promote educational equity for children aged 5–16 in underserved communities</li>
                            <li style={{ marginBottom: '0.4rem' }}>Empower youth educators through a collaborative teaching platform</li>
                            <li style={{ marginBottom: '0.4rem' }}>Facilitate social upliftment with knowledge, mentorship, and resources</li>
                            <li style={{ marginBottom: '0.4rem' }}>Conduct capacity building through training workshops and seminars</li>
                            <li style={{ marginBottom: '0.4rem' }}>Create structured mentorship programs for career and personal growth</li>
                            <li style={{ marginBottom: '0.4rem' }}>Organize community integration campaigns promoting "विद्या अरुणोदयः"</li>
                        </ul>
                        <img src="/assets/work/63627.jpg.jpeg" alt="Objectives" style={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: 16, marginTop: '1.5rem' }} />
                    </motion.div>
                </div>

                {/* ═══════════════ PRIMARY OBJECTIVES ═══════════════ */}
                <div style={{ maxWidth: 1200, margin: '5rem auto 0' }}>
                    <motion.h3 {...fadeUp} style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '0.75rem', color: '#1e3a5f', fontFamily: 'Outfit, Inter, sans-serif' }}>Primary Objectives</motion.h3>
                    <div style={{ display: 'block', width: 60, height: 4, background: 'linear-gradient(135deg, #d4a847, #b8922e)', borderRadius: 2, margin: '0 auto 1rem' }} />
                    <motion.p {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.05 }} style={{ textAlign: 'center', color: '#6b7280', marginBottom: '3rem', maxWidth: 600, margin: '0 auto 3rem', fontSize: '0.95rem', lineHeight: 1.7 }}>
                        The foundational goals that define why Arunya Foundation exists.
                    </motion.p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                        {primaryObjectives.map((obj, idx) => (
                            <motion.div
                                key={idx}
                                {...fadeUp}
                                transition={{ ...fadeUp.transition, delay: idx * 0.1 }}
                                style={{
                                    background: 'white',
                                    borderRadius: 20,
                                    padding: '2rem',
                                    border: '1px solid rgba(30,58,95,0.08)',
                                    boxShadow: '0 4px 24px rgba(30,58,95,0.06)',
                                }}
                            >
                                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{obj.icon}</div>
                                <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1e3a5f', marginBottom: '0.75rem', fontFamily: 'Outfit, Inter, sans-serif' }}>{obj.title}</h4>
                                <p style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: 1.7 }}>{obj.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* ═══════════════ ANCILLARY OBJECTIVES ═══════════════ */}
                <div style={{ maxWidth: 1200, margin: '4rem auto 0' }}>
                    <motion.h3 {...fadeUp} style={{ fontSize: '1.5rem', textAlign: 'center', marginBottom: '0.75rem', color: '#1e3a5f', fontFamily: 'Outfit, Inter, sans-serif' }}>Ancillary Objectives</motion.h3>
                    <div style={{ display: 'block', width: 40, height: 3, background: 'linear-gradient(135deg, #2563eb, #1e3a5f)', borderRadius: 2, margin: '0 auto 1rem' }} />
                    <motion.p {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.05 }} style={{ textAlign: 'center', color: '#9ca3af', marginBottom: '2.5rem', maxWidth: 500, margin: '0 auto 2.5rem', fontSize: '0.9rem', lineHeight: 1.6 }}>
                        Supporting goals that drive day-to-day volunteer activities and community engagement.
                    </motion.p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
                        {ancillaryObjectives.map((obj, idx) => (
                            <motion.div
                                key={idx}
                                {...fadeUp}
                                transition={{ ...fadeUp.transition, delay: idx * 0.08 }}
                                style={{
                                    background: 'linear-gradient(135deg, #f0f7ff, #fefefe)',
                                    borderRadius: 16,
                                    padding: '1.5rem',
                                    border: '1px solid rgba(37,99,235,0.08)',
                                }}
                            >
                                <div style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>{obj.icon}</div>
                                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#1e3a5f', marginBottom: '0.5rem', fontFamily: 'Outfit, Inter, sans-serif' }}>{obj.title}</h4>
                                <p style={{ color: '#6b7280', fontSize: '0.85rem', lineHeight: 1.6 }}>{obj.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* ═══════════════ VALUES ═══════════════ */}
                <div style={{ maxWidth: 1200, margin: '5rem auto 0' }}>
                    <motion.h3 {...fadeUp} style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '0.75rem', color: '#1e3a5f', fontFamily: 'Outfit, Inter, sans-serif' }}>Our Values</motion.h3>
                    <div style={{ display: 'block', width: 60, height: 4, background: 'linear-gradient(135deg, #d4a847, #b8922e)', borderRadius: 2, margin: '0 auto 3rem' }} />

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                        {values.map((value, idx) => (
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
                                        <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1e3a5f', fontFamily: 'Outfit, Inter, sans-serif', lineHeight: 1.2 }}>{value.title}</h4>
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
                </div>

                {/* Team Section */}
                <div style={{ maxWidth: 1200, margin: '6rem auto 0' }}>
                    <motion.h3 {...fadeUp} style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '0.75rem', color: '#1e3a5f', fontFamily: 'Outfit, Inter, sans-serif' }}>Our Leadership</motion.h3>
                    <div style={{ display: 'block', width: 60, height: 4, background: 'linear-gradient(135deg, #d4a847, #b8922e)', borderRadius: 2, margin: '0 auto 3rem' }} />
                    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                        {[
                            { name: 'Prabal', role: 'Founder', img: '/assets/work/prabal_latest.jpeg', quote: 'Every child we teach is a future we build together.', instagram: 'https://www.instagram.com/withprabal_/', linkedin: 'https://www.linkedin.com/in/prabal-pandey-854803358/' },
                            { name: 'Anjali Mishra', role: 'President', img: '/assets/work/anjali_new.jpeg', quote: 'We believe every child deserves the chance to learn, grow, and dream.', instagram: 'https://www.instagram.com/___anjaliii.v18?utm_source=qr&igsh=MWJhdnNmenB6Y2NpeA==', linkedin: 'https://www.linkedin.com/in/anjali-mishra-3604662a7/' },
                            { name: 'Prateek Sharma', role: 'Vice President', img: '/assets/work/prateek_new.png', quote: 'Education is the one gift that keeps multiplying.', instagram: 'https://www.instagram.com/prateek__.27?igsh=MTFtc2QzYXUyaGV6dw==', linkedin: 'https://www.linkedin.com/in/prateek-sharma-82b934340/' },
                            { name: 'Sakshi', role: 'Director - Dept. of Education & Welfare', img: '/assets/work/sakshi.jpg', quote: 'Dedicated to empowering the next generation through education and welfare.', instagram: 'https://www.instagram.com/s__rajawat__05?igsh=cHViMzlkdDU5OW4w', linkedin: 'https://www.linkedin.com/in/sakshi-rajawat-789556389/' },
                            { name: 'Priyansh', role: 'Social Media Head', img: '/assets/work/priyansh.jpeg', quote: 'Every story we share reaches someone who wants to help.' },
                        ].map((member, idx) => (
                            <motion.div
                                key={idx}
                                {...fadeUp}
                                transition={{ ...fadeUp.transition, delay: 0.1 + idx * 0.08 }}
                                style={{
                                    width: 280,
                                    borderRadius: 32,
                                    textAlign: 'left',
                                    background: 'white',
                                    overflow: 'hidden',
                                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                                }}
                                whileHover={{ y: -10 }}
                            >
                                <div style={{ position: 'relative', borderRadius: 24, overflow: 'hidden', height: 320, marginBottom: '1.25rem' }}>
                                    <motion.img
                                        src={member.img}
                                        alt={member.name}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            filter: 'grayscale(100%)',
                                            transition: 'filter 0.4s ease, transform 0.4s ease',
                                        }}
                                        whileHover={{ filter: 'grayscale(0%)', scale: 1.05 }}
                                        whileTap={{ filter: 'grayscale(0%)', scale: 1.05 }}
                                    />
                                    <div style={{ position: 'absolute', bottom: 12, right: 12, display: 'flex', gap: '8px' }}>
                                        {member.instagram && (
                                            <a href={member.instagram} target="_blank" rel="noopener noreferrer" style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', textDecoration: 'none', color: '#db2777' }}>
                                                <FaInstagram size={18} />
                                            </a>
                                        )}
                                        {member.linkedin && (
                                            <a href={member.linkedin} target="_blank" rel="noopener noreferrer" style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb', fontSize: '0.9rem', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', textDecoration: 'none' }}>
                                                <FaLinkedin size={18} />
                                            </a>
                                        )}
                                    </div>
                                </div>
                                <div style={{ padding: '0 0.5rem 1rem' }}>
                                    <h4 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.25rem', color: '#1e3a5f', fontFamily: 'Outfit, Inter, sans-serif' }}>{member.name}</h4>
                                    <p style={{ color: '#6b7280', fontSize: '0.9rem', fontWeight: 500, marginBottom: '0.75rem' }}>{member.role}</p>
                                    <p style={{ color: '#9ca3af', fontSize: '0.8rem', fontStyle: 'italic', lineHeight: 1.4 }}>"{member.quote}"</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </PageTransition>
    );
};
