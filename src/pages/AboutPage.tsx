import { PageTransition } from '../components/ui/PageTransition';
import { motion } from 'framer-motion';

const fadeUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
};

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

                {/* Vision / Mission / Objective Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: 1200, margin: '0 auto' }}>
                    {/* Vision Card */}
                    <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.15 }} style={{
                        padding: '2rem', borderRadius: 24, background: 'white',
                        border: '1px solid rgba(30,58,95,0.08)',
                        boxShadow: '0 4px 24px rgba(30,58,95,0.06)',
                    }}>
                        <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'linear-gradient(135deg, #2563eb, #1e3a5f)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '1.5rem' }}>👁️</div>
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
                        <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'linear-gradient(135deg, #d4a847, #b8922e)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '1.5rem' }}>🎯</div>
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
                        <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'linear-gradient(135deg, #2563eb, #1e3a5f)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '1.5rem' }}>📋</div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#1e3a5f', fontFamily: 'Outfit, Inter, sans-serif' }}>Our Objectives</h3>
                        <ul style={{ color: '#6b7280', lineHeight: 1.5, textAlign: 'left', listStyleType: 'disc', paddingLeft: '1.2rem', fontSize: '0.95rem' }}>
                            <li style={{ marginBottom: '0.4rem' }}>Provide free weekend classes to children aged 5–16 in rural areas</li>
                            <li style={{ marginBottom: '0.4rem' }}>Distribute study materials and school supplies to every enrolled child</li>
                            <li style={{ marginBottom: '0.4rem' }}>Teach computer literacy and career readiness to secondary students</li>
                            <li style={{ marginBottom: '0.4rem' }}>Bridge learning gaps through structured syllabus and mentoring</li>
                            <li style={{ marginBottom: '0.4rem' }}>Encourage youth volunteering and community engagement</li>
                            <li style={{ marginBottom: '0.4rem' }}>Reach 1,000+ students and 20 villages by 2027</li>
                        </ul>
                        <img src="/assets/work/63627.jpg.jpeg" alt="Objectives" style={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: 16, marginTop: '1.5rem' }} />
                    </motion.div>
                </div>

                {/* Team Section */}
                <div style={{ maxWidth: 1200, margin: '6rem auto 0' }}>
                    <motion.h3 {...fadeUp} style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '0.75rem', color: '#1e3a5f', fontFamily: 'Outfit, Inter, sans-serif' }}>Our Leadership</motion.h3>
                    <div style={{ display: 'block', width: 60, height: 4, background: 'linear-gradient(135deg, #d4a847, #b8922e)', borderRadius: 2, margin: '0 auto 3rem' }} />
                    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                        {[
                            { name: 'Prabal', role: 'Founder', img: '/assets/work/prabal_new.png', quote: 'Every child we teach is a future we build together.', instagram: 'https://www.instagram.com/withprabal_/' },
                            { name: 'Anjali Mishra', role: 'President', img: '/assets/work/20251102_131457.jpg', quote: 'We believe every child deserves the chance to learn, grow, and dream.' },
                            { name: 'Prateek Sharma', role: 'VICE PRESIDENT', img: '/assets/work/prateek_new.png', quote: 'Education is the one gift that keeps multiplying.' },
                            { name: 'Sakshi', role: 'Director - Dept. of Education & Welfare', img: '/assets/work/placeholder.png', quote: 'Dedicated to empowering the next generation through education and welfare.' },
                            { name: 'Aaleya', role: 'Social Media Head', img: '/assets/work/20251102_131502.jpg', quote: 'Every story we share reaches someone who wants to help.' },
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
                                    />
                                    <div style={{ position: 'absolute', bottom: 12, right: 12, display: 'flex', gap: '8px' }}>
                                        {member.instagram && (
                                            <a href={member.instagram} target="_blank" rel="noopener noreferrer" style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', textDecoration: 'none', color: 'inherit' }}>
                                                📸
                                            </a>
                                        )}
                                        <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>💼</div>
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
