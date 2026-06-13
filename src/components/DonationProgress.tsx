import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Heart, Users, TrendingUp, Sparkles } from 'lucide-react';

const fadeUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
};

/* Simple count-up hook */
function useCountUp(end: number, duration = 2000) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const started = useRef(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !started.current) {
                    started.current = true;
                    const start = performance.now();
                    const animate = (now: number) => {
                        const progress = Math.min((now - start) / duration, 1);
                        const eased = 1 - Math.pow(1 - progress, 3);
                        setCount(Math.round(eased * end));
                        if (progress < 1) requestAnimationFrame(animate);
                    };
                    requestAnimationFrame(animate);
                }
            },
            { threshold: 0.3 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, [end, duration]);

    return { count, ref };
}

export const DonationProgress = () => {
    const navigate = useNavigate();
    const raised = 32000;
    const goal = 50000;
    const percentage = Math.round((raised / goal) * 100);
    const donors = 48;

    const { count: animatedRaised, ref: progressRef } = useCountUp(raised, 2200);
    const { count: animatedDonors, ref: donorsRef } = useCountUp(donors, 1800);

    return (
        <section style={{
            background: 'linear-gradient(180deg, var(--color-offwhite) 0%, var(--color-warm-cream) 100%)',
            padding: 'clamp(4rem, 8vw, 6rem) clamp(1rem, 4vw, 2rem)',
            position: 'relative', overflow: 'hidden',
        }}>
            {/* Decorative elements */}
            <div style={{ position: 'absolute', top: -100, right: -100, width: 350, height: 350, borderRadius: '50%', background: 'rgba(207,140,54,0.06)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: -80, left: -80, width: 250, height: 250, borderRadius: '50%', background: 'rgba(18,60,115,0.04)', pointerEvents: 'none' }} />

            <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 1 }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem, 5vw, 3.5rem)' }}>
                    <motion.div {...fadeUp} style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                        background: 'rgba(207,140,54,0.12)', border: '1px solid rgba(207,140,54,0.25)',
                        borderRadius: 9999, padding: '0.4rem 1.1rem', marginBottom: '1.25rem',
                    }}>
                        <Sparkles size={14} color="#CF8C36" />
                        <span style={{ color: '#B5772A', fontWeight: 700, fontSize: '0.78rem', letterSpacing: 1, textTransform: 'uppercase' }}>Your Impact</span>
                    </motion.div>
                    <motion.h2 {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.05 }} style={{
                        fontSize: 'clamp(1.8rem, 4.5vw, 2.8rem)', fontWeight: 900, color: '#0B1F3A',
                        fontFamily: 'Poppins, Inter, sans-serif', marginBottom: '0.75rem', lineHeight: 1.15,
                    }}>
                        Together We Can <span style={{ color: '#CF8C36' }}>Change Lives</span>
                    </motion.h2>
                    <motion.p {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }} style={{
                        color: '#6b7280', fontSize: 'clamp(0.95rem, 2.5vw, 1.08rem)', maxWidth: 560, margin: '0 auto', lineHeight: 1.75,
                    }}>
                        Every contribution brings hope to a child. Help us reach our goal and fund free education for underserved children in Gwalior.
                    </motion.p>
                </div>

                {/* Progress Card */}
                <motion.div
                    {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.15 }}
                    ref={progressRef}
                    style={{
                        background: 'white', borderRadius: 20, padding: 'clamp(2rem, 4vw, 3rem)',
                        border: '1px solid rgba(11,31,58,0.06)',
                        boxShadow: '0 2px 8px rgba(11,31,58,0.04), 0 12px 32px rgba(11,31,58,0.08)',
                        marginBottom: '2rem',
                    }}
                >
                    {/* Amount row */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                        <div>
                            <span style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900, color: '#0B1F3A', fontFamily: 'Poppins, Inter, sans-serif' }}>
                                ₹{animatedRaised.toLocaleString('en-IN')}
                            </span>
                            <span style={{ color: '#9ca3af', fontSize: '1rem', marginLeft: '0.5rem', fontWeight: 500 }}>raised</span>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <span style={{ color: '#6b7280', fontSize: '0.95rem', fontWeight: 600 }}>Goal: </span>
                            <span style={{ color: '#0B1F3A', fontSize: '1.1rem', fontWeight: 800 }}>₹{goal.toLocaleString('en-IN')}</span>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div style={{
                        height: 14, borderRadius: 99, background: 'rgba(11,31,58,0.06)',
                        overflow: 'hidden', position: 'relative', marginBottom: '1.25rem',
                    }}>
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${percentage}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                            style={{
                                height: '100%', borderRadius: 99,
                                background: 'linear-gradient(135deg, #CF8C36 0%, #E7A44D 60%, #CF8C36 100%)',
                                boxShadow: '0 2px 12px rgba(207,140,54,0.4)',
                                position: 'relative',
                            }}
                        >
                            {/* Shimmer effect */}
                            <div style={{
                                position: 'absolute', inset: 0, borderRadius: 99,
                                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.35) 50%, transparent 100%)',
                                animation: 'shimmer 2.5s infinite',
                            }} />
                        </motion.div>
                    </div>

                    {/* Stats row */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                        <div ref={donorsRef} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <div style={{
                                width: 36, height: 36, borderRadius: '50%',
                                background: 'rgba(18,60,115,0.08)', display: 'flex',
                                alignItems: 'center', justifyContent: 'center',
                            }}>
                                <Users size={16} color="#123C73" />
                            </div>
                            <div>
                                <span style={{ fontWeight: 800, color: '#0B1F3A', fontSize: '1rem' }}>{animatedDonors}</span>
                                <span style={{ color: '#9ca3af', fontSize: '0.85rem', marginLeft: '0.3rem' }}>donors</span>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <div style={{
                                width: 36, height: 36, borderRadius: '50%',
                                background: 'rgba(207,140,54,0.1)', display: 'flex',
                                alignItems: 'center', justifyContent: 'center',
                            }}>
                                <TrendingUp size={16} color="#CF8C36" />
                            </div>
                            <div>
                                <span style={{ fontWeight: 800, color: '#CF8C36', fontSize: '1rem' }}>{percentage}%</span>
                                <span style={{ color: '#9ca3af', fontSize: '0.85rem', marginLeft: '0.3rem' }}>funded</span>
                            </div>
                        </div>
                        <div style={{
                            background: 'rgba(207,140,54,0.08)', borderRadius: 99,
                            padding: '0.4rem 1rem', fontSize: '0.82rem', fontWeight: 700,
                            color: '#B5772A', display: 'flex', alignItems: 'center', gap: '0.4rem',
                        }}>
                            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
                            Campaign Active
                        </div>
                    </div>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.25 }}
                    style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button
                        onClick={() => navigate('/login')}
                        style={{
                            padding: '1rem 2.5rem', borderRadius: 9999, border: 'none',
                            background: 'linear-gradient(135deg, #CF8C36 0%, #E7A44D 50%, #CF8C36 100%)',
                            color: '#0B1F3A', fontWeight: 800, fontSize: '1.05rem', cursor: 'pointer',
                            fontFamily: 'inherit', boxShadow: '0 6px 24px rgba(207,140,54,0.35)',
                            transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)'; e.currentTarget.style.boxShadow = '0 10px 32px rgba(207,140,54,0.45)'; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(207,140,54,0.35)'; }}
                    >
                        <Heart size={18} fill="currentColor" /> Donate Now
                    </button>
                    <button
                        onClick={() => navigate('/volunteer')}
                        style={{
                            padding: '1rem 2.5rem', borderRadius: 9999,
                            border: '2px solid #0B1F3A', background: 'transparent',
                            color: '#0B1F3A', fontWeight: 700, fontSize: '1.05rem', cursor: 'pointer',
                            fontFamily: 'inherit', transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = '#0B1F3A'; e.currentTarget.style.color = 'white'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#0B1F3A'; e.currentTarget.style.transform = 'none'; }}
                    >
                        Become a Sponsor
                    </button>
                </motion.div>

                {/* Micro-message */}
                <motion.p {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.3 }}
                    style={{ textAlign: 'center', color: '#9ca3af', fontSize: '0.85rem', marginTop: '1.25rem', fontStyle: 'italic' }}>
                    "Your support helps transform futures — ₹200 covers a child's study materials for one month."
                </motion.p>
            </div>

            {/* Shimmer keyframe */}
            <style>{`
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(200%); }
                }
            `}</style>
        </section>
    );
};
