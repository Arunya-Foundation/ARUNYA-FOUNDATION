import { PageTransition } from '../components/ui/PageTransition';

export const ContactPage = () => {
    return (
        <PageTransition className="pt-[140px] pb-16">
            <section id="contact" className="contact-section" style={{ padding: '2rem', position: 'relative', zIndex: 10 }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 className="section-title scroll-animate" style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem', opacity: 0, transform: 'translateY(20px)', transition: 'all 0.8s ease-out' }}>Get in Touch</h2>
                    <p className="section-subtitle scroll-animate" style={{ color: 'var(--text-muted)', fontSize: '1.2rem', opacity: 0, transform: 'translateY(20px)', transition: 'all 0.8s ease-out 0.2s' }}>Have questions? We'd love to hear from you.</p>
                </div>

                <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
                    {/* Contact Info */}
                    <div className="glass-panel scroll-animate" style={{ padding: '3rem', borderRadius: '24px', opacity: 0, transform: 'translateY(40px)', transition: 'all 0.8s ease-out 0.3s' }}>
                        <h3 style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>Contact Information</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                <div className="flex-center icon-circle bg-orange" style={{ minWidth: '40px', height: '40px', fontSize: '1.2rem' }}>📍</div>
                                <div>
                                    <h4 style={{ margin: '0 0 0.25rem', fontSize: '1.1rem' }}>Location</h4>
                                    <p style={{ margin: 0, color: 'var(--text-muted)', lineHeight: 1.5 }}>New Delhi, India</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                <div className="flex-center icon-circle" style={{ background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', minWidth: '40px', height: '40px', fontSize: '1.2rem' }}>📞</div>
                                <div>
                                    <h4 style={{ margin: '0 0 0.25rem', fontSize: '1.1rem' }}>Phone</h4>
                                    <p style={{ margin: 0, color: 'var(--text-muted)' }}>+91 98765 43210</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                <div className="flex-center icon-circle" style={{ background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', color: 'white', minWidth: '40px', height: '40px', fontSize: '1.2rem' }}>✉️</div>
                                <div>
                                    <h4 style={{ margin: '0 0 0.25rem', fontSize: '1.1rem' }}>Email</h4>
                                    <p style={{ margin: 0, color: 'var(--text-muted)' }}>contact@arunya.org</p>
                                </div>
                            </div>
                        </div>

                        <div style={{ marginTop: '3rem' }}>
                            <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Join the Community</h4>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <a href="#" className="flex-center glass-panel hover-scale" style={{ width: '45px', height: '45px', borderRadius: '50%', cursor: 'pointer', textDecoration: 'none' }}>📸</a>
                                <a href="#" className="flex-center glass-panel hover-scale" style={{ width: '45px', height: '45px', borderRadius: '50%', cursor: 'pointer', textDecoration: 'none' }}>🐦</a>
                                <a href="#" className="flex-center glass-panel hover-scale" style={{ width: '45px', height: '45px', borderRadius: '50%', cursor: 'pointer', textDecoration: 'none' }}>💼</a>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="glass-panel scroll-animate" style={{ padding: '3rem', borderRadius: '24px', opacity: 0, transform: 'translateY(40px)', transition: 'all 0.8s ease-out 0.4s' }}>
                        <h3 style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>Send a Message</h3>
                        <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-primary)' }}>Your Name</label>
                                <input type="text" placeholder="John Doe" style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)', outline: 'none' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-primary)' }}>Email Address</label>
                                <input type="email" placeholder="john@example.com" style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)', outline: 'none' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-primary)' }}>Message</label>
                                <textarea placeholder="How can we help?" rows={4} style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)', outline: 'none', resize: 'vertical' }}></textarea>
                            </div>
                            <button type="button" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', padding: '1rem' }}>Send Message</button>
                        </form>
                    </div>
                </div>
            </section>
        </PageTransition>
    );
};
