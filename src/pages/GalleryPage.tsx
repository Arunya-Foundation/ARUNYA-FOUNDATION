import { useState } from 'react';
import { PageTransition } from '../components/ui/PageTransition';
import { motion } from 'framer-motion';
import { ModalOverlay } from '../components/ui/ModalOverlay';
import DomeGallery from '../components/DomeGallery';

const fadeUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
};

interface GalleryItem {
    src: string;
    alt: string;
    date: string;
    story: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
    { src: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80', alt: 'Children Learning Together', date: 'Nov 2, 2025', story: 'Saturday morning — 30 children arrived before 9 AM, eager to learn. Our volunteers ran an English reading circle where each child read aloud. The pride on every face when they finished a full sentence was unforgettable. These moments are why we show up every weekend.' },
    { src: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=800&q=80', alt: 'Volunteer Teaching Session', date: 'Nov 2, 2025', story: 'Ravi, our volunteer from Gwalior Engineering College, taught basic algebra for the first time. He drew diagrams on the ground with chalk when markers ran out. Watching 15 children grasp unknown variables was a breakthrough moment for the entire team.' },
    { src: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80', alt: 'Study Material Distribution', date: 'Oct 15, 2025', story: 'We distributed 200+ study kits — notebooks, pencils, erasers, and school bags — to children across 3 villages. Many of these children had never owned a new bag before. One girl kept hugging her bag throughout the entire session.' },
    { src: 'https://images.unsplash.com/photo-1560785496-3c9d27877182?w=800&q=80', alt: 'Science Experiment Day', date: 'Oct 5, 2025', story: 'Science came alive with baking soda and vinegar volcanoes! Children from the Secondary batch (13–16 years) designed their own experiments after watching a basic demo. Three students asked if they could bring their own ideas next week. We said absolutely.' },
    { src: 'https://images.unsplash.com/photo-1594708767771-a7502209ff51?w=800&q=80', alt: 'Moral Stories Circle', date: 'Sep 28, 2025', story: 'The Foundation batch (ages 5–8) gathered for their moral story session. We used hand puppets to narrate "The Honest Woodcutter". Children were so engaged that they requested a second story. Their questions afterward showed deep thinking and empathy.' },
    { src: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=800&q=80', alt: 'Republic Day Celebration', date: 'Jan 26, 2025', story: 'Republic Day 2025 — our biggest event yet. Over 300 students performed cultural programs, recited poems, and received appreciation certificates. Local community leaders filled the hall. The national anthem was sung in unison by everyone present.' },
    { src: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800&q=80', alt: 'Computer Literacy Class', date: 'Sep 10, 2025', story: 'We launched computer literacy classes using donated laptops. Students (13–16 yrs) learned to type, create folders, and use MS Word for the first time. One student, Arjun, created a letter addressed to his future employer — at 14 years old.' },
    { src: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&q=80', alt: 'Village Enrollment Drive', date: 'Aug 20, 2025', story: 'Our enrollment camp in Motijheel village brought in 85 new students in a single day. Parents who were initially skeptical stayed for hours, asking questions and sharing their hopes for their children.' },
    { src: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&q=80', alt: 'Art and Creativity Workshop', date: 'Aug 10, 2025', story: 'Foundation batch explored colors and self-expression through a guided art workshop. Each child drew "My Dream" — a house, a doctor, a teacher, a pilot. The drawings now hang on the walls of our learning center.' },
    { src: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80', alt: 'Career Guidance Session', date: 'Jul 15, 2025', story: 'Secondary students attended a career guidance session led by a local engineer and a doctor who grew up in similar circumstances. Q&A ran 40 minutes over schedule — the students were hungry for more.' },
    { src: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=800&q=80', alt: 'Volunteer Orientation', date: 'Jul 1, 2025', story: 'We welcomed 25 new volunteers at our July orientation. Each volunteer was paired with an experienced mentor. The energy in the room was electric — these passionate young people chose to give up their Sundays for a child\'s future.' },
    { src: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=800&q=80', alt: 'Hindi Language Class', date: 'Jun 22, 2025', story: 'Primary batch (9–12 yrs) practiced Hindi poetry recitation. Students learned poems by Kabir and Surdas — and then wrote their own two-line verses. One student wrote about her mother\'s morning routine in beautiful, simple Hindi. We framed it.' },
];

const DOME_IMAGES = [
    { src: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=70', alt: 'Community' },
    { src: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=400&q=70', alt: 'Learning' },
    { src: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&q=70', alt: 'Education' },
    { src: 'https://images.unsplash.com/photo-1560785496-3c9d27877182?w=400&q=70', alt: 'Smiles' },
    { src: 'https://images.unsplash.com/photo-1594708767771-a7502209ff51?w=400&q=70', alt: 'Students' },
    { src: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=400&q=70', alt: 'Joy' },
    { src: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=400&q=70', alt: 'Skills' },
    { src: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=400&q=70', alt: 'Team' },
    { src: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=400&q=70', alt: 'Art' },
    { src: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=400&q=70', alt: 'Guidance' },
    { src: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=400&q=70', alt: 'Volunteers' },
    { src: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=400&q=70', alt: 'Impact' },
    { src: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=70', alt: 'Future' },
    { src: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=400&q=70', alt: 'Growth' },
    { src: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&q=70', alt: 'Hope' },
];

export const GalleryPage = () => {
    const [selected, setSelected] = useState<GalleryItem | null>(null);

    return (
        <PageTransition className="pt-[140px] pb-0">
            {/* ─── SECTION 1: IMAGE GRID WITH STORIES ─── */}
            <section style={{ padding: '2rem 2rem 5rem', maxWidth: 1400, margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <motion.h2 {...fadeUp} style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#1e3a5f', fontFamily: 'Outfit, Inter, sans-serif', marginBottom: '0.5rem' }}>
                        Stories From Our Classrooms
                    </motion.h2>
                    <div style={{ display: 'block', width: 60, height: 4, background: 'linear-gradient(135deg, #d4a847, #b8922e)', borderRadius: 2, margin: '0.75rem auto 1.25rem' }} />
                    <motion.p {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }} style={{ color: '#6b7280', fontSize: '1.1rem', maxWidth: 600, margin: '0 auto', lineHeight: 1.7 }}>
                        Every photo tells a story. <strong style={{ color: '#1e3a5f' }}>Click any image</strong> to read what happened that day.
                    </motion.p>
                </div>

                {/* Masonry Grid */}
                <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.2 }} style={{ columns: 'auto 280px', columnGap: '1.25rem' }}>
                    {GALLERY_ITEMS.map((item, idx) => (
                        <div
                            key={idx}
                            onClick={() => setSelected(item)}
                            style={{
                                breakInside: 'avoid', marginBottom: '1.25rem', cursor: 'pointer', borderRadius: 18,
                                overflow: 'hidden', position: 'relative',
                                boxShadow: '0 4px 20px rgba(30,58,95,0.08)',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                            }}
                            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.02)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 12px 40px rgba(30,58,95,0.18)'; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'scale(1)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 20px rgba(30,58,95,0.08)'; }}
                        >
                            <img src={item.src} alt={item.alt} loading="lazy" style={{ width: '100%', display: 'block', height: idx % 3 === 0 ? 280 : idx % 3 === 1 ? 220 : 250, objectFit: 'cover' }} />
                            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(30,58,95,0.9) 0%, transparent 100%)', padding: '2.5rem 1.25rem 1rem', color: 'white' }}>
                                <div style={{ fontSize: '0.7rem', color: '#d4a847', fontWeight: 700, marginBottom: '0.2rem' }}>{item.date}</div>
                                <div style={{ fontWeight: 700, fontSize: '0.9rem', fontFamily: 'Outfit, Inter, sans-serif' }}>{item.alt}</div>
                                <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', marginTop: '0.2rem' }}>Tap to read story →</div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </section>

            {/* ─── SECTION 2: GLOBE / DOME GALLERY ─── */}
            <section style={{ background: '#060010', padding: '5rem 0 0' }}>
                <div style={{ textAlign: 'center', padding: '0 2rem 3rem' }}>
                    <motion.h2 {...fadeUp} style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 800, color: 'white', fontFamily: 'Outfit, Inter, sans-serif', marginBottom: '0.5rem' }}>
                        Our World of Impact
                    </motion.h2>
                    <div style={{ display: 'block', width: 60, height: 4, background: 'linear-gradient(135deg, #d4a847, #b8922e)', borderRadius: 2, margin: '0.75rem auto 1rem' }} />
                    <motion.p {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }} style={{ color: 'rgba(255,255,255,0.55)', fontSize: '1rem', maxWidth: 500, margin: '0 auto' }}>
                        Drag to explore our journey in 3D — a galaxy of every child we've touched.
                    </motion.p>
                </div>
                <div style={{ height: '80vh', width: '100%' }}>
                    <DomeGallery images={DOME_IMAGES} grayscale={false} overlayBlurColor="#060010" />
                </div>
            </section>

            {/* Gallery Story Modal via Portal */}
            <ModalOverlay open={!!selected} onClose={() => setSelected(null)}>
                {selected && (
                    <>
                        <div style={{ position: 'relative', flexShrink: 0 }}>
                            <img src={selected.src} alt={selected.alt} style={{ width: '100%', height: 240, objectFit: 'cover', display: 'block' }} />
                            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(30,58,95,0.85) 0%, transparent 100%)', padding: '3rem 1.5rem 1.25rem', color: 'white' }}>
                                <div style={{ fontSize: '0.8rem', color: '#d4a847', fontWeight: 700, marginBottom: 4 }}>{selected.date}</div>
                                <h2 style={{ fontSize: 'clamp(1.2rem, 3vw, 1.5rem)', fontFamily: 'Outfit, Inter, sans-serif', fontWeight: 800, margin: 0 }}>{selected.alt}</h2>
                            </div>
                            <button onClick={() => setSelected(null)} style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%', width: 36, height: 36, fontSize: '1.2rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#1e3a5f', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>×</button>
                        </div>
                        <div style={{ padding: '1.5rem', overflowY: 'auto', flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                                <div style={{ width: 4, height: 20, background: '#d4a847', borderRadius: 2 }} />
                                <span style={{ fontWeight: 700, color: '#1e3a5f', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: 1 }}>Story from the Field</span>
                            </div>
                            <p style={{ color: '#374151', lineHeight: 1.85, fontSize: '0.95rem' }}>{selected.story}</p>
                        </div>
                    </>
                )}
            </ModalOverlay>
        </PageTransition>
    );
};
