import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Heart, BookOpen, GraduationCap, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

const fadeUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
};

const children = [
    {
        name: 'Aarav',
        age: 8,
        img: '/assets/sponsor/child1.png',
        dream: 'Dreams of becoming a teacher so he can help children like himself.',
        need: 'Lacks access to proper educational resources and study materials.',
        story: 'Aarav walks 3 kilometers every weekend to attend our free classes. Despite the distance, his eyes light up every time he opens a new book. With your support, we can ensure children like Aarav never have to choose between education and survival.',
    },
    {
        name: 'Priya',
        age: 10,
        img: '/assets/sponsor/child2.png',
        dream: 'Wants to become a doctor and provide free healthcare in her village.',
        need: 'Cannot afford school fees, uniforms, or textbooks.',
        story: 'Priya is the first girl in her family to learn to read. Her determination inspires everyone around her. A small monthly contribution can keep her dream alive and break the cycle of poverty for her entire family.',
    },
];

const plans = [
    { amount: '₹500', label: '/month', desc: 'Books & study materials', icon: <BookOpen size={20} />, color: '#123C73' },
    { amount: '₹1,000', label: '/month', desc: 'School support & tutoring', icon: <GraduationCap size={20} />, color: '#CF8C36', featured: true },
    { amount: '₹2,000', label: '/month', desc: 'Complete educational assistance', icon: <Heart size={20} />, color: '#0B1F3A' },
];

