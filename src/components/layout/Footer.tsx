import { useNavigate } from 'react-router-dom';
import { GraduationCap, Handshake, Home, Heart, Mail, Phone, MapPin, Clock, Leaf } from 'lucide-react';
import { FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa';

export const JoinCommunity = () => {
    const navigate = useNavigate();

    return (
        <section style={{
            background: 'linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)',
            padding: 'clamp(3.5rem, 6vw, 5rem) clamp(1rem, 4vw, 2rem)',
            position: 'relative', overflow: 'hidden',
        }}>
            {/* Decorative dot pattern */}
            <div style={{
                position: 'absolute', inset: 0, opacity: 0.05,
                backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                backgroundSize: '40px 40px', pointerEvents: 'none',
            }} />

            <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 4vw, 3.5rem)' }}>
                    <h2 style={{
                        fontSize: 'clamp(1.75rem, 4.5vw, 3rem)', fontWeight: 900, color: 'white',
                        fontFamily: 'Outfit, Inter, sans-serif', marginBottom: '0.75rem', lineHeight: 1.1,
                    }}>
                        Every Rupee Lights<br /><span style={{ color: '#d4a847' }}>a Child's Future</span>
                    </h2>
                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)', maxWidth: 520, margin: '0 auto', lineHeight: 1.75 }}>
                        Your donation directly funds free study kits, classroom materials, and weekend classes for children who cannot afford education.
                    </p>
                </div>

                {/* Stats strip */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                    gap: 'clamp(0.75rem, 2vw, 1.5rem)',
                    marginBottom: 'clamp(2rem, 4vw, 3.5rem)',
                }}>
                    {[
                        { num: '1,250+', label: 'Children Educated', icon: <GraduationCap size={40} /> },
                        { num: '300+', label: 'Active Volunteers', icon: <Handshake size={40} /> },
                        { num: '12+', label: 'Villages Reached', icon: <Home size={40} /> },
                        { num: '100%', label: 'Free of Cost', icon: <Heart size={40} /> },
                    ].map((s, i) => (
                        <div key={i} style={{
                            textAlign: 'center',
                            padding: 'clamp(1rem, 2vw, 1.5rem)',
                            background: 'rgba(255,255,255,0.08)', borderRadius: 20,
                            border: '1px solid rgba(255,255,255,0.12)',
                        }}>
                            <div style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', marginBottom: '0.4rem' }}>{s.icon}</div>
                            <div style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2rem)', fontWeight: 800, color: '#d4a847', fontFamily: 'Outfit, Inter, sans-serif', lineHeight: 1 }}>{s.num}</div>
                            <div style={{ color: 'rgba(255,255,255,0.65)', marginTop: '0.3rem', fontSize: 'clamp(0.75rem, 1.8vw, 0.9rem)' }}>{s.label}</div>
                        </div>
                    ))}
                </div>

                {/* Single Donate CTA */}
                <div style={{ textAlign: 'center' }}>
                    <button
                        onClick={() => navigate('/login')}
                        style={{
                            padding: 'clamp(0.875rem, 2vw, 1.1rem) clamp(2rem, 5vw, 3rem)',
                            borderRadius: 9999, background: '#d4a847', color: 'white',
                            fontWeight: 800, fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
                            border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                            boxShadow: '0 8px 28px rgba(212,168,71,0.45)', transition: 'all 0.2s',
                            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
                        onMouseLeave={e => (e.currentTarget.style.transform = 'none')}
                    >
                        <Heart size={20} fill="currentColor" strokeWidth={2} /> Donate Now — Change a Life
                    </button>
                    <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.8rem', marginTop: '0.85rem' }}>
                        ₹500 covers a child's study materials for one month.
                    </p>
                </div>
            </div>
        </section>
    );
};

