import { PageTransition } from '../components/ui/PageTransition';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';

const fadeUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
};

export const ContactPage = () => {
    return (
        <PageTransition className="pb-16">
            <section id="contact" style={{ padding: '2rem', position: 'relative', zIndex: 10 }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <motion.h2 {...fadeUp} style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, marginBottom: '1rem', color: '#1e3a5f', fontFamily: 'Outfit, Inter, sans-serif' }}>
                        Get in Touch
                    </motion.h2>
                    <div style={{ display: 'block', width: 60, height: 4, background: 'linear-gradient(135deg, #d4a847, #b8922e)', borderRadius: 2, margin: '1rem auto' }} />
                    <motion.p {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }} style={{ color: '#6b7280', fontSize: '1.1rem', maxWidth: 600, margin: '0 auto', lineHeight: 1.7 }}>
                        Have questions about our programs, want to donate, or interested in volunteering? We'd love to hear from you.
                    </motion.p>
                </div>

                <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
                    {/* Contact Info */}
                    <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.15 }} style={{
                        padding: '3rem', borderRadius: 24, background: 'white',
                        border: '1px solid rgba(30,58,95,0.08)',
                        boxShadow: '0 4px 24px rgba(30,58,95,0.06)',
                    }}>
                        <h3 style={{ fontSize: '1.6rem', marginBottom: '2rem', color: '#1e3a5f', fontFamily: 'Outfit, Inter, sans-serif' }}>Contact Information</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {[
                                { icon: <MapPin size={22} />, title: 'Location', detail: 'Gwalior, Madhya Pradesh, India', gradient: 'linear-gradient(135deg, #2563eb, #1e3a5f)' },
                                { icon: <Phone size={22} />, title: 'Phone', detail: '+91 82238 34121', gradient: 'linear-gradient(135deg, #d4a847, #b8922e)' },
                                { icon: <Mail size={22} />, title: 'Email', detail: 'arunya.trust@gmail.com', gradient: 'linear-gradient(135deg, #2563eb, #1e3a5f)' },
                                { icon: <Clock size={22} />, title: 'Class Timings', detail: 'Sat & Sun: 10 AM – 1 PM', gradient: 'linear-gradient(135deg, #d4a847, #b8922e)' },
                            ].map((item, idx) => (
                                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                    <div style={{
                                        minWidth: 44, height: 44, borderRadius: '50%',
                                        background: item.gradient, color: 'white',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: '1.1rem',
                                    }}>{item.icon}</div>
                                    <div>
                                        <h4 style={{ margin: '0 0 0.25rem', fontSize: '1rem', color: '#1e3a5f' }}>{item.title}</h4>
                                        <p style={{ margin: 0, color: '#6b7280', lineHeight: 1.5, fontSize: '0.95rem' }}>{item.detail}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div style={{ marginTop: '2.5rem' }}>
                            <h4 style={{ fontSize: '1rem', marginBottom: '1rem', color: '#1e3a5f' }}>Follow Us</h4>
                            <div style={{ display: 'flex', gap: '0.75rem' }}>
                                {[
                                    { label: <FaInstagram size={20} />, name: 'Instagram', color: '#E1306C', url: 'https://www.instagram.com/arunya_foundation/' },
                                    { label: <FaLinkedin size={20} />, name: 'LinkedIn', color: '#0077b5', url: 'https://www.linkedin.com/company/arunya-foundation/' },
                                ].map((s, i) => (
                                    <a key={i} href={s.url || '#'} title={s.name} target={s.url !== '#' ? '_blank' : undefined} rel="noopener noreferrer" style={{
                                        width: 44, height: 44, borderRadius: '50%', color: s.color,
                                        background: 'rgba(30,58,95,0.04)', border: '1px solid rgba(30,58,95,0.06)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        textDecoration: 'none',
                                        transition: 'all 0.2s',
                                    }}
                                        onMouseEnter={e => { (e.currentTarget.style.background = 'rgba(30,58,95,0.08)') }}
                                        onMouseLeave={e => { (e.currentTarget.style.background = 'rgba(30,58,95,0.04)') }}
                                    >{s.label}</a>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.2 }} style={{
                        padding: '3rem', borderRadius: 24, background: 'white',
                        border: '1px solid rgba(30,58,95,0.08)',
                        boxShadow: '0 4px 24px rgba(30,58,95,0.06)',
                    }}>
                        <h3 style={{ fontSize: '1.6rem', marginBottom: '2rem', color: '#1e3a5f', fontFamily: 'Outfit, Inter, sans-serif' }}>Send a Message</h3>
                        <form style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            <div className="form-group" style={{ marginBottom: 0 }}>
                                <label>Your Name</label>
                                <input className="form-input" type="text" placeholder="Your full name" />
                            </div>
                            <div className="form-group" style={{ marginBottom: 0 }}>
                                <label>Email Address</label>
                                <input className="form-input" type="email" placeholder="you@example.com" />
                            </div>
                            <div className="form-group" style={{ marginBottom: 0 }}>
                                <label>Subject</label>
                                <select className="form-input">
                                    <option value="">Select a topic</option>
                                    <option value="volunteer">Volunteering Inquiry</option>
                                    <option value="donation">Donation Query</option>
                                    <option value="enrollment">Student Enrollment</option>
                                    <option value="partnership">Partnership Proposal</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div className="form-group" style={{ marginBottom: 0 }}>
                                <label>Message</label>
                                <textarea className="form-input" placeholder="How can we help? Tell us about your inquiry..." rows={4} />
                            </div>
                            <button
                                type="button"
                                style={{
                                    width: '100%', padding: '1rem', borderRadius: 16, border: 'none',
                                    background: '#1e3a5f', color: 'white', fontWeight: 600,
                                    fontSize: '1rem', cursor: 'pointer', fontFamily: 'inherit',
                                    transition: 'background 0.2s',
                                }}
                            >
                                Send Message →
                            </button>
                        </form>
                    </motion.div>
                </div>
            </section>
        </PageTransition>
    );
};
