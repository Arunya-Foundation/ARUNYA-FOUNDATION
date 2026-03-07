import { PageTransition } from '../components/ui/PageTransition';

export const AboutPage = () => {
    return (
        <PageTransition className="pt-[140px] pb-16">
            <section className="about-section" style={{ padding: '2rem', position: 'relative', zIndex: 10 }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 className="section-title scroll-animate" style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem', opacity: 0, transform: 'translateY(20px)', transition: 'all 0.8s ease-out' }}>About Arunya</h2>
                    <p className="section-subtitle scroll-animate" style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto', fontSize: '1.2rem', opacity: 0, transform: 'translateY(20px)', transition: 'all 0.8s ease-out 0.2s' }}>
                        We are a passionate team dedicated to creating sustainable change through education, health, and community empowerment.
                    </p>
                </div>

                <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
                    {/* Vision Card */}
                    <div className="glass-panel scroll-animate" style={{ padding: '2rem', borderRadius: '24px', opacity: 0, transform: 'translateY(40px)', transition: 'all 0.8s ease-out 0.3s' }}>
                        <div className="flex-center icon-circle bg-orange" style={{ width: '60px', height: '60px', fontSize: '1.5rem', marginBottom: '1.5rem' }}>👁️</div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Our Vision</h3>
                        <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>To build a world where every individual has access to basic rights, education, and opportunities to thrive, regardless of their background.</p>
                        <img src="/assets/work/20251102_131638.jpg" alt="Vision" style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '16px', marginTop: '1.5rem' }} />
                    </div>
                    {/* Mission Card */}
                    <div className="glass-panel scroll-animate" style={{ padding: '2rem', borderRadius: '24px', opacity: 0, transform: 'translateY(40px)', transition: 'all 0.8s ease-out 0.4s' }}>
                        <div className="flex-center icon-circle" style={{ background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', width: '60px', height: '60px', fontSize: '1.5rem', marginBottom: '1.5rem' }}>🎯</div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Our Mission</h3>
                        <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>To empower marginalized communities by providing sustainable resources, education, and support systems that foster long-term growth.</p>
                        <img src="/assets/work/20251102_131641.jpg" alt="Mission" style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '16px', marginTop: '1.5rem' }} />
                    </div>
                    {/* Values Card */}
                    <div className="glass-panel scroll-animate" style={{ padding: '2rem', borderRadius: '24px', opacity: 0, transform: 'translateY(40px)', transition: 'all 0.8s ease-out 0.5s' }}>
                        <div className="flex-center icon-circle" style={{ background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', color: 'white', width: '60px', height: '60px', fontSize: '1.5rem', marginBottom: '1.5rem' }}>🤝</div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Core Values</h3>
                        <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>Integrity, Compassion, Transparency, and Community-driven action guide every decision and project we undertake.</p>
                        <img src="/assets/work/20251102_131647.jpg" alt="Values" style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '16px', marginTop: '1.5rem' }} />
                    </div>
                </div>

                {/* Team Section */}
                <div style={{ maxWidth: '1200px', margin: '6rem auto 0' }}>
                    <h3 className="section-title scroll-animate" style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '3rem', opacity: 0, transform: 'translateY(20px)', transition: 'all 0.8s ease-out' }}>Meet the Team</h3>
                    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                        {[
                            { name: 'Sahil Sharma', role: 'Team Leader', img: '/assets/work/20251102_131451.jpg' },
                            { name: 'Sahajpreet Singh', role: 'Operations Lead', img: '/assets/work/20251102_131454.jpg' },
                            { name: 'Rza Mohammed', role: 'Community & Outreach', img: '/assets/work/20251102_131457.jpg' },
                        ].map((member, idx) => (
                            <div key={idx} className="glass-panel scroll-animate" style={{ width: '280px', padding: '1.5rem', borderRadius: '16px', textAlign: 'center', opacity: 0, transform: 'translateY(40px)', transition: `all 0.8s ease-out ${0.2 + (idx * 0.1)}s` }}>
                                <img src={member.img} alt={member.name} style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto 1rem' }} />
                                <h4 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>{member.name}</h4>
                                <p style={{ color: 'var(--accent-color)', fontSize: '0.9rem', fontWeight: 600 }}>{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </PageTransition>
    );
};
