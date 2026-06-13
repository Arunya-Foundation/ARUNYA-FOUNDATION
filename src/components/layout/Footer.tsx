import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin, Clock, ArrowUp, Send } from 'lucide-react';
import { FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';

/* ═══════════════════════════════════════════════════════════════
   JOIN COMMUNITY / PRE-FOOTER CTA
   ═══════════════════════════════════════════════════════════════ */
export const JoinCommunity = () => {

    return (
        <section style={{
            background: 'linear-gradient(135deg, #0B1F3A 0%, #123C73 100%)',
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
                <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 4vw, 3.5rem)' }}>
                    <h2 style={{
                        fontSize: 'clamp(1.75rem, 4.5vw, 3rem)', fontWeight: 900, color: 'white',
                        fontFamily: 'Poppins, Inter, sans-serif', marginBottom: '0.75rem', lineHeight: 1.1,
                    }}>
                        Become a Catalyst<br /><span style={{ color: '#CF8C36' }}>for Social Change</span>
                    </h2>
                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)', maxWidth: 520, margin: '0 auto', lineHeight: 1.75 }}>
                        Dedicate your time to teach, mentor, and empower children from underserved communities in Gwalior. Together, we can build a brighter future.
                    </p>
                </div>

                <div style={{ textAlign: 'center' }}>
                    <Link
                        to="/volunteer"
                        style={{
                            padding: 'clamp(0.875rem, 2vw, 1.1rem) clamp(2rem, 5vw, 3rem)',
                            borderRadius: 9999, background: '#CF8C36', color: '#0B1F3A',
                            fontWeight: 800, fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
                            border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                            boxShadow: '0 8px 28px rgba(207,140,54,0.3)', transition: 'all 0.2s',
                            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                            textDecoration: 'none',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
                        onMouseLeave={e => (e.currentTarget.style.transform = 'none')}
                    >
                        <Heart size={20} fill="currentColor" strokeWidth={2} /> Join as Volunteer — Change a Life
                    </Link>
                </div>
            </div>
        </section>
    );
};

/* ═══════════════════════════════════════════════════════════════
   REDESIGNED FOOTER — Premium, Modern, Clean
   ═══════════════════════════════════════════════════════════════ */
export const Footer = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (email.trim()) {
            setSubscribed(true);
            setEmail('');
            setTimeout(() => setSubscribed(false), 4000);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer style={{
            background: 'linear-gradient(180deg, #060F1E 0%, #0B1F3A 100%)',
            position: 'relative', zIndex: 10, overflow: 'hidden',
        }}>
            {/* Decorative top border */}
            <div style={{ height: 3, background: 'linear-gradient(90deg, #0B1F3A, #CF8C36, #123C73, #CF8C36, #0B1F3A)' }} />

            {/* Mini Impact Stats Bar */}
            <div style={{
                background: 'rgba(207,140,54,0.06)',
                borderBottom: '1px solid rgba(255,255,255,0.04)',
                padding: '1.25rem 2rem',
            }}>
                <div style={{
                    maxWidth: 1200, margin: '0 auto',
                    display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 'clamp(1.5rem, 4vw, 3rem)',
                }}>
                    {[
                        { icon: <Heart size={18} />, value: '150+', label: 'Children Educated' },
                        { icon: <Send size={18} />, value: '50+', label: 'Community Sessions' },
                        { icon: <ArrowUp size={18} />, value: '100%', label: 'Volunteer-Run' },
                    ].map((stat, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                            <div style={{ color: '#CF8C36', opacity: 0.8 }}>{stat.icon}</div>
                            <div>
                                <span style={{ color: 'white', fontWeight: 800, fontSize: '1rem', fontFamily: 'Poppins, Inter, sans-serif' }}>{stat.value}</span>
                                <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.78rem', marginLeft: '0.35rem' }}>{stat.label}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Footer Content */}
            <div style={{ padding: 'clamp(3rem, 6vw, 4.5rem) clamp(1.25rem, 4vw, 2rem) 2rem' }}>
                <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                        gap: 'clamp(2rem, 4vw, 3.5rem)',
                        marginBottom: '3.5rem',
                    }}>

                        {/* ── Column 1: Brand + Newsletter ── */}
                        <div style={{ maxWidth: 320 }}>
                            {/* Brand */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                                <img
                                    src="/logo.png"
                                    alt="Arunya Foundation Logo"
                                    style={{
                                        width: 52,
                                        height: 52,
                                        objectFit: 'contain',
                                        flexShrink: 0,
                                    }}
                                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                />
                                <img
                                    src="/arunya-typography.png"
                                    alt="Arunya"
                                    style={{
                                        height: 38,
                                        width: 'auto',
                                        objectFit: 'contain',
                                    }}
                                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                />
                            </div>

                            <p style={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, fontSize: '0.92rem', marginBottom: '1.75rem' }}>
                                Empowering underprivileged children aged 5–16 through free education, study materials, and career guidance. Based in Gwalior, Madhya Pradesh.
                            </p>

                            {/* Mission Statement */}
                            <div style={{
                                background: 'rgba(207,140,54,0.08)', borderRadius: 12,
                                padding: '0.85rem 1rem', borderLeft: '3px solid #CF8C36',
                                marginBottom: '2rem',
                            }}>
                                <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.82rem', lineHeight: 1.6, margin: 0, fontStyle: 'italic' }}>
                                    "Like the first rays of the sun, we bring light to every child's life through the power of education."
                                </p>
                            </div>

                            {/* Newsletter */}
                            <h4 style={{
                                color: 'white', fontWeight: 700, fontSize: '0.95rem',
                                fontFamily: 'Poppins, Inter, sans-serif', marginBottom: '0.6rem',
                            }}>Stay Updated</h4>
                            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.82rem', marginBottom: '0.85rem', lineHeight: 1.5 }}>
                                Get monthly updates on our mission and impact.
                            </p>
                            <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '0.5rem' }}>
                                <div style={{ flex: 1, position: 'relative' }}>
                                    <Mail size={16} color="rgba(255,255,255,0.3)" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
                                    <input
                                        type="email" value={email} onChange={e => setEmail(e.target.value)}
                                        placeholder="your@email.com" required
                                        style={{
                                            width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem',
                                            borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)',
                                            background: 'rgba(255,255,255,0.06)', color: 'white',
                                            fontSize: '0.88rem', fontFamily: 'inherit', outline: 'none',
                                            transition: 'border-color 0.2s, box-shadow 0.2s',
                                        }}
                                        onFocus={e => { e.currentTarget.style.borderColor = 'rgba(207,140,54,0.4)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(207,140,54,0.1)'; }}
                                        onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.boxShadow = 'none'; }}
                                    />
                                </div>
                                <button type="submit" style={{
                                    padding: '0.75rem 1rem', borderRadius: 12, border: 'none',
                                    background: 'linear-gradient(135deg, #CF8C36, #B5772A)',
                                    color: 'white', cursor: 'pointer', display: 'flex',
                                    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                                    transition: 'all 0.2s', boxShadow: '0 4px 12px rgba(207,140,54,0.25)',
                                }}
                                    onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
                                    onMouseLeave={e => (e.currentTarget.style.transform = 'none')}
                                >
                                    <Send size={16} />
                                </button>
                            </form>
                            {subscribed && (
                                <motion.p initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
                                    style={{ color: '#22c55e', fontSize: '0.8rem', marginTop: '0.5rem', fontWeight: 600 }}>
                                    ✓ Thank you for subscribing!
                                </motion.p>
                            )}
                        </div>

                        {/* ── Column 2: Quick Links ── */}
                        <div>
                            <h4 style={{
                                color: 'white', fontWeight: 700, fontSize: '1rem',
                                fontFamily: 'Poppins, Inter, sans-serif', marginBottom: '1.5rem',
                                display: 'flex', alignItems: 'center', gap: '0.5rem',
                            }}>
                                <div style={{ width: 4, height: 18, borderRadius: 2, background: '#CF8C36' }} />
                                Quick Links
                            </h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                {[
                                    { label: 'Home', path: '/' },
                                    { label: 'About Us', path: '/about' },
                                    { label: 'Our Programs', path: '/causes' },
                                    { label: 'Photo Gallery', path: '/gallery' },
                                    { label: 'Blog & Stories', path: '/blog' },
                                    { label: 'Curriculum', path: '/curriculum' },
                                    { label: 'Volunteer', path: '/volunteer' },
                                    { label: 'Contact Us', path: '/contact' },
                                ].map(l => (
                                    <button
                                        key={l.label}
                                        onClick={() => navigate(l.path)}
                                        style={{
                                            display: 'flex', alignItems: 'center', gap: '0.5rem',
                                            color: 'rgba(255,255,255,0.55)', background: 'none', border: 'none',
                                            textAlign: 'left', padding: '0.45rem 0.75rem', fontSize: '0.92rem',
                                            cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s',
                                            borderRadius: 8, width: '100%', marginLeft: '-0.75rem',
                                        }}
                                        onMouseEnter={e => { e.currentTarget.style.color = '#CF8C36'; e.currentTarget.style.background = 'rgba(207,140,54,0.06)'; }}
                                        onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.55)'; e.currentTarget.style.background = 'none'; }}
                                    >
                                        <span style={{ fontSize: '0.7rem', opacity: 0.4 }}>›</span> {l.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* ── Column 3: Follow Us ── */}
                        <div>
                            <h4 style={{
                                color: 'white', fontWeight: 700, fontSize: '1rem',
                                fontFamily: 'Poppins, Inter, sans-serif', marginBottom: '1.5rem',
                                display: 'flex', alignItems: 'center', gap: '0.5rem',
                            }}>
                                <div style={{ width: 4, height: 18, borderRadius: 2, background: '#CF8C36' }} />
                                Follow Us
                            </h4>
                            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                                Stay connected with us on social media for daily classroom updates and highlights.
                            </p>
                            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                                {[
                                    { label: 'Instagram', icon: <FaInstagram size={22} />, href: 'https://www.instagram.com/arunya_foundation/', color: '#E1306C', glow: 'rgba(225,48,108,0.25)' },
                                    { label: 'LinkedIn', icon: <FaLinkedin size={22} />, href: 'https://www.linkedin.com/company/arunya-foundation/', color: '#0077b5', glow: 'rgba(0,119,181,0.25)' },
                                    { label: 'WhatsApp', icon: <FaWhatsapp size={22} />, href: '#', color: '#25D366', glow: 'rgba(37,211,102,0.25)' },
                                ].map(s => (
                                    <a
                                        key={s.label}
                                        href={s.href}
                                        target={s.href !== '#' ? '_blank' : undefined}
                                        rel="noopener noreferrer"
                                        title={s.label}
                                        style={{
                                            width: 48, height: 48, borderRadius: 14,
                                            background: 'rgba(255,255,255,0.06)',
                                            border: '1px solid rgba(255,255,255,0.08)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            color: 'rgba(255,255,255,0.6)', textDecoration: 'none',
                                            transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                                        }}
                                        onMouseEnter={e => {
                                            e.currentTarget.style.background = `${s.color}20`;
                                            e.currentTarget.style.borderColor = `${s.color}40`;
                                            e.currentTarget.style.color = s.color;
                                            e.currentTarget.style.transform = 'translateY(-3px)';
                                            e.currentTarget.style.boxShadow = `0 8px 24px ${s.glow}`;
                                        }}
                                        onMouseLeave={e => {
                                            e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                                            e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
                                            e.currentTarget.style.transform = 'none';
                                            e.currentTarget.style.boxShadow = 'none';
                                        }}
                                    >{s.icon}</a>
                                ))}
                            </div>
                        </div>

                        {/* ── Column 4: Contact ── */}
                        <div>
                            <h4 style={{
                                color: 'white', fontWeight: 700, fontSize: '1rem',
                                fontFamily: 'Poppins, Inter, sans-serif', marginBottom: '1.5rem',
                                display: 'flex', alignItems: 'center', gap: '0.5rem',
                            }}>
                                <div style={{ width: 4, height: 18, borderRadius: 2, background: '#CF8C36' }} />
                                Get in Touch
                            </h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                                {[
                                    { icon: <Mail size={18} />, text: 'connect@arunyaedu.org', gradient: 'linear-gradient(135deg, #123C73, #0B1F3A)' },
                                    { icon: <Phone size={18} />, text: '+91 82238 34121', gradient: 'linear-gradient(135deg, #CF8C36, #B5772A)' },
                                    { icon: <MapPin size={18} />, text: 'Gwalior, Madhya Pradesh, India', gradient: 'linear-gradient(135deg, #123C73, #0B1F3A)' },
                                    { icon: <Clock size={18} />, text: 'Sat & Sun: 10 AM – 1 PM', gradient: 'linear-gradient(135deg, #CF8C36, #B5772A)' },
                                ].map((c, i) => (
                                    <div key={i} style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                                        <div style={{
                                            minWidth: 38, height: 38, borderRadius: 10,
                                            background: c.gradient, color: 'white',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            flexShrink: 0, fontSize: '0.9rem',
                                        }}>{c.icon}</div>
                                        <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.92rem', lineHeight: 1.55, paddingTop: '0.35rem' }}>{c.text}</span>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={() => navigate('/contact')}
                                style={{
                                    marginTop: '1.5rem', width: '100%',
                                    padding: '0.85rem 1.75rem', borderRadius: 12,
                                    background: 'rgba(255,255,255,0.06)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    color: 'white', fontWeight: 700,
                                    fontSize: '0.92rem', cursor: 'pointer', fontFamily: 'inherit',
                                    transition: 'all 0.2s', display: 'flex',
                                    alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                                }}
                                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(207,140,54,0.15)'; e.currentTarget.style.borderColor = '#CF8C36'; e.currentTarget.style.color = '#CF8C36'; }}
                                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'white'; }}
                            >
                                <Mail size={16} /> Send Us a Message
                            </button>
                        </div>
                    </div>

                    {/* ── Bottom Bar ── */}
                    <div style={{
                        borderTop: '1px solid rgba(255,255,255,0.06)',
                        paddingTop: '1.75rem',
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        flexWrap: 'wrap', gap: '1rem',
                    }}>
                        <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.85rem', margin: 0 }}>
                            © 2026 Arunya Foundation. All rights reserved. Made with{' '}
                            <Heart size={13} fill="#CF8C36" color="#CF8C36" style={{ display: 'inline', verticalAlign: 'text-bottom' }} />{' '}
                            for education.
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                            {['Privacy Policy', 'Terms of Service'].map(t => (
                                <a key={t} href="#" style={{
                                    color: 'rgba(255,255,255,0.35)', textDecoration: 'none',
                                    fontSize: '0.85rem', transition: 'color 0.2s',
                                }}
                                    onMouseEnter={e => (e.currentTarget.style.color = '#CF8C36')}
                                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')}
                                >{t}</a>
                            ))}

                            {/* Back to Top */}
                            <button
                                onClick={scrollToTop}
                                aria-label="Back to top"
                                style={{
                                    width: 40, height: 40, borderRadius: 12,
                                    background: 'rgba(207,140,54,0.1)', border: '1px solid rgba(207,140,54,0.2)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    cursor: 'pointer', color: '#CF8C36',
                                    transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                                }}
                                onMouseEnter={e => { e.currentTarget.style.background = '#CF8C36'; e.currentTarget.style.color = '#0B1F3A'; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(207,140,54,0.3)'; }}
                                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(207,140,54,0.1)'; e.currentTarget.style.color = '#CF8C36'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
                            >
                                <ArrowUp size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
