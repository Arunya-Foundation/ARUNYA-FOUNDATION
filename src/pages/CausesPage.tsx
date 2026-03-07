import { PageTransition } from '../components/ui/PageTransition';
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

export const CausesPage = () => {
    return (
        <PageTransition className="pt-[140px] pb-16">
            <section id="causes" className="causes-section" style={{ padding: '2rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h2 className="section-title scroll-animate" style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem', opacity: 0, transform: 'translateY(20px)', transition: 'all 0.8s ease-out' }}>Our Causes</h2>
                    <p className="section-subtitle scroll-animate" style={{ color: 'var(--text-muted)', fontSize: '1.2rem', opacity: 0, transform: 'translateY(20px)', transition: 'all 0.8s ease-out 0.2s' }}>Search and give to what matters most to you...</p>
                </div>

                {/* Filter Bar */}
                <div className="filter-bar scroll-animate" style={{ opacity: 0, transform: 'translateY(20px)', transition: 'all 0.8s ease-out 0.3s' }}>
                    <button className="filter-btn active"><span>🏠</span> All</button>
                    <button className="filter-btn"><span>🍲</span> Food</button>
                    <button className="filter-btn"><span>📚</span> Education</button>
                    <button className="filter-btn"><span>🎂</span> Birthday</button>
                    <button className="filter-btn"><span>🌱</span> Environment</button>
                </div>

                {/* Causes Grid */}
                <div className="causes-grid" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    {[
                        { title: 'Weekend Basic Classes', category: 'Education', icon: '📚', amount: '₹500/Child', img: '/assets/work/20251102_131620.jpg' },
                        { title: 'Feed a Homeless Child', category: 'Food', icon: '🍲', amount: '₹50/Meal', img: '/assets/work/20251102_131624.jpg' },
                        { title: 'Virtual Cake Cutting', category: 'Birthday', icon: '🎂', amount: '₹2000/Celebration', img: '/assets/work/20251102_131626.jpg' },
                        { title: 'School Supplies Kit', category: 'Education', icon: '🎒', amount: '₹350/Kit', img: '/assets/work/20251102_131627.jpg' },
                        { title: 'Tree Plantation Drive', category: 'Environment', icon: '🌱', amount: '₹100/Sapling', img: '/assets/work/20251102_131631.jpg' },
                        { title: 'Women Skill Center', category: 'Education', icon: '🧵', amount: '₹1500/Skill', img: '/assets/work/20251102_131634.jpg' },
                    ].map((cause, idx) => (
                        <div key={idx} className="cause-card glass-panel scroll-animate" style={{ opacity: 0, transform: 'translateY(40px)', transition: 'all 0.8s ease-out ' + (0.2 + (idx * 0.1)) + 's' }}>
                            <div className="cause-image" style={{ backgroundImage: `url(${cause.img})` }}>
                                <div className="cause-badge">{cause.amount}</div>
                            </div>
                            <div className="cause-content">
                                <h3>{cause.icon} {cause.title}</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>Support our {cause.category.toLowerCase()} initiative and make a direct impact today.</p>
                                <InteractiveHoverButton text="Donate Now" className="w-full" />
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </PageTransition>
    );
};
