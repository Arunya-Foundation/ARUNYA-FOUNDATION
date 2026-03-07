import { PageTransition } from '../components/ui/PageTransition';

export const BlogPage = () => {
    return (
        <PageTransition className="pt-[140px] pb-16">
            <section id="blog" className="blog-section" style={{ padding: '2rem', position: 'relative', zIndex: 10 }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 className="section-title scroll-animate" style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem', opacity: 0, transform: 'translateY(20px)', transition: 'all 0.8s ease-out' }}>Stories of Change</h2>
                    <p className="section-subtitle scroll-animate" style={{ color: 'var(--text-muted)', fontSize: '1.2rem', opacity: 0, transform: 'translateY(20px)', transition: 'all 0.8s ease-out 0.2s' }}>Read about the lives we've touched together.</p>
                </div>

                <div className="blog-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
                    {[
                        { title: 'A New School in Rantau', date: 'Oct 12, 2023', excerpt: 'Thanks to our generous donors, we successfully inaugurated a primary school catering to 120 children.', img: '/assets/work/20251102_131451.jpg' },
                        { title: 'Ramesh\'s Journey to College', date: 'Sep 28, 2023', excerpt: 'Meet Ramesh, the first from his village to attend university. Here is his inspiring story of perseverance.', img: '/assets/work/20251102_131454.jpg' },
                        { title: 'Annual Food Drive Success', date: 'Aug 15, 2023', excerpt: 'Over 15,000 meals were served across the city on Independence Day by our dedicated volunteer network.', img: '/assets/work/20251102_131457.jpg' },
                        { title: 'Tech Literacy for Seniors', date: 'Jul 04, 2023', excerpt: 'Our two-week boot camp successfully trained 50 senior citizens to navigate smartphones and stay connected.', img: '/assets/work/20251102_131502.jpg' },
                        { title: 'Clean Water Initiative', date: 'Jun 10, 2023', excerpt: 'Installing 20 new water purification systems in drought-affected regions to ensure safe drinking water.', img: '/assets/work/20251102_131508.jpg' },
                        { title: 'Volunteer of the Year', date: 'May 21, 2023', excerpt: 'Celebrating Priya, who dedicated over 500 hours this year to organizing local health camps.', img: '/assets/work/20251102_131635.jpg' },
                    ].map((post, idx) => (
                        <div key={idx} className="blog-card glass-panel scroll-animate" style={{ borderRadius: '24px', overflow: 'hidden', opacity: 0, transform: 'translateY(40px)', transition: `all 0.8s ease-out ${0.2 + (idx * 0.1)}s` }}>
                            <div className="blog-image" style={{ height: '220px', backgroundImage: `url(${post.img})`, backgroundSize: 'cover', backgroundPosition: 'center', transition: 'transform 0.5s' }}></div>
                            <div className="blog-content" style={{ padding: '2rem' }}>
                                <span style={{ color: 'var(--accent-color)', fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.75rem' }}>{post.date}</span>
                                <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', fontWeight: 700 }}>{post.title}</h3>
                                <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: 1.6 }}>{post.excerpt}</p>
                                <a href="#" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>Read Full Story <span style={{ fontSize: '1.2rem' }}>→</span></a>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </PageTransition>
    );
};
