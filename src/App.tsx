import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoadingScreen from './components/LoadingScreen';
import { MainLayout } from './components/layout/MainLayout';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { CausesPage } from './pages/CausesPage';
import { GalleryPage } from './pages/GalleryPage';
import { BlogPage } from './pages/BlogPage';
import { ContactPage } from './pages/ContactPage';
import { LoginPage } from './pages/LoginPage';

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
            )}
        </BrowserRouter>
    );
}

export default App;