export const SponsorChild = () => {
    const navigate = useNavigate();
    const [activeChild, setActiveChild] = useState(0);
    const child = children[activeChild];

    return (
        <section style={{
            background: 'linear-gradient(180deg, var(--color-warm-cream) 0%, var(--color-offwhite) 100%)',
            padding: 'clamp(4rem, 8vw, 7rem) clamp(1rem, 4vw, 2rem)',
            position: 'relative', overflow: 'hidden',
        }}>
            {/* Decorative */}
            <div style={{ position: 'absolute', top: '10%', left: -100, width: 300, height: 300, borderRadius: '50%', background: 'rgba(207,140,54,0.05)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '5%', right: -80, width: 220, height: 220, borderRadius: '50%', background: 'rgba(18,60,115,0.04)', pointerEvents: 'none' }} />

            <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
                {/* Section Header */}
                <div style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
                    <motion.div {...fadeUp} style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                        background: 'rgba(207,140,54,0.12)', border: '1px solid rgba(207,140,54,0.25)',
                        borderRadius: 9999, padding: '0.4rem 1.1rem', marginBottom: '1.25rem',
                    }}>
                        <Heart size={14} color="#CF8C36" fill="#CF8C36" />
                        <span style={{ color: '#B5772A', fontWeight: 700, fontSize: '0.78rem', letterSpacing: 1, textTransform: 'uppercase' }}>Change a Life</span>
                    </motion.div>
                    <motion.h2 {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.05 }} style={{
                        fontSize: 'clamp(1.8rem, 4.5vw, 2.8rem)', fontWeight: 900, color: '#0B1F3A',
                        fontFamily: 'Poppins, Inter, sans-serif', marginBottom: '0.75rem', lineHeight: 1.15,
                    }}>
                        Sponsor a <span style={{ color: '#CF8C36' }}>Child's Future</span>
                    </motion.h2>
                    <motion.p {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }} style={{
                        color: '#6b7280', fontSize: 'clamp(0.95rem, 2.5vw, 1.08rem)', maxWidth: 580, margin: '0 auto', lineHeight: 1.75,
                    }}>
                        Be the reason a child smiles. Your monthly support provides education, hope, and a brighter tomorrow.
                    </motion.p>
                </div>

                {/* Main Content — Split Layout */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 'clamp(2rem, 4vw, 3rem)', alignItems: 'start' }}>

                    {/* Left — Child Card */}
                    <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.15 }}
                        style={{ position: 'relative' }}>
                        <div style={{
                            background: 'white', borderRadius: 24, overflow: 'hidden',
                            border: '1px solid rgba(11,31,58,0.06)',
                            boxShadow: '0 4px 16px rgba(11,31,58,0.05), 0 16px 40px rgba(11,31,58,0.08)',
                        }}>
                            {/* Image with navigation */}
                            <div style={{ position: 'relative', overflow: 'hidden' }}>
                                <AnimatePresence mode="wait">
                                    <motion.img
                                        key={activeChild}
                                        src={child.img}
                                        alt={child.name}
                                        initial={{ opacity: 0, scale: 1.05 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.5 }}
                                        style={{ width: '100%', height: 340, objectFit: 'cover', display: 'block' }}
                                        loading="lazy"
                                    />
                                </AnimatePresence>

                                {/* Navigation arrows */}
                                {children.length > 1 && (
                                    <>
                                        <button onClick={() => setActiveChild(p => (p - 1 + children.length) % children.length)}
                                            style={{
                                                position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
                                                width: 40, height: 40, borderRadius: '50%', border: 'none',
                                                background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)',
                                                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                boxShadow: '0 4px 12px rgba(0,0,0,0.15)', transition: 'all 0.2s',
                                            }}
                                        ><ChevronLeft size={18} color="#0B1F3A" /></button>
                                        <button onClick={() => setActiveChild(p => (p + 1) % children.length)}
                                            style={{
                                                position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                                                width: 40, height: 40, borderRadius: '50%', border: 'none',
                                                background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)',
                                                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                boxShadow: '0 4px 12px rgba(0,0,0,0.15)', transition: 'all 0.2s',
                                            }}
                                        ><ChevronRight size={18} color="#0B1F3A" /></button>
                                    </>
                                )}

                                {/* Gradient overlay at bottom */}
                                <div style={{
                                    position: 'absolute', bottom: 0, left: 0, right: 0,
                                    background: 'linear-gradient(to top, rgba(11,31,58,0.85) 0%, transparent 100%)',
                                    padding: '3rem 1.5rem 1.25rem', color: 'white',
                                }} />
                            </div>

                            {/* Child Info */}
                            <div style={{ padding: '1.75rem 2rem 2rem' }}>
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeChild}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.35 }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                                            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0B1F3A', fontFamily: 'Poppins, Inter, sans-serif', margin: 0 }}>{child.name}</h3>
                                            <span style={{
                                                background: 'rgba(18,60,115,0.08)', color: '#123C73',
                                                padding: '0.2rem 0.7rem', borderRadius: 99, fontSize: '0.78rem', fontWeight: 700,
                                            }}>Age {child.age}</span>
                                        </div>

                                        <div style={{ marginBottom: '1rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.6rem' }}>
                                                <Sparkles size={16} color="#CF8C36" style={{ flexShrink: 0, marginTop: 3 }} />
                                                <p style={{ color: '#6B7280', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
                                                    <strong style={{ color: '#0B1F3A' }}>Dream:</strong> {child.dream}
                                                </p>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                                                <BookOpen size={16} color="#123C73" style={{ flexShrink: 0, marginTop: 3 }} />
                                                <p style={{ color: '#6B7280', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
                                                    <strong style={{ color: '#0B1F3A' }}>Need:</strong> {child.need}
                                                </p>
                                            </div>
                                        </div>

                                        <p style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: 1.75, fontStyle: 'italic', borderLeft: '3px solid #CF8C36', paddingLeft: '1rem', margin: 0 }}>
                                            "{child.story}"
                                        </p>
                                    </motion.div>
                                </AnimatePresence>

                                {/* Dots */}
                                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginTop: '1.5rem' }}>
                                    {children.map((_, i) => (
                                        <button key={i} onClick={() => setActiveChild(i)}
                                            style={{
                                                width: activeChild === i ? 24 : 8, height: 8, borderRadius: 99,
                                                background: activeChild === i ? '#CF8C36' : 'rgba(11,31,58,0.12)',
                                                border: 'none', cursor: 'pointer', transition: 'all 0.3s ease',
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right — Sponsorship Plans */}
                    <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.2 }}>
                        <h3 style={{
                            fontSize: '1.35rem', fontWeight: 800, color: '#0B1F3A',
                            fontFamily: 'Poppins, Inter, sans-serif', marginBottom: '0.5rem',
                        }}>
                            Choose Your Impact
                        </h3>
                        <p style={{ color: '#6b7280', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.75rem' }}>
                            Select a monthly sponsorship plan that fits your heart and budget.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                            {plans.map((plan, idx) => (
                                <motion.div
                                    key={idx}
                                    whileHover={{ y: -3, boxShadow: '0 8px 24px rgba(11,31,58,0.1), 0 16px 40px rgba(11,31,58,0.08)' }}
                                    style={{
                                        background: plan.featured ? 'linear-gradient(135deg, #0B1F3A 0%, #2a5080 100%)' : 'white',
                                        borderRadius: 16, padding: '1.25rem 1.5rem',
                                        border: plan.featured ? '2px solid rgba(207,140,54,0.4)' : '1px solid rgba(11,31,58,0.06)',
                                        boxShadow: '0 2px 8px rgba(11,31,58,0.04), 0 8px 24px rgba(11,31,58,0.06)',
                                        display: 'flex', alignItems: 'center', gap: '1rem',
                                        cursor: 'pointer', position: 'relative', overflow: 'hidden',
                                    }}
                                    onClick={() => navigate('/login')}
                                >
                                    {plan.featured && (
                                        <div style={{
                                            position: 'absolute', top: 0, right: 0,
                                            background: '#CF8C36', color: '#0B1F3A',
                                            padding: '0.15rem 0.75rem', borderRadius: '0 0 0 12px',
                                            fontSize: '0.68rem', fontWeight: 800, letterSpacing: 0.5,
                                        }}>MOST POPULAR</div>
                                    )}
                                    <div style={{
                                        width: 48, height: 48, borderRadius: 12,
                                        background: plan.featured ? 'rgba(207,140,54,0.2)' : `${plan.color}10`,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        color: plan.featured ? '#CF8C36' : plan.color, flexShrink: 0,
                                    }}>{plan.icon}</div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
                                            <span style={{
                                                fontSize: '1.4rem', fontWeight: 900,
                                                color: plan.featured ? 'white' : '#0B1F3A',
                                                fontFamily: 'Poppins, Inter, sans-serif',
                                            }}>{plan.amount}</span>
                                            <span style={{
                                                fontSize: '0.85rem', fontWeight: 500,
                                                color: plan.featured ? 'rgba(255,255,255,0.6)' : '#9ca3af',
                                            }}>{plan.label}</span>
                                        </div>
                                        <p style={{
                                            margin: 0, fontSize: '0.88rem',
                                            color: plan.featured ? 'rgba(255,255,255,0.75)' : '#6b7280',
                                        }}>{plan.desc}</p>
                                    </div>
                                    <ChevronRight size={18} color={plan.featured ? 'rgba(255,255,255,0.4)' : '#9ca3af'} />
                                </motion.div>
                            ))}
                        </div>

                        {/* Main CTA */}
                        <button
                            onClick={() => navigate('/login')}
                            style={{
                                width: '100%', padding: '1.1rem 2rem', borderRadius: 9999, border: 'none',
                                background: 'linear-gradient(135deg, #CF8C36 0%, #E7A44D 50%, #CF8C36 100%)',
                                color: '#0B1F3A', fontWeight: 800, fontSize: '1.08rem', cursor: 'pointer',
                                fontFamily: 'inherit', boxShadow: '0 6px 24px rgba(207,140,54,0.35)',
                                transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                            }}
                            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)'; e.currentTarget.style.boxShadow = '0 10px 32px rgba(207,140,54,0.45)'; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(207,140,54,0.35)'; }}
                        >
                            <Heart size={18} fill="currentColor" /> Sponsor a Child Today
                        </button>

                        {/* Trust message */}
                        <div style={{
                            marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.6rem',
                        }}>
                            {[
                                '100% of your donation goes directly to the child',
                                'Monthly updates on your sponsored child\'s progress',
                                'Cancel or modify your sponsorship anytime',
                            ].map((text, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', flexShrink: 0 }} />
                                    <span style={{ color: '#6b7280', fontSize: '0.82rem' }}>{text}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
