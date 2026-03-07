import { PageTransition } from '../components/ui/PageTransition';
import DomeGallery from '../components/DomeGallery';

export const GalleryPage = () => {
    return (
        <PageTransition className="pt-[140px] pb-16">
            <section id="gallery" className="gallery-section" style={{ padding: '2rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 className="section-title scroll-animate" style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem', opacity: 0, transform: 'translateY(20px)', transition: 'all 0.8s ease-out' }}>Impact in Action</h2>
                    <p className="section-subtitle scroll-animate" style={{ color: 'var(--text-muted)', fontSize: '1.2rem', opacity: 0, transform: 'translateY(20px)', transition: 'all 0.8s ease-out 0.2s' }}>Moments of joy, learning, and community building.</p>
                </div>

                <div className="gallery-container scroll-animate" style={{ height: '80vh', width: '100%', position: 'relative', borderRadius: '24px', overflow: 'hidden', opacity: 0, transform: 'translateY(40px)', transition: 'all 0.8s ease-out 0.3s', maxWidth: '1400px', margin: '0 auto' }}>
                    <DomeGallery />
                </div>
            </section>
        </PageTransition>
    );
};
