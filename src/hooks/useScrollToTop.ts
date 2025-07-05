import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Hook to scroll to top on route change
 * @param options - Configuration options
 * @param options.smooth - Whether to use smooth scrolling (default: true)
 * @param options.delay - Delay before scrolling in milliseconds (default: 0)
 * @param options.enabled - Whether scrolling is enabled (default: true)
 */
export const useScrollToTop = (options: {
  smooth?: boolean;
  delay?: number;
  enabled?: boolean;
} = {}) => {
  const { smooth = true, delay = 0, enabled = true } = options;
  const { pathname } = useLocation();

  useEffect(() => {
    if (!enabled) return;

    const scrollTimer = setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: smooth ? 'smooth' : 'instant'
      });
    }, delay);

    return () => clearTimeout(scrollTimer);
  }, [pathname, smooth, delay, enabled]);
};

/**
 * Utility function to manually scroll to top
 * @param smooth - Whether to use smooth scrolling (default: true)
 */
export const scrollToTop = (smooth: boolean = true) => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: smooth ? 'smooth' : 'instant'
  });
};

/**
 * Utility function to scroll to a specific element
 * @param elementId - ID of the element to scroll to
 * @param smooth - Whether to use smooth scrolling (default: true)
 * @param offset - Offset from the top of the element (default: 0)
 */
export const scrollToElement = (elementId: string, smooth: boolean = true, offset: number = 0) => {
  const element = document.getElementById(elementId);
  if (element) {
    const elementTop = element.offsetTop - offset;
    window.scrollTo({
      top: elementTop,
      left: 0,
      behavior: smooth ? 'smooth' : 'instant'
    });
  }
};
