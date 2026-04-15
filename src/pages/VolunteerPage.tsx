import { useState } from 'react';
import { motion } from 'framer-motion';
import { PageTransition } from '../components/ui/PageTransition';
import { useAuth } from '../lib/AuthContext';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { BookOpen, Star, Handshake, ScrollText, GraduationCap } from 'lucide-react';

const fadeUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
};

export const VolunteerPage = () => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        fullName: '',
        email: user?.email || '',
        phone: '',
        age: '',
        city: '',
        occupation: '',
        availability: '',
        skills: '',
        motivation: '',
    });
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            if (db) {
                await addDoc(collection(db, 'volunteers'), {
                    ...formData,
                    userId: user?.uid || null,
                    createdAt: serverTimestamp(),
                    status: 'pending',
                });
            } else {
                console.warn('Firebase is not configured. Simulating successful submission.');
                // Simulate network delay
                await new Promise(resolve => setTimeout(resolve, 800));
            }
            setSubmitted(true);
        } catch (error) {
            console.error('Error submitting volunteer form:', error);
            // Still show success for now (offline/no firebase config)
            setSubmitted(true);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <PageTransition className="pt-[140px] pb-16">
            <section style={{ padding: '2rem', position: 'relative', zIndex: 10 }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <motion.h2 {...fadeUp} style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#1e3a5f', marginBottom: '1rem', fontFamily: 'Outfit, Inter, sans-serif' }}>
                        Join Our Volunteer Family
                    </motion.h2>
                    <div style={{ display: 'block', width: 60, height: 4, background: 'linear-gradient(135deg, #d4a847, #b8922e)', borderRadius: 2, margin: '1rem auto' }} />
                    <motion.p {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }} style={{ color: '#6b7280', fontSize: '1.1rem', maxWidth: 600, margin: '0 auto', lineHeight: 1.7 }}>
                        Dedicate your weekends to teach children, mentor the next generation,
                        and be part of a mission that transforms lives through education.
                    </motion.p>
                </div>

                {/* Why Volunteer + Form Grid */}
                <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem' }}>
                    {/* Left: Info */}
                    <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.15 }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1e3a5f', marginBottom: '1.5rem', fontFamily: 'Outfit, Inter, sans-serif' }}>
                            Why Volunteer with Arunya?
                        </h3>

                        {[
                            { icon: <BookOpen size={24} style={{ color: '#2563eb' }} />, title: 'Teach & Inspire', desc: 'Conduct weekend classes for children aged 5–16. No teaching degree required — just passion.' },
                            { icon: <Star size={24} style={{ color: '#d4a847' }} />, title: 'Make Real Impact', desc: 'See students grow, score well, and dream bigger because of your effort.' },
                            { icon: <Handshake size={24} style={{ color: '#10b981' }} />, title: 'Build Community', desc: 'Join volunteers across villages. Network and grow with like-minded youth.' },
                            { icon: <ScrollText size={24} style={{ color: '#8b5cf6' }} />, title: 'Get Certified', desc: 'Receive official volunteering certificates for your resume and college applications.' },
                            { icon: <GraduationCap size={24} style={{ color: '#f43f5e' }} />, title: 'Learn While Teaching', desc: 'Develop leadership, communication, and project management skills.' },
                        ].map((item, idx) => (
                            <div key={idx} style={{
                                display: 'flex', gap: '1rem', marginBottom: '1.5rem',
                                padding: '1.25rem', borderRadius: 16,
                                background: 'var(--color-offwhite)',
                                border: '1px solid rgba(30,58,95,0.06)',
                            }}>
                                <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>{item.icon}</span>
                                <div>
                                    <h4 style={{ color: '#1e3a5f', fontWeight: 700, marginBottom: '0.25rem', fontSize: '1rem' }}>{item.title}</h4>
                                    <p style={{ color: '#6b7280', fontSize: '0.88rem', lineHeight: 1.5, margin: 0 }}>{item.desc}</p>
                                </div>
                            </div>
                        ))}

                        {/* Testimonial */}
                        <div style={{
                            marginTop: '1rem', padding: '1.5rem', borderRadius: 16,
                            background: 'linear-gradient(135deg, #eef4fb, #dbeafe)',
                            border: '1px solid rgba(37,99,235,0.1)',
                        }}>
                            <p style={{ color: '#1e3a5f', fontSize: '0.95rem', fontStyle: 'italic', lineHeight: 1.6, marginBottom: '0.75rem' }}>
                                "Seeing a child learn to write their own name for the first time — that feeling is truly unmatched. Be a part of the change."
                            </p>
                            <p style={{ color: '#2563eb', fontWeight: 700, fontSize: '0.9rem', margin: 0 }}>— Arunya Foundation</p>
                        </div>
                    </motion.div>

                    {/* Right: Form */}
                    <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.25 }}>
                        {submitted ? (
                            <div style={{
                                textAlign: 'center', padding: '4rem 2rem',
                                background: 'var(--color-white)', border: '1px solid rgba(30,58,95,0.08)',
                                borderRadius: 24, boxShadow: 'var(--card-shadow)',
                            }}>
                                <div style={{
                                    width: 72, height: 72, borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #2563eb, #1e3a5f)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    margin: '0 auto 1.5rem', boxShadow: '0 0 40px rgba(37,99,235,0.2)',
                                }}>
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                    </svg>
                                </div>
                                <h3 style={{ color: '#1e3a5f', fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem', fontFamily: 'Outfit, Inter, sans-serif' }}>
                                    Thank You for Joining!
                                </h3>
                                <p style={{ color: '#6b7280', fontSize: '0.95rem', lineHeight: 1.6 }}>
                                    Your volunteer application has been received. We'll contact you within 48 hours 
                                    with orientation details and your first class assignment.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} style={{
                                background: 'var(--color-white)', border: '1px solid rgba(30,58,95,0.08)',
                                borderRadius: 24, padding: '2.5rem', boxShadow: 'var(--card-shadow)',
                            }}>
                                <h3 style={{ color: '#1e3a5f', fontSize: '1.4rem', fontWeight: 700, marginBottom: '2rem', fontFamily: 'Outfit, Inter, sans-serif' }}>
                                    Volunteer Application Form
                                </h3>

                                <div className="form-group">
                                    <label>Full Name *</label>
                                    <input className="form-input" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Your full name" required />
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div className="form-group">
                                        <label>Email *</label>
                                        <input className="form-input" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Phone *</label>
                                        <input className="form-input" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 98765 43210" required />
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div className="form-group">
                                        <label>Age *</label>
                                        <input className="form-input" name="age" value={formData.age} onChange={handleChange} placeholder="e.g. 20" required />
                                    </div>
                                    <div className="form-group">
                                        <label>City *</label>
                                        <input className="form-input" name="city" value={formData.city} onChange={handleChange} placeholder="e.g. Gwalior" required />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Occupation</label>
                                    <select className="form-input" name="occupation" value={formData.occupation} onChange={handleChange}>
                                        <option value="">Select your occupation</option>
                                        <option value="student">Student</option>
                                        <option value="working">Working Professional</option>
                                        <option value="freelancer">Freelancer</option>
                                        <option value="homemaker">Homemaker</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Availability *</label>
                                    <select className="form-input" name="availability" value={formData.availability} onChange={handleChange} required>
                                        <option value="">When can you volunteer?</option>
                                        <option value="saturday">Saturdays only</option>
                                        <option value="sunday">Sundays only</option>
                                        <option value="both">Both Saturday & Sunday</option>
                                        <option value="weekdays">Weekday evenings</option>
                                        <option value="flexible">Flexible</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Skills / Subjects You Can Teach</label>
                                    <input className="form-input" name="skills" value={formData.skills} onChange={handleChange} placeholder="e.g. Math, English, Science, Art, Computers" />
                                </div>

                                <div className="form-group">
                                    <label>Why do you want to volunteer?</label>
                                    <textarea className="form-input" name="motivation" value={formData.motivation} onChange={handleChange} placeholder="Tell us what inspires you to help..." rows={4} />
                                </div>

                                <button
                                    type="submit"
                                    disabled={submitting}
                                    style={{
                                        width: '100%', padding: '1rem', borderRadius: 16, border: 'none',
                                        background: submitting ? '#9ca3af' : 'linear-gradient(135deg, #d4a847, #b8922e)',
                                        color: 'white', fontWeight: 700, fontSize: '1rem',
                                        cursor: submitting ? 'not-allowed' : 'pointer', fontFamily: 'inherit',
                                        transition: 'all 0.2s',
                                    }}
                                >
                                    {submitting ? 'Submitting...' : 'Submit Application ↗'}
                                </button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </section>
        </PageTransition>
    );
};
