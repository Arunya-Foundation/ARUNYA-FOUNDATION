import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [step, setStep] = useState<'email' | 'code' | 'success'>('email');
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const codeRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handleEmailSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) setStep('code');
    };

    useEffect(() => {
        if (step === 'code') setTimeout(() => codeRefs.current[0]?.focus(), 400);
    }, [step]);

    const handleCodeChange = (i: number, v: string) => {
        if (v.length > 1) return;
        const newCode = [...code];
        newCode[i] = v;
        setCode(newCode);
        if (v && i < 5) codeRefs.current[i + 1]?.focus();
        if (i === 5 && v && newCode.every(d => d)) {
            setTimeout(() => setStep('success'), 800);
        }
    };

    const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !code[i] && i > 0) codeRefs.current[i - 1]?.focus();
    };

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            {/* Animated gradient background */}
            <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 25%, #0f172a 50%, #164e63 75%, #0f172a 100%)',
                backgroundSize: '400% 400%',
                animation: 'gradientShift 12s ease infinite',
            }} />

            {/* Floating orbs */}
            <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(14,165,233,0.15) 0%, transparent 70%)', top: '-15%', right: '-10%', animation: 'float1 8s ease-in-out infinite' }} />
            <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(168,85,247,0.12) 0%, transparent 70%)', bottom: '-10%', left: '-5%', animation: 'float2 10s ease-in-out infinite' }} />
            <div style={{ position: 'absolute', width: 250, height: 250, borderRadius: '50%', background: 'radial-gradient(circle, rgba(34,211,238,0.1) 0%, transparent 70%)', top: '40%', left: '20%', animation: 'float1 6s ease-in-out infinite reverse' }} />

            {/* Dot grid overlay */}
            <div style={{
                position: 'absolute', inset: 0, opacity: 0.03,
                backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                backgroundSize: '30px 30px',
            }} />

            {/* Close button */}
            <motion.button
                onClick={() => navigate('/')}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                style={{
                    position: 'absolute', top: 32, right: 32, width: 48, height: 48,
                    borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)',
                    background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(12px)',
                    color: 'white', fontSize: '1.5rem', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    zIndex: 50, fontWeight: 300,
                }}
            >×</motion.button>

            {/* Main card */}
            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                style={{
                    position: 'relative', zIndex: 10, width: '100%', maxWidth: 440,
                    padding: '3rem 2.5rem',
                    background: 'rgba(255,255,255,0.04)',
                    backdropFilter: 'blur(40px)', WebkitBackdropFilter: 'blur(40px)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 32, boxShadow: '0 32px 64px rgba(0,0,0,0.3)',
                }}
            >
                <AnimatePresence mode="wait">
                    {step === 'email' ? (
                        <motion.div key="email" initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.35 }}>
                            {/* Logo */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2.5rem' }}>
                                <img src="/logo.jpg" alt="Logo" style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }} onError={e => { e.currentTarget.style.display = 'none'; }} />
                                <span style={{ color: 'white', fontWeight: 700, fontSize: '1.3rem' }}>Arunya</span>
                            </div>

                            <h1 style={{ color: 'white', fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem', lineHeight: 1.2 }}>Welcome back</h1>
                            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1rem', marginBottom: '2rem', lineHeight: 1.5 }}>Sign in to track your impact and manage donations.</p>

                            {/* Social login */}
                            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.75rem' }}>
                                {[
                                    { name: 'Google', svg: <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.761H12.545z" /> },
                                    { name: 'GitHub', svg: <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" /> },
                                    { name: 'Apple', svg: <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.78 1.18-.19 2.31-.88 3.65-.7 1.63.15 2.93.81 3.86 2.06-3.24 1.96-2.73 5.92.55 7.23-.74 1.89-1.63 3.61-3.14 5.2v-1.6zM12.03 7.25c-.15-1.98 1.53-3.8 3.51-4 1.01 2.43-1.47 4.19-3.51 4z" /> },
                                ].map((s, i) => (
                                    <motion.button key={i} whileHover={{ scale: 1.04, background: 'rgba(255,255,255,0.1)' }} whileTap={{ scale: 0.97 }}
                                        style={{ flex: 1, padding: '0.85rem', borderRadius: 16, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.04)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}>
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="rgba(255,255,255,0.8)">{s.svg}</svg>
                                    </motion.button>
                                ))}
                            </div>

                            {/* Divider */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.75rem' }}>
                                <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
                                <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>or</span>
                                <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
                            </div>

                            {/* Email form */}
                            <form onSubmit={handleEmailSubmit}>
                                <label style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', fontWeight: 500, marginBottom: '0.5rem', display: 'block' }}>Email address</label>
                                <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
                                    <input
                                        type="email" placeholder="you@example.com" value={email}
                                        onChange={e => setEmail(e.target.value)} required
                                        style={{
                                            width: '100%', padding: '0.9rem 1.25rem', paddingRight: '3.5rem',
                                            borderRadius: 16, border: '1px solid rgba(255,255,255,0.1)',
                                            background: 'rgba(255,255,255,0.04)', color: 'white',
                                            fontSize: '1rem', outline: 'none', transition: 'border-color 0.2s',
                                            boxSizing: 'border-box',
                                        }}
                                        onFocus={e => e.currentTarget.style.borderColor = 'rgba(14,165,233,0.5)'}
                                        onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
                                    />
                                    <motion.button type="submit" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                                        style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', width: 36, height: 36, borderRadius: '50%', border: 'none', background: 'linear-gradient(135deg, #0ea5e9, #6366f1)', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>
                                        →
                                    </motion.button>
                                </div>
                            </form>

                            <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem', lineHeight: 1.6, marginTop: '1rem' }}>
                                By signing in, you agree to the <a href="#" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'underline' }}>Arunya Terms</a> and <a href="#" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'underline' }}>Privacy Policy</a>.
                            </p>
                        </motion.div>
                    ) : step === 'code' ? (
                        <motion.div key="code" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 40 }} transition={{ duration: 0.35 }}>
                            <h1 style={{ color: 'white', fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Check your email</h1>
                            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1rem', marginBottom: '2rem', lineHeight: 1.5 }}>
                                We sent a 6-digit code to <span style={{ color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>{email}</span>
                            </p>

                            {/* Code inputs */}
                            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
                                {code.map((digit, i) => (
                                    <input key={i}
                                        ref={el => { codeRefs.current[i] = el; }}
                                        type="text" inputMode="numeric" pattern="[0-9]*" maxLength={1}
                                        value={digit}
                                        onChange={e => handleCodeChange(i, e.target.value)}
                                        onKeyDown={e => handleKeyDown(i, e)}
                                        style={{
                                            flex: 1, height: 56, textAlign: 'center', fontSize: '1.4rem', fontWeight: 700,
                                            borderRadius: 14, border: `2px solid ${digit ? 'rgba(14,165,233,0.5)' : 'rgba(255,255,255,0.1)'}`,
                                            background: digit ? 'rgba(14,165,233,0.08)' : 'rgba(255,255,255,0.04)',
                                            color: 'white', outline: 'none', transition: 'all 0.2s',
                                            caretColor: 'transparent',
                                        }}
                                        onFocus={e => e.currentTarget.style.borderColor = 'rgba(14,165,233,0.6)'}
                                        onBlur={e => e.currentTarget.style.borderColor = digit ? 'rgba(14,165,233,0.5)' : 'rgba(255,255,255,0.1)'}
                                    />
                                ))}
                            </div>

                            <motion.p whileHover={{ color: 'rgba(14,165,233,0.8)' }} style={{ color: 'rgba(255,255,255,0.4)', cursor: 'pointer', fontSize: '0.9rem', textAlign: 'center', marginBottom: '1.5rem', transition: 'color 0.2s' }}>
                                Didn't get it? Resend code
                            </motion.p>

                            <div style={{ display: 'flex', gap: '0.75rem' }}>
                                <motion.button onClick={() => { setStep('email'); setCode(['', '', '', '', '', '']); }}
                                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                                    style={{ flex: '0 0 auto', padding: '0.85rem 1.75rem', borderRadius: 16, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.06)', color: 'white', fontWeight: 600, cursor: 'pointer', fontSize: '0.95rem' }}>
                                    ← Back
                                </motion.button>
                                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                                    disabled={!code.every(d => d)}
                                    style={{
                                        flex: 1, padding: '0.85rem', borderRadius: 16, border: 'none',
                                        background: code.every(d => d) ? 'linear-gradient(135deg, #0ea5e9, #6366f1)' : 'rgba(255,255,255,0.06)',
                                        color: code.every(d => d) ? 'white' : 'rgba(255,255,255,0.3)',
                                        fontWeight: 600, cursor: code.every(d => d) ? 'pointer' : 'not-allowed', fontSize: '0.95rem',
                                        transition: 'all 0.3s',
                                    }}>
                                    Verify & Continue
                                </motion.button>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            style={{ textAlign: 'center', padding: '1rem 0' }}>
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                                style={{ width: 72, height: 72, borderRadius: '50%', background: 'linear-gradient(135deg, #10b981, #059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', boxShadow: '0 0 40px rgba(16,185,129,0.3)' }}>
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="white"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>
                            </motion.div>
                            <h1 style={{ color: 'white', fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>You're in!</h1>
                            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1rem', marginBottom: '2rem' }}>Welcome to the Arunya community.</p>
                            <motion.button onClick={() => navigate('/')} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                                style={{ width: '100%', padding: '0.95rem', borderRadius: 16, border: 'none', background: 'linear-gradient(135deg, #0ea5e9, #6366f1)', color: 'white', fontWeight: 600, fontSize: '1rem', cursor: 'pointer' }}>
                                Continue to Dashboard →
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* CSS animations */}
            <style>{`
                @keyframes gradientShift {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                @keyframes float1 {
                    0%, 100% { transform: translate(0, 0); }
                    50% { transform: translate(-30px, 20px); }
                }
                @keyframes float2 {
                    0%, 100% { transform: translate(0, 0); }
                    50% { transform: translate(20px, -30px); }
                }
            `}</style>
        </div>
    );
};
