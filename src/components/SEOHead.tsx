import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOConfig {
    title: string;
    description: string;
    ogImage?: string;
}

const SEO_MAP: Record<string, SEOConfig> = {
    '/': {
        title: 'Arunya Foundation — Free Education for Underprivileged Children | NGO Gwalior',
        description: 'Arunya Foundation empowers underprivileged children aged 5–16 through free education, study materials, and youth-led community initiatives in Gwalior, India. Volunteer today.',
    },
    '/about': {
        title: 'About Us — Arunya Foundation | Our Vision, Mission & Values',
        description: 'Learn about Arunya Foundation\'s vision to provide free education to every underprivileged child in India. Discover our mission, values, and the team behind the movement.',
    },
    '/causes': {
        title: 'Our Programs — Key Educational Initiatives | Arunya Foundation',
        description: 'Explore Arunya Foundation\'s programs — empowering underprivileged communities through impactful educational initiatives and sustainable development in Gwalior.',
    },
    '/blog': {
        title: 'Stories of Impact — Real Stories from Our Classrooms | Arunya Foundation',
        description: 'Read inspiring stories of how free education is transforming the lives of underprivileged children in Gwalior. Real impact, real change, real hope.',
    },
    '/gallery': {
        title: 'Photo Gallery — Moments of Joy & Learning | Arunya Foundation',
        description: 'See the moments of joy, learning, and transformation from Arunya Foundation\'s community programs and educational initiatives in Gwalior, India.',
    },
    '/contact': {
        title: 'Contact Us — Get in Touch with Arunya Foundation',
        description: 'Have questions about volunteering, donating, or enrolling a child? Reach out to Arunya Foundation in Gwalior, Madhya Pradesh, India.',
    },
    '/volunteer': {
        title: 'Volunteer With Us — Join the Arunya Foundation Team',
        description: 'Join Arunya Foundation as a volunteer teacher or organizer. Help provide free education to underprivileged children in Gwalior.',
    },
    '/curriculum': {
        title: 'Our Curriculum — Structured Teaching Framework | Arunya Foundation',
        description: 'Discover Arunya Foundation\'s structured curriculum covering literacy, numeracy, life skills, and value education for three age groups of underprivileged children.',
    },
    '/login': {
        title: 'Donate — Support a Child\'s Education | Arunya Foundation',
        description: 'Make a donation to support free education for underprivileged children. Every rupee helps provide books, materials, and community programs.',
    },
};

/**
 * SEO component — Updates document title and meta tags per route.
 * Lightweight alternative to react-helmet with zero bundle cost.
 */
export const SEOHead = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        const config = SEO_MAP[pathname] || SEO_MAP['/'];

        // Title
        document.title = config.title;

        // Meta description
        const descMeta = document.querySelector('meta[name="description"]');
        if (descMeta) descMeta.setAttribute('content', config.description);

        // OG tags
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) ogTitle.setAttribute('content', config.title);

        const ogDesc = document.querySelector('meta[property="og:description"]');
        if (ogDesc) ogDesc.setAttribute('content', config.description);

        const ogUrl = document.querySelector('meta[property="og:url"]');
        if (ogUrl) ogUrl.setAttribute('content', `https://arunyafoundation.org${pathname}`);

        // Twitter tags
        const twTitle = document.querySelector('meta[name="twitter:title"]');
        if (twTitle) twTitle.setAttribute('content', config.title);

        const twDesc = document.querySelector('meta[name="twitter:description"]');
        if (twDesc) twDesc.setAttribute('content', config.description);

        // Canonical
        let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
        if (canonical) canonical.href = `https://arunyafoundation.org${pathname === '/' ? '' : pathname}`;
    }, [pathname]);

    return null;
};
