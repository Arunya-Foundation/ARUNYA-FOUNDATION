import { useState, useEffect } from 'react';

interface LoadingScreenProps {
    onComplete: () => void;
}

const images = [
    '/assets/loading-screen/1.png',
    '/assets/loading-screen/2.png',
    '/assets/loading-screen/3.png',
    '/assets/loading-screen/4.png',
    '/assets/loading-screen/5.png',
    '/assets/loading-screen/6.png',
    '/assets/loading-screen/7.png',
];

const IMAGE_DURATION = 1000; // 1 second per image
const TOTAL_DURATION = IMAGE_DURATION * images.length; // 7 seconds total

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [currentImage, setCurrentImage] = useState(0);
    const [fadeClass, setFadeClass] = useState('ls-img-enter');

    useEffect(() => {
        const intervalTime = 50;
        const totalSteps = TOTAL_DURATION / intervalTime;
        let currentStep = 0;

        const progressTimer = setInterval(() => {
            currentStep++;
            const currentProgress = Math.min(Math.floor((currentStep / totalSteps) * 100), 100);
            setProgress(currentProgress);

            if (currentProgress >= 100) {
                clearInterval(progressTimer);
                setTimeout(onComplete, 600);
            }
        }, intervalTime);

        // Image carousel with crossfade
        const imageTimer = setInterval(() => {
            setFadeClass('ls-img-exit');
            setTimeout(() => {
                setCurrentImage((prev) => (prev + 1) % images.length);
                setFadeClass('ls-img-enter');
            }, 600);
        }, IMAGE_DURATION);

        return () => {
            clearInterval(progressTimer);
            clearInterval(imageTimer);
        };
    }, [onComplete]);

    return (
        <div className="loading-screen">
            {/* Full bright image showcase */}
            <div className="ls-image-showcase">
                <img
                    key={currentImage}
                    src={images[currentImage]}
                    alt={`Arunya Foundation work ${currentImage + 1}`}
                    className={`ls-showcase-img ${fadeClass}`}
                    draggable={false}
                />
            </div>

            {/* Image counter dots */}
            <div className="ls-dots">
                {images.map((_, index) => (
                    <div
                        key={index}
                        className={`ls-dot ${index === currentImage ? 'active' : ''} ${index < currentImage ? 'done' : ''}`}
                    />
                ))}
            </div>

            {/* Footer loading bar */}
            <div className="ls-footer">
                <div className="ls-footer-inner">
                    <div className="ls-brand">
                        <img
                            src="/logo.jpg"
                            alt="Arunya Logo"
                            className="ls-logo"
                            onError={(e) => {
                                e.currentTarget.style.display = 'none';
                            }}
                        />
                        <div className="ls-brand-text">
                            <span className="ls-eyebrow">Arunya Foundation</span>
                            <span className="ls-title">Preparing Hope</span>
                        </div>
                    </div>

                    <div className="ls-progress-area">
                        <span className="ls-progress-label">Loading stories of impact</span>
                        <div className="ls-progress-track">
                            <div
                                className="ls-progress-fill"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>

                    <span className="ls-progress-value">{progress}%</span>
                </div>
            </div>
        </div>
    );
};

export default LoadingScreen;
