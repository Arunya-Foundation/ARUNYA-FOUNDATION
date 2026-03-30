import { motion, useScroll, useTransform } from 'framer-motion';

export const FloatingShapes = () => {
    const { scrollYProgress } = useScroll();

    // Parallax values
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -300]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const y3 = useTransform(scrollYProgress, [0, 1], [0, -150]);
    const y4 = useTransform(scrollYProgress, [0, 1], [0, 300]);

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 0,
            overflow: 'hidden',
            pointerEvents: 'none',
        }}>
            {/* Shape 1 - Top Right - Golden Circle Blurred */}
            <motion.div style={{ position: 'absolute', top: '5%', right: '10%', y: y1 }}>
                <motion.div
                    style={{
                        width: '35vw', height: '35vw', maxWidth: 500, maxHeight: 500,
                        borderRadius: '50%',
                        background: 'radial-gradient(circle at 30% 30%, rgba(212, 168, 71, 0.12), rgba(212, 168, 71, 0.03) 60%, transparent 80%)',
                        filter: 'blur(50px)',
                    }}
                    animate={{ x: [0, 60, -30, 0], scale: [1, 1.1, 0.9, 1] }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
                />
            </motion.div>

            {/* Shape 2 - Bottom Left - Deep Blue Organic Blob */}
            <motion.div style={{ position: 'absolute', bottom: '-5%', left: '-5%', y: y2 }}>
                <motion.div
                    style={{
                        width: '45vw', height: '40vw', maxWidth: 700, maxHeight: 600,
                        borderRadius: '43% 57% 70% 30% / 30% 30% 70% 70%',
                        background: 'radial-gradient(circle at 70% 70%, rgba(30, 58, 95, 0.07), transparent 70%)',
                        filter: 'blur(60px)',
                    }}
                    animate={{ rotate: [0, 90, 180, 270, 360] }}
                    transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                />
            </motion.div>

            {/* Shape 3 - Center Right - Royal Blue Accent */}
            <motion.div style={{ position: 'absolute', top: '45%', right: '-10%', y: y3 }}>
                <motion.div
                    style={{
                        width: '25vw', height: '35vw', maxWidth: 350, maxHeight: 500,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.06), transparent)',
                        filter: 'blur(60px)',
                        transform: 'rotate(-45deg)'
                    }}
                    animate={{ x: [0, -40, 20, 0], y: [0, 50, -30, 0] }}
                    transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
                />
            </motion.div>

            {/* Shape 4 - Top Left - Light Golden Glass Ring */}
            <motion.div style={{ position: 'absolute', top: '15%', left: '15%', y: y4 }}>
                <motion.div
                    style={{
                        width: '18vw', height: '18vw', maxWidth: 200, maxHeight: 200,
                        borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                        border: '1px solid rgba(212, 168, 71, 0.15)',
                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.05))',
                        backdropFilter: 'blur(4px)',
                        WebkitBackdropFilter: 'blur(4px)',
                    }}
                    animate={{ rotate: [0, 360], y: [0, 30, -30, 0] }}
                    transition={{ rotate: { duration: 30, repeat: Infinity, ease: 'linear' }, y: { duration: 12, repeat: Infinity, ease: 'easeInOut' } }}
                />
            </motion.div>
            
            {/* Shape 5 - Bottom Right - Floating Dots */}
            <motion.div style={{ position: 'absolute', bottom: '20%', right: '25%' }}>
                <motion.div
                    style={{
                        width: 120, height: 120,
                        backgroundImage: 'radial-gradient(rgba(30, 58, 95, 0.15) 2px, transparent 2px)',
                        backgroundSize: '20px 20px',
                        opacity: 0.6
                    }}
                    animate={{ y: [0, -20, 0], opacity: [0.6, 0.3, 0.6] }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                />
            </motion.div>
        </div>
    );
};
