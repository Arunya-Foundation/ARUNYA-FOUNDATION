import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ── Testimonial Data ───────────────────────────────────────── */
interface Testimonial {
    id: number;
    name: string;
    role: string;
    category: 'volunteer' | 'parent' | 'student';
    quote: string;
    fullStory?: string;
    photo: string;
    location?: string;
    program?: string;
}

const TESTIMONIALS: Testimonial[] = [
    {
        id: 1,
        name: 'Priya Sharma',
        role: 'Volunteer Teacher',
        category: 'volunteer',
        quote: 'Teaching at Arunya taught me more than any classroom ever did. Seeing a child read their first sentence — that moment changed everything for me.',
        fullStory: 'When I first joined Arunya Foundation as a weekend volunteer, I expected to teach basic English and Math. What I didn\'t expect was how much I would learn from the children. Every Saturday morning, their eagerness to learn, their curiosity, and their resilience humbled me.\n\nOne moment stands out — a 7-year-old girl named Kavita, who had never held a pencil before, wrote her name for the first time. The pride in her eyes was something I\'ll carry with me forever.\n\nArunya didn\'t just help me become a better teacher — it helped me become a better human being. The experience strengthened my communication skills, my empathy, and my resolve to create change.',
        photo: '/assets/testimonials/priya.png',
        location: 'Gwalior, MP',
        program: 'Weekend Teaching Program',
    },
    {
        id: 2,
        name: 'Rahul Verma',
        role: 'Senior Volunteer',
        category: 'volunteer',
        quote: 'I came to volunteer for a few weekends. I stayed because these children became my family. Their laughter is the most beautiful sound in the world.',
        fullStory: 'I was a second-year engineering student looking for something meaningful to do on weekends. A friend suggested Arunya Foundation, and I thought I\'d try it for a month.\n\nThat was over a year ago. What keeps me coming back isn\'t just the teaching — it\'s the relationships. The children remember your name, they wait for you, they share their dreams with you.\n\nOne boy, Ravi, told me he wants to become an engineer "just like Rahul bhaiya." That moment redefined my purpose. Now I\'m not just studying engineering — I\'m studying it to be worthy of that child\'s dream.',
        photo: '/assets/testimonials/rahul.png',
        location: 'Gwalior, MP',
        program: 'Weekend Teaching Program',
    },
    {
        id: 3,
        name: 'Sunita Devi',
        role: 'Parent',
        category: 'parent',
        quote: 'My daughter now reads Hindi stories to her younger brother every evening. Arunya gave her something I couldn\'t — the gift of education and confidence.',
        fullStory: 'We live in a small settlement near Gwalior. I work as a domestic helper and my husband is a daily wage laborer. We always wanted our children to study, but we couldn\'t afford tuition or even proper books.\n\nWhen Arunya volunteers started coming to our community, they welcomed my daughter Anita with open arms. Within months, she was reading Hindi stories, solving math problems, and even speaking basic English.\n\nBut the biggest change I noticed was her confidence. She now speaks up, asks questions, and even helps younger children with their studies. As a mother, I feel a deep sense of gratitude that someone believed in my child\'s potential.',
        photo: '/assets/testimonials/sunita.png',
        location: 'Gwalior, MP',
    },
    {
        id: 4,
        name: 'Arjun Yadav',
        role: 'Student, Group C',
        category: 'student',
        quote: 'Before Arunya, I didn\'t know English. Now I can introduce myself and even write short paragraphs. I want to become a doctor one day!',
        fullStory: 'My name is Arjun and I am 13 years old. Before I started coming to Arunya Foundation classes, I didn\'t go to school regularly. My parents couldn\'t always afford the fees.\n\nBut at Arunya, everything is free — the books, the classes, even the stationery. The teachers are so kind and they never scold us. They teach us through games and activities.\n\nI have learned so much — I can now count in English, write my name, and even solve multiplication tables. My favorite part is the storytelling session at the end. One day, I want to become a doctor and help my family. Arunya gave me the courage to dream.',
        photo: '/assets/testimonials/arjun.png',
        location: 'Gwalior, MP',
        program: 'Group C (12-15 years)',
    },
    {
        id: 5,
        name: 'Meera Joshi',
        role: 'Volunteer Coordinator',
        category: 'volunteer',
        quote: 'Arunya is proof that young people can create real change. We\'re not just teaching — we\'re building a community that believes in the power of education.',
        fullStory: 'I joined Arunya Foundation in its early days. What started as a group of college friends wanting to make a difference has grown into a structured, impactful organization.\n\nAs a volunteer coordinator, I\'ve seen students who couldn\'t write their names become confident readers. I\'ve seen shy children transform into leaders during group discussions.\n\nBut what truly inspires me is our volunteer community. These are young college students giving up their weekends to teach, mentor, and care for children they\'ve never met before. That selflessness is rare and beautiful.\n\nArunya has taught me that change doesn\'t require millions — it requires commitment, consistency, and compassion.',
        photo: '/assets/testimonials/meera.png',
        location: 'Gwalior, MP',
        program: 'Core Team',
    },
    {
        id: 6,
        name: 'Ramesh Kushwaha',
        role: 'Parent',
        category: 'parent',
        quote: 'I never went to school myself. But because of Arunya, my son is learning things I could never teach him. This foundation is a blessing for our community.',
        fullStory: 'I am a rickshaw driver. I never got the chance to go to school. My biggest fear was that my children would face the same fate.\n\nWhen the Arunya volunteers came to our locality, I was skeptical at first. But they were so patient and caring with the children. My son Deepak, who is 10, now reads Hindi fluently and can even do basic math.\n\nLast month, he helped me count the day\'s earnings correctly. That small moment filled me with so much pride. I may not be educated, but because of Arunya, my son will be.\n\nI pray this foundation continues to shine its light on children like mine.',
        photo: '/assets/testimonials/ramesh.png',
        location: 'Gwalior, MP',
    },
];

