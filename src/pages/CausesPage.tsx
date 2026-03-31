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
    {
        title: 'Study Material Distribution',
        category: 'Supplies',
        icon: <Backpack size={24} />,
        tagline: 'Notebooks, bags, uniforms — free of cost',
        detail: 'We provide free notebooks, textbooks, pens, pencils, school bags, and uniforms to every enrolled student. A full kit is given at the start of each academic term.',
        img: 'https://images.unsplash.com/photo-1594708767771-a7502209ff51?w=900&q=80',
        fullDetail: `At the start of each academic term, every enrolled child receives a complete study kit — absolutely free. No child should miss out on learning because they cannot afford a notebook or a bag.\n\nEach kit contains: 5 subject notebooks, a Hindi and English textbook, pens, pencils, eraser, a sharpener, a school bag, and when available — a uniform.\n\nKits are distributed at enrollment camps organized in each village. Donors can sponsor individual kits or in bulk. A single kit costs approximately ₹500 and covers a child's supplies for the entire term.\n\nSo far, we have distributed over 2,000 study kits to children across our centers.`,
        stats: [
            { label: 'Kits Distributed', value: '2,000+' },
            { label: 'Items per Kit', value: '10+' },
            { label: 'Cost per Kit', value: '₹500' },
            { label: 'Villages Covered', value: '12' },
        ],
        schedule: 'Distributed at enrollment (March & July each year)',
        eligibility: 'All enrolled students at Arunya Foundation centers.',
    },
    {
        title: 'Computer Literacy Program',
        category: 'Skills',
        icon: <Laptop size={24} />,
        tagline: 'Bridging the digital divide',
        detail: 'Secondary students (13–16) learn MS Office, internet navigation, basic coding logic, and digital safety. Many students use a computer for the first time in our classes.',
        img: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=900&q=80',
        fullDetail: `The digital divide is real — and Arunya Foundation is bridging it. Our Computer Literacy Program was launched to ensure that children who have never touched a laptop don't fall behind in an increasingly digital world.\n\nThe program runs for Secondary batch students (13–16 years) and covers: basic computer operation, MS Word and Excel, internet browsing and email, digital safety and privacy, and an introduction to basic programming logic.\n\nClasses are run on donated laptops at partner schools and community centers. Students who complete the full term receive a certificate of digital literacy that they can attach to job applications.`,
        stats: [
            { label: 'Students Enrolled', value: '180+' },
            { label: 'Modules Covered', value: '8' },
            { label: 'Laptops Available', value: '12' },
            { label: 'Certificates Issued', value: '90' },
        ],
        schedule: 'Alternate Saturdays, 2 PM – 4 PM',
        eligibility: 'Students aged 13–16 enrolled in the Secondary batch.',
    },
    {
        title: 'English Speaking Workshop',
        category: 'Language',
        icon: <Megaphone size={24} />,
        tagline: 'Speak with confidence, grow without limits',
        detail: 'Special weekly workshops focused on spoken English, vocabulary building, and confidence in public speaking. Students practice through role plays, debates, and storytelling.',
        img: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=900&q=80',
        fullDetail: `English is often the gateway to opportunity in India — higher education, job interviews, and professional environments all demand spoken English fluency. Our workshops are designed to make that gateway accessible to every child.\n\nWorkshops include: daily vocabulary exercises, basic conversation practice, storytelling in English, mock debates and speech, and group discussions on simple real-world topics.\n\nWe use a fun, non-intimidating format where students are encouraged to make mistakes and learn from them. Confidence-building is as much a goal as language learning. Our students have gone on to perform in school competitions and write formal letters in English.`,
        stats: [
            { label: 'Students in Program', value: '120+' },
            { label: 'Sessions per Month', value: '8' },
            { label: 'Vocabulary per Term', value: '300+ Words' },
            { label: 'Public Speakers', value: '40+' },
        ],
        schedule: 'Every Sunday, 10 AM – 11:30 AM',
        eligibility: 'Students aged 10–16 years.',
    },
    {
        title: 'Career Guidance Sessions',
        category: 'Guidance',
        icon: <Lightbulb size={24} />,
        tagline: 'Know your path, own your future',
        detail: 'Monthly sessions introducing students to career paths, scholarship opportunities, competitive exams, and skill development workshops for self-reliance.',
        img: 'https://images.unsplash.com/photo-1560785496-3c9d27877182?w=900&q=80',
        fullDetail: `Most children in our programs have never spoken to a doctor, engineer, or entrepreneur. They don't know what options exist beyond their immediate surroundings. Career Guidance Sessions open those doors.\n\nEvery month, we invite a working professional — doctor, engineer, teacher, entrepreneur, or civil servant — to speak with our Secondary students. Sessions are informal, question-and-answer based, and deeply personal.\n\nWe also conduct scholarship awareness drives, helping families understand what government schemes and private scholarships exist so no financial barrier stops a deserving student. Students can register for skills development through government portals and online certification programs.`,
        stats: [
            { label: 'Sessions per Year', value: '12+' },
            { label: 'Professionals Invited', value: '30+' },
            { label: 'Scholarships Identified', value: '15+' },
            { label: 'Students Guided', value: '200+' },
        ],
        schedule: 'Last Sunday of each month, 11 AM – 1 PM',
        eligibility: 'Students aged 13–16 in the Secondary batch.',
    },
    {
        title: 'Art & Creative Expression',
        category: 'Creative',
        icon: <Palette size={24} />,
        tagline: 'Every child is a creator',
        detail: 'Drawing, painting, craft, drama, and cultural activities that help children express themselves, build confidence, and explore their creative potential.',
        img: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=900&q=80',
        fullDetail: `Education is not just textbooks. At Arunya Foundation, we believe that creative expression is a fundamental part of a child's development. Our Art & Creative Expression program gives children the freedom to imagine, create, and perform.\n\nActivities include: drawing and painting, origami and craft, folk music and singing, drama and role-play, and traditional dance forms. Children from the Foundation batch (5–8 years) especially thrive in this environment, where they discover their strengths through play.\n\nThe Annual Day celebration is the biggest showcase of this program — where children perform for their parents, community leaders, and volunteers. The pride families feel on that day is what keeps our movement going.`,
        stats: [
            { label: 'Activities per Month', value: '6+' },
            { label: 'Annual Day Performers', value: '300+' },
            { label: 'Artworks Created', value: '1,000+' },
            { label: 'Age Groups', value: 'All (5–16)' },
        ],
        schedule: 'Every Saturday, 12 PM – 1 PM (integrated)',
        eligibility: 'All enrolled students.',
    },
];

const categories = ['All', 'Teaching', 'Supplies', 'Skills', 'Language', 'Guidance', 'Creative'];

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
