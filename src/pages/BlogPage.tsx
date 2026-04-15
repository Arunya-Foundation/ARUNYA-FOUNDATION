import { useState } from 'react';
import { PageTransition } from '../components/ui/PageTransition';
import { motion } from 'framer-motion';
import { ModalOverlay } from '../components/ui/ModalOverlay';

const fadeUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
};

const blogPosts = [
    {
        title: 'Little Habits, Big Impact 🌿',
        date: 'Apr 10, 2026',
        category: 'Hygiene & Care',
        excerpt: 'At Arunya Foundation, we believe that education is not limited to books—it begins with self-care and dignity. Before stepping into the classroom, children are gently guided to practice basic hygiene habits.',
        fullContent: 'At Arunya Foundation, we believe that education is not limited to books—it begins with self-care and dignity. Before stepping into the classroom, children are gently guided to practice basic hygiene habits such as washing their face, brushing their teeth, and maintaining personal cleanliness.\n\nThese small routines not only promote better health but also build confidence, self-respect, and readiness to learn. Moments like these reflect how simple actions can create lasting change in a child\'s life.\n\nBecause nurturing clean habits today lays the foundation for a healthier, brighter tomorrow.\n\n#CleanlinessDrive #HygieneAwareness #HealthyHabits #ChildDevelopment #ArunyaFoundation #CommunityImpact',
        img: '/assets/blog/hygiene.jpeg'
    },
    {
        title: 'Colors of Joy, Learning Beyond Books 🎨',
        date: 'Apr 05, 2026',
        category: 'Creative Learning',
        excerpt: 'Through creative activities like hand painting, children are encouraged to express themselves, explore their imagination, and simply enjoy the process of creating.',
        fullContent: 'At Arunya Foundation, learning goes beyond textbooks.\n\nThrough creative activities like hand painting, children are encouraged to express themselves, explore their imagination, and simply enjoy the process of creating.\n\nMoments filled with colors, laughter, and little handprints remind us that education is not just about knowledge, but also about joy, confidence, and self-expression.\n\nBecause sometimes, the brightest learning happens when little hands dive into colors and hearts into happiness 💛\n\n#CreativeLearning #JoyfulEducation #ArtAndExpression #ArunyaFoundation #LearningWithFun #ChildhoodJoy',
        img: '/assets/blog/creative.jpeg'
    },
];

export const BlogPage = () => {
    const [selectedPost, setSelectedPost] = useState<typeof blogPosts[0] | null>(null);

    return (
        <PageTransition className="pt-[140px] pb-16">
            <section id="blog" style={{ padding: '2rem', position: 'relative', zIndex: 10 }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <motion.h2 {...fadeUp} style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, marginBottom: '1rem', color: '#1e3a5f', fontFamily: 'Outfit, Inter, sans-serif' }}>
                        Stories of Impact
                    </motion.h2>
                    <div style={{ display: 'block', width: 60, height: 4, background: 'linear-gradient(135deg, #d4a847, #b8922e)', borderRadius: 2, margin: '1rem auto' }} />
                    <motion.p {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }} style={{ color: '#6b7280', fontSize: '1.1rem', maxWidth: 600, margin: '0 auto', lineHeight: 1.7 }}>
                        Real stories from our classrooms showing how education transforms lives, one child at a time.
                    </motion.p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', maxWidth: 1200, margin: '0 auto' }}>
                    {blogPosts.map((post, idx) => (
                        <motion.div key={idx} {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.08 * idx }}
                            onClick={() => setSelectedPost(post)}
                            style={{
                                borderRadius: 24, overflow: 'hidden', background: 'white',
                                border: '1px solid rgba(30,58,95,0.08)',
                                boxShadow: '0 4px 24px rgba(30,58,95,0.06)',
                                cursor: 'pointer',
                                transition: 'transform 0.3s, box-shadow 0.3s',
                            }}
                            onMouseEnter={e => {
                                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-6px)';
                                (e.currentTarget as HTMLDivElement).style.boxShadow = '0 16px 48px rgba(30,58,95,0.15)';
                            }}
                            onMouseLeave={e => {
                                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                                (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 24px rgba(30,58,95,0.06)';
                            }}
                        >
                            <div style={{ height: 220, backgroundImage: `url(${post.img})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
                                <span style={{
                                    position: 'absolute', top: 12, left: 12,
                                    background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)',
                                    padding: '0.3rem 0.8rem', borderRadius: 99, fontSize: '0.75rem',
                                    fontWeight: 700, color: '#2563eb',
                                }}>
                                    {post.category}
                                </span>
                            </div>
                            <div style={{ padding: '1.75rem' }}>
                                <span style={{ color: '#d4a847', fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>{post.date}</span>
                                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem', fontWeight: 700, color: '#1e3a5f', fontFamily: 'Outfit, Inter, sans-serif' }}>{post.title}</h3>
                                <p style={{ color: '#6b7280', marginBottom: '1rem', lineHeight: 1.6, fontSize: '0.9rem' }}>{post.excerpt}</p>
                                <span style={{ color: '#2563eb', fontWeight: 600, fontSize: '0.9rem' }}>Read Full Story →</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Blog Story Modal via Portal */}
            <ModalOverlay open={!!selectedPost} onClose={() => setSelectedPost(null)}>
                {selectedPost && (
                    <>
                        <div style={{ position: 'relative', flexShrink: 0 }}>
                            <img src={selectedPost.img} alt={selectedPost.title} style={{ width: '100%', height: 220, objectFit: 'cover', display: 'block' }} />
                            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(30,58,95,0.85) 0%, transparent 100%)', padding: '2.5rem 1.5rem 1.25rem', color: 'white' }}>
                                <span style={{ display: 'inline-block', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(6px)', padding: '0.2rem 0.7rem', borderRadius: 99, fontSize: '0.7rem', fontWeight: 700, marginBottom: '0.4rem' }}>{selectedPost.category}</span>
                                <h2 style={{ fontSize: 'clamp(1.1rem, 3vw, 1.4rem)', fontFamily: 'Outfit, Inter, sans-serif', fontWeight: 800, margin: 0, lineHeight: 1.3 }}>{selectedPost.title}</h2>
                            </div>
                            <button onClick={() => setSelectedPost(null)} style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%', width: 36, height: 36, fontSize: '1.2rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#1e3a5f', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>×</button>
                        </div>
                        <div style={{ padding: '1.5rem', overflowY: 'auto', flex: 1 }}>
                            <span style={{ color: '#d4a847', fontSize: '0.85rem', fontWeight: 700, marginBottom: '1rem', display: 'block' }}>{selectedPost.date}</span>
                            <p style={{ color: '#374151', lineHeight: 1.85, fontSize: '0.95rem', whiteSpace: 'pre-line' }}>{selectedPost.fullContent}</p>
                        </div>
                    </>
                )}
            </ModalOverlay>
        </PageTransition>
    );
};
