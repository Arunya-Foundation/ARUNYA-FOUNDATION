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
        title: 'Meera Scored 92% in Her Board Exams',
        date: 'Mar 05, 2026',
        category: 'Success Story',
        excerpt: 'From struggling with basic math to topping her class — meet Meera, an Arunya student who proved that with the right support, anything is possible.',
        fullContent: 'Meera joined Arunya Foundation at age 9 from a village near Gwalior. She could barely read Hindi and had never held a textbook of her own. Our volunteers noticed her curiosity and quiet determination. Over four years of weekend classes, regular mentoring, and free study materials, she transformed from a struggling student to a confident learner. In her board exams, she scored 92% — the highest in her entire village. Today she dreams of becoming a teacher herself, wanting to give back to children like her. Her mother shared, "I never imagined my daughter would achieve this. Arunya made it possible." This story represents not just Meera, but hundreds of children whose lives are being changed through the power of consistent, caring education.',
        img: '/assets/work/20251102_131451.jpg'
    },
    {
        title: '500+ Students Enrolled in 2026',
        date: 'Feb 12, 2026',
        category: 'Milestone',
        excerpt: 'Our 2026 enrollment drive crossed 500 students across five villages! We\'re expanding classrooms, training more volunteers, and adding new subjects.',
        fullContent: 'With increasing demand from rural communities near Gwalior, we organized enrollment camps in five villages. Parents who once hesitated now actively seek our classes. This year, we added 15 new trained volunteers, set up two new learning centers in community spaces, and introduced Computer Literacy and English Speaking workshops for the first time. The enrollment drive was supported by local panchayat members who helped spread the word. We also started evening batches for students who help with farm work during the day. Our goal is to reach 1,000 students by December 2026. Each child receives a free study kit with notebooks, textbooks, pens, and a school bag. The energy in our classrooms is electric — children who never thought they could learn English are now introducing themselves in it.',
        img: '/assets/work/20251102_131454.jpg'
    },
    {
        title: 'Annual Day Celebration 2026',
        date: 'Jan 26, 2026',
        category: 'Events',
        excerpt: 'Republic Day became extra special as 300+ students performed cultural programs, received certificates, and celebrated their learning milestones.',
        fullContent: 'The Annual Day was held at a local community hall, attended by 300+ students, 80 volunteers, parents, and community leaders. Students performed skits on the importance of education, sang patriotic and folk songs, and showcased their art projects and science experiments. Top students from each age group received certificates and school supply kits. Several parents shared emotional testimonials about how their children have changed since joining Arunya — improved confidence, better grades in school, and dreams they never dared to have before. The event ended with a pledge by senior students to become volunteers themselves after they complete their education. It was a day that reminded every volunteer why they do what they do.',
        img: '/assets/work/20251102_131457.jpg'
    },
    {
        title: 'New Computer Lab Inauguration',
        date: 'Dec 15, 2025',
        category: 'Infrastructure',
        excerpt: 'Thanks to generous donors, we inaugurated our first computer lab with 8 desktops. Students touched a keyboard for the first time with wonder in their eyes.',
        fullContent: 'Our Computer Literacy program needed a dedicated space, and thanks to donations from alumni and community supporters, we set up a small but functional computer lab with 8 refurbished desktops, two printers, and internet connectivity. The inauguration ceremony was attended by the village sarpanch and local education officials. For most of our students, this was their first time touching a computer. The joy and wonder on their faces was indescribable. One student, 14-year-old Rahul, said, "I used to think computers were only for rich people in cities." Within weeks, students started learning to type, use MS Word, and browse the internet for educational content. We plan to add coding classes by mid-2026.',
        img: '/assets/work/20251102_131502.jpg'
    },
    {
        title: 'Volunteer Training Workshop',
        date: 'Nov 20, 2025',
        category: 'Training',
        excerpt: 'We conducted a 2-day training workshop for 35 new volunteers covering teaching methods, child psychology, and classroom management.',
        fullContent: 'Ensuring quality education requires trained volunteers. We organized a comprehensive 2-day training workshop at our Gwalior center. 35 new volunteers — mostly college students — were trained in child-friendly teaching methods, basics of child psychology, managing mixed-age classrooms, and the Arunya syllabus structure. Guest speakers included education professionals and experienced teachers from local schools. Volunteers practiced micro-teaching sessions and received feedback from senior volunteers. Each volunteer was assigned to a specific age group and village center. The training concluded with an oath ceremony where every volunteer pledged to dedicate at least 4 hours every weekend to teaching. Many said this was the most meaningful training they had ever attended.',
        img: '/assets/work/20251102_131508.jpg'
    },
    {
        title: 'Summer Camp for Creative Learning',
        date: 'Jun 10, 2025',
        category: 'Events',
        excerpt: 'A 10-day summer camp brought together 200 students for art, science experiments, storytelling, sports, and team activities.',
        fullContent: 'During summer break, we organized a 10-day camp at three village locations. 200 students participated in drawing competitions, science experiments (volcano model, rainbow making), storytelling sessions in Hindi and English, cricket and kabaddi tournaments, and team-building activities. The camp gave children a productive and fun way to spend their summer while reinforcing what they learned during the year. Volunteers designed each day around a theme — "World of Science," "Express Yourself," "Leaders of Tomorrow," etc. The camp ended with an exhibition where children displayed their projects to parents and community members. Many parents said it was the first time their children had participated in anything like this.',
        img: '/assets/work/20251102_131635.jpg'
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
                            <p style={{ color: '#374151', lineHeight: 1.85, fontSize: '0.95rem' }}>{selectedPost.fullContent}</p>
                        </div>
                    </>
                )}
            </ModalOverlay>
        </PageTransition>
    );
};
