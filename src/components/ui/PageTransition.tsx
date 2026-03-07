import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

const pageVariants = {
    initial: {
        opacity: 0,
        y: 20,
        filter: 'blur(10px)',
    },
    in: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
    },
    out: {
        opacity: 0,
        y: -20,
        filter: 'blur(10px)',
    }
};

const pageTransition = {
    type: 'tween' as const,
    ease: 'easeOut' as const,
    duration: 0.6
};

export const PageTransition = ({ children, className = "" }: { children: ReactNode, className?: string }) => {
    return (
        <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className={className}
        >
            {children}
        </motion.div>
    );
};