/* ── Category filter config ─────────────────────────────────── */
const CATEGORIES = [
    { key: 'all', label: 'All Stories', icon: '✨' },
    { key: 'volunteer', label: 'Volunteers', icon: '🤝' },
    { key: 'parent', label: 'Parents', icon: '💛' },
    { key: 'student', label: 'Students', icon: '📚' },
];

const CATEGORY_BADGE: Record<string, { label: string; color: string; bg: string }> = {
    volunteer: { label: 'Volunteer', color: '#123C73', bg: 'rgba(18,60,115,0.08)' },
    parent: { label: 'Parent', color: '#CF8C36', bg: 'rgba(207,140,54,0.08)' },
    student: { label: 'Student', color: '#16a34a', bg: 'rgba(22,163,74,0.08)' },
};

/* ── Quote Icon SVG ─────────────────────────────────────────── */
const QuoteIcon = ({ color = '#CF8C36' }: { color?: string }) => (
    <svg width="36" height="36" viewBox="0 0 24 24" fill={color} opacity={0.15}>
        <path d="M6 17h3l2-4V7H5v6h3l-2 4zm8 0h3l2-4V7h-6v6h3l-2 4z" />
    </svg>
);

/* ── Component ──────────────────────────────────────────────── */
export const Testimonials = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [expandedId, setExpandedId] = useState<number | null>(null);
    const [activeSlide, setActiveSlide] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const carouselRef = useRef<HTMLDivElement>(null);
    const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const filteredTestimonials =
        activeFilter === 'all'
            ? TESTIMONIALS
            : TESTIMONIALS.filter((t) => t.category === activeFilter);

    /* Auto-scroll carousel */
    const startAutoPlay = useCallback(() => {
        if (autoPlayRef.current) clearInterval(autoPlayRef.current);
        autoPlayRef.current = setInterval(() => {
            if (!isPaused) {
                setActiveSlide((prev) => (prev + 1) % filteredTestimonials.length);
            }
        }, 5000);
    }, [isPaused, filteredTestimonials.length]);

    useEffect(() => {
        startAutoPlay();
        return () => {
            if (autoPlayRef.current) clearInterval(autoPlayRef.current);
        };
    }, [startAutoPlay]);

    /* Reset slide when filter changes */
    useEffect(() => {
        setActiveSlide(0);
    }, [activeFilter]);

    /* Scroll carousel card into view within the container only (never scroll the page) */
    useEffect(() => {
        if (carouselRef.current) {
            const container = carouselRef.current;
            const card = container.children[activeSlide] as HTMLElement | undefined;
            if (card) {
                // Calculate the scroll position to center the card within the carousel track
                const cardLeft = card.offsetLeft;
                const cardWidth = card.offsetWidth;
                const containerWidth = container.offsetWidth;
                const targetScroll = cardLeft - (containerWidth / 2) + (cardWidth / 2);
                container.scrollTo({
                    left: targetScroll,
                    behavior: 'smooth',
                });
            }
        }
    }, [activeSlide]);

    const goToSlide = (idx: number) => {
        setActiveSlide(idx);
        startAutoPlay();
    };

    const nextSlide = () => {
        setActiveSlide((prev) => (prev + 1) % filteredTestimonials.length);
        startAutoPlay();
    };

    const prevSlide = () => {
        setActiveSlide((prev) =>
            prev === 0 ? filteredTestimonials.length - 1 : prev - 1
        );
        startAutoPlay();
    };

    const expandedTestimonial = TESTIMONIALS.find((t) => t.id === expandedId);

    return (
        <section className="testimonials-section" id="testimonials">
            {/* Decorative blobs */}
            <div className="testimonials-blob testimonials-blob--1" />
            <div className="testimonials-blob testimonials-blob--2" />

            <div className="testimonials-inner">
                {/* ── Header ── */}
                <motion.div
                    className="testimonials-header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                    <span className="testimonials-badge">💬 Voices of Change</span>
                    <h2 className="testimonials-title">
                        Hearts We've <span className="testimonials-accent">Touched</span>
                    </h2>
                    <p className="testimonials-subtitle">
                        Real stories from the volunteers, parents, and students whose lives
                        have been transformed through education and compassion.
                    </p>
                    <div className="testimonials-underline" />
                </motion.div>

                {/* ── Category Filters ── */}
                <motion.div
                    className="testimonials-filters"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat.key}
                            className={`testimonials-filter-btn ${activeFilter === cat.key ? 'testimonials-filter-btn--active' : ''}`}
                            onClick={() => setActiveFilter(cat.key)}
                        >
                            <span>{cat.icon}</span>
                            <span>{cat.label}</span>
                        </button>
                    ))}
                </motion.div>

                {/* ── Desktop Grid / Mobile Carousel ── */}
                <div
                    className="testimonials-carousel"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    {/* Prev/Next arrows (desktop) */}
                    <button
                        className="testimonials-arrow testimonials-arrow--prev"
                        onClick={prevSlide}
                        aria-label="Previous testimonial"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 18 9 12 15 6" />
                        </svg>
                    </button>

                    <div className="testimonials-track" ref={carouselRef}>
                        <AnimatePresence mode="wait">
                            {filteredTestimonials.map((t, idx) => (
                                <motion.div
                                    key={t.id}
                                    className={`testimonial-card ${idx === activeSlide ? 'testimonial-card--active' : ''}`}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: '-40px' }}
                                    transition={{
                                        duration: 0.6,
                                        delay: idx * 0.08,
                                        ease: [0.16, 1, 0.3, 1],
                                    }}
                                >
                                    {/* Quote icon */}
                                    <div className="testimonial-quote-icon">
                                        <QuoteIcon color={CATEGORY_BADGE[t.category].color} />
                                    </div>

                                    {/* Category badge */}
                                    <span
                                        className="testimonial-category"
                                        style={{
                                            color: CATEGORY_BADGE[t.category].color,
                                            background: CATEGORY_BADGE[t.category].bg,
                                        }}
                                    >
                                        {CATEGORY_BADGE[t.category].label}
                                    </span>

                                    {/* Quote text */}
                                    <p className="testimonial-quote">{`"${t.quote}"`}</p>

                                    {/* Profile */}
                                    <div className="testimonial-profile">
                                        <img
                                            src={t.photo}
                                            alt={t.name}
                                            className="testimonial-avatar"
                                            loading="lazy"
                                            decoding="async"
                                            width={56}
                                            height={56}
                                        />
                                        <div className="testimonial-info">
                                            <strong className="testimonial-name">{t.name}</strong>
                                            <span className="testimonial-role">{t.role}</span>
                                            {t.location && (
                                                <span className="testimonial-location">📍 {t.location}</span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Read full story */}
                                    {t.fullStory && (
                                        <button
                                            className="testimonial-read-more"
                                            onClick={() => setExpandedId(t.id)}
                                        >
                                            Read Full Story →
                                        </button>
                                    )}
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    <button
                        className="testimonials-arrow testimonials-arrow--next"
                        onClick={nextSlide}
                        aria-label="Next testimonial"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6" />
                        </svg>
                    </button>
                </div>

                {/* ── Dot Indicators ── */}
                <div className="testimonials-dots">
                    {filteredTestimonials.map((_, idx) => (
                        <button
                            key={idx}
                            className={`testimonials-dot ${idx === activeSlide ? 'testimonials-dot--active' : ''}`}
                            onClick={() => goToSlide(idx)}
                            aria-label={`Go to testimonial ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>

            {/* ── Expanded Story Modal ── */}
            <AnimatePresence>
                {expandedTestimonial && (
                    <motion.div
                        className="testimonial-modal-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setExpandedId(null)}
                    >
                        <motion.div
                            className="testimonial-modal"
                            initial={{ opacity: 0, y: 40, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 40, scale: 0.95 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close button */}
                            <button
                                className="testimonial-modal-close"
                                onClick={() => setExpandedId(null)}
                                aria-label="Close story"
                            >
                                ✕
                            </button>

                            {/* Modal Header */}
                            <div className="testimonial-modal-header">
                                <img
                                    src={expandedTestimonial.photo}
                                    alt={expandedTestimonial.name}
                                    className="testimonial-modal-avatar"
                                    width={80}
                                    height={80}
                                />
                                <div>
                                    <h3 className="testimonial-modal-name">{expandedTestimonial.name}</h3>
                                    <span className="testimonial-modal-role">{expandedTestimonial.role}</span>
                                    <span
                                        className="testimonial-category"
                                        style={{
                                            color: CATEGORY_BADGE[expandedTestimonial.category].color,
                                            background: CATEGORY_BADGE[expandedTestimonial.category].bg,
                                            marginTop: '0.5rem',
                                            display: 'inline-block',
                                        }}
                                    >
                                        {CATEGORY_BADGE[expandedTestimonial.category].label}
                                    </span>
                                </div>
                            </div>

                            {/* Modal Quote */}
                            <blockquote className="testimonial-modal-quote">
                                "{expandedTestimonial.quote}"
                            </blockquote>

                            {/* Full Story */}
                            <div className="testimonial-modal-body">
                                <h4>Full Story</h4>
                                <p>{expandedTestimonial.fullStory}</p>
                            </div>

                            {/* Meta info */}
                            <div className="testimonial-modal-meta">
                                {expandedTestimonial.location && (
                                    <span>📍 {expandedTestimonial.location}</span>
                                )}
                                {expandedTestimonial.program && (
                                    <span>🎓 {expandedTestimonial.program}</span>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};
