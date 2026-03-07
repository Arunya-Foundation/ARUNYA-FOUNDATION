import { InteractiveHoverButton } from '../ui/interactive-hover-button';

export const JoinCommunity = () => {
    return (
        <section id="community" className="py-20 px-6" style={{ position: 'relative', zIndex: 10 }}>
            <div className="glass-panel scroll-animate" style={{
                maxWidth: 1000, margin: '0 auto', padding: '5rem 2rem', borderRadius: 40, textAlign: 'center',
                background: 'linear-gradient(135deg, var(--glass-bg), rgba(14,165,233,0.05))',
                border: '1px solid var(--glass-border)',
                opacity: 0, transform: 'translateY(40px)', transition: 'all 0.8s ease-out'
            }}>
                <div className="flex-center icon-circle bg-orange" style={{ width: 80, height: 80, fontSize: '2rem', margin: '0 auto 1.5rem' }}>🌍</div>
                <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1.5rem', lineHeight: 1.1 }}>Join Our Growing<br />Community</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.15rem', maxWidth: 600, margin: '0 auto 3rem', lineHeight: 1.7 }}>
                    Help us spread the light of education. Get daily updates on our work and see how your contribution transforms lives every day.
                </p>
                <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-4">
                    <InteractiveHoverButton text="Join WhatsApp" className="w-full md:w-auto min-w-[220px]" />
                    <InteractiveHoverButton text="Follow Instagram" className="w-full md:w-auto min-w-[220px]" />
                </div>
            </div>
        </section>
    );
};

export const Footer = () => {
    return (
        <footer className="glass-panel" style={{ margin: '0 1rem 6rem', borderRadius: 32, padding: '4rem 2rem 2rem', position: 'relative', zIndex: 10 }}>
            <div className="max-w-6xl mx-auto">
                <div className="grid gap-10" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))', marginBottom: '3rem' }}>
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <img src="/logo.jpg" alt="Logo" style={{ width: 36, height: 36, objectFit: 'cover', borderRadius: '50%' }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0 }}>Arunya</h3>
                        </div>
                        <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, fontSize: '0.95rem' }}>A youth-powered initiative dedicated to education, feeding the hungry, and spreading kindness.</p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 style={{ fontWeight: 700, marginBottom: '1rem', fontSize: '1.1rem' }}>Quick Links</h4>
                        {['Home', 'About', 'Causes', 'Gallery', 'Blog', 'Contact'].map(l => (
                            <a key={l} href={`/${l.toLowerCase() === 'home' ? '' : l.toLowerCase()}`} style={{ display: 'block', color: 'var(--text-muted)', textDecoration: 'none', padding: '0.35rem 0', fontSize: '0.95rem', transition: 'color 0.2s' }}
                                onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent-color)')}
                                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
                            >{l}</a>
                        ))}
                    </div>

                    {/* Causes */}
                    <div>
                        <h4 style={{ fontWeight: 700, marginBottom: '1rem', fontSize: '1.1rem' }}>Our Causes</h4>
                        {['Weekend Classes', 'Feed a Child', 'Birthday Celebrations', 'School Supplies'].map(c => (
                            <a key={c} href="/causes" style={{ display: 'block', color: 'var(--text-muted)', textDecoration: 'none', padding: '0.35rem 0', fontSize: '0.95rem', transition: 'color 0.2s' }}
                                onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent-color)')}
                                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
                            >{c}</a>
                        ))}
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 style={{ fontWeight: 700, marginBottom: '1rem', fontSize: '1.1rem' }}>Get in Touch</h4>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.8 }}>
                            📧 contact@arunya.org<br />
                            📱 +91 98765 43210<br />
                            📍 Delhi, India
                        </p>
                        <div className="flex gap-3 mt-4">
                            {['Instagram', 'Twitter', 'LinkedIn'].map(s => (
                                <a key={s} href="#" className="glass-blur flex-center" style={{ width: 40, height: 40, borderRadius: '50%', color: 'var(--text-muted)', textDecoration: 'none', fontSize: '1.2rem', transition: 'all 0.2s' }}
                                    onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent-color)'; e.currentTarget.style.borderColor = 'var(--accent-color)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = ''; }}
                                >
                                    {s === 'Instagram' ? '📸' : s === 'Twitter' ? '🐦' : '💼'}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>© 2024 Arunya. All rights reserved.</p>
                    <div className="flex gap-4">
                        {['Privacy Policy', 'Terms of Service'].map(t => (
                            <a key={t} href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.85rem', transition: 'color 0.2s' }}
                                onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent-color)')}
                                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
                            >{t}</a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};
