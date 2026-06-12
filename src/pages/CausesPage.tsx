import { PageTransition } from '../components/ui/PageTransition';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const fadeUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
};

export const CausesPage = () => {
    const navigate = useNavigate();

    return (
        <PageTransition className="pt-[140px] pb-16">
            <section id="causes" style={{ padding: '2rem', maxWidth: 1400, margin: '0 auto' }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <motion.h2 {...fadeUp} style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#0B1F3A', fontFamily: 'Poppins, Inter, sans-serif', marginBottom: '0.5rem' }}>
                        Our Programs
                    </motion.h2>
                    <div style={{ display: 'block', width: 60, height: 4, background: 'linear-gradient(135deg, #E6B325, #C99A1E)', borderRadius: 2, margin: '0.75rem auto 1.25rem' }} />
                    <motion.p {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }} style={{ color: '#6b7280', fontSize: '1.1rem', maxWidth: 600, margin: '0 auto', lineHeight: 1.7 }}>
                        Empowering underprivileged communities through impactful educational initiatives and sustainable development.
                    </motion.p>
                </div>

                {/* Premium Placeholder for Future Programs */}
                <motion.div
                    {...fadeUp}
                    transition={{ ...fadeUp.transition, delay: 0.15 }}
                    style={{
                        maxWidth: 680,
                        margin: '0 auto',
                        background: 'rgba(255, 255, 255, 0.8)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(11, 31, 58, 0.08)',
                        borderRadius: 24,
                        padding: '3rem 2rem',
                        textAlign: 'center',
                        boxShadow: '0 4px 24px rgba(11,31,58,0.04), 0 16px 48px rgba(11,31,58,0.06)',
                    }}
                >
                    <div style={{
                        width: 72,
                        height: 72,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #E6B325 0%, #C99A1E 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        margin: '0 auto 1.5rem',
                        boxShadow: '0 8px 24px rgba(230,179,37,0.3)',
                    }}>
                        <Sparkles size={32} />
                    </div>

                    <h3 style={{
                        fontSize: '1.5rem',
                        fontWeight: 800,
                        color: '#0B1F3A',
                        fontFamily: 'Poppins, Inter, sans-serif',
                        marginBottom: '1rem',
                    }}>
                        Exciting Programs Coming Soon!
                    </h3>

                    <p style={{
                        color: '#6b7280',
                        fontSize: '0.98rem',
                        lineHeight: 1.75,
                        maxWidth: 540,
                        margin: '0 auto 2rem',
                    }}>
                        We are currently designing and restructuring our flagship educational and community development programs. Our team is working on sustainable models to bring even greater impact to underprivileged communities in Gwalior.
                    </p>

                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '1rem',
                        flexWrap: 'wrap',
                    }}>
                        <button
                            onClick={() => navigate('/blog')}
                            style={{
                                padding: '0.8rem 1.8rem',
                                borderRadius: 9999,
                                background: '#0B1F3A',
                                color: 'white',
                                fontWeight: 700,
                                fontSize: '0.9rem',
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'all 0.25s',
                                boxShadow: '0 4px 12px rgba(11,31,58,0.15)',
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.background = '#123C73';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = 'none';
                                e.currentTarget.style.background = '#0B1F3A';
                            }}
                        >
                            Read Stories of Impact
                        </button>
                        <button
                            onClick={() => navigate('/contact')}
                            style={{
                                padding: '0.8rem 1.8rem',
                                borderRadius: 9999,
                                background: 'white',
                                color: '#0B1F3A',
                                fontWeight: 700,
                                fontSize: '0.9rem',
                                border: '1px solid rgba(11,31,58,0.15)',
                                cursor: 'pointer',
                                transition: 'all 0.25s',
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.background = 'rgba(11,31,58,0.03)';
                                e.currentTarget.style.borderColor = 'rgba(11,31,58,0.3)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = 'none';
                                e.currentTarget.style.background = 'white';
                                e.currentTarget.style.borderColor = 'rgba(11,31,58,0.15)';
                            }}
                        >
                            Get in Touch
                        </button>
                    </div>
                </motion.div>
            </section>
        </PageTransition>
    );
};
