import { useState } from 'react';
import { PageTransition } from '../components/ui/PageTransition';
import { BookOpen, Backpack, Laptop, Megaphone, Lightbulb, Palette, Calendar, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { ModalOverlay } from '../components/ui/ModalOverlay';

const fadeUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
};

interface Program {
    title: string;
    category: string;
    icon: React.ReactNode;
    tagline: string;
    detail: string;
    img: string;
    fullDetail: string;
    stats: { label: string; value: string }[];
    schedule: string;
    eligibility: string;
}

const programs: Program[] = [
    {
        title: 'Weekend Basic Classes',
        category: 'Teaching',
        icon: <BookOpen size={24} />,
        tagline: 'Free education every Saturday & Sunday',
        detail: 'Every Saturday & Sunday, our volunteers teach Hindi, English, Math, Science, and GK to children aged 5–16. Classes are held in community spaces and are completely free.',
        img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=900&q=80',
        fullDetail: `Our weekend classes are the heart of Arunya Foundation. Every Saturday and Sunday, trained volunteers gather in community halls, temples, and open spaces across 12+ villages to teach children who cannot afford private schooling.\n\nThe curriculum covers Hindi, English, Mathematics, Science, and General Knowledge — tailored to the national curriculum framework. Age groups are divided into three batches: Foundation (5–8), Primary (9–12), and Secondary (13–16).\n\nVolunteers go through a structured orientation where they learn child-friendly teaching techniques including storytelling, group activities, and visual aids. We currently run classes in 5 locations simultaneously every weekend.`,
        stats: [
            { label: 'Children per Session', value: '250+' },
            { label: 'Subjects Covered', value: '6' },
            { label: 'Volunteers per Day', value: '40+' },
            { label: 'Locations', value: '5' },
        ],
        schedule: 'Every Saturday & Sunday, 10 AM – 1 PM',
        eligibility: 'Children aged 5–16 from underprivileged families in Gwalior region.',
    },

];

const categories = ['All', 'Teaching'];

const categoryColors: Record<string, string> = {
    Teaching: '#2563eb',
    Supplies: '#d4a847',
    Skills: '#059669',
    Language: '#7c3aed',
    Guidance: '#ea580c',
    Creative: '#db2777',
};

