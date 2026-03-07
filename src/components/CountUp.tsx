import { useMotionValue, useSpring } from 'framer-motion';
import { useCallback, useEffect, useRef } from 'react';

export default function CountUp({
    to,
    from = 0,
    direction = 'up',
    delay = 0,
    duration = 2,
    className = '',
    startWhen = true,
    separator = '',
    onStart,
    onEnd
}: {
    to: number;
    from?: number;
    direction?: 'up' | 'down';
    delay?: number;
    duration?: number;
    className?: string;
    startWhen?: boolean;
    separator?: string;
    onStart?: () => void;
    onEnd?: () => void;
}) {
    const ref = useRef<HTMLSpanElement>(null);
    const hasStarted = useRef(false);
    const initialValue = direction === 'down' ? to : from;
    const targetValue = direction === 'down' ? from : to;
    const motionValue = useMotionValue(initialValue);

    const damping = 20 + 40 * (1 / duration);
    const stiffness = 100 * (1 / duration);

    const springValue = useSpring(motionValue, {
        damping,
        stiffness
    });

    const getDecimalPlaces = (num: number) => {
        const str = num.toString();
        if (str.includes('.')) {
            const decimals = str.split('.')[1];
            if (parseInt(decimals) !== 0) {
                return decimals.length;
            }
        }
        return 0;
    };

    const maxDecimals = Math.max(getDecimalPlaces(from), getDecimalPlaces(to));

    const formatValue = useCallback(
        (latest: number) => {
            const hasDecimals = maxDecimals > 0;
            const options: Intl.NumberFormatOptions = {
                useGrouping: !!separator,
                minimumFractionDigits: hasDecimals ? maxDecimals : 0,
                maximumFractionDigits: hasDecimals ? maxDecimals : 0
            };
            const formattedNumber = Intl.NumberFormat('en-US', options).format(latest);
            return separator ? formattedNumber.replace(/,/g, separator) : formattedNumber;
        },
        [maxDecimals, separator]
    );

    // Set initial text content
    useEffect(() => {
        if (ref.current) {
            ref.current.textContent = formatValue(initialValue);
        }
    }, [initialValue, formatValue]);

    // Start animation when startWhen becomes true
    useEffect(() => {
        if (startWhen && !hasStarted.current) {
            hasStarted.current = true;
            if (typeof onStart === 'function') onStart();

            const timeoutId = setTimeout(() => {
                motionValue.set(targetValue);
            }, delay * 1000);

            const durationTimeoutId = setTimeout(
                () => {
                    if (typeof onEnd === 'function') onEnd();
                },
                delay * 1000 + duration * 1000
            );

            return () => {
                clearTimeout(timeoutId);
                clearTimeout(durationTimeoutId);
            };
        }
    }, [startWhen, motionValue, targetValue, delay, onStart, onEnd, duration]);

    // Subscribe to spring value changes and update text
    useEffect(() => {
        const unsubscribe = springValue.on('change', (latest: number) => {
            if (ref.current) {
                ref.current.textContent = formatValue(latest);
            }
        });

        return () => unsubscribe();
    }, [springValue, formatValue]);

    return <span className={className} ref={ref} />;
}