export const Footer = () => {
    const navigate = useNavigate();

    return (
        <footer style={{
            background: '#0f1f38',
            padding: '4rem 2rem 1.5rem',
            position: 'relative', zIndex: 10,
        }}>
            <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
                    {/* Brand */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                            <div style={{
                                width: 44, height: 44, borderRadius: '50%',
                                background: 'linear-gradient(135deg, #d4a847, #b8922e)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '1.4rem', flexShrink: 0, color: 'white'
                            }}><Leaf size={24} /></div>
                            <div>
                                <div style={{ color: 'white', fontWeight: 800, fontSize: '1.15rem', fontFamily: 'Outfit, Inter, sans-serif', lineHeight: 1 }}>ARUNYA</div>
                                <div style={{ color: '#d4a847', fontWeight: 500, fontSize: '0.7rem', letterSpacing: 2 }}>FOUNDATION</div>
                            </div>
                        </div>
                        <p style={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, fontSize: '0.9rem', maxWidth: 260 }}>
                            Empowering underprivileged children aged 5–16 through free education, study materials, and career guidance. Based in Gwalior, MP.
                        </p>
                        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
                            {[
                                { label: 'Instagram', icon: <FaInstagram size={20} color="#E1306C" />, href: 'https://www.instagram.com/arunya_foundation/' },
                                { label: 'LinkedIn', icon: <FaLinkedin size={20} color="#0077b5" />, href: 'https://www.linkedin.com/company/arunya-foundation/' },
                                { label: 'WhatsApp', icon: <FaWhatsapp size={20} color="#25D366" />, href: '#' },
                            ].map(s => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    title={s.label}
                                    style={{
                                        width: 38, height: 38, borderRadius: '50%',
                                        background: 'rgba(255,255,255,0.07)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: '1.1rem', textDecoration: 'none',
                                        transition: 'all 0.2s',
                                    }}
                                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(212,168,71,0.2)'; (e.currentTarget as HTMLAnchorElement).style.borderColor = '#d4a847'; }}
                                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.07)'; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.1)'; }}
                                >{s.icon}</a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 style={{ color: '#d4a847', fontWeight: 700, fontSize: '0.8rem', letterSpacing: 2, textTransform: 'uppercase', marginBottom: '1.25rem' }}>Quick Links</h4>
                        {[
                            { label: 'Home', path: '/' },
                            { label: 'About Us', path: '/about' },
                            { label: 'Programs', path: '/causes' },
                            { label: 'Gallery', path: '/gallery' },
                            { label: 'Blog & Stories', path: '/blog' },
                            { label: 'Volunteer', path: '/volunteer' },
                            { label: 'Contact Us', path: '/contact' },
                        ].map(l => (
                            <button
                                key={l.label}
                                onClick={() => navigate(l.path)}
                                style={{
                                    display: 'block', color: 'rgba(255,255,255,0.6)',
                                    background: 'none', border: 'none', textAlign: 'left',
                                    padding: '0.35rem 0', fontSize: '0.95rem', cursor: 'pointer',
                                    fontFamily: 'inherit', transition: 'color 0.2s', width: '100%',
                                }}
                                onMouseEnter={e => (e.currentTarget.style.color = '#d4a847')}
                                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
                            >→ {l.label}</button>
                        ))}
                    </div>

                    {/* Our Programs */}
                    <div>
                        <h4 style={{ color: '#d4a847', fontWeight: 700, fontSize: '0.8rem', letterSpacing: 2, textTransform: 'uppercase', marginBottom: '1.25rem' }}>Our Programs</h4>
                        {[
                            'Weekend Basic Classes',
                            'Study Material Distribution',
                            'Computer Literacy Program',
                            'Career Guidance Sessions',
                            'English Speaking Workshop',
                            'Art & Creative Expression',
                        ].map(c => (
                            <button
                                key={c}
                                onClick={() => navigate('/causes')}
                                style={{
                                    display: 'block', color: 'rgba(255,255,255,0.6)',
                                    background: 'none', border: 'none', textAlign: 'left',
                                    padding: '0.35rem 0', fontSize: '0.9rem', cursor: 'pointer',
                                    fontFamily: 'inherit', transition: 'color 0.2s', width: '100%',
                                }}
                                onMouseEnter={e => (e.currentTarget.style.color = '#d4a847')}
                                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
                            >• {c}</button>
                        ))}
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 style={{ color: '#d4a847', fontWeight: 700, fontSize: '0.8rem', letterSpacing: 2, textTransform: 'uppercase', marginBottom: '1.25rem' }}>Get in Touch</h4>
                        {[
                            { icon: <Mail size={18} />, text: 'arunya.trust@gmail.com' },
                            { icon: <Phone size={18} />, text: '+91 82238 34121' },
                            { icon: <MapPin size={18} />, text: 'Gwalior, Madhya Pradesh, India' },
                            { icon: <Clock size={18} />, text: 'Sat & Sun: 10 AM – 1 PM' },
                        ].map((c, i) => (
                            <div key={i} style={{ display: 'flex', gap: '0.7rem', marginBottom: '0.85rem', alignItems: 'flex-start' }}>
                                <span style={{ fontSize: '1rem', flexShrink: 0, marginTop: 2 }}>{c.icon}</span>
                                <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.9rem', lineHeight: 1.5 }}>{c.text}</span>
                            </div>
                        ))}
                        <button
                            onClick={() => navigate('/contact')}
                            style={{
                                marginTop: '1rem',
                                padding: '0.7rem 1.75rem', borderRadius: 9999,
                                background: 'linear-gradient(135deg, #d4a847, #b8922e)',
                                color: 'white', border: 'none', fontWeight: 700,
                                fontSize: '0.9rem', cursor: 'pointer', fontFamily: 'inherit',
                            }}
                        >
                            Contact Us →
                        </button>
                    </div>
                </div>

                {/* Bottom bar */}
                <div style={{
                    borderTop: '1px solid rgba(255,255,255,0.06)',
                    paddingTop: '1.5rem',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem'
                }}>
                    <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.85rem', margin: 0 }}>
                        © 2026 Arunya Foundation. All rights reserved. Made with <Heart size={14} fill="currentColor" style={{ display: 'inline' }} /> for education.
                    </p>
                    <div style={{ display: 'flex', gap: '1.5rem' }}>
                        {['Privacy Policy', 'Terms of Service'].map(t => (
                            <a key={t} href="#" style={{ color: 'rgba(255,255,255,0.35)', textDecoration: 'none', fontSize: '0.85rem', transition: 'color 0.2s' }}
                                onMouseEnter={e => (e.currentTarget.style.color = '#d4a847')}
                                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')}
                            >{t}</a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};
