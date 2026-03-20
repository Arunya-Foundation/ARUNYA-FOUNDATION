import { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoadingScreen from './components/LoadingScreen';
import { MainLayout } from './components/layout/MainLayout';

// Lazy load pages for better performance
const HomePage = lazy(() => import('./pages/HomePage').then(module => ({ default: module.HomePage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(module => ({ default: module.AboutPage })));
const CausesPage = lazy(() => import('./pages/CausesPage').then(module => ({ default: module.CausesPage })));
const GalleryPage = lazy(() => import('./pages/GalleryPage').then(module => ({ default: module.GalleryPage })));
const BlogPage = lazy(() => import('./pages/BlogPage').then(module => ({ default: module.BlogPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(module => ({ default: module.ContactPage })));
const LoginPage = lazy(() => import('./pages/LoginPage').then(module => ({ default: module.LoginPage })));

function App() {
    const [isLoading, setIsLoading] = useState(() => {
        const hasVisited = sessionStorage.getItem('hasVisited');
        return !hasVisited;
    });
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        // Apply theme to document
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    const handleLoadingComplete = () => {
        sessionStorage.setItem('hasVisited', 'true');
        setIsLoading(false);
    };

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    return (
        <BrowserRouter>
            {isLoading ? (
                <LoadingScreen onComplete={handleLoadingComplete} />
            ) : (
                <Suspense fallback={null}>
                    <Routes>
                        <Route element={<MainLayout theme={theme} toggleTheme={toggleTheme} />}>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/about" element={<AboutPage />} />
                            <Route path="/causes" element={<CausesPage />} />
                            <Route path="/gallery" element={<GalleryPage />} />
                            <Route path="/blog" element={<BlogPage />} />
                            <Route path="/contact" element={<ContactPage />} />
                            <Route path="/login" element={<LoginPage />} />
                        </Route>
                    </Routes>
                </Suspense>
            )}
        </BrowserRouter>
    );
}

export default App;
