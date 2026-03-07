/**
 * Arunya Foundation - Configuration File
 * Customize your loading page and app settings here
 */

/**
 * Site Configuration
 */
export const SITE_CONFIG = {
  name: 'Arunya Foundation',
  tagline: 'Preparing Hope',
  description: 'Empowering communities and creating lasting change',
  logo: '/arunya-logo.svg',
};

/**
 * Loading Page Configuration
 */
export const LOADING_CONFIG = {
  duration: 3000, // Loading duration in milliseconds
  enableAutoStart: true, // Auto-start loading animation
  slideTransitionDelay: 800, // Time between image transitions

  // Loading images (add more as needed)
  images: [
    '/arunya-logo.svg',
    '/images/work-1.jpg',
    '/images/work-2.jpg',
    '/images/work-3.jpg',
  ],

  // Messages
  messages: {
    loading: 'Loading stories of impact',
    subtitle: 'Discover our mission',
  },
};

/**
 * Theme Configuration - Liquid Glass Colors
 */
export const THEME_CONFIG = {
  colors: {
    primary: '#1a1a2e', // Dark blue background
    secondary: '#16213e', // Lighter blue
    accent: '#00d4ff', // Cyan accent
    textLight: 'rgba(255, 255, 255, 0.95)', // White text
    textMuted: 'rgba(255, 255, 255, 0.6)', // Muted text
    glassBg: 'rgba(255, 255, 255, 0.08)', // Glass background
    glassBorder: 'rgba(255, 255, 255, 0.2)', // Glass border
    glassBorderBright: 'rgba(255, 255, 255, 0.3)', // Bright border
  },

  gradients: {
    primary: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    accent: 'linear-gradient(135deg, #00d4ff, #ffffff)',
    progressBar: 'linear-gradient(90deg, #00d4ff 0%, #0099cc 100%)',
  },

  blur: {
    card: '20px',
    background: '80px',
    menu: '20px',
  },

  borderRadius: {
    small: '8px',
    medium: '16px',
    large: '24px',
    full: '50%',
  },
};

/**
 * Animation Configuration
 */
export const ANIMATION_CONFIG = {
  durations: {
    fast: '300ms',
    smooth: '600ms',
    slow: '1000ms',
  },

  timingFunctions: {
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    custom: 'cubic-bezier(0.34, 1.56, 0.64, 1)', // bounce effect
  },

  floatAnimation: {
    duration: 15000, // 15 seconds
    distance: 30, // pixels
  },
};

/**
 * Navigation Configuration (for future use)
 */
export const NAV_CONFIG = {
  items: [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Our Work', href: '/work' },
    { label: 'Impact', href: '/impact' },
    { label: 'Contact', href: '/contact' },
  ],

  social: {
    twitter: 'https://twitter.com/arunya',
    facebook: 'https://facebook.com/arunya',
    instagram: 'https://instagram.com/arunya',
    linkedin: 'https://linkedin.com/company/arunya',
  },
};

/**
 * Contact Configuration
 */
export const CONTACT_CONFIG = {
  email: 'contact@arunya.org',
  phone: '+91-XXXXXXXXXX',
  address: 'Arunya Foundation, Address Line 1, City, Country',
  formEndpoint: 'https://api.arunya.org/contact', // Update with your backend
};

/**
 * Firebase Configuration (to be added later)
 */
export const FIREBASE_CONFIG = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
};

/**
 * Services/API Configuration
 */
export const API_CONFIG = {
  baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  timeout: 30000, // 30 seconds
  retries: 3,
};

/**
 * Feature Flags (for conditional features)
 */
export const FEATURES = {
  enableLoadingPage: true,
  enableHamburgerMenu: true,
  enableAnimations: true,
  enableGlassTheme: true,
  enableFirebase: false, // Enable after Firebase setup
  enableAnalytics: false, // Enable after analytics setup
  maintenanceMode: false,
};

/**
 * Responsive Breakpoints (in pixels)
 */
export const BREAKPOINTS = {
  xs: 320,
  sm: 480,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1536,
};

/**
 * Z-index Scale (for stacking contexts)
 */
export const Z_INDEX = {
  background: 0,
  content: 10,
  menu: 20,
  modal: 30,
  tooltip: 40,
  notification: 50,
};

export default {
  SITE_CONFIG,
  LOADING_CONFIG,
  THEME_CONFIG,
  ANIMATION_CONFIG,
  NAV_CONFIG,
  CONTACT_CONFIG,
  FIREBASE_CONFIG,
  API_CONFIG,
  FEATURES,
  BREAKPOINTS,
  Z_INDEX,
};
