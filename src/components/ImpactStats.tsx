import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CountUp from './CountUp';

/* ── Stat data ───────────────────────────────────────────────── */
const STATS = [
    {
        value: 100,
        suffix: '+',
        label: 'Children Educated',
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c0 1.657 2.686 3 6 3s6-1.343 6-3v-5" />
            </svg>
        ),
        color: '#123C73',
        bgLight: 'rgba(18, 60, 115, 0.08)',
    },
    {
        value: 30,
        suffix: '+',
        label: 'Active Volunteers',
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
        ),
        color: '#CF8C36',
        bgLight: 'rgba(207, 140, 54, 0.08)',
    },
    {
        value: 1000,
        suffix: '+',
        label: 'Learning Hours',
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                <circle cx="12" cy="10" r="3" />
                <path d="M12 7v3l2 1" />
            </svg>
        ),
        color: '#123C73',
        bgLight: 'rgba(18, 60, 115, 0.08)',
    },
    {
        value: 5,
        suffix: '+',
        label: 'Communities Supported',
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
        ),
        color: '#CF8C36',
        bgLight: 'rgba(207, 140, 54, 0.08)',
    },
];

/* ── Component ───────────────────────────────────────────────── */
export const ImpactStats = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section className="impact-section" ref={sectionRef} id="impact-stats">
            {/* Decorative background blobs */}
            <div className="impact-blob impact-blob--1" />
            <div className="impact-blob impact-blob--2" />

            <div className="impact-inner">
                {/* Section Header */}
                <motion.div
                    className="impact-header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                    <span className="impact-badge">📊 Our Impact</span>
                    <h2 className="impact-title">
                        Changing Lives <span className="impact-title-accent">Together</span>
                    </h2>
                    <p className="impact-subtitle">
                        Every number tells a story of hope, learning, and transformation
                        in the communities we serve.
                    </p>
                    <div className="impact-underline" />
                </motion.div>

                {/* Stats Grid */}
                <div className="impact-grid">
                    {STATS.map((stat, idx) => (
                        <motion.div
                            key={idx}
                            className="impact-card"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-40px' }}
                            transition={{
                                duration: 0.7,
                                delay: idx * 0.12,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                        >
                            {/* Top accent bar */}
                            <div
                                className="impact-card-accent"
                                style={{
                                    background:
                                        stat.color === '#CF8C36'
                                            ? 'linear-gradient(135deg, #CF8C36, #E7A44D)'
                                            : 'linear-gradient(135deg, #123C73, #0B1F3A)',
                                }}
                            />

                            {/* Icon */}
                            <div
                                className="impact-icon"
                                style={{
                                    background: stat.bgLight,
                                    color: stat.color,
                                }}
                            >
                                {stat.icon}
                            </div>

                            {/* Number */}
                            <div className="impact-number">
                                <CountUp
                                    from={0}
                                    to={stat.value}
                                    separator=","
                                    direction="up"
                                    duration={2.5}
                                    startWhen={isVisible}
                                    delay={idx * 0.15}
                                    className="impact-count"
                                />
                                <span className="impact-suffix">{stat.suffix}</span>
                            </div>

                            {/* Label */}
                            <div className="impact-label">{stat.label}</div>

                            {/* Decorative ring */}
                            <div
                                className="impact-card-ring"
                                style={{
                                    borderColor:
                                        stat.color === '#CF8C36'
                                            ? 'rgba(207,140,54,0.08)'
                                            : 'rgba(18,60,115,0.06)',
                                }}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
