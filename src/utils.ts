/**
 * Utility Functions & Helpers for Arunya Website
 * Animation, DOM, and Color utilities
 */

/**
 * Wait for a specific time (promise-based delay)
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Smooth scroll to element
 */
export function smoothScrollTo(
  element: HTMLElement | string,
  offset = 0,
  duration = 1000
): void {
  const target =
    typeof element === 'string' ? document.querySelector(element) : element;

  if (!target) return;

  const targetPosition = (target as HTMLElement).offsetTop - offset;
  const startPosition = window.scrollY;
  const distance = targetPosition - startPosition;
  let start: number | null = null;

  const animation = (currentTime: number) => {
    if (start === null) start = currentTime;
    const elapsed = currentTime - start;
    const progress = Math.min(elapsed / duration, 1);

    // Easing function
    const ease = progress < 0.5
      ? 2 * progress * progress
      : -1 + (4 - 2 * progress) * progress;

    window.scrollTo(0, startPosition + distance * ease);

    if (elapsed < duration) {
      requestAnimationFrame(animation);
    }
  };

  requestAnimationFrame(animation);
}

/**
 * Detect if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Detect if device is touch-enabled
 */
export function isTouchDevice(): boolean {
  return (
    (typeof window !== 'undefined' &&
      ('ontouchstart' in window ||
        (navigator as any).maxTouchPoints > 0 ||
        (navigator as any).msMaxTouchPoints > 0)) ||
    false
  );
}

/**
 * Generate random color from array
 */
export function getRandomColor(colors: string[]): string {
  return colors[Math.floor(Math.random() * colors.length)];
}

/**
 * Convert hex color to RGB
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * Convert RGB to hex color
 */
export function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map((x) => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}

/**
 * Check if element is in viewport
 */
export function isInViewport(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * Intersection Observer wrapper for lazy loading/animations
 */
export function observeElement(
  element: HTMLElement,
  callback: (isVisible: boolean) => void,
  options: IntersectionObserverInit = {}
): IntersectionObserver {
  const defaultOptions: IntersectionObserverInit = {
    threshold: 0.1,
    ...options,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      callback(entry.isIntersecting);
    });
  }, defaultOptions);

  observer.observe(element);
  return observer;
}

/**
 * Debounce function for event handlers
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function for high-frequency events
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false;

  return function (...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

/**
 * Add multiple event listeners to element
 */
export function addEventListeners(
  element: HTMLElement,
  events: string[],
  handler: EventListener,
  options?: boolean | AddEventListenerOptions
): void {
  events.forEach((event) => {
    element.addEventListener(event, handler, options);
  });
}

/**
 * Remove multiple event listeners from element
 */
export function removeEventListeners(
  element: HTMLElement,
  events: string[],
  handler: EventListener,
  options?: boolean | EventListenerOptions
): void {
  events.forEach((event) => {
    element.removeEventListener(event, handler, options);
  });
}

/**
 * Get computed style value
 */
export function getComputedValue(element: HTMLElement, property: string): string {
  return window.getComputedStyle(element).getPropertyValue(property);
}

/**
 * Animate value from start to end over duration
 */
export function animateValue(
  start: number,
  end: number,
  duration: number,
  callback: (value: number) => void
): Promise<void> {
  return new Promise((resolve) => {
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function: easeInOutQuad
      const easedProgress =
        progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;

      const currentValue = start + (end - start) * easedProgress;
      callback(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        resolve();
      }
    };

    requestAnimationFrame(animate);
  });
}

/**
 * Load image with promise
 */
export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
}

/**
 * Preload multiple images
 */
export async function preloadImages(sources: string[]): Promise<HTMLImageElement[]> {
  try {
    return await Promise.all(sources.map((src) => loadImage(src)));
  } catch (error) {
    console.error('Error preloading images:', error);
    return [];
  }
}

/**
 * Navigate to URL (with optional scroll behavior)
 */
export function navigate(
  url: string,
  newTab = false,
  scrollTop = false
): void {
  if (scrollTop) {
    window.scrollTo(0, 0);
  }

  if (newTab) {
    window.open(url, '_blank');
  } else {
    window.location.href = url;
  }
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      return true;
    }
  } catch {
    return false;
  }
}

/**
 * Get viewport dimensions
 */
export function getViewportSize(): { width: number; height: number } {
  return {
    width: window.innerWidth || document.documentElement.clientWidth,
    height: window.innerHeight || document.documentElement.clientHeight,
  };
}

/**
 * Check if device is mobile
 */
export function isMobileDevice(): boolean {
  const userAgent = navigator.userAgent.toLowerCase();
  return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
    userAgent
  );
}

/**
 * Sanitize HTML string (basic protection)
 */
export function sanitizeHtml(html: string): string {
  const div = document.createElement('div');
  div.textContent = html;
  return div.innerHTML;
}

/**
 * Format date to readable string
 */
export function formatDate(date: Date, format: string = 'en-US'): string {
  return new Intl.DateTimeFormat(format).format(date);
}

/**
 * Random integer between min and max
 */
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Clamp value between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export default {
  delay,
  smoothScrollTo,
  prefersReducedMotion,
  isTouchDevice,
  getRandomColor,
  hexToRgb,
  rgbToHex,
  isInViewport,
  observeElement,
  debounce,
  throttle,
  addEventListeners,
  removeEventListeners,
  getComputedValue,
  animateValue,
  loadImage,
  preloadImages,
  navigate,
  copyToClipboard,
  getViewportSize,
  isMobileDevice,
  sanitizeHtml,
  formatDate,
  randomInt,
  clamp,
};
