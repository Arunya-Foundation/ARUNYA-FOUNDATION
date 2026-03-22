import React from 'react';
import { motion } from 'framer-motion';

interface StickySubNavProps {
    children: React.ReactNode;
    top?: number;
    className?: string;
}

export const StickySubNav: React.FC<StickySubNavProps> = ({ children, top = 90, className = '' }) => {
    return (
        <div 
            style={{ 
                position: 'sticky', 
                top: `${top}px`, 
                zIndex: 40, 
                pointerEvents: 'none',
                display: 'flex',
                justifyContent: 'center',
                width: '100%'
            }} 
            className={`my-4 ${className}`}
        >
            <motion.div 
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                viewport={{ margin: "0px 0px -50px 0px" }}
                className="pointer-events-auto px-6 py-3 rounded-full flex items-center justify-center gap-4 mx-auto"
                style={{
                    background: 'var(--glass-bg)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid var(--glass-border)',
                    boxShadow: 'var(--glass-shadow)',
                }}
            >
                {children}
            </motion.div>
        </div>
    );
};
