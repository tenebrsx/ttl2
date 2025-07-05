import { useEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

/**
 * Advanced scroll management hook with support for:
 * - Automatic scroll to top on route change
 * - Preserving scroll position on browser back/forward
 * - Configurable scroll behavior
 * - Memory management for scroll positions
 */
export const useAdvancedScrollToTop = (options: {
  smooth?: boolean;
  delay?: number;
  enabled?: boolean;
  preserveScrollOnBack?: boolean;
  resetScrollOnRefresh?: boolean;
} = {}) => {
  const { 
    smooth = true, 
    delay = 0, 
    enabled = true,
    preserveScrollOnBack = true,
    resetScrollOnRefresh = true
  } = options;
  
  const { pathname } = useLocation();
  const navigationType = useNavigationType();
  const scrollPositions = useRef<Record<string, number>>({});
  const isInitialLoad = useRef(true);

  useEffect(() => {
    if (!enabled) return;

    // Handle page refresh
    if (resetScrollOnRefresh && isInitialLoad.current) {
      window.scrollTo(0, 0);
      isInitialLoad.current = false;
      return;
    }

    // Store current scroll position before navigation
    const currentPath = pathname;
    const currentScrollY = window.scrollY;
    
    // If we're going back and preserveScrollOnBack is enabled, restore position
    if (preserveScrollOnBack && navigationType === 'POP' && scrollPositions.current[currentPath]) {
      const savedPosition = scrollPositions.current[currentPath];
      setTimeout(() => {
        window.scrollTo({
          top: savedPosition,
          left: 0,
          behavior: 'instant' // Use instant for back navigation
        });
      }, delay);
      return;
    }

    // Save current position for potential back navigation
    if (currentScrollY > 0) {
      scrollPositions.current[currentPath] = currentScrollY;
    }

    // Scroll to top for new navigation
    const scrollTimer = setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: smooth ? 'smooth' : 'instant'
      });
    }, delay);

    return () => clearTimeout(scrollTimer);
  }, [pathname, navigationType, smooth, delay, enabled, preserveScrollOnBack, resetScrollOnRefresh]);

  // Cleanup scroll positions on unmount
  useEffect(() => {
    return () => {
      scrollPositions.current = {};
    };
  }, []);
};

/**
 * Simple scroll to top hook (backward compatibility)
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

/**
 * Utility function to scroll to element with selector
 */
export const scrollToSelector = (selector: string, smooth: boolean = true, offset: number = 0) => {
  const element = document.querySelector(selector) as HTMLElement;
  if (element) {
    const elementTop = element.offsetTop - offset;
    window.scrollTo({
      top: elementTop,
      left: 0,
      behavior: smooth ? 'smooth' : 'instant'
    });
  }
};