export const CausesPage = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

    const filtered = activeCategory === 'All' ? programs : programs.filter(p => p.category === activeCategory);

    return (
        <PageTransition className="pt-[140px] pb-16">
            <section id="causes" style={{ padding: '2rem', maxWidth: 1400, margin: '0 auto' }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <motion.h2 {...fadeUp} style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#1e3a5f', fontFamily: 'Outfit, Inter, sans-serif', marginBottom: '0.5rem' }}>
                        Our Programs
                    </motion.h2>
                    <div style={{ display: 'block', width: 60, height: 4, background: 'linear-gradient(135deg, #d4a847, #b8922e)', borderRadius: 2, margin: '0.75rem auto 1.25rem' }} />
                    <motion.p {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }} style={{ color: '#6b7280', fontSize: '1.1rem', maxWidth: 600, margin: '0 auto', lineHeight: 1.7 }}>
                        Structured educational programs designed to teach, empower, and prepare underprivileged children for a self-sufficient future.
                    </motion.p>
                </div>

                {/* Filter Bar */}
                <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.15 }} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center', marginBottom: '3rem' }}>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            style={{
                                padding: '0.6rem 1.5rem', borderRadius: 9999, border: 'none',
                                fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer',
                                fontFamily: 'inherit', transition: 'all 0.2s',
                                background: activeCategory === cat ? '#1e3a5f' : '#f1f5f9',
                                color: activeCategory === cat ? 'white' : '#6b7280',
                                boxShadow: activeCategory === cat ? '0 4px 16px rgba(30,58,95,0.2)' : 'none',
                            }}
                        >{cat}</button>
                    ))}
                </motion.div>

                {/* Programs Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', maxWidth: 1200, margin: '0 auto' }}>
                    {filtered.map((prog, idx) => (
                        <motion.div
                            key={prog.title}
                            {...fadeUp}
                            transition={{ ...fadeUp.transition, delay: 0.05 + idx * 0.07 }}
                            style={{
                                background: 'white', borderRadius: 24,
                                boxShadow: '0 4px 24px rgba(30,58,95,0.07)',
                                overflow: 'hidden', border: '1px solid rgba(30,58,95,0.06)',
                                display: 'flex', flexDirection: 'column',
                                cursor: 'pointer', transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                            }}
                            onMouseEnter={e => {
                                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-6px)';
                                (e.currentTarget as HTMLDivElement).style.boxShadow = '0 16px 48px rgba(30,58,95,0.14)';
                            }}
                            onMouseLeave={e => {
                                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                                (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 24px rgba(30,58,95,0.07)';
                            }}
                        >
                            {/* Image */}
                            <div style={{ position: 'relative', height: 220, overflow: 'hidden' }}>
                                <img src={prog.img} alt={prog.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} />
                                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(30,58,95,0.5) 0%, transparent 60%)' }} />
                                <div style={{ position: 'absolute', bottom: 14, left: 16, padding: '4px 14px', borderRadius: 999, background: categoryColors[prog.category] || '#2563eb', color: 'white', fontWeight: 700, fontSize: '0.78rem' }}>{prog.category}</div>
                            </div>

                            {/* Content */}
                            <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                                <h3 style={{ color: '#1e3a5f', fontSize: '1.2rem', fontWeight: 800, fontFamily: 'Outfit, Inter, sans-serif', marginBottom: '0.4rem' }}>
                                    {prog.icon} {prog.title}
                                </h3>
                                <p style={{ color: '#d4a847', fontStyle: 'italic', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.75rem' }}>{prog.tagline}</p>
                                <p style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: 1.65, marginBottom: '1.5rem', flex: 1 }}>
                                    {prog.detail}
                                </p>
                                <button
                                    onClick={() => setSelectedProgram(prog)}
                                    style={{
                                        width: '100%', padding: '0.875rem', borderRadius: 14,
                                        background: 'linear-gradient(135deg, #1e3a5f, #2563eb)',
                                        color: 'white', fontWeight: 700, fontSize: '0.9rem',
                                        border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                                        transition: 'opacity 0.2s',
                                    }}
                                    onMouseEnter={e => (e.currentTarget.style.opacity = '0.9')}
                                    onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                                >
                                    Learn More →
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Program Detail Modal via Portal */}
            <ModalOverlay open={!!selectedProgram} onClose={() => setSelectedProgram(null)} maxWidth={720}>
                {selectedProgram && (
                    <>
                        {/* Hero Image */}
                        <div style={{ position: 'relative', flexShrink: 0 }}>
                            <img src={selectedProgram.img} alt={selectedProgram.title} style={{ width: '100%', height: 220, objectFit: 'cover', display: 'block' }} />
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(30,58,95,0.75) 0%, transparent 50%)', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                                <div style={{ display: 'inline-block', padding: '4px 14px', borderRadius: 999, background: categoryColors[selectedProgram.category] || '#2563eb', color: 'white', fontWeight: 700, fontSize: '0.75rem', marginBottom: '0.5rem', width: 'fit-content' }}>{selectedProgram.category}</div>
                                <h2 style={{ color: 'white', fontFamily: 'Outfit, Inter, sans-serif', fontSize: 'clamp(1.1rem, 3vw, 1.5rem)', fontWeight: 800, margin: 0 }}>{selectedProgram.icon} {selectedProgram.title}</h2>
                            </div>
                            <button onClick={() => setSelectedProgram(null)} style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%', width: 36, height: 36, fontSize: '1.2rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#1e3a5f', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>×</button>
                        </div>

                        <div style={{ padding: '1.5rem', overflowY: 'auto', flex: 1 }}>
                            {/* Tagline */}
                            <p style={{ color: '#d4a847', fontStyle: 'italic', fontWeight: 700, fontSize: '0.95rem', marginBottom: '1.25rem' }}>"{selectedProgram.tagline}"</p>

                            {/* Stats Grid */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
                                {selectedProgram.stats.map((s, i) => (
                                    <div key={i} style={{ background: '#f8fafc', borderRadius: 14, padding: '0.875rem', textAlign: 'center', border: '1px solid rgba(30,58,95,0.06)' }}>
                                        <div style={{ fontWeight: 800, fontSize: '1.2rem', color: '#1e3a5f', fontFamily: 'Outfit, Inter, sans-serif' }}>{s.value}</div>
                                        <div style={{ color: '#6b7280', fontSize: '0.72rem', marginTop: '0.15rem' }}>{s.label}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Full Detail */}
                            {selectedProgram.fullDetail.split('\n\n').map((para, i) => (
                                <p key={i} style={{ color: '#374151', lineHeight: 1.8, fontSize: '0.9rem', marginBottom: '0.875rem' }}>{para}</p>
                            ))}

                            {/* Schedule + Eligibility */}
                            <div style={{ marginTop: '1.25rem', padding: '1rem 1.25rem', background: '#eef4fb', borderRadius: 14, border: '1px solid rgba(37,99,235,0.1)' }}>
                                <div style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
                                    <span style={{ fontWeight: 700, color: '#1e3a5f', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Calendar size={14} /> Schedule: </span>
                                    <span style={{ color: '#4b5563', fontSize: '0.85rem', marginLeft: '0.25rem' }}>{selectedProgram.schedule}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <span style={{ fontWeight: 700, color: '#1e3a5f', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><CheckCircle2 size={14} /> Eligibility: </span>
                                    <span style={{ color: '#4b5563', fontSize: '0.85rem', marginLeft: '0.25rem' }}>{selectedProgram.eligibility}</span>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </ModalOverlay>
        </PageTransition>
    );
};
