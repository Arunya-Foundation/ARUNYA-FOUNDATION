import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../lib/AuthContext';

export const LoginPage = () => {
    const navigate = useNavigate();
    const { signInWithGoogle, user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleGoogleSignIn = async () => {
        setLoading(true);
        setError('');
        try {
            await signInWithGoogle();
            navigate('/');
        } catch (err: any) {
            setError(err?.message || 'Failed to sign in. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // If already signed in, show dashboard state
    if (user) {
        return (
            <div style={{
                position: 'fixed', inset: 0, zIndex: 9999,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                overflow: 'hidden',
                background: 'linear-gradient(135deg, #f8fafc 0%, #eef4fb 50%, #dbeafe 100%)',
            }}>
                {/* Decorative orbs */}
                <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)', top: '-10%', right: '-5%' }} />
                <div style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,168,71,0.06) 0%, transparent 70%)', bottom: '-5%', left: '-3%' }} />

                <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                        position: 'relative', zIndex: 10, width: '100%', maxWidth: 440,
                        padding: '3rem 2.5rem', textAlign: 'center',
                        background: 'rgba(255,255,255,0.9)',
                        backdropFilter: 'blur(40px)',
                        border: '1px solid rgba(30,58,95,0.08)',
                        borderRadius: 32, boxShadow: '0 24px 48px rgba(30,58,95,0.08)',
                    }}
                >
                    <div style={{
                        width: 72, height: 72, borderRadius: '50%',
                        background: 'linear-gradient(135deg, #2563eb, #1e3a5f)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 1.5rem',
                        boxShadow: '0 0 40px rgba(37,99,235,0.2)',
                    }}>
                        {user.photoURL ? (
                            <img src={user.photoURL} alt="Profile" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                        ) : (
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="white"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>
                        )}
                    </div>
                    <h1 style={{ color: '#1e3a5f', fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem', fontFamily: 'Outfit, Inter, sans-serif' }}>
                        Welcome, {user.displayName?.split(' ')[0] || 'Friend'}!
                    </h1>
                    <p style={{ color: '#6b7280', fontSize: '0.95rem', marginBottom: '2rem' }}>
                        You're signed in to Arunya Foundation.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <motion.button
                            onClick={() => navigate('/')}
                            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                            style={{
                                width: '100%', padding: '0.9rem', borderRadius: 16, border: 'none',
                                background: 'linear-gradient(135deg, #2563eb, #1e3a5f)',
                                color: 'white', fontWeight: 600, fontSize: '0.95rem',
                                cursor: 'pointer', fontFamily: 'inherit',
                            }}
                        >
                            Go to Home →
                        </motion.button>
                        <motion.button
                            onClick={() => navigate('/volunteer')}
                            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                            style={{
                                width: '100%', padding: '0.9rem', borderRadius: 16,
                                border: '2px solid #d4a847', background: 'transparent',
                                color: '#1e3a5f', fontWeight: 600, fontSize: '0.95rem',
                                cursor: 'pointer', fontFamily: 'inherit',
                            }}
                        >
                            Join as Volunteer
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden',
            background: 'linear-gradient(135deg, #f8fafc 0%, #eef4fb 50%, #dbeafe 100%)',
        }}>
            {/* Decorative orbs */}
            <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)', top: '-15%', right: '-10%', animation: 'float1 8s ease-in-out infinite' }} />
            <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,168,71,0.06) 0%, transparent 70%)', bottom: '-10%', left: '-5%', animation: 'float2 10s ease-in-out infinite' }} />
            <div style={{ position: 'absolute', width: 250, height: 250, borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,99,235,0.05) 0%, transparent 70%)', top: '40%', left: '20%', animation: 'float1 6s ease-in-out infinite reverse' }} />

            {/* Dot grid overlay */}
            <div style={{
                position: 'absolute', inset: 0, opacity: 0.03,
                backgroundImage: 'radial-gradient(circle, #1e3a5f 1px, transparent 1px)',
                backgroundSize: '30px 30px',
            }} />

            {/* Close button */}
            <motion.button
                onClick={() => navigate('/')}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                style={{
                    position: 'absolute', top: 32, right: 32, width: 48, height: 48,
                    borderRadius: '50%', border: '1px solid rgba(30,58,95,0.1)',
                    background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(12px)',
                    color: '#1e3a5f', fontSize: '1.5rem', cursor: 'pointer',
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
                    background: 'rgba(255,255,255,0.9)',
                    backdropFilter: 'blur(40px)', WebkitBackdropFilter: 'blur(40px)',
                    border: '1px solid rgba(30,58,95,0.08)',
                    borderRadius: 32, boxShadow: '0 32px 64px rgba(30,58,95,0.08)',
                }}
            >
                {/* Logo */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                    <img src="/logo.png" alt="Logo" style={{ width: 44, height: 44, objectFit: 'contain' }} onError={e => { e.currentTarget.style.display = 'none'; }} />
                    <div>
                        <span style={{ color: '#1e3a5f', fontWeight: 800, fontSize: '1.2rem', fontFamily: 'Outfit, Inter, sans-serif', display: 'block' }}>Arunya Foundation</span>
                        <span style={{ color: '#9ca3af', fontSize: '0.75rem', fontWeight: 500 }}>Education for Every Child</span>
                    </div>
                </div>

                <h1 style={{ color: '#1e3a5f', fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem', lineHeight: 1.2, fontFamily: 'Outfit, Inter, sans-serif' }}>
                    Welcome back
                </h1>
                <p style={{ color: '#6b7280', fontSize: '1rem', marginBottom: '2rem', lineHeight: 1.5 }}>
                    Sign in to track your impact, donate, or manage your volunteer profile.
                </p>

                {/* Google Sign In */}
                <motion.button
                    className="google-btn"
                    onClick={handleGoogleSignIn}
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{ opacity: loading ? 0.6 : 1 }}
                >
                    <svg width="22" height="22" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    {loading ? 'Signing in...' : 'Continue with Google'}
                </motion.button>

                {error && (
                    <p style={{ color: '#dc2626', fontSize: '0.85rem', marginTop: '1rem', textAlign: 'center' }}>
                        {error}
                    </p>
                )}

                {/* Info text */}
                <div style={{ marginTop: '2rem', padding: '1.25rem', borderRadius: 16, background: '#eef4fb', border: '1px solid rgba(37,99,235,0.08)' }}>
                    <p style={{ color: '#1e3a5f', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                        Why sign in?
                    </p>
                    <ul style={{ color: '#6b7280', fontSize: '0.8rem', lineHeight: 1.8, paddingLeft: '1rem', margin: 0 }}>
                        <li>Track and manage your donations</li>
                        <li>Access your volunteer dashboard</li>
                        <li>Get updates on students you've supported</li>
                        <li>Receive certificates for your contributions</li>
                    </ul>
                </div>

                <p style={{ color: '#9ca3af', fontSize: '0.75rem', lineHeight: 1.6, marginTop: '1.5rem', textAlign: 'center' }}>
                    By signing in, you agree to the <a href="#" style={{ color: '#2563eb', textDecoration: 'underline' }}>Arunya Terms</a> and <a href="#" style={{ color: '#2563eb', textDecoration: 'underline' }}>Privacy Policy</a>.
                </p>
            </motion.div>

            {/* CSS animations */}
            <style>{`
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
